


<pre><code class="language-rust">
pub fn factorial(n: u128) -> u128 {
    match n {
        0 => 1,
        n => n * factorial(n - 1),
    }
}
</code></pre>

При фиксированных входных данных и небольшом объеме тестируемого кода компилятор способен оптимизировать итерацию и напрямую выдавать результат, что приводит к нереалистично оптимистичному результату.

❌ Наивный тест для этого кода: 
```
#![feature(test)]
extern crate test;

#[bench]
fn bench_factorial(b: &mut test::Bencher) {
    b.iter(|| {
        let result = factorial(15);
        assert_eq!(result, 1_307_674_368_000);
    });
}
```

дает невероятно положительные результаты:
```
test bench_factorial             ... bench:           0 ns/iter (+/- 0)
```

✅ Переносим код бенчмарка, чтобы использовать эту подсказку:  
```
#[bench]
fn bench_factorial(b: &mut test::Bencher) {
    b.iter(|| {
        let result = factorial(std::hint::black_box(15));
        assert_eq!(result, 1_307_674_368_000);
    });
}
```

дает более реалистичные результаты:
```
test blackboxed::bench_factorial ... bench:          16 ns/iter (+/- 3)
```



