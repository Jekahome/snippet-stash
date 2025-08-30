

Они внешне похожи, но type могут иметь дело только с параметрами типа.

`use` не могу этого сделать:
<pre><code class="language-rust no_run edition2021">
 pub type Strings = Vec<String>;
 pub type Map<I> where I: Iterator = HashMap<I::Item, String>;
</code></pre>
