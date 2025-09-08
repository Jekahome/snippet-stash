

Используются методы из `std::convert` и `byteorder`:
 
<pre><code class="language-rust">
fn main(){
    let bytes: [u8; 4] = [0x78, 0x56, 0x34, 0x12];
    let num = u32::from_le_bytes(bytes); // little-endian -> 0x12345678
}
</code></pre>
