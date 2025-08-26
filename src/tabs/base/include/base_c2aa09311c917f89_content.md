

Внешняя изменчивость:
<pre><code class="language-rust">

let x = Arc::new(5);
let y = x.clone();
Счетчик ссылок Arc изменился без использования mut и переменная `x` неизменчивая 
Внутренней изменчивости быть не может так как Arc создает `&T` 
</code></pre>

Внутренняя изменчивость:
<pre><code class="language-rust">
let x = RefCell::new(5);
let y = x.borrow_mut(); возвращает `&mut T`
Refcell выполняет проверку заимствования во время выполнения и если создать еще одну `&mut T` будет panic! 
</code></pre>
