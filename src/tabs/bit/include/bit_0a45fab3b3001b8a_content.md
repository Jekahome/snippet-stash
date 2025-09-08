

crate **bytemuck** — это crate, который предоставляет безопасные и удобные средства для преобразования между Rust-типами и массивами байт (byte slices). Этот crate ориентирован на производительность и простоту.

<pre><code class="language-rust">
use bytemuck::{Pod, Zeroable};

#[repr(C)]
#[derive(Clone, Copy, Pod, Zeroable)]
struct MyStruct {
    a: u32,
    b: f32,
}
fn main() {
    let my_data = MyStruct { a: 42, b: 3.14 };

    // Преобразование структуры в байтовый массив
    let bytes: &[u8] = bytemuck::cast_slice(&[my_data]);
    println!("{:?}", bytes);

    // Обратное преобразование
    let restored: &[MyStruct] = bytemuck::cast_slice(bytes);
    println!("{:?}", restored[0]);
}
</code></pre>

---

crate **zerocopy** также предназначен для преобразования структур в массивы байт и обратно, но с акцентом на безопасное взаимодействие с буферами без копирования. Его основное отличие — более богатая функциональность и использование черт для безопасного чтения данных из байтового представления.

<pre><code class="language-rust">
use zerocopy::{AsBytes, FromBytes, Unaligned};

#[repr(C)]
#[derive(AsBytes, FromBytes, Unaligned)]
struct MyStruct {
    a: u32,
    b: f32,
}

fn main() {
    let my_data = MyStruct { a: 42, b: 3.14 };

    // Преобразование структуры в байтовый массив
    let bytes = my_data.as_bytes();
    println!("{:?}", bytes);

    // Обратное преобразование из массива байт
    let restored = MyStruct::read_from(bytes).unwrap();
    println!("a: {}, b: {}", restored.a, restored.b);
}
</code></pre>
