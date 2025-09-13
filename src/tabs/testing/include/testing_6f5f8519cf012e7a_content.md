

`is_test(true)` предотвращает конфликты инициализации в тестах.
```
#[test]
fn test_execute_command() {
    let _ = env_logger::builder().is_test(true).try_init();
    
    info!("Starting test_execute_command");
    let result = execute_command("echo test");
    assert!(result.is_ok(), "Command failed: {}", result.unwrap_err());
}
```
