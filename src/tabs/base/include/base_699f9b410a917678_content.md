

```toml
[dependencies]
somecrate = { version = "^0.3", features = ["featureA", "rand" ] }
```

Эта строка гарантирует, что somecrate будет построен как с включенной функцией FeatureA, так и с функцией rand. 
Однако это могут быть не единственные включенные функции; другие функции также могут быть включены из-за явления, известного как унификация функций. 

Это означает, что крейт будет построен с объединением всех функций, которые запрашиваются чем-либо в графе сборки. Другими словами, если какая-то другая зависимость в графе сборки также зависит от somecrate, но с включенной только функцией B, то крейт будет построен со всеми включенными функциями FeatureA, FeatureB и rand, чтобы удовлетворить всех.

То же самое относится и к функции по умолчанию: если ваш крейт устанавливает `default-features = false` для зависимости, но какое-то другое место в графе сборки оставляет функции по умолчанию включенными, то они будут включены.

Унификация features означает, что features должны только добавлять возможности но не отнимать; иметь взаимно совместимые функции — плохая идея, поскольку нет ничего, что могло бы помешать одновременному включению несовместимых функций разными пользователями.

Следует избегать ограничения общедоступных полей в структурах:
```rust
/// A structure whose contents are public, so external users can construct
/// instances of it.
#[derive(Debug)]
pub struct ExposedStruct {
    pub data: Vec<u8>,

    /// Additional data that is required only when the `schema` feature
    /// is enabled.
    #[cfg(feature = "schema")]
    pub schema: String,
}
fn main(){
    let s = somecrate::ExposedStruct {
       data: vec![0x82, 0x01, 0x01],

       // Only populate the field if we've requested
       // activation of `somecrate/schema`.
       #[cfg(feature = "use_schema")]
       schema: "[int int]",
    };
}
```


код не компилируется, если этот код не активируется, `some crate/schema` но активируется какая-то другая транзитивная зависимость. 
Суть проблемы в том, что только ящик, в котором есть `features = "schema"`, может проверить features; 
пользователь ящика не может определить, включен ли Cargo `some crate/schema` или нет.

Аналогичное соображение применимо к публичным Trait, предназначенным для использования за пределами контейнера, в котором они определены.
Следует избегать методов ограничения features для общедоступных Trait
```rust
/// Trait for items that support CBOR serialization.
pub trait AsCbor: Sized {
    /// Convert the item into CBOR-serialized data.
    fn serialize(&self) -> Result<Vec<u8>, Error>;

    /// Create an instance of the item from CBOR-serialized data.
    fn deserialize(data: &[u8]) -> Result<Self, Error>;

    /// Return the schema corresponding to this item.
    #[cfg(feature = "schema")]
    fn cddl(&self) -> String;
}
fn main(){}
```




