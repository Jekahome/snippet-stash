


<pre><code class="language-rust">
fn main(){
// Создание нового вектора с заменой значения по индексу
    let mut vec = vector![1, 2, 3];
    let new_vec:Vector<i32> = vec.update(1, 5);
    assert_eq!(vector![1, 5, 3], new_vec);
}
</code></pre>
