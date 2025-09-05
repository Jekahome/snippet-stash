


<pre><code class="language-rust">
use serde::de::{self, Deserializer, Visitor, MapAccess};
use serde::Deserialize;
use std::fmt;

#[derive(Debug)]
enum Command {
    Start,
    Stop,
    Unknown,
}

// Реализуем Deserialize для перечисления
impl<'de> Deserialize<'de> for Command {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct CommandVisitor;

        impl<'de> Visitor<'de> for CommandVisitor {
            type Value = Command;

            fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
                formatter.write_str("a valid command string")
            }
            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: de::Error,
            {
                match value {
                    "Start" => Ok(Command::Start),
                    "Stop" => Ok(Command::Stop),
                    _ => Ok(Command::Unknown), // Обрабатываем неизвестные команды
                }
            }
        }
        deserializer.deserialize_str(CommandVisitor)
    }
}
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let json = r#""Start""#;
    let command: Command = serde_json::from_str(json)?;
    println!("{:?}", command);
    Ok(())
}
</code></pre>
