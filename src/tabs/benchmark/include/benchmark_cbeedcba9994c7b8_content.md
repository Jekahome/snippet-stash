

File /bench/benches/my_benchmark.rs:
<pre><code class="language-rust">
use criterion::{black_box, criterion_group, criterion_main, Criterion,BenchmarkId, Throughput};
use bench::{fibonacci,fibonacci_2};
/*
fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 1,
        1 => 1,
        n => fibonacci(n-1) + fibonacci(n-2),
    }
}*/
/// cargo bench --verbose
/// cargo bench --verbose -- fib_20
///
// "fib_20" - любое уникальное имя теста
// Использование black_box функции не позволяет компилятору свернуть всю функцию константой и заменить ее константой.
fn criterion_benchmark(c: &mut Criterion) {
    // Простой тест
    //c.bench_function("fib_20", |b:&mut criterion::Bencher| b.iter(|| fibonacci(black_box(20))));
    //c.bench_function("fib_20", |b:&mut criterion::Bencher| b.iter(|| fibonacci_2(black_box(20))));

    // Передача данных для теста
    /*let size: u64 = 20;
    c.bench_with_input(BenchmarkId::new("fib_20", size), &size, |b, &s| {
        b.iter(|| fibonacci_2(s));
    });*/

    // Множество данных для теста
   /* let size: usize = 20;
    let mut group = c.benchmark_group("fib_20");
    for s in [size, 2 + size, 4 + size, 8 + size, 16 + size].iter() {
        group.throughput(Throughput::Bytes(*s as u64));
        group.bench_with_input(BenchmarkId::from_parameter(s), s, |b, &s| {
            b.iter(|| std::iter::repeat(0u8).take(s).collect::<Vec<_>>());
        });
    }
    group.finish();
    */

    // Сравнение функций
    // cargo bench --verbose -- Fibonacci
    let mut group = c.benchmark_group("Fibonacci");
    for i in [20u64, 21u64].iter() {
        group.bench_with_input(BenchmarkId::new("Recursive", i), i, |b, i| b.iter(|| fibonacci(*i)));
        group.bench_with_input(BenchmarkId::new("Iterative", i), i, |b, i| b.iter(|| fibonacci_2(*i)));
    }
    group.finish();
}
fn main(){
// Здесь мы вызываем макрос criterion_group! (link), чтобы сгенерировать группу тестов под названием
// benches, содержащую criterion_benchmark функцию, определенную ранее.
    criterion_group!(benches, criterion_benchmark);
// мы вызываем макрос criterion_main! (link), чтобы сгенерировать основную функцию, которая выполняет benches группу.
    criterion_main!(benches);
}
</code></pre>

**Для просмотра графика выполнения** - открыть `/target/criterion/fib_20/report/index.html`

**Вывод**
```
Время затраченное на каждую итерацию:
time:   [3.9235 ns 3.9376 ns 3.9516 ns]
Где нижный предел 3.9235 и самый долгий временной предел 3.9516, а 3.9376 среднее значение

Изменения относительно предыдущего теста: (т.е. какое влияние нестабильности производительности ОС)
change: [+0.7533% +6.3205% +15.259%] (p = 0.06 > 0.05)
                        "Никаких изменений в производительности не обнаружено." (т.е. хорошая стабильная работа при замере, маленькое отклонение)

Погрешность:
Найдено 14 "сильных провалов" среди 100 измерений(14.00%)
  2 (2.00%) high mild (выше среднего)
  12 (12.00%) high severe (высокая степень серьезности)
```


