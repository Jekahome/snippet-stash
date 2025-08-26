


<pre><code class="language-rust">
#![feature(negative_impls)]
 
struct MyStruct;
impl !Clone for MyStruct {}
impl !Copy for MyStruct {}
 
fn main() {
    let m = MyStruct;
    let m2 = m; // moved
    let m3 = m; // ❌ Error `does not implement the `Copy` trait`
}
</code></pre>
