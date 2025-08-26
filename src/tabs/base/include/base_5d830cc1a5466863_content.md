


<pre><code class="language-rust">
fn take_a_str(some: impl AsRef< str>) { // тоже самое `fn take_a_str< T:AsRef< str>>(some: T) {...`
    let some = some.as_ref();
    println!("{some}");
}
use core::fmt::Debug;
fn take_a_str_into(some: impl Into< String>+Debug) {
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
