


<pre><code class="language-rust">
use serde::{Deserialize, Serialize};
use serde_json;
use serde::ser::{Serializer, SerializeStruct, SerializeTupleStruct};

#[derive(Serialize, Deserialize, Debug)]
struct Person {
    name: String,
    age: u8,
    phones: Vec<String>,
}

enum E {
    // Use three-step process:
    //   1. serialize_struct_variant
    //   2. serialize_field
    //   3. end
    Color { r: u8, g: u8, b: u8 },

    // Use three-step process:
    //   1. serialize_tuple_variant
    //   2. serialize_field
    //   3. end
    Point2D(f64, f64),

    // Use serialize_newtype_variant.
    Inches(u64),

    // Use serialize_unit_variant.
    Instance,
    
    //#[serde(other)] // Обрабатывает любые неизвестные варианты. (Если используется derive) 
    //Unknown,
}

impl Serialize for E {
    fn serialize<T>(&self, serializer: T) -> Result<T::Ok, T::Error> where T: Serializer {
        match self {
            E::Color{r,g,b} =>{
                let mut state = serializer.serialize_struct("Color", 3)?; // init
                state.serialize_field("r", &r)?; // elements
                state.serialize_field("g", &g)?;// elements
                state.serialize_field("b", &b)?;// elements
                state.end() // end
            }
            E::Point2D(l,r) =>{ 
                // 3 is the number of fields in the struct.
                let mut state = serializer.serialize_tuple_struct("Point2D", 2)?; // init
                state.serialize_field(&l)?;// elements
                state.serialize_field(&r)?;// elements
                state.end()// end                
            }
            E::Inches(v) =>{
                serializer.serialize_newtype_struct("Inches",&v)
                //serializer.serialize_u64(*v)
            }
            E::Instance =>{
                serializer.serialize_unit_variant("E", 3, "Instance")  // "\"Instance\""
                //serializer.serialize_unit_struct("Instance") // null
                //serializer.serialize_str("Instance")  // "Instance"
            }
            //E::Unknown => serializer.serialize_unit_variant("E", 4, "Unknown")
            _ => serializer.serialize_unit_variant("E", 4, "Unknown")
        }
    }
}
fn main() {
    let object = E::Color{r:1u8,g:2u8,b:3u8};
    let enum_str:String = serde_json::to_string(&object).unwrap();// Serialize
    assert_eq!("{\"r\":1,\"g\":2,\"b\":3}", enum_str);
    /*
    Если вы хотите сериализовать данные в формате, где ключи не заключаются в кавычки, то JSON не подходит. Вы можете:
    1.Использовать другой формат, например, YAML или XML, которые позволяют более гибкое представление структуры.
    2.Настроить собственную сериализацию для вашего объекта и вручную формировать строку, исключая кавычки вокруг ключей.
    impl E {
        fn to_custom_format(&self) -> String {
            match self {
                E::Color { r, g, b } => { format!("Color: {{r: {}, g: {}, b: {}}}", r, g, b) }
                ...
    }}}
    let enum_str = object.to_custom_format();
    */
    let object = E::Point2D(1f64,2f64);
    let enum_str:String = serde_json::to_string(&object).unwrap();// Serialize
    assert_eq!("[1.0,2.0]", enum_str);
    
    let object = E::Inches(8u64);
    let enum_str:String = serde_json::to_string(&object).unwrap();// Serialize
    assert_eq!("8", enum_str);
    
    let object = E::Instance;
    let enum_str:String = serde_json::to_string(&object).unwrap();// Serialize
    assert_eq!("\"Instance\"", enum_str);
}
</code></pre>
