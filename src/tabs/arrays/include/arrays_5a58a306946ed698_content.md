


<pre><code class="language-rust">
fn main(){
    let x = &mut [1, 2, 4];
    for elem in x.iter_mut() {
        *elem += 2;
    }
    assert_eq!(x, &[3, 4, 6]);
// --------------------------------
    let mut value:[i32;5] = [1,2,3,4,5];
    let r:i32 = value.iter_mut().filter(|x| **x % 2 == 0).map(|v|*v*2).sum();
}
</code></pre>
