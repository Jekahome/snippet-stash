fn main() {
    let _markdown_input = r#"<div class="container">
    <table class="data-table" id="dataTable">
        <tbody>
            <tr id="tab_2_1">
                <td id="tab_2_1_topic"><div class="cell-content" contenteditable="true">#Hello</div></td>
                <td id="tab_2_1_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_1_content.md')}}</div></td>
                <td id="tab_2_1_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_1_other.md')}}</div></td>
            </tr> 
        </tbody>
    </table>
</div>"#;

let _markdown_input = "<div> 

# Hello 
</div>";

let markdown_input = include_str!("include.md");
let markdown_input = include_str!("table.md");
let markdown_input = r#"

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |

"#;

    let parser = pulldown_cmark::Parser::new(markdown_input);
    let mut html_output = String::new();
    pulldown_cmark::html::push_html(&mut html_output, parser);
    println!("{:?}",html_output);

    for event in pulldown_cmark::Parser::new(markdown_input) {
        println!("{:?}", event); // доходит ли до Table событий
    }

    use pulldown_cmark::{Parser, Options};

    let opts = Options::ENABLE_TABLES; // Включаем таблицы
    let parser = Parser::new_ext(markdown_input, opts);

    for event in parser {
        println!("{:?}", event); // доходит ли до Table событий
    }

}
