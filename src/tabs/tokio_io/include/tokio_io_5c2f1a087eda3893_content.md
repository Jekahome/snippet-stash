


<pre><code class="language-rust">
#[tokio::main]
async fn main() {
    println!("hello");
}
</code></pre>

---

<pre><code class="language-rust">
fn main() {
    let mut rt = tokio::runtime::Runtime::new().unwrap(); // Многопоточный планировщик выбирается по умолчанию
    // let mut rt = tokio::runtime::Builder::new_current_thread().enable_all().build().unwrap(); // Однопоточный планировщик 
    rt.block_on(async {
        println!("hello");
    })
}
</code></pre>

---

<pre><code class="language-rust">
fn main() {
    let mut runtime = tokio::runtime::Builder::new_multi_thread()
        .worker_threads(4)
        .thread_name("my-custom-name")
        .thread_stack_size(3 * 1024 * 1024)
        .enable_all()
        .build()
        .unwrap();
    rt.block_on(async {
        println!("hello");
    })
}
</code></pre>
