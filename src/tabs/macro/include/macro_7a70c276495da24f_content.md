



Семейство макросов, возвращающих — `!`

**panic!("something went wrong")** — для сигнализации о багах

**unimplemented!() **— плейсхолдер для ещё не написанного кода
<pre><code class="language-rust">
if complex_condition {
  complex_logic
} else {
  unimplemented!()
}
</code></pre>

unreachable!() — маркер для "невозможных" условий. Сказать компилятору что этот блок не будет выполнятся к примеру в match по диапазону если знаем что не весь диапазон используется

