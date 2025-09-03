

File src/service/user/domain/event/mod.rs:
<pre><code class="language-rust">
#[cfg(test)]
mod event_message_spec {
     #[test]
    fn deserializes() {
        print!("test");
        assert!(true)
    }
}
</code></pre>

Запуск:
```
$  cargo test service::user::domain::event::event_message_spec::deserializes --  --nocapture
```




