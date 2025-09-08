

```
├── Cargo.lock
├── Cargo.toml
├── src
│   ├── client
│   │   ├── client.rs
│   │   └── example_client.rs
│   ├── client.rs
│   └── main.rs
```
 
<pre><code class="language-rust">
// File main.rs:
pub mod client;
 
fn main() {
    client::client::use_me();
    client::example_client::use_me_example();
}

// File client.rs:
pub mod client;
pub mod example_client;

// File client/example_client.rs:
pub fn use_me_example(){
    println!("use_me_example");
}

// File client/client.rs:
pub fn use_me(){
    println!("use_me");
}
</code></pre>

---

**Или так через явный путь**

```
├── Cargo.lock
├── Cargo.toml
├── src
│   ├── client
│   │   ├── client.rs
│   │   └── example_client.rs
│   └── main.rs
```

 
<pre><code class="language-rust">
#[path = "client/client.rs"]
pub mod client;
#[path = "client/example_client.rs"]
pub mod example_client;

fn main() {
    client::use_me();
    example_client::use_me_example();
}

</code></pre>
