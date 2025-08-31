


<pre><code class="language-rust">
use std::cell::Cell;
// Структуры не могут иметь изменяемые поля только вся структура либо изменяема либо нет
// для реализации изменяемости на уровне полей поможет Cell<T>

struct Point{
    x:i32,
    y:Cell<i32>
}
fn main(){
    let point:Point = Point{x:5,y:Cell::new(6)};
    point.y.set(7);

    let mut point_mut:Point_mut = Point_mut{x:5,y:6};
    point_mut.y = 7;
}

struct Point_mut{
    x:i32,
    y:i32
}
</code></pre>
