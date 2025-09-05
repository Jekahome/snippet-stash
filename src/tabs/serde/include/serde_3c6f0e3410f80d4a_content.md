

Сериализуйте/Десериализуйте это поле, используя свои функции

`#[serde(serialize_with = "path")]`

`#[serde(deserialize_with = "path")]`

`#[serde(with = "module")]`



<pre><code class="language-rust">
use chrono::NaiveDate;
use serde;
use serde_derive::{Deserialize, Serialize};
use serde_json;

mod date_serde {
    use chrono::NaiveDate;
    use serde::{self, Deserialize, Deserializer, Serializer};

    pub fn serialize<T>(date: &Option<NaiveDate>, s: T) -> Result<T::Ok, T::Error> where T: Serializer {
        if let Some(ref d) = *date {
            return s.serialize_str(&d.format("%Y-%m-%d").to_string());
        }
        s.serialize_none()
    }

    pub fn deserialize<'de, D>(deserializer: D) -> Result<Option<NaiveDate>, D::Error> where D: Deserializer<'de> {
        let s: Option<String> = Option::deserialize(deserializer)?;
        if let Some(s) = s {
            return Ok(Some(
                NaiveDate::parse_from_str(&s, "%Y-%m-%d").map_err(serde::de::Error::custom)?,
            ));
        }
        Ok(None)
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct Test {
    pub i: u64,
    #[serde(default)]
    #[serde(with = "date_serde")]
    pub date: Option<NaiveDate>,
}

fn main() -> Result<(), serde_json::Error> {
    let mut test: Test = serde_json::from_str(r#"{"i": 3, "date": "2015-02-03"}"#)?;
    assert_eq!(test.i, 3);
    assert_eq!(test.date, Some(NaiveDate::from_ymd(2015, 02, 03)));
    test = serde_json::from_str(r#"{"i": 5}"#)?;
    assert_eq!(test.i, 5);
    assert_eq!(test.date, None);
    
    Ok(())
}
</code></pre>
