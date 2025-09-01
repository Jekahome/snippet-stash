


<pre><code class="language-rust">
// Если нужна только ссылка (чтение)
// Используйте AsRef<str> — функция будет принимать всё, что можно превратить в &str (String, &String, &str, Arc<str>, и т. д.):
fn take_a_str(some: impl AsRef<str>) { // или fn take_a_str<S: AsRef<str>>(some: S){...
    let some = some.as_ref();
    println!("{some}");
}

// Если нужно владение (String внутри функции)
// Используйте Into<String> — функция примет и String, и &str (второе будет скопировано):
use core::fmt::Debug;
fn take_a_str_into(some: impl Into<String>+Debug) {// или fn take_a_str_into<S: Into<String>+Debug>(some: S) {...
    println!("{:?}",some);
}
fn main() {
    take_a_str("str");
    take_a_str("String".to_string());
    
    // also `&String` is supported:
    let string_ref = "StringRef".to_string();
    take_a_str(&string_ref);

    take_a_str_into("str");
    take_a_str_into("String".to_string());
    let string_ref = "StringRef".to_string();
    take_a_str_into(&string_ref);
}
</code></pre>
