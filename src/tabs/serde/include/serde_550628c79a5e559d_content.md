

Сериализуйте и десериализуйте это поле, используя заданное

`#[serde(rename = "name")]`

`#[serde(rename(serialize = "ser_name", deserialize = "de_name"))]`

```
#[derive(Serialize,Deserialize)]
struct People{
    #[serde(rename = "something")]
    some_thing:i32
}
```
