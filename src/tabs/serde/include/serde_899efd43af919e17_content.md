

Если отобразить OsStringв модель данных Serde как строка Serde. К сожалению, сериализация будет ненадёжной, поскольку OsStringне гарантируется её представление в UTF-8, а десериализация будет ненадёжной, поскольку строкам Serde разрешено содержать 0 байтов.

Если отобразить OsString в модель данных Serde как массив байтов Serde. Это устраняет обе проблемы с использованием строки, но теперь, если мы сериализуем ее OsStringв Unix и десериализуем ее в Windows, мы получим неправильную строку из-за разногласия старших байт и сколько байт на символ взять для преобразования в символ

Вместо этого Serialize и Deserialize impls for OsString отображаются в модели данных Serde, обрабатывая их как перечисление OsString Serde:
  - Unix: OsString сериализуется как `Vec<u8>`, так как строки в Unix могут быть произвольными байтами, кроме нулевых.
  - Windows: OsString сериализуется как `Vec<u16>`, поскольку строки в Windows — это последовательности 16-битных значений.
  - Другие платформы: Если платформа имеет другое представление строк, оно будет закодировано подобным образом.

<pre><code class="language-rust">
use serde::{Deserialize, Serialize};
use std::ffi::OsString;

#[derive(Serialize, Deserialize, Debug)]
struct MyStruct {
    value: OsString,
}
fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Создаем `OsString`
    let os_string = OsString::from("Привет, мир!");

    let my_struct = MyStruct { value: os_string };

    // Сериализация
    let serialized = serde_json::to_string(&my_struct)?;
    println!("Сериализовано: {}", serialized);

    // Десериализация
    let deserialized: MyStruct = serde_json::from_str(&serialized)?;
    println!("Десериализовано: {:?}", deserialized);
    Ok(())
}
</code></pre>
