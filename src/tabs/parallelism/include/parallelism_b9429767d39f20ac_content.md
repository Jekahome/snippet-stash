


<pre><code class="language-rust">
fn main(){
    let result = std::panic::catch_unwind(||
      if *guard == 7{
        panic!("Aaaaa");
      }
    ).map_err(|e|{
        println!("PANICKED thread:{:?}",thread::current().name())
    }); 
}
</code></pre>
