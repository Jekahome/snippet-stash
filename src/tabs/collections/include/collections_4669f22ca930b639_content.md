


<pre><code class="language-rust">
fn main(){
// Обновляет значение по индексу
    let mut vec = vector![1, 2, 3, 4, 5];
    vec.set(1,20);
    assert_eq!(&20,vec.get(1).unwrap());
}
</code></pre>
