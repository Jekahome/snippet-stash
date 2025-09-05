


<pre><code class="language-rust">
use serde::de::{self, Deserialize, Deserializer, Visitor, SeqAccess, MapAccess};

#[derive(serde::Serialize,Debug)]
struct Something {
    val: i32
}

impl<'de> Deserialize<'de> for Something {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error> where D: serde::Deserializer<'de>{
        
        enum Field { Val }
        impl<'de> Deserialize<'de> for Field {
            fn deserialize<D>(deserializer: D) -> Result<Field, D::Error> where D: Deserializer<'de> {

                struct FieldVisitor;
                impl<'de> Visitor<'de> for FieldVisitor {
                    type Value = Field;

                    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                        formatter.write_str("`val`")
                    }
                    fn visit_str<E>(self, value: &str) -> Result<Field, E> where E: de::Error {
                        match value {
                            "val" => Ok(Field::Val),
                            _ => Err(de::Error::unknown_field(value, FIELDS)),
                        }
                    }
                    fn visit_bytes<E>(self,value: &[u8]) -> Result<Self::Value, E> where E: serde::de::Error {
                        match value {
                            b"min" => Ok(Field::Val),
                             _ => Err(de::Error::custom(format_args!("unknown field"))),
                        }
                    }
                }
                deserializer.deserialize_identifier(FieldVisitor)
            }
        }

        //struct SomethingVisitor;
        struct SomethingVisitor<'de> {
            marker: std::marker::PhantomData<Something>,
            lifetime: std::marker::PhantomData<&'de ()>,
        }
        // Реализация поддерживает два возможных способа представления структуры в формате данных: в виде последовательности visit_seq, как в Postcard,
        //  и в виде карты visit_map , как в JSON
        impl<'de> Visitor<'de> for SomethingVisitor<'de> {
            type Value = Something;
        
            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result { 
                formatter.write_str("struct Something")
            }
            fn visit_seq<V>(self, mut seq: V) -> Result<Self::Value, V::Error>where V: SeqAccess<'de> {
                let val = seq.next_element()?
                    .ok_or_else(|| de::Error::invalid_length(0, &self))?;
                Ok(Something{val})
            }
            fn visit_map<V>(self, mut map: V) -> Result<Self::Value, V::Error> where V: MapAccess<'de> {
                let mut val = None;
                while let Some(key) = map.next_key()? {
                    match key {
                        Field::Val => {
                            if val.is_some() {
                                return Err(de::Error::duplicate_field("val"));
                            }
                            val = Some(map.next_value()?);
                        }
                    }
                }
                let val = val.ok_or_else(|| de::Error::missing_field("val"))?;
                Ok(Something{val})
            }
        } 
        const FIELDS: &'static [&'static str] = &["val"];
        serde::Deserializer::deserialize_struct(deserializer,"Something", FIELDS,
          SomethingVisitor {
            marker: std::marker::PhantomData::<Something>,
            lifetime: std::marker::PhantomData,
         })
    }
}
fn main() -> serde_json::Result<()>{
    let s_string = r#"{"val": 123}"#;
    let l: Something = serde_json::from_str(&s_string)?;// Deserialize
    println!("deserialized = {:?}", &l);// LongString { val: 123 }

    let l_string = b"{\"val\": 123}";
    let l: Something = serde_json::from_slice(l_string)?;// Deserialize
    println!("deserialized = {:?}", &l);// LongString { val: 123 }

    let v:serde_json::Value =  serde_json::json!({"val": 123});
    let l: Something = serde_json::from_value(v).unwrap();// Deserialize
    println!("deserialized = {:?}", &l);// LongString { val: 123 }   

    Ok(())
}
</code></pre>
