


<pre><code class="language-rust">
fn main(){
// chunks - Разделите итератор на куски фиксированного размера.
    let a = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let r: Vec<Vec<i32>> = a.into_par_iter().chunks(3).collect();
    assert_eq!(r, vec![vec![1,2,3], vec![4,5,6], vec![7,8,9], vec![10]]);
}
</code></pre>
