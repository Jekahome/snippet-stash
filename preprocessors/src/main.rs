use mdbook::book::{Book, BookItem};
use mdbook::errors::Error;
use mdbook::preprocess::{CmdPreprocessor, Preprocessor, PreprocessorContext};
use regex::Regex;
use serde_json;
use std::{env, fs, io, process};
use semver::{Version, VersionReq};

pub struct IncludeMd;

impl Preprocessor for IncludeMd {
    fn name(&self) -> &str {
        "include-md"
    }

    fn run(&self, _ctx: &PreprocessorContext, mut book: Book) -> Result<Book, Error> {
        
        book.for_each_mut(|item| {
            if let BookItem::Chapter(ch) = item {
                if ch.is_draft_chapter() {
                    return;
                }

                match process_includes(&ch.content) {
                    Ok(new_content) => {
                        ch.content = new_content;
                    }
                    Err(err) => {
                        eprintln!("Ошибка при обработке include в главе '{}': {}", ch.name, err);
                    }
                }
            }
        });
        
        Ok(book)
    }

    fn supports_renderer(&self, renderer: &str) -> bool {
        renderer == "html" || renderer == "epub" || renderer == "markdown"
    }
}

fn process_includes(content: &str) -> Result<String, Error> {
    let re = Regex::new(r#"\{\{\s*include\(("([^"]+)"|'([^']+)')\)\s*\}\}"#).unwrap();

    let result = re.replace_all(content, |caps: &regex::Captures| {
        let path = caps.get(2).or_else(|| caps.get(3)).map(|m| m.as_str()).unwrap_or("");
        
        match fs::read_to_string(path) {
            Ok(content) => content,
            Err(e) => {
                eprintln!("Ошибка чтения файла '{}': {}", path, e);
                format!("<!-- Ошибка чтения файла '{}': {} -->", path, e)
            }
        }
    });

    Ok(result.to_string())
}

fn main() {
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("warn")).init();
    
    let mut args = env::args().skip(1);
    
    match args.next().as_deref() {
        Some("supports") => {
            let renderer = args.next().unwrap_or_else(|| {
                eprintln!("Отсутствует аргумент renderer для команды supports");
                process::exit(1);
            });
            
            let preprocessor = IncludeMd;
            let supported = preprocessor.supports_renderer(&renderer);
            
            if supported {
                process::exit(0);
            } else {
                process::exit(1);
            }
        }
        Some(arg) => {
            eprintln!("Неизвестный аргумент: {}", arg);
            process::exit(1);
        }
        None => {}
    }

    if let Err(e) = handle_preprocessing() {
        eprintln!("Ошибка препроцессора: {}", e);
        process::exit(1);
    }
}

fn handle_preprocessing() -> Result<(), Error> {
    let preprocessor = IncludeMd;
    let (ctx, book) = CmdPreprocessor::parse_input(io::stdin())?;
    
    // Проверка версии mdbook
    let book_version = Version::parse(&ctx.mdbook_version)?;
    let version_req = VersionReq::parse(mdbook::MDBOOK_VERSION)?;
    
    if !version_req.matches(&book_version) {
        eprintln!(
            "Предупреждение: Плагин {} был собран для версии {} mdbook, \
             но вызывается из версии {}",
            preprocessor.name(),
            mdbook::MDBOOK_VERSION,
            ctx.mdbook_version
        );
    }
    
    let processed_book = preprocessor.run(&ctx, book)?;
    serde_json::to_writer(io::stdout(), &processed_book)?;
    
    Ok(())
}