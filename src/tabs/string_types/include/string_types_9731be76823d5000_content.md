


<pre><code class="language-rust">
fn main(){
    let _str = "Escapes don't work here: \x3F \u{211D}";// ? ℝ
    println!("{}", _str);
    // как есть, сырой указатель
    let raw_str = r"Escapes don't work here: \x3F \u{211D}";//  \x3F \u{211D}
    println!("{}", raw_str);
    
    //  необработанная строка
    let quotes = r#"And then I said: "There is no escape!""#;
    println!("{}", quotes);
    
    let longer_delimiter = r###"A string with "# in it. And even "##!"###;
    println!("{}", longer_delimiter);
}
</code></pre>
