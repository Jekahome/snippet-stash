


<pre><code class="language-rust">
 // выдает постоянный итератор чисел, берем n
 fn random(n: usize) -> Vec<u32> {
    let mut r = 92;
    std::iter::repeat_with(move || {
        r ^= r << 13;
        r ^= r >> 17;
        r ^= r << 5;
        r
    }).take(n).collect()
}

#[inline(never)]
fn run_benchmark<F: Fn() -> T, T>(name: &str, f: F) -> Vec<T> {
    println!("{}:", name);
    let n = 300;
    let mut res = Vec::with_capacity(n);
    let mut times = Vec::with_capacity(n);
    for _ in 0..n {
        let start = std::time::Instant::now();
        res.push(f());
        times.push(start.elapsed());
    }
    println!("{:?}", times.into_iter().min().unwrap());
    println!("\n");
    res
}

// Ф-ция для замера
// используем get_unchecked — unsafe функцию, не делающую проверку индексов
#[inline(never)]
unsafe fn i_sum_unchecked(xs: &[u32], indexes: &[usize]) -> u32
{
    let mut sum = 0u32;
    for &idx in indexes {
        let x = unsafe { *xs.get_unchecked(idx) };  
        sum = sum.wrapping_add(x);
    }
    sum
}
// Ф-ция для замера
// запрещаем inline , чтобы не соптимизировать в константу;
//  indexes — массив [0, 1, ... xs.len()] , но компилятор об
// этом не знает (из-за #[inline(never)] );
// используем wrapping_add чтобы избежать проверок на переполнение;
#[inline(never)]  
fn i_sum(xs: &[u32], indexes: &[usize]) -> u32
{
    let mut sum = 0u32;
    for &idx in indexes {
        let x = xs[idx];
        sum = sum.wrapping_add(x);  
    }
    sum
}

fn main() {
     let n: usize = 100_000_000;;
    let indexes: Vec<usize> = (0..n).collect();
    let xs: Vec<u32> = random(n);
    //println!("{:?}",xs);// [24873849, 1921449235, 163429281]
  
 
     let r1 = run_benchmark("i_sum", || {
        i_sum(&xs, &indexes)
     });
     
     let r2 = run_benchmark("i_sum_unchecked", || {
        unsafe {i_sum_unchecked(&xs, &indexes)}
     });
     assert_eq!(r1, r2);
}
</code></pre>
