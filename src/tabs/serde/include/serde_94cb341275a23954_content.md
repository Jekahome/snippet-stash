


Примеры некоторых методов `deserialize_*`

**Примитивные типы:**
* deserialize_bool
* deserialize_i8, deserialize_i16, deserialize_i32, deserialize_i64, deserialize_i128
* deserialize_u8, deserialize_u16, deserialize_u32, deserialize_u64, deserialize_u128
* deserialize_f32, deserialize_f64
* deserialize_char, deserialize_str

**Сложные типы:**
* deserialize_bytes
* deserialize_option
* deserialize_seq
* deserialize_map
* deserialize_struct
* deserialize_enum

**Другие:**
* deserialize_unit (для типа ())
* deserialize_unit_struct
* deserialize_newtype_struct
* deserialize_tuple
* deserialize_any (для самоописательных форматов)
