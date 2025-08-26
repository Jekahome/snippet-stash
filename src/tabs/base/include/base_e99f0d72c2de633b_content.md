


<pre><code class="language-rust">
//#[derive(Clone, Copy)] // Wrapper< Vec< i32>> не будет : Copy , хотя * const Vec< i32>: Copy // Должны сами реализовать
struct Wrapper< T> {
  ptr: *const T,
}
impl< T> Copy for Wrapper< T> {}

impl< T> Clone for Wrapper< T> {
 fn clone(&self) -> Wrapper< T> {
    *self // делегируем к `Copy`
 }
}
</code></pre>
