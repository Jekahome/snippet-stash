


<pre><code class="language-rust">
fn main(){
    let mut vec1 = vec![10,20,30];
    let mut vec2 = vec![2,3];
    let mut vec3 = vec![4,5];
     
    vec1.extend_from_slice(&vec2);
    vec1.extend_from_slice(&vec3);
    println!("{:?}",vec1 );
    assert_eq!(vec1,[10, 20, 30, 2, 3, 4, 5]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut vec = vec![0, 1, 2, 3, 4];
    vec.extend_from_within(2..);
    assert_eq!(vec, [0, 1, 2, 3, 4, 2, 3, 4]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut vec = vec![1, 2, 3];
    vec.insert(1, 4);
    assert_eq!(vec, [1, 4, 2, 3]);
    vec.insert(4, 5);
    assert_eq!(vec, [1, 4, 2, 3, 5])
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut vec = vec![1, 2, 3];
    let mut vec2 = vec![4, 5, 6];
    vec.append(&mut vec2);
    assert_eq!(vec, [1, 2, 3, 4, 5, 6]);
    assert_eq!(vec2, []);
}
</code></pre>
