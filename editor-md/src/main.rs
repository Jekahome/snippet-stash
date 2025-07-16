use clap::{Parser, Subcommand, ValueEnum};
use std::process::exit;
use std::fs::{self,File};
use std::io::{self, Write};
use std::process;
use regex::Regex;
use std::path::Path;

#[derive(Parser)]
#[command(version, about, long_about = None)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}
 
// Определяем перечисление для типа позиции
#[derive(Debug, Clone, Copy, PartialEq, Eq, ValueEnum)]
pub enum PositionKind {
    Before,
    After,
}

#[derive(Subcommand)]
pub enum Commands {
    #[command(
        name = "add-tr",
        visible_alias = "at",
        about = "Add TR.",
        long_about = "Add TR.\n\
        Example usage:\n\n\
        add-tr --tab-id tab_8 --tr-id tab_8_new --position after --tr-id-position tab_8_469b61eeeb666c72\n\
        add-tr --tab-id tab_8 --tr-id tab_8_new --position before --tr-id-position tab_8_469b61eeeb666c72" 
    )]
    AddTR {
        #[arg(long = "tab-id", value_name = "TAB_ID")]
        tab_id: String,
        #[arg(long = "tr-id", value_name = "TR_ID")]
        tr_id: String,
        #[arg(long = "position", value_name = "POSITION_KIND")] 
        position: PositionKind,
        #[arg(long = "tr-id-position", value_name = "TR_ID_POS_VALUE")]
        tr_id_position: String, 
    }, 
    #[command(
        name = "delete-tr",
        visible_alias = "dt",
        about = "Delete TR.",
        long_about = "Delete TR.\n\
        Example usage:\n\n\
        delete-tr --tab-id tab_8 --tr-id tab_8_469b61eeeb666c72" 
    )]
    DeleteTR {
        #[arg(long = "tab-id", value_name = "TAB_ID")]
        tab_id: String,
        #[arg(long = "tr-id", value_name = "TR_ID")]
        tr_id: String,
    }, 
    #[command(
        name = "add-tabs",
        about = "Add Tab.",
        long_about = "Add Tab.\n\
        Example usage:\n\n\
        add-tabs --tabs-id tab_1, tab_2
        "
    )]
    AddTabs{
        #[arg(long = "tabs-id", value_name = "TAB_ID", value_delimiter = ',')]
        tabs_id: Vec<String>,
    }
}

#[rustfmt::skip]
fn insert_new_tr(content: &str, tab_id: &str, tr_id: &str, pos: PositionKind, tr_id_position: &str) -> Result<String, String> {
    let match_pos = match pos {
        PositionKind::Before => {
            let target_pattern = format!(r#"<tr id="{}">"#, regex::escape(tr_id_position));
            let re = Regex::new(&target_pattern).map_err(|e| format!("Ошибка регулярного выражения: {}", e))?;
            
            if !re.is_match(content) {
                return Err(format!("tr с ID '{}' не найден в файле", tr_id_position));
            }
            
            let match_pos = re.find(content).unwrap();
            match_pos
        },
        PositionKind::After => {
            let target_pattern = format!(r#"(?s)<tr id="{}">.*?</tr>"#, regex::escape(tr_id_position));
            let re = Regex::new(&target_pattern).map_err(|e| format!("Ошибка регулярного выражения: {}", e))?;
            
            if !re.is_match(content) {
                return Err(format!("tr с ID '{}' не найден в файле", tr_id_position));
            }
            
            let match_pos = re.find(content).unwrap();
            match_pos
        }
    };

    let mut result = String::new();
    match pos {
        PositionKind::Before => {
    let new_tr = format!(
        r#"<tr id="{tr_id}">
                <td id="{tr_id}_topic"><div class="cell-content" contenteditable="true">{{{{include('src/tabs/{tab_id}/include/{tr_id}_topic.md')}}}}</div></td>
                <td id="{tr_id}_content"><div class="cell-content" contenteditable="true">{{{{include('src/tabs/{tab_id}/include/{tr_id}_content.md')}}}}</div></td>
                <td id="{tr_id}_other"><div class="cell-content" contenteditable="true">{{{{include('src/tabs/{tab_id}/include/{tr_id}_other.md')}}}}</div></td>
            </tr>   
            "#);
     
            result.push_str(&content[..match_pos.start()]);
            result.push_str(&new_tr);
            result.push_str(&content[match_pos.start()..]);
        },
        PositionKind::After => {
    let new_tr = format!(
        r#"
            <tr id="{tr_id}">
                <td id="{tr_id}_topic"><div class="cell-content" contenteditable="true">{{{{include('src/tabs/{tab_id}/include/{tr_id}_topic.md')}}}}</div></td>
                <td id="{tr_id}_content"><div class="cell-content" contenteditable="true">{{{{include('src/tabs/{tab_id}/include/{tr_id}_content.md')}}}}</div></td>
                <td id="{tr_id}_other"><div class="cell-content" contenteditable="true">{{{{include('src/tabs/{tab_id}/include/{tr_id}_other.md')}}}}</div></td>
            </tr>"#);
     
            result.push_str(&content[..match_pos.end()]);
            result.push_str(&new_tr);
            result.push_str(&content[match_pos.end()..]);
        }
    }
 
    let paths = [
        format!("src/tabs/{tab_id}/include/{tr_id}_topic.md"),
        format!("src/tabs/{tab_id}/include/{tr_id}_content.md"),
        format!("src/tabs/{tab_id}/include/{tr_id}_other.md"),
    ];

    for path in &paths {
        let _ = create_if_not_exists(path);
    }
    Ok(result)
}

#[rustfmt::skip]
fn delete_tr(content: &str, tab_id: &str, tr_id: &str) -> Result<String, String> {
    // Шаблон удаляет строку <tr> вместе с прилегающими переносами строк, если они есть
    let pattern = format!(
        r#"(?ms)<tr id="{id}">.*?</tr>\s*"#,
        id = regex::escape(tr_id)
    );
    let re = Regex::new(&pattern).map_err(|e| format!("Ошибка регулярного выражения: {}", e))?;

    // Найти и удалить tr
    let new_content = re.replace(content, "").to_string();

    if new_content == content {
        return Err(format!("tr с ID '{}' не найден в файле", tr_id));
    }

    // Удаление связанных файлов
    let paths = [
        format!("src/tabs/{}/include/{}_topic.md", tab_id, tr_id),
        format!("src/tabs/{}/include/{}_content.md", tab_id, tr_id),
        format!("src/tabs/{}/include/{}_other.md", tab_id, tr_id),
    ];

    for path in &paths {
        if let Err(e) = fs::remove_file(path) {
            eprintln!("Не удалось удалить файл '{}': {}", path, e);
        }
    }

    Ok(new_content)
}

fn create_if_not_exists(path: &str) -> std::io::Result<()> {
    if !Path::new(path).exists() {
        File::create(path)?;
    }
    Ok(())
}

fn generate_hash_crypto() -> String {
    use rand::RngCore;
    let mut rng = rand::rng();
    let mut bytes = [0u8; 8];
    rng.fill_bytes(&mut bytes);
    hex::encode(bytes)
}

#[rustfmt::skip]
pub fn insert_new_tab(new_tab: &str, tab_id: &str) -> io::Result<()> {
    let base_path = Path::new(new_tab);
    let count_files = 10;
    // 1. Создаем основную папку
    fs::create_dir_all(&base_path)?;
    // 2. Создаем вложенную папку include
    let include_path = base_path.join("include");
    fs::create_dir_all(&include_path)?;

    let mut index_content = format!(r#"<div class="container">
    <table class="data-table" id="dataTable">
        <thead>
            <tr id="{tab_id}_header_row">
                <th id="{tab_id}_header_topic"><div class="cell-content" contenteditable="true">Тема</div></th>
                <th id="{tab_id}_header_content"><div class="cell-content" contenteditable="true">Описание</div></th>
                <th id="{tab_id}_header_other"><div class="cell-content" contenteditable="true">Доп.</div></th>
            </tr>
        </thead>
        <tbody>
            "#);

    for n in 1..=count_files  {
    let tr_id = format!("{tab_id}_{}", generate_hash_crypto());
    if n==count_files{
    let tr = format!(
        r#"<tr id="{tr_id}">
                <td id="{tr_id}_topic"><div class="cell-content" contenteditable="true">{{{{include('src/tabs/{tab_id}/include/{tr_id}_topic.md')}}}}</div></td>
                <td id="{tr_id}_content"><div class="cell-content" contenteditable="true">{{{{include('src/tabs/{tab_id}/include/{tr_id}_content.md')}}}}</div></td>
                <td id="{tr_id}_other"><div class="cell-content" contenteditable="true">{{{{include('src/tabs/{tab_id}/include/{tr_id}_other.md')}}}}</div></td>
            </tr>
        "#);
            index_content.push_str(&tr); 
    }else{
    let tr = format!(
        r#"<tr id="{tr_id}">
                <td id="{tr_id}_topic"><div class="cell-content" contenteditable="true">{{{{include('src/tabs/{tab_id}/include/{tr_id}_topic.md')}}}}</div></td>
                <td id="{tr_id}_content"><div class="cell-content" contenteditable="true">{{{{include('src/tabs/{tab_id}/include/{tr_id}_content.md')}}}}</div></td>
                <td id="{tr_id}_other"><div class="cell-content" contenteditable="true">{{{{include('src/tabs/{tab_id}/include/{tr_id}_other.md')}}}}</div></td>
            </tr>   
            "#);
            index_content.push_str(&tr); 
    }
            // 3. Генерируем файлы include/{tab_id}_{suffix}.md
            let _ = File::create(&format!("src/tabs/{tab_id}/include/{tr_id}_topic.md"));
            let _ = File::create(&format!("src/tabs/{tab_id}/include/{tr_id}_content.md"));
            let _ = File::create(&format!("src/tabs/{tab_id}/include/{tr_id}_other.md"));    
    }

    index_content.push_str(&format!(r#"</tbody>
    </table>
</div>
<script>
document.addEventListener('DOMContentLoaded', async () => {{
    try {{
        await window.globalScriptReady; 
        await initTab("{tab_id}");
    }} catch (error) {{
        console.error("Error build:", error);
    }}
}});
</script>"#));

    // 4. Создаем index.md с содержимым
    let index_path = base_path.join("index.md");
    let mut index_file = File::create(index_path)?;
    index_file.write_all(index_content.as_bytes())?;

    Ok(())
}

fn is_valid_folder_name(name: &str) -> bool {
    let forbidden = ['/', '\\', ':', '*', '?', '"', '<', '>', '|'];
    !name.is_empty() && !name.contains('\0') && name.chars().all(|c| !forbidden.contains(&c))
}

fn main() {
    let cli_result = Cli::try_parse();
    match cli_result {
        Ok(cli) => match cli.command {
            Commands::AddTR { 
                tab_id, 
                tr_id, 
                position, 
                tr_id_position 
            } => {
                let md_file = format!("src/tabs/{tab_id}/index.md");
                let content = match fs::read_to_string(&md_file) {
                    Ok(content) => content,
                    Err(e) => {
                        eprintln!("Ошибка чтения файла '{}': {}", &md_file, e);
                        process::exit(1);
                    }
                };  

                match insert_new_tr(&content, &tab_id, &tr_id, position, &tr_id_position ) {
                    Ok(new_content) => {
                        if let Err(e) = fs::write(md_file, new_content) {
                            eprintln!("Ошибка записи файла: {}", e);
                            process::exit(1);
                        }
                    }
                    Err(e) => {
                        eprintln!("Ошибка: {}", e);
                        process::exit(1);
                    }
                }
            },
            Commands::DeleteTR { 
                tab_id, 
                tr_id 
            } => {
                let md_file = format!("src/tabs/{tab_id}/index.md");
                let content = match fs::read_to_string(&md_file) {
                    Ok(content) => content,
                    Err(e) => {
                        eprintln!("Ошибка чтения файла '{}': {}", &md_file, e);
                        process::exit(1);
                    }
                };  
                match delete_tr(&content, &tab_id, &tr_id) {
                    Ok(new_content) => {
                        if let Err(e) = fs::write(md_file, new_content) {
                            eprintln!("Ошибка записи файла: {}", e);
                            process::exit(1);
                        }
                    }
                    Err(e) => {
                        eprintln!("Ошибка: {}", e);
                        process::exit(1);
                    }
                }
            },
            Commands::AddTabs {
                tabs_id
            } => {
                for tab_id in tabs_id {
                    if is_valid_folder_name(&tab_id){
                        let new_tab = format!("src/tabs/{tab_id}");
                        match insert_new_tab(&new_tab, &tab_id){
                            Ok(()) => {}
                            Err(_) =>{}
                        }
                    }else{
                        eprintln!("Ошибка: В названии папки запрещенные символы\n{tab_id}");
                    }
                }
            }
        },
        Err(_) => {
            eprintln!("CLI parsed failed: {:?}",std::env::args().collect::<Vec<String>>());
            exit(2);
        }
    }
    exit(0);

}
