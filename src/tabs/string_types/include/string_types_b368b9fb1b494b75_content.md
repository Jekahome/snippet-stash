


String выглядит так в исходниках Rust

8 byte - ptr адрес памяти первого байта в куче, на который он указывает, используя свои первые 8 байтов 
8 byte - len для хранения длины этой строки 
8 byte - емкость capacity

from_raw_parts() - unsafe Создает String из raw данных (указатель,длина,емкость).

into_raw_parts() -  Возвращает необработанный указатель на raw данные (указатель,длина,емкость)

<pre><code class="language-rust">
dbg!(std::mem::size_of::<String>());// 24 byte (8+8+8) (Data, length, capacity)

На самом деле String выглядит так в исходниках Rust.
pub struct String { 
    vec: Vec<u8>, 
}

Мы также можем собрать его вручную и разобрать на необработанные части. 
#![feature(vec_into_raw_parts)]
fn main() {
  unsafe {
      let bytes: &mut [u8] = &mut [0x62, 0x61, 0x6e, 0x61, 0x6e, 0x61];
      let string: String = String::from_raw_parts(bytes.as_mut_ptr(), 6, 6);
       // Data, length, capacity
      let (bytes, length, capacity) = string.into_raw_parts();
  }
}
</code></pre>
