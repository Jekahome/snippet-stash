

Вы можете использовать макросы для захвата stdout и проверки его содержимого. Популярный вариант - использовать макросы assert_*! из библиотеки **assert_cmd**.
```
use assert_cmd::Command;

#[test]
fn test_stdout() {
    let mut cmd = Command::cargo_bin("your_binary").unwrap();
    cmd.assert().success().stdout("Expected output\n");
}
```
