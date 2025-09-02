

<pre><code class="language-rust">
fn main(){
// Разделяет вектор на два по индексу
    let mut vec = vector![1, 2, 3, 7, 8, 9];
    let (mut left,right) = vec.split_at(3);// [1, 2, 3] [7, 8, 9]
    let vec = vector![4, 5, 6];
    left.append(vec);
    left.append(right);// [1, 2, 3, 4, 5, 6, 7, 8, 9]
    assert_eq!(vector![1, 2, 3, 4, 5, 6, 7, 8, 9], left);
}
</code></pre>
