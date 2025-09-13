

File src/service/user/domain/event/mod.rs:
```
#[cfg(test)]
mod event_message_spec {
     #[test]
    fn deserializes() {
        print!("test");
        assert!(true)
    }
}
```

Запуск:
```
$  cargo test service::user::domain::event::event_message_spec::deserializes --  --nocapture
```




