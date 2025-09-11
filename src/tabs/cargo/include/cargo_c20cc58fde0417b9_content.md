


Атрибуты объявлений должны быть отсортированы в алфавитном порядке. Элементы внутри атрибута также должны быть отсортированы в алфавитном порядке (так же, как они сортируются с помощью оператора Rustfmt Inside use).

✅ Правильный пример
```
#[allow(clippy::mut_mut)]
#[derive(smart_default::SmartDefault, Debug, Deserialize, Serialize)]
#[serde(deny_unknown_fields)]
struct User {
    #[serde(default)]
    id: u64,
}
```>


❌ Неправильные примеры
```
#[serde(deny_unknown_fields)]
#[derive(smart_default::SmartDefault, Debug, Deserialize, Serialize)]
#[allow(clippy::mut_mut)]
struct User {
    id: u64,
}
```

