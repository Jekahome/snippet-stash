


<pre><code class="language-rust">
// При операциях со static mut , вызывающий код должен сам гарантировать, что не создаётся алиасинг
static mut COUNTER: usize = 0;
fn main() {
  unsafe{ COUNTER += 1;  }
  unsafe{ println!("{}",COUNTER); }
}
</code></pre>
