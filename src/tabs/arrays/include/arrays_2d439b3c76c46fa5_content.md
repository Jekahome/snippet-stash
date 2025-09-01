


<pre><code class="language-rust">
fn main(){
    let content:&str = "abcabcabc";
    let v: Vec<&str>   = content.split("").filter(|s|s.len()>0).collect();
    let chunks = v[..].chunks(3);
    for e in chunks{
      println!("{:?}",e);
    }
/*
    ["a", "b", "c"]
    ["a", "b", "c"]
    ["a", "b", "c"]
*/
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let slice = ['l', 'o', 'r', 'e', 'm'];
    let mut iter = slice.chunks(2);
    assert_eq!(iter.next().unwrap(), &['l', 'o']);
    assert_eq!(iter.next().unwrap(), &['r', 'e']);
    assert_eq!(iter.next().unwrap(), &['m']);
    assert!(iter.next().is_none());
}
</code></pre>
