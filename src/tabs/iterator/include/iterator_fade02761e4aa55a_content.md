


<pre><code class="language-rust">
fn main(){
    // reduce
    let sums:(i32,i32) = [(0, 1), (5, 6), (16, 2), (8, 9)]
        .par_iter()        // iterating over &(i32, i32)
        .cloned()          // iterating over (i32, i32)
        .reduce(|| (0, 0), // the "identity" is 0 in both columns
                |a:(i32,i32), b:(i32,i32)| (a.0 + b.0, a.1 + b.1));
    assert_eq!(sums, (0 + 5 + 16 + 8, 1 + 6 + 2 + 9));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
   // reduce_with
    let sums = [(0, 1), (5, 6), (16, 2), (8, 9)]
        .par_iter()        // iterating over &(i32, i32)
        .cloned()          // iterating over (i32, i32)
        .reduce_with(|a, b| (a.0 + b.0, a.1 + b.1))
        .unwrap();
    assert_eq!(sums, (0 + 5 + 16 + 8, 1 + 6 + 2 + 9));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// try_reduce_with
    let files = ["/dev/null", "/does/not/exist"];
    files.into_par_iter()
        .map(|path| std::fs::metadata(path).map(|m| (path, m.len())))
        .try_reduce_with(|a, b| {
            Ok(if a.1 >= b.1 { a } else { b })
        })
        .expect("Some value, since the iterator is not empty")
        .expect_err("not found");
}
</code></pre>
