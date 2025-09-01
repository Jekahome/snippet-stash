


<pre><code class="language-rust">
fn main(){
    use std::ptr;
    let mut vec = vec!['r', 'u', 's', 't'];
    unsafe {
        ptr::drop_in_place(&mut vec[3]);
        vec.set_len(3);
    }
    assert_eq!(vec, ['r', 'u', 's']);
}
</code></pre>

---

В этом примере происходит утечка памяти, так как ячейки памяти, принадлежащие внутренним векторам, не были освобождены до вызова set_len
<pre><code class="language-rust">
fn main(){
    let mut vec = vec![vec![1, 0, 0], vec![0, 1, 0], vec![0, 0, 1]];
    unsafe {
        vec.set_len(0);
    }
// или
    let mut vec: Vec<char> = Vec::new();
    unsafe {
        vec.set_len(4);
    }
}
</code></pre>
