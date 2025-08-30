

Временная сложность алгоритма - логарифмическая O(log N)

каждая итерация сокращает вдвое количество элементов/значение

Перевод числа в двоичное представление
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
 println!("{:?}",algo_2(254)); // Some("11111110")
}
</code></pre>
