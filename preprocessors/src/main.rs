use mdbook::book::{Book, BookItem};
use mdbook::errors::Error;
use mdbook::preprocess::{Preprocessor, PreprocessorContext};
use regex::Regex;
use serde_json;
use std::{env, fs, io, process};
use mdbook::preprocess::{CmdPreprocessor};
 

pub struct IncludeMd;

impl Preprocessor for IncludeMd {
    fn name(&self) -> &str {
        "include-md"
    }

    /*fn run(&self, _ctx: &PreprocessorContext, mut book: Book) -> Result<Book, Error> {
        book.for_each_mut(|item| {
            match item {
                BookItem::Chapter(ch) => {
                    ch.content = process_includes(&ch.content).unwrap();
                }
                _ => {}
            }
            //Ok(())
        });
    
        Ok(book)
    }*/

    fn run(&self, _ctx: &PreprocessorContext, mut book: Book) -> Result<Book, Error> {
        let mut total = 0;
        book.for_each_mut(|item| {
            match item {
                BookItem::Chapter(ch) => {
                    if ch.is_draft_chapter() {
                        return; // пропустить черновик
                    }
                    ch.content =  match process_includes(&ch.content) {
                        Ok(c) => {
                            //log::warn!("Preprocessor run 1");
                            //eprintln!("Что парсим: [{}]",&ch.content);                            
                            c
                        },
                        Err(err) => {
                            log::error!("Ошибка при обработке include: {err}");
                            return;
                        }
                    };


                    /*if ch.is_draft_chapter() {
                        return;
                    }*/
                    //return;
                }
                _ => {
                    //log::warn!("Preprocessor run 2");
                }
            }
            ()
        });
        //log::warn!("Preprocessor run 3");
        Ok(book)
    }

    fn supports_renderer(&self, renderer: &str) -> bool {
        renderer == "html"
    }
}

fn process_includes(content: &str) -> Result<String, Error> {
    /*let re = Regex::new(r#"\{\{\s*include\((["'])([^"']+)(["'])\)\s*\}\}"#).unwrap();
    let result = re.replace_all(content, |caps: &regex::Captures| {
        let open = &caps[1];
        let path = &caps[2];
        let close = &caps[3];

        if open != close {
            return format!("<!-- error: mismatched quotes in include({}{}) -->", open, path);
        }

        fs::read_to_string(path).unwrap_or_else(|_| format!("<!-- error: couldn't read {} -->", path))
    });*/

    let re = Regex::new(r#"\{\{\s*include\(("([^"]+)"|'([^']+)')\)\s*\}\}"#).unwrap();

    let result = re.replace_all(content, |caps: &regex::Captures| {
        let path = caps.get(2).or_else(|| caps.get(3)).map(|m| m.as_str()).unwrap_or("");
        fs::read_to_string(path).unwrap_or_else(|_| format!("<!-- error reading {} -->", path))
    });

    Ok(result.to_string())
}


pub fn handle_preprocessing() -> Result<(), Error> {
    //log::warn!("Preprocessor handle_preprocessing 1");
    let preprocessor = IncludeMd;
    let (ctx, book) = CmdPreprocessor::parse_input(io::stdin())?;
    //log::warn!("Preprocessor handle_preprocessing 2");
    let processed_book = preprocessor.run(&ctx, book)?;
    //log::warn!("Preprocessor handle_preprocessing 3");
    serde_json::to_writer(io::stdout(), &processed_book)?;
    //log::warn!("Preprocessor handle_preprocessing 4");

    Ok(())
}

fn main() {
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("warn")).init();
    let mut args = std::env::args().skip(1);
    match args.next().as_deref() {
        Some("supports") => {
            // Supports all renderers.
            return;
        }
        Some(arg) => {
            eprintln!("unknown argument: {arg}");
            log::error!("Preprocessor unknown argument: {arg}");
            std::process::exit(1);
        }
        None => {}
    }

    if let Err(e) = handle_preprocessing() {
        eprintln!("{e}");
        log::error!("Preprocessor error: {e}");
        std::process::exit(1);
    }
}


fn main2() {
    env_logger::init();

    let args: Vec<String> = env::args().collect();

    

    /*if args.len() != 2 {
        eprintln!("Usage: {} supports|preprocess", args[0]);
        log::error!("Preprocessor error: {:#?}",args[0]);
        process::exit(1);
    }*/

    let preprocessor = IncludeMd;

    match args[1].as_str() {
        "supports" => {
            let ctx: PreprocessorContext = serde_json::from_reader(io::stdin()).unwrap();
            let supported = preprocessor.supports_renderer(&ctx.renderer);
            serde_json::to_writer(io::stdout(), &supported).unwrap();
        }
        "preprocess" => {
            /*use std::io::{self, Read};
            let mut buffer = String::new();
            io::stdin().read_to_string(&mut buffer).unwrap();
            let data: serde_json::Value = serde_json::from_str(&buffer).unwrap();
            eprintln!("DEBUG JSON: {:#?}", data);
            let (ctx, book): (PreprocessorContext, Book) = serde_json::from_str(&buffer).unwrap();*/

            let (ctx, book): (PreprocessorContext, Book) = serde_json::from_reader(io::stdin()).unwrap();
            let processed = preprocessor.run(&ctx, book).unwrap();
            serde_json::to_writer(io::stdout(), &processed).unwrap();
        }
        _ => {
            eprintln!("Unknown command: {}", args[1]);
            process::exit(1);
        }
    }
}