


<pre><code class="language-rust">
extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}

// Вызов функций ржавчины с других языков
// Мы также можем использовать externдля создания интерфейса, который позволяет другим языкам вызывать функции Rust
//В следующем примере мы делаем call_from_cфункцию доступной из C-кода, после того как она скомпилирована в общую библиотеку и связана с C:

#[no_mangle]
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
</code></pre>
