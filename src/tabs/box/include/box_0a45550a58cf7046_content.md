

Вызов boxed_origin() возвращает `Box<Point>` (указатель на объект Point в куче).

Затем этот `Box<Point>` снова упаковывается в ещё один Box, размещённый в куче.

Таким образом, box_in_a_box — это указатель на указатель.
<pre><code class="language-rust">
fn origin() -> Point {
    Point { x: 0.0, y: 0.0 }
}

let boxed_point: Box<Point> = Box::new(origin());
fn boxed_origin() -> Box<Point> {
    // Разместить эту точку в куче и вернуть указатель на неё
    Box::new(Point { x: 0.0, y: 0.0 })
}
fn main(){
// Два уровня косвенной адресации
    let box_in_a_box: Box<Box<Point>> = Box::new(boxed_origin());

    println!("Boxed box занимает {} байт в стеке", mem::size_of_val(&box_in_a_box));// 8 (размер одного указателя на 64-битной системе)

 // Копировать данные, что находятся в `boxed_point`, в `unboxed_point`
    let unboxed_point: Point = *boxed_point; // копирует данные из кучи на стек
    println!("Unboxed point занимает {} байт в стеке", mem::size_of_val(&unboxed_point));// 16 (по 8 байт на каждое поле x и y типа f64)
}
</code></pre>
