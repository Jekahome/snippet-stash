

Предложение Where для реализаций Serialize и Deserialize. Это заменяет любые границы, выведенные Serde

* `#[serde(bound = "T: MyTrait")]`

* `#[serde(bound(serialize = "T: MySerTrait", deserialize = "T: MyDeTrait"))]`

* `#[serde(bound(deserialize = "S: FromStr, S::Err: Display"))]`

* `#[serde(bound(deserialize = "Ptr<'a, T>: Deserialize<'de>"))]`



<pre><code class="language-rust">
#[derive(Debug, serde::Deserialize)]
pub struct Config {
    pub name: &'static str,
}

#[derive(Debug, serde::Deserialize)]
#[serde(bound(deserialize = "'de: 'static"))] // без указания времени жизни не скомпилируется
struct SourceConfig {
    config: Config,
    id: u32,
}
 
fn main() -> serde_json::Result<()> {
    let j = r#"
    {
        "id": 123,
        "config": {
            "name": "John Smith"
        }
    }
        "#;
        
let sc: SourceConfig = serde_json::from_str(&j).unwrap();
dbg!(sc);
}
</code></pre>
Однако вы, вероятно, не захотите десериализовать &'static str, так как для этого потребуется наличие &'static str для заимствования.
Это ограничивает вас либо строковыми литералами, либо вам потребуется утечка памяти для получения &'static str.
Вероятно, вам понадобится String или, если вы хотите поддерживать строковые литералы, `Cow<'a, str>`.

Другая проблема с &'a str заключается в том, что он не будет работать, если строка сериализована с помощью escape-последовательностей.
Например, строка JSON, содержащая разрыв строки, будет иметь \n, который необходимо заменить во время десериализации, что приведет к сбою, если вы используете &'a str.
