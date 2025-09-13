

```
  group.bench_with_input(
    BenchmarkId::new("std", count), 
    &count, 
    |b, count| {  
        let mut list: LinkedList<String> = LinkedList::new();
        for i in 1..=*count {
            list.push_back(format!("{}",i));      
        }

        b.iter_batched_ref(|| {
            list.clone() // тут каждую итерацию будут новые данные
        }, |mut list| {
            remove_std(&mut list,*count)
        }, BatchSize::LargeInput);
  }); 
```
