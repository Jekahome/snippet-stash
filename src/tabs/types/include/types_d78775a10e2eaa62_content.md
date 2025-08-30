


<pre><code class="language-rust">
fn main(){
// Из двоичной системы в десятичную и форматируем в HEX
 print!("{:#X},", u32::from_str_radix("101", 2).unwrap());// 0x5

// из десятичной тип i16 в HEX
 print!("{:#X},", i16::from_str_radix("-609", 10).unwrap());// 0xFD9F
}
</code></pre>
