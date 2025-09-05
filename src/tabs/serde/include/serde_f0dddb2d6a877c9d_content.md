

* Сериализуйте и десериализуйте эту структуру или перечисление, используя заданное имя

   `#[serde(rename(serialize = "ser_name", deserialize = "de_name"))]`

* Переименуйте все поля в соответствии с заданным регистром.

   `#[serde(rename_all(serialize = "snake_case", deserialize = "UPPERCASE"))]`

* Для Serialize вывод имени структуры или enum

   `#[serde(tag = "type")]`

* Предложение Where для реализаций Serialize и Deserialize. Это заменяет любые границы, выведенные Serde
   * `#[serde(bound = "T: MyTrait")]`
   * `#[serde(bound(serialize = "T: MySerTrait", deserialize = "T: MyDeTrait"))]`

* При десериализации все недостающие поля должны быть заполнены из реализации структуры Default. Разрешено только в структурах.

   `#[serde(default)]`

* При десериализации все недостающие поля должны быть заполнены из заданной ф-ции. Разрешено только в структурах.

   `#[serde(default = "path")]`

* Атрибут, указывающий, что представление типа совпадает с его единственным полем

   `#[serde(transparent)]`

* Десериализуйте этот тип, десериализовав его в FromType, а затем преобразовав. Этот тип должен реализовывать `From<FromType>`, а FromType должен реализовывать десериализацию
   * `#[serde(from = "FromType")]`
   * `#[serde(try_from = "FromType")]`
   * `#[serde(into = "IntoType")]`

* Это используется для получения Serialize и Deserialize для remote types

   `#[serde(remote = "...")]`

* Используйте представление перечисления без тегов для этого перечисления

   `#[serde(untagged)]`
