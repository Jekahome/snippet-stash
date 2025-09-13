

Rust поддерживает тесты производительности, которые могут проверить производительность вашего кода. 

С помощью тестовых тестов вы можете тестировать и измерять скорость кода, однако эталонные тесты по-прежнему нестабильны. 
Чтобы включить тесты в вашем грузовом проекте, вам нужна ночная ржавчина, поставьте тесты интеграции в папку benches/  в корне вашего проекта Cargo и запустите cargo bench
```rust
/// cargo bench --verbose
/// cargo bench --verbose -- fib_20
///
// "fib_20" - любое уникальное имя теста
// Использование std::hint::black_box() функции не позволяет компилятору свернуть всю функцию константой и заменить ее константой.
fn criterion_benchmark(c: &mut Criterion) {
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
```
