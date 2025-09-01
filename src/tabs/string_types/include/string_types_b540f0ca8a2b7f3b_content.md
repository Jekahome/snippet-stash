


<pre><code class="language-rust">
fn foo(s:&str){ print!("{s}");} 

fn main() {
  let s:String = "hello".to_string();
  // *s - сперва мы преобразуем String в str через Deref
  // &*s - далее на str берем ссылку &str
  foo(&*s); // неявное преобразование Deref
  foo(&*std::ops::Deref::deref(&s)); // явное преобразование Deref
}
</code></pre>
