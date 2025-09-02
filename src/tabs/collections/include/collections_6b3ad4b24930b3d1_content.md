


<pre><code class="language-rust">
fn main(){
// Новый вектор с пропуском count элементов
    let mut vec:Vector<i32> = vector![1, 2, 3, 7, 8, 9].skip(3);
    assert_eq!(vector![7, 8, 9], vec);
}
</code></pre>
