


<pre><code class="language-rust">
fn main(){
// Конкатенация
    let a:String = "hello".to_string();
    let b:&str = " world";
    let c:String = a + b;
    assert_eq!("hello world",c);

    let c:String = a + &a;
    let c:String = a + "-" + &b.to_owned() + "-" + &a;
// ----------------------------------------
    let mut s = String::from("foo");
    s.push('b');
// ----------------------------------------
    let mut s = String::from("foo");
    s.push_str("hello");
// ----------------------------------------
    use std::fmt::Write;
    let mut s1:String = "tic".to_string();
    let _ = s1.write_str("tac");
    let _ = s1.write_char('t');
    let _ = s1.write_fmt(format_args!("{}","ac"));
    assert_eq!("tictactac".to_string(),s1);
}
</code></pre>
