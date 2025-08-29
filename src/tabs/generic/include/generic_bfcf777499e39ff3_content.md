


<pre><code class="language-rust">
вы должны попытаться максимально поднять границы признаков (особенно в коде библиотеки), поскольку это расширяет возможности использования типа.
❌ Плохо 

#[derive(Clone)]
struct Loader<K, V> {
    state: Arc<Mutex<State<K, V>>>,
}
struct My;

fn main(){
 let loader: Loader<My, My> = ..;
 let copy = loader.clone(); // compile error as `My` doesn't impl `Clone`
}
</code></pre>

Это происходит из-за того, что #[derive(Clone)] применяются к `K: Clone` и `V: Clone` в производном коде, несмотря на то, что они вообще не нужны

✅ Хорошо  

Предоставляя ручную реализацию, мы можем `Loader<My, My>` без проблем клонировать значения типа:
<pre><code class="language-rust">
struct Loader<K, V> {
    state: Arc<Mutex<State<K, V>>>,
}
// Ручная реализация используется для исключения применения ненужных границ клонирования.
impl<K, V> Clone for Loader<K, V> {
    fn clone(&self) -> Self {
        Self {
            state: self.state.clone(),
        }
    }
}
fn main(){
 let loader: Loader<My, My> = ..;
 let copy = loader.clone(); // it compiles now!
}
</code></pre>

