


* Побитовые операции:

<pre><code class="language-rust">
fn main(){
  let b: u8 = 0b1010_1100;
  let mask = 0b0000_1111;
  let lower_nibble = b & mask; // 0b00001100
// ------------------------------------
    let a = 80;
    let b = 2;
// деление >>
    assert_eq!(80/(2*2) , a >> b);//20
    
// умножение <<
    assert_eq!(80*(2*2) , a << b);//320
    
// сумма |
    assert_eq!(80+2 , a | b);
    assert_eq!(80+2 , a ^ b);
}
</code></pre>

* Сдвиги:

<pre><code class="language-rust">
fn main(){

// &  (Побитовое И (AND))
    println!("0011 И 0101 будет {:04b}", 0b0011u32 & 0b0101);

//   |  (Побитовое ИЛИ (OR))
    println!("0011 ИЛИ 0101 будет {:04b}", 0b0011u32 | 0b0101);

//  ^  (Исключающее ИЛИ (XOR))
    println!("0011 исключающее ИЛИ 0101 будет {:04b}", 0b0011u32 ^ 0b0101);

//  << (Побитовый сдвиг влево)
    println!("1 << 5 будет {}", 1u32 << 5);
    let x: u8 = 1 << 3; // 0b00001000

//  >> (Побитовый сдвиг вправо)
    println!("0x80 >> 2 будет 0x{:x}", 0x80u32 >> 2);
}
</code></pre>

* Конкатенация:

<pre><code class="language-rust">
fn main(){
  let mut data = vec![1, 2, 3];
  data.extend_from_slice(&[4, 5]);
}
</code></pre>
