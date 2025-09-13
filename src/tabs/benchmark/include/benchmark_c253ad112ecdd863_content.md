

crates **bencher**
 
File my_projects/benches/example.rs:
```
#[macro_use]
extern crate bencher;
extern crate criterion_example;
use my_project::add_two2; 
use bencher::Bencher;
fn a(bench: &mut Bencher) {
    bench.iter(|| {
        (0..1000).fold(0, |x, y| x + y)
    })
}
fn b(bench: &mut Bencher) {
    const N: usize = 1024;
    bench.iter(|| {
        vec![0u8; N]
    });
    bench.bytes = N as u64;
}
fn bench_add_two(b: &mut Bencher) {
    b.iter(|| add_two2(2));
}
benchmark_group!(benches, a, b, bench_add_two);
benchmark_main!(benches);

File my_projects/lib.rs:
pub fn add_two2(a: i32) -> i32 {
    a + 2
}
```


File my_projects/Cargo.toml:
```toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"
[dependencies]
bencher = "0.1"
[[bench]]
name = "example"
harness = false
```

Запуск:
```
$ cargo bench
```

Output:
```
running 3 tests
test a             ... bench:           0 ns/iter (+/- 0)
test b             ... bench:          94 ns/iter (+/- 191) = 10893 MB/s
test bench_add_two ... bench:           2 ns/iter (+/- 0)
```


