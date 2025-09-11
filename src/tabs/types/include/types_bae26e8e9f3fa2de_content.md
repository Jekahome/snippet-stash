


```rust
fn double<const N: i32>() {
    println!("doubled: {}", N * 2);
}

const SOME_CONST: i32 = 12;

fn example() {
    // Example usage of a const argument.
    double::<9>();
    double::<-123>();
    double::<{7 + 8}>();
    double::<SOME_CONST>();
    double::<{ SOME_CONST + 5 }>();
}
fn main(){}
```

---

Решение конфликта имен
```rust
type N = u32; // Псевдоним типа
struct Foo<const N: usize>;

// Следующее является ошибкой, так как `N` интерпретируется как псевдоним типа `N`
fn foo<const N: usize>() -> Foo<N> { todo!() } // ❌ ERROR

// Можно исправить, заключив его в фигурные скобки, чтобы он интерпретировался как константный параметр `N`:
fn bar<const N: usize>() -> Foo<{ N }> { todo!() } // ✅ ok
fn main(){}
```
