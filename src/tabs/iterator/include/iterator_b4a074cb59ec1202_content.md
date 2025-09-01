

IntoIterator поставляется с методом `into_iter()`, который возвращает итератор по своему значению

Любой реализующий тип **IntoIterator** также называется **Iterable** 
<pre><code class="language-rust">
fn main(){
    // Vec реализует IntoIterator:
    let values = vec![1,2,3];
    let mut iter = IntoIterator::into_iter(values);// либо values.into_iter();
    let _:i32 = iter.next().unwrap();
}
</code></pre>
