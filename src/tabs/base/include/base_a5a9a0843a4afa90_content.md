

<pre><code class="language-rust">
fn print_ret_error(s1: &str, s2: &str) -> &str {
    println!("s1 is {}", s1);
    s2
}
// явно уточним срок действия ссылки
fn print_ret<'a>(s1: &str, s2: &'a str) -> &'a str {
    println!("s1 is {}", s1);
    s2
}
fn main() {
    let some_str: String = "Some string".to_string();
    let other_str: String = "Other string".to_string();
    let s1 = print_ret(&some_str, &other_str);
}
</code></pre>

