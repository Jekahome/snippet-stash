

Попытка вызвать замыкание, типы которого выводятся с двумя разными типами
Компилятор дает нам эту ошибку `:mismatched types`
<pre><code class="language-rust">
fn main(){
 let example_closure = |x| x;
 let s = example_closure(String::from("hello"));
 let n = example_closure(5); // :mismatched types
}
</code></pre>
