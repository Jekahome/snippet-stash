

* Сериализуйте и десериализуйте это поле, используя заданное
   * `#[serde(rename = "name")]`
   * `#[serde(rename(serialize = "ser_name", deserialize = "de_name"))]`

* Десериализуйте это поле по заданному имени или по имени текущему имени поля

   `#[serde(alias = "name")]`

* Если значение отсутствует при десериализации подставится Default
   * `#[serde(default)]`
   * `#[serde(default = "path")]`

* Для разложения общих ключей в общую структуру

   `#[serde(flatten)]`

* Пропустите это поле: не сериализуйте и не десериализуйте его. При десериализации Serde будет использовать Default::default()
   * `#[serde(skip)]`
   * `#[serde(skip_serializing)]`
   * `#[serde(skip_deserializing)]`

* Пропустите сериализацию этого поля если условие не выполняется

   `#[serde(skip_serializing_if = "path")]`

* Сериализуйте/Десериализуйте это поле, используя свои функции
   * `#[serde(serialize_with = "path")]`
   * `#[serde(deserialize_with = "path")]`
   * `#[serde(with = "module")]`

* Заимствуйте данные
   * `#[serde(borrow)]`
   * `#[serde(borrow = "'a + 'b + ...")]`

* Предложение Where для реализаций Serialize и Deserialize. Это заменяет любые границы, выведенные Serde
   * `#[serde(bound(serialize = "T: MySerTrait"))]`
   * `#[serde(bound(deserialize = "T: MyDeTrait"))]`
   * `#[serde(bound(serialize = "T: MySerTrait", deserialize = "T: MyDeTrait"))]`

* Это используется при получении Serialize для remote type, который имеет одно или несколько частных полей

   `#[serde(getter = "...")]`
