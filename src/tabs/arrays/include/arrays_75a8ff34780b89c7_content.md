


<pre><code class="language-rust">
fn main(){
    let s = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

    assert_eq!(s.binary_search(&13),  Ok(9));
    assert_eq!(s.binary_search(&4),   Err(7));
    assert_eq!(s.binary_search(&100), Err(13));
    let r = s.binary_search(&1);
    assert!(match r { Ok(1...4) => true, _ => false, });
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let s = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

    let seek = 13;
    assert_eq!(s.binary_search_by(|probe| probe.cmp(&seek)), Ok(9));
    let seek = 4;
    assert_eq!(s.binary_search_by(|probe| probe.cmp(&seek)), Err(7));
    let seek = 100;
    assert_eq!(s.binary_search_by(|probe| probe.cmp(&seek)), Err(13));
    let seek = 1;
    let r = s.binary_search_by(|probe| probe.cmp(&seek));
    assert!(match r { Ok(1...4) => true, _ => false, });
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let s = [(0, 0), (2, 1), (4, 1), (5, 1), (3, 1),
             (1, 2), (2, 3), (4, 5), (5, 8), (3, 13),
             (1, 21), (2, 34), (4, 55)];

    assert_eq!(s.binary_search_by_key(&13, |&(a,b)| b),  Ok(9));
    assert_eq!(s.binary_search_by_key(&4, |&(a,b)| b),   Err(7));
    assert_eq!(s.binary_search_by_key(&100, |&(a,b)| b), Err(13));
    let r = s.binary_search_by_key(&1, |&(a,b)| b);
    assert!(match r { Ok(1...4) => true, _ => false, });// может соответствовать любой позиции в [1, 4]
}
</code></pre>


<pre><code class="language-rust">
fn main(){
    let mut v:Vec<(i32,String)> = vec![(3,String::from("3")),(4,String::from("4"))];
    v.sort_unstable()
    if let Ok(index) = v.binary_search_by_key(&4, |&(a,_)| a){
        v.remove(index);
    }
    println!("{:?}",v );// [(3, "3")]
}
</code></pre>
