

Quick Sort в двух вариантах: с рекурсией и с явным стеком (итеративно). Пример с рекурсией как раз хорошо показывает, где она удобна: процессор автоматически использует стек вызовов, и нам не нужно вручную хранить «границы подмассивов».

Рекурсивная реализация Quick Sort

```rust
fn quick_sort_recursive(arr: &mut [i32]) {
    if arr.len() <= 1 {
        return;
    }

    let pivot_index = partition(arr);
    let (left, right) = arr.split_at_mut(pivot_index);
    quick_sort_recursive(left);
    quick_sort_recursive(&mut right[1..]); // исключаем pivot
}

fn partition(arr: &mut [i32]) -> usize {
    let pivot = arr[arr.len() - 1];
    let mut i = 0;
    for j in 0..arr.len() - 1 {
        if arr[j] <= pivot {
            arr.swap(i, j);
            i += 1;
        }
    }
    arr.swap(i, arr.len() - 1);
    i
}

fn main() {
    let mut data = [33, 2, 52, 106, 73, 10];
    quick_sort_recursive(&mut data);
    println!("{:?}", data);
}
```

---

**Итеративная реализация с явным стеком**

(Но стек находится в памяти, не в call stack, что позволяет контролировать глубину и избегать переполнения стека.)
```rust
fn quick_sort_iterative(arr: &mut [i32]) {
    let mut stack = Vec::new();
    stack.push((0, arr.len() - 1));

    while let Some((low, high)) = stack.pop() {
        if low >= high {
            continue;
        }

        let pivot_index = partition_indices(arr, low, high);

        if pivot_index > 0 {
            stack.push((low, pivot_index - 1));
        }
        stack.push((pivot_index + 1, high));
    }
}

fn partition_indices(arr: &mut [i32], low: usize, high: usize) -> usize {
    let pivot = arr[high];
    let mut i = low;
    for j in low..high {
        if arr[j] <= pivot {
            arr.swap(i, j);
            i += 1;
        }
    }
    arr.swap(i, high);
    i
}

fn main() {
    let mut data = [33, 2, 52, 106, 73, 10];
    quick_sort_iterative(&mut data);
    println!("{:?}", data);
}
```



