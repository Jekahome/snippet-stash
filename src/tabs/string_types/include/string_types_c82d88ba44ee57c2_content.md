


<pre><code class="language-rust">
fn main(){
    let s = String::with_capacity(10);
    assert!(s.capacity() >= 10);
    
// Емкость может быть увеличина на N байт
    let mut s = String::new();
    s.reserve(5);
    println!("capacity={}",s.capacity());// 5

    let mut s = String::new();
    s.reserve_exact(6);
    s.push_str("1234567");
    println!("capacity={}",s.capacity());// 12

    let mut s = String::from("foo");
    s.reserve(100);
    println!("capacity={}",s.capacity());// 103
    s.shrink_to_fit();
    println!("capacity={}",s.capacity());// 3
}
</code></pre>
