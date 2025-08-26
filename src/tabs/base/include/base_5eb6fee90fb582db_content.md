

Агрегаты из Copy объектов тоже Copy :
<pre><code class="language-rust">
#[derive(Clone, Copy)]
struct Point { x: f64, y: f64 }

(Point, Point)

[Point; 1024] // копировать можно, но не стоит

Box< T> и Vec< T> не Copy — должны освобождать память
</code></pre>
