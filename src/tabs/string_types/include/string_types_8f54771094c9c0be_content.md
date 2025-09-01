


<pre><code class="language-rust">
fn main(){
// Отличие способа выделение памяти емкости
// Если известна примерная емкость заранее то лучьше with_capacity
    let mut s = String::new();
    let mut s = String::with_capacity(25);
    println!("{}", s.capacity());
    for _ in 0..8 {
        s.push_str("hello");
        println!("{}", s.capacity());
    }
// ------------------------------------------------------------
// Конкатенация строк через оператор +
    let hello = String::from("Hello");
    let world = String::from("world");
    let rust = " in Rust";

    let sentence = hello + " " + &world + rust;
// ------------------------------------------------------------
use std::str::FromStr;
let s:&str = "hello";
let s:String = String::from_str(s).unwrap();
// ------------------------------------------------------------
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s:String = format!("{s1}-{s2}");
// ------------------------------------------------------------
// ToString for &str
    let s1:String = "tic".to_string();
    let s2:String = ToString::to_string("tac");
}
</code></pre>
