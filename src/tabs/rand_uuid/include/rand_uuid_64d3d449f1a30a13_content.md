

Создание UUID из массива байтов
<pre><code class="language-rust">
use uuid::Uuid;

fn main() {
    let bytes = [
        0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 
        0xa7, 0x16, 0x44, 0x66, 0x55, 0x44, 0x00, 0x00,
    ];
    let uuid = Uuid::from_bytes(bytes);

    println!("UUID from bytes: {}", uuid);
}
</code></pre>
