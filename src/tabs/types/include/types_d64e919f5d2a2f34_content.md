


<pre><code class="language-rust">
// Кортежи могут быть использованы как аргументы функции и как возвращаемые значения
fn reverse(pair: (i32, bool)) -> (bool, i32) {
    let (integer, boolean) = pair; // деструкция
    (boolean, integer)
}

#[derive(Debug)]
struct Matrix(f32, f32, f32, f32);

fn main() {
    // Кортеж с множеством различных типов данных
    let long_tuple = (1u8, 2u16, 3u32, 4u64,
                      -1i8, -2i16, -3i32, -4i64,
                      0.1f32, 0.2f64,
                      'a', true);

    // К значениям переменных внутри кортежа можно обратиться по индексу
     let pair: (f32, i32) = (0.0, 92);
     let (x, y) = pair;
     let x = pair.0;
     let y = pair.1;

    // Кортежи могут содержать в себе кортежи
    let tuple_of_tuples = ((1u8, 2u16, 2u32), (4u64, -1i8), -2i16);
}
</code></pre>
