

```
#[derive(Clone, Copy, Debug, Deserialize, Display, Eq, FromStr, PartialEq, Serialize,)]
pub struct UserId(uuid::Uuid);
use derive_more::Display;
#[cfg(test)]
mod user_id_spec {
    use super::*;
    #[test]
    fn display_uuid() {
        let value = "75fc650a-1a60-4727-bcef-939fc9b9ed39";
        let user_id = value
            .parse::<UserId>()
            .expect("Failed to parse from string");
        assert_eq!(
            value.to_owned(),
            format!("{}", user_id),
            "Display is not correct"
        );
    }

    #[test]
    fn display_default() {
        assert_eq!(
            "00000000-0000-0000-0000-000000000000".to_owned(),
            format!("{}", UserId::default()),
            "Display is not correct"
        );
    }
}
```
