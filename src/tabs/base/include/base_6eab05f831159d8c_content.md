- Неизменяемое (по умолчанию) связывание (Оператор объявления ) имен , переменная с шаблоном

<pre><code class="language-rust">
let x = 9; 
let (x,y) = (9,5);
</code></pre>

 
- Изменяемое связывание модификатор `mut`

<pre><code class="language-rust">
 let (mut x,mut y) = (5, 6);
    x = 10;
    y = 11;
</code></pre>