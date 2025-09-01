


<pre><code class="language-rust">
fn main(){
    use std::io::{self, Write};
    let buffer = vec![1, 2, 3, 5, 8];
    io::sink().write(buffer.as_slice()).unwrap();

    let v:Vec<i32> = vec![1,2,3,4,5,6,7,8,9,10];
    select_rand_val2(v.as_slice());
    fn select_rand_val2(slice:&[i32]){}
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    use std::io::{self, Read};
    let mut buffer = vec![0; 3];
    io::repeat(0b101).read_exact(buffer.as_mut_slice()).unwrap();
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x = vec![1, 2, 3];
    let static_ref: &'static mut [usize] = x.leak();
    static_ref[0] += 1;
    assert_eq!(static_ref, &[2, 2, 3]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut vec = vec![1,2,3];
    let vec2 = vec.split_off(1);
    assert_eq!(vec, [1]);
    assert_eq!(vec2, [2, 3]);
}
</code></pre>
