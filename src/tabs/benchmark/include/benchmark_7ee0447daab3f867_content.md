


<pre><code class="language-rust">
/// Сравнительный анализ с диапазоном значений
/// cargo bench --verbose -- lots_of_data_benchmark_3
fn my_benchmark_3(c: &mut Criterion) {
    let size: usize = 20;
    let mut group = c.benchmark_group("lots_of_data_benchmark_3");
    for s in [size, 2 + size, 4 + size, 8 + size, 16 + size].iter() {//20 22 24 28 32
        group.throughput(Throughput::Bytes(*s as u64));//  сообщает что тест работает с size байтами за итерацию, будет использовать это для оценки количества байтов в секунду
        group.bench_with_input(
            BenchmarkId::from_parameter(s), 
            s, 
            |b, &s|{b.iter(|| std::iter::repeat(0u8).take(s).collect::<Vec<_>>());}
        );
    }
    group.finish();
}
</code></pre>
