


<pre><code class="language-rust">
fn main(){
    let mut v1: Vec<u32> = Vec::with_capacity(99);
    let v2: Vec<u32> = vec![1, 2, 3];
    v1.clone_from(&v2); 
    assert_eq!(v1.capacity(), 99);
}
</code></pre>
