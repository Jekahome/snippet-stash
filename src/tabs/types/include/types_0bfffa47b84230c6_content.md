

<pre><code class="language-rust">
fn main(){
 let x: u16 = 1;
 let y: u32 = x; // error: mismatched types
 let y: u32 = x.into(); // Расширение без потери точности
 let z: u16 = y as u16; // Берём младшие биты
 let to_usize = 92u64 as usize;
 let from_usize = 92usize as u64;

// Приведение типов
// as — оператор явного приведения типов

 let y:u32 = 1u16.into(); // расширение без потери точности
 let z:u16 = y as u16; // берем младшие биты (явное приведение)

// Будьте осторожны с приведением больших типов к меньшим.
 assert_eq!(88_u8, 600_i32 as u8); // математически как 600 − 256 − 256 = 88
}
</code></pre>
