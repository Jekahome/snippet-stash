

В редких случаях функции могут быть несовместимы друг с другом. 
Добавления ошибки компиляции для обнаружения этого сценария.
<pre><code class="language-rust no_run edition2021">
#[cfg(all(feature = "foo", feature = "bar"))]
compile_error!("feature \"foo\" and feature \"bar\" cannot be enabled at the same time");
</code></pre>
