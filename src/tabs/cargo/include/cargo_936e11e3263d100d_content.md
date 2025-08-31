


Линтер rustc, включенный по умолчанию, обнаруживает основные ошибки Rust, но вы можете использовать clippy, чтобы получить больше линтов. 
Чтобы включить интеграцию clippy в rust-analyzer, измените параметр `Rust-analyzer > Check: Command ( rust-analyzer.check.command)` на значение clippy по умолчанию check. 
Расширение rust-analyzer теперь будет запускаться cargo clippy при сохранении файла и отображать обрезанные предупреждения и ошибки непосредственно в редакторе и представлении «Проблемы»

Глобальный файл `~/.config/Code/User/settings.json`:
```json
{
    "rust-analyzer.check.command": "check",
}
```
