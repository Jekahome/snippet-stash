

<pre><code class="language-rust">
fn main(){
 loop {
    match option {
        Some(x) => println!("{}", x),
        _ => break,
    }
 }
}
</code></pre>

`loop` превращается в такой `while`:
<pre><code class="language-rust">
fn main(){
 while let Some(x) = option {
    println!("{}", x);
 }
}
</code></pre>
