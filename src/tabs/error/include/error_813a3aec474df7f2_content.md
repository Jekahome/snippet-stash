

Ошибки в многопоточном асинхронные контексты требуют дополнительных ограничений
`type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;`
