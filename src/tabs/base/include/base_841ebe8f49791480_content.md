


<pre><code class="language-rust">
fn get_str<'a>() -> &'a str{
     "hello"
}
fn main(){ 
  let r = get_str();
  println!("{}",r);
}
</code></pre>
