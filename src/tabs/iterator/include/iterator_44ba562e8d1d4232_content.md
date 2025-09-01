


<pre><code class="language-rust">
fn find_max<I>(iter: I) -> Option<I::Item>
  where I: Iterator,
             I::Item: Ord { 
    iter.reduce(|a, b| {
        if a >= b { a } else { b }
    })
}
fn main(){
    let a = [10, 20, 5, -23, 0];
    let b: [u32; 0] = [];
    assert_eq!(find_max(a.iter()), Some(&20));
    assert_eq!(find_max(b.iter()), None);
}
</code></pre>
