


<pre><code class="language-rust">
fn main(){
    let s = String::from("foo");
    assert_eq!("foo", s.as_str());
    let mut s = String::from("foobar");
    let s_mut_str:&mut str = s.as_mut_str();
    s_mut_str.make_ascii_uppercase();
    assert_eq!("FOOBAR", s_mut_str);
}
</code></pre>
