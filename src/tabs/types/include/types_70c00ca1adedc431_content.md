


<pre><code class="language-rust">
trait HasNumbers {
    const SET_NUMBER: usize = 10;            
    const EXTRA_NUMBER: usize;               
}
 
struct NothingSpecial;
 
impl HasNumbers for NothingSpecial {
    const SET_NUMBER: usize = 20; 
    const EXTRA_NUMBER: usize = 10;
}
 
fn main() {
  print!("{} ", NothingSpecial::SET_NUMBER);// 20
  print!("{}", NothingSpecial::EXTRA_NUMBER);// 10
}
</code></pre>
