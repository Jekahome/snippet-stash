

Если вы имеете несколько ссылок, вы можете использовать одно и то же время жизни несколько раз:
* `x` и `y` имели одно время жизни
* возвращаемое значение живо на протяжении той же области видимости a
<pre><code class="language-rust">
fn x_or_y<'a>(x: &'a str, y: &'a str) -> &'a str {x }
</code></pre>
    
--- 

* `x` и `y` имели разные времена жизни
* возвращаемое значение живо на протяжении той же области видимости a что и x
<pre><code class="language-rust">
fn x_or_y2<'a, 'b>(x: &'a str, y: &'b str) -> &'a str {x}
</code></pre>
    

--- 
ссылка `'a` будет жить не менее чем ссылка 'b. Lifetime subtyping (под типирование)
<pre><code class="language-rust">
fn x_or_y3<'a:'b,'b>(x: &'a str, y: &'b str) -> &'a str {x}
</code></pre>
