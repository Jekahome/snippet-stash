


<pre><code class="language-rust">
fn main(){
   // Если очень хочется, панику можно перехватить:

    // 1. при присоединении потока:
    let handle = std::thread::spawn(|| panic!("boom"));
    match handle.join() {
        Ok(()) => println!("ok"),
        Err(_) => println!("panicked"),
    }

    // 2. где угодно:
    let result = std::panic::catch_unwind(|| panic!("boom"));
    match result {
        Ok(()) => println!("ok"),
        Err(_) => println!("panicked"),
    }
   // thread::panicking проверяет, есть ли паника (только в реализации Drop обьекта)
   // panic::resume_unwind переподнимает панику

}
// RUST_BACKTRACE=short cargo run --bin=test
</code></pre>
