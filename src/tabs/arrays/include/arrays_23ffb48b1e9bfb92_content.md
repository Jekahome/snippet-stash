

Наличие поля длины также можно увидеть в следующем коде, в котором размер slice (`&[i32]`) составляет 16 байтов (8 для указателя буфера и 8 для поля длины)
<pre><code class="language-rust">
fn main(){
    use std::mem::size_of;
    println!("Size of a reference to an i32: {:}", size_of::<&i32>()); // 8
    println!("Size of a slice: {:}", size_of::<&[i32]>()); // 16 (8 для указателя буфера и 8 для поля длины)
}
</code></pre>
