


```
/// cargo +nightly bench --verbose -- LinkedList_remove
fn benchmark_remove(c: &mut Criterion) {
    let mut group = c.benchmark_group("LinkedList_remove");
    group.sample_size(30);// min 10 => 40 итераций лямбды, при 20 => 50 итераций лямбды
    //Argument to Bencher::iter_batched and Bencher::iter_batched_ref  Количество итераций b.iter может быть 1млрд при BatchSize::SmallInput = 2150 при BatchSize::LargeInput = 3450
    
    for count in [1_000_i32,5_000,10_000].iter() {
        group.bench_with_input(
            BenchmarkId::new("default_ownership", count), 
            count, 
            |b, count| { 
                b.iter_custom(|iters| { // Запускается один раз
                    // load
                    let mut list = LinkedList::new();
                    for i in 0..*count {
                        list.push_back(NodeLinkedList::new(format!("{}",i),None));        
                    }
                    
                    let mut index = *count - 1;
                    // time
                    let start = std::time::Instant::now();
                    for _i in 0..*count-1 { // вместо count используется iters он обычно 2млн итераций делает
                        index-=1;
                        black_box(remove_default_ownership(&mut list,index));
                    }
                    start.elapsed()
                });
            }
        );
}
    group.finish();
}
```

 
**Выполнение**

Генерируем группу тестов my_benches_push_back

`criterion_group!(my_benches_remove, benchmark_remove);`

Создание функции выполнения для my_benches_push_back

`criterion_main!(my_benches_remove);`

Посмотреть график выполнения - Открыть `/target/criterion/<NAME YOUR BENCH TEST>/report/index.html`

[plots_and_graphs](https://bheisler.github.io/criterion.rs/book/user_guide/plots_and_graphs.html)


