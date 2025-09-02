


<pre><code class="language-rust">
/*
fn offset(self: *const T, count: isize) -> *const T
                where T: Sized
{
                let bytes_per_element = std::mem::size_of::<T>() as isize;
                let byte_offset = count * bytes_per_element;
                (self as isize).checked_add(byte_offset).unwrap() as *const T
}
*/
fn main() {
    let array = [1, 2, 3, 4, 5];
    let ptr = array.as_ptr(); // Получаем указатель на первый элемент
    
    unsafe {
        // Вызываем функцию offset
        let third_element_ptr = ptr.offset(2); // Указатель на третий элемент (индекс 2)
    
    
        let value = *third_element_ptr;
        println!("Третий элемент: {}", value); // Выведет: 3
    }
}
</code></pre>

---

 
<pre><code class="language-rust">
#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let points = [
        Point { x: 1, y: 2 },
        Point { x: 3, y: 4 },
        Point { x: 5, y: 6 },
    ];
    
    let ptr = points.as_ptr();
    unsafe {
        // Получаем указатель на второй элемент
        let second_point_ptr =  ptr.offset(1); 

        println!("Второй элемент: {:?}", *second_point_ptr); // Выведет: Point { x: 3, y: 4 }
   
        // Можно использовать отрицательные значения
        let first_again_ptr = second_point_ptr.offset(-1);
    
        println!("Снова первый: {:?}", *first_again_ptr); // Выведет: Point { x: 1, y: 2 }
    }
}
</code></pre>
