


<pre><code class="language-rust">
fn main(){
    #![feature(array_zip)]
    let x = [1, 2, 3];
    let y = [4, 5, 6];
    let z:[(i32,i32);3] = x.zip(y);
    assert_eq!(z, [(1, 4), (2, 5), (3, 6)]);
}
</code></pre>
