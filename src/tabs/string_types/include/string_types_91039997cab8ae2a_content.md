


<pre><code class="language-rust">
fn main(){
    //let four: u32 = "4".parse().unwrap();
    let four = "4".parse::<u32>();
    if let Ok(n) =  "4".parse::<u32>(){
        println!("{}",n);// 17
    }
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    macro_rules! parse_input {
        ($x:expr, $t:ident) => ($x.trim().parse::<$t>().unwrap())
    }

    let mut input_line = String::new();
    io::stdin().read_line(&mut input_line).unwrap();
    let n = parse_input!(input_line, usize);

}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    use std::str::FromStr;
    let s = "5";
    let x = i32::from_str(s).unwrap();
}
</code></pre>
