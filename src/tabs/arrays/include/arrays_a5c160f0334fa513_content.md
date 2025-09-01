


<pre><code class="language-rust">
fn main(){
    #![feature(array_windows)]
 
    let points: Vec<i32> = vec![1,2,3,4,5,6,7];
    let mut differences = Vec::new();
    
    for [previous, current] in points.array_windows().copied() {
    #![feature(array_windows)]differences.push(current - previous);
    }
    println!("{:?}",differences);// [1, 1, 1, 1, 1, 1]
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let differences: Vec<_> = points
      .array_windows()
      .copied()
      .map(|[previous, current]| current - previous)
      .collect();
}
</code></pre>
