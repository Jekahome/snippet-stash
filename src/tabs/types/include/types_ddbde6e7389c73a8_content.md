





<pre><code class="language-rust">
fn main(){
 trait Test{}
 struct TestImpl{}
 impl Test for TestImpl{}
 let test:Box<&dyn Test> = Box::new(&TestImpl{});
}
</code></pre>
