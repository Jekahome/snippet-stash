

<pre><code class="language-rust">
fn main(){
 let list = vec![1,2,3];
 if let [one, ..] = list.as_slice() {
   assert_eq!(1,*one);
 }
}
</code></pre>
