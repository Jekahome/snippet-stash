


<pre><code class="language-rust">
mod private{
   pub struct PrivateStatic(());// self.0 private
   impl PrivateStatic {
       pub fn new()->Self{
           Self(())
       }
   }
} 
use private::PrivateStatic;

fn main() {
    let p = PrivateStatic::new();
}
</code></pre>
