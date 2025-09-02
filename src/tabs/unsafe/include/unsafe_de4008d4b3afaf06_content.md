


<pre><code class="language-rust">
#![allow(dead_code)]
use std::mem;
use std::ptr::NonNull;

struct Foo {
    a: *mut u64,
    b: *mut u64,
}
struct FooUsingNonNull {
    a: *mut u64,
    b: NonNull<*mut u64>,
}
fn main() {
    println!("NonNull<T> allows `Option<T>`'s discriminant to be collapsed into the pointer:");
    println!("*mut u64: {} bytes", mem::size_of::<*mut u64>());
    println!("Option<*mut u64>: {} bytes", mem::size_of::<Option<*mut u64>>());
    println!("Option<NonNull<*mut u64>>: {} bytes", mem::size_of::<Option<NonNull<*mut u64>>>());
    
    println!("\nIt even works transitively:");
    println!("Option<Foo>: {} bytes", mem::size_of::<Option<Foo>>());
    println!("Option<FooUsingNonNull>: {} bytes", mem::size_of::<Option<FooUsingNonNull>>());
}
</code></pre>
