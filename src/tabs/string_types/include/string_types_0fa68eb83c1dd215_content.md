


<pre><code class="language-rust">
fn main(){
    let mut s = String::from("привет");
    // s.truncate(3);// panic! если разорвать символ u8
    s.truncate(2);
    s.shrink_to_fit();
    println!("{} capacity={}",s,s.capacity());

    let mut s = String::from("foo");
    s.clear();
    assert!(s.is_empty());
    assert_eq!(0, s.len());
    assert_eq!(3, s.capacity());  

   let mut s = String::from("f_o_ob_ar");
    s.retain(|c| c != '_');
    assert_eq!(s, "foobar");
}
</code></pre>
