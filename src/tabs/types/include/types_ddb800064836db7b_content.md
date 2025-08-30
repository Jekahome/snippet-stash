


<pre><code class="language-rust">
// enum с неопределённым перечислением (начинается с 0)
enum Number {
    Zero=3,
    One,
    Two,
}

// enum с определённым перечислением
enum Color {
    Red = 0xff0000,
    Green = 0x00ff00,
    Blue = 0x0000ff,
}

fn main() {
    // `enums` может быть преобразован в целочисленное значение.
    assert_eq!(3,Number::Zero as i32);
    assert_eq!(4,Number::One as i32);
   
    println!("красный цвет #{:06x}", Color::Red as i32);
    println!("голубой цвет #{:06x}", Color::Blue as i32);
}
</code></pre>
