

**Подключение из модуля**

Загружены могут быть только макросы, объявленные с атрибутом `#[macro_export]`. 
или `use с 1.3v`
<pre><code class="language-rust">
#[macro_use(foo, bar)]
extern crate baz;
fn main(){}
</code></pre>


**Подключение внутри, и снаружи библиотеки**

чтобы определить один макрос, который будет работать и внутри, и снаружи библиотеки

<pre><code class="language-rust">
#[macro_export]
macro_rules! inc {
    ($x:expr) => ( $crate::increment($x) )
} 
fn main(){}
</code></pre>
