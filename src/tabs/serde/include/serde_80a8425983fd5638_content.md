

Обычные структуры и структуры кортежа следуют трех этапному процессу **init, elements и end**
```
use serde::ser::{Serialize, Serializer, SerializeStruct};
//   1. serialize_struct
//   2. serialize_field
//   3. end
struct Color {
    r: u8,
    g: u8,
    b: u8,
}
impl Serialize for Color {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error> where S: Serializer {
        // 3 is the number of fields in the struct.
        let mut state = serializer.serialize_struct("Color", 3)?; // init
        state.serialize_field("r", &self.r)?; // elements
        state.serialize_field("g", &self.g)?;// elements
        state.serialize_field("b", &self.b)?;// elements
        state.end() // end
    }
}
```

---

```rust
use serde::ser::{SerializeTupleStruct};
//   1. serialize_tuple_struct
//   2. serialize_field
//   3. end
struct Point2D(f64, f64);
impl Serialize for Point2D {
    fn serialize<T>(&self, serializer: T) -> Result<T::Ok, S::Error> where T: Serializer {
        // 3 is the number of fields in the struct.
        let mut state = serializer.serialize_tuple_struct("Point2D", 2)?; // init
        state.serialize_field(&self.0)?;// elements
        state.serialize_field(&self.1)?;// elements
        state.end()// end
    }
}
fn main() -> serde_json::Result<()> { 
    let c = Color{r:8,g:9,b:10};
    let c_string = serde_json::to_string(&c).unwrap();// Serialize
    println!("serialized = {}", c_string);// {"r":8,"g":9,"b":10}

    let p = Point2D(8.0,9.1);
    let p_string = serde_json::to_string(&p).unwrap();// Serialize
    println!("serialized = {}", p_string);// [8.0,9.1]
}
```
