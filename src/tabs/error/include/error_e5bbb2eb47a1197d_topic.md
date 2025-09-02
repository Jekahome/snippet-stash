

#### anyhow

crate [**anyhow**](https://crates.io/crates/anyhow)

Благодаря anyhow::Result нет нужды писать `std::result::Result<(), SumFileError>`, можно просто anyhow::Result<()>, для более чистого кода
Благодаря anyhow::Context появляется метод .context(msg) для вывода деталей ошибки

Используйте Anyhow, если вас не волнует, какой тип ошибки возвращают ваши функции (главное реализующих std::error::Error), вы просто хотите, чтобы это было легко.
