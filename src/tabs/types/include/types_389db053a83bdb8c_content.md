

В этом примере мы создаем свою версию типа `Result`,
 который всегда будет использовать перечисление ConcreteError в `Result<T, E>` вместо типа `E`
<pre><code class="language-rust">
  use std::result;

  enum ConcreteError {
       Foo,
       Bar,
   }

  type Result<T> = result::Result<T, ConcreteError>;
</code></pre>
