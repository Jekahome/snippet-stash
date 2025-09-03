


<pre><code class="language-rust">
use std::borrow::Cow;

// Что, если в 99,9% вызовов строка не содержит пробелов?
// В таких случаях мы могли бы избежать вызова to_string() и создания ненужной копии строки. 
// Однако, если мы хотим реализовать такую ​​логику, мы не можем использовать ни String ни &str
fn remove_whitespaces(s: &str) -> String {
    s.to_string().replace(' ', "")
}

fn cow_remove_whitespaces(s: &str) -> Cow<str> {
    if s.contains(' ') {
        Cow::Owned(s.to_string().replace(' ', ""))
    } else {
        Cow::Borrowed(s)
    }
}
fn main() {
    let value:String = remove_whitespaces("Hello world!");
    println!("{}", value);

    let value: Cow<str>  = cow_remove_whitespaces("Hello world!");
    println!("{}", &value);
    let for_string: String = value.into_owned();
}
</code></pre>
