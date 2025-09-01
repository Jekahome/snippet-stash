


<pre><code class="language-rust">
fn main(){
 let upper = 1000;
    fn is_odd(n: u32) -> bool {
       n % 2 == 1
    }
    // Функциональный подход
    let sum_of_squared_odd_numbers: u32 =
        (0..).map(|n| n * n)             // Все натуральные числа в квадрате
             .take_while(|&n| n < upper) // Ниже верхнего предела
             .filter(|n| is_odd(*n))     // Это нечётные
             .fold(0, |sum, i| sum + i); // Суммируем
    println!("functional style: {}", sum_of_squared_odd_numbers);
}
</code></pre>
