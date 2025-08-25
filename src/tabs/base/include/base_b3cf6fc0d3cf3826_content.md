


<pre><code class="language-rust">
fn main(){
  let msg = "Message";
  let data = vec!["item 1","item 2"];
  if cfg!(debug_assertions) { // вариант аттрибута условной компиляции
       eprintln!("debug: {:?} -> {:?}", msg, data);
  }
  // debug: "Message" -> ["item 1", "item 2"]
  eprintln!("Error: arguments --conf can not be empty !");
}
</code></pre>
