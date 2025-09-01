


<pre><code class="language-rust">
fn main(){
    // replace создает новый String и копирует в него данные из этого фрагмента строки.
    let s:&str = "this is old";
    let new_str:&str = &s.replace("old", "new");
    println!("{}",new_str);// this is new
    //let s = "foo foo 123 foo";
    //assert_eq!("new new 123 foo", s.replacen("foo", "new", 2));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    use regex::Regex;
    let re = Regex::new(r"[^\w,. ]").unwrap();
    let result = re.replace_all("Hello World!?", " ");
    println!("{}", result); // => Hello World
}
</code></pre>
