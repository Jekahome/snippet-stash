


<pre><code class="language-rust">
fn main(){
// Меняет местами значения
    let mut vec = vector![1, 2, 3, 4, 5];
    vec.swap(0,4);
    assert_eq!(&5,vec.get(0).unwrap());
}
</code></pre>
