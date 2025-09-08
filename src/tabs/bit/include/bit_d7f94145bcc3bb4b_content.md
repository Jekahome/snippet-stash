

Формат вывода двоичного представления:

* `{:04b}` с ведущими нулями, число из 4 цифр
* `{:#b}` вывод числа в двоичном представлении
```
<pre><code class="language-rust">
fn main(){
   let x = 42; // 42 is '101010' in binary
   println!("{:b}", x);// 101010
   println!("{:#b}", x);// 0b101010

// добавлением нулей слева для заполнения 8 позиций.
   println!("{:08b} {:08b}",1_u8,1_i8);// 00000001 00000001
   println!("{:016b} {:016b}",1_u16,1_i16);// 0000000000000001 0000000000000001
}
</code></pre>

**Перевод числа в двоичное представление**

Временная сложность алгоритма - логарифмическая O(log N), каждая итерация сокращает вдвое количество элементов/значение

<pre><code class="language-rust">
fn algo_2(mut decimal:u8) -> Option<String>{
    if decimal == 0 {return None;}
    let mut binary = String::from(""); 
    while decimal > 0 {
        binary = format!("{}{}",decimal%2,binary);
        decimal = decimal.div_floor(2);
    }
    Some(binary)
}
fn main(){
   println!("{:?}",algo_2(254_u8)); // Some("11111110")
}
</code></pre>
