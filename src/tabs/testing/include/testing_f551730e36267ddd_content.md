

```
#[derive(Clone, Copy, Debug, Deserialize, Display, Eq, FromStr, PartialEq, Serialize,)]
pub struct UserId(uuid::Uuid);

#[test]
fn serialization() {
    let user_id_string = serde_json::to_string(&UserId::default()) .expect("Serialization error");
    assert_eq!(
        user_id_string,
        "\"00000000-0000-0000-0000-000000000000\"".to_owned(),
        "Serialization from default is not correct"
    );
    let user_id_string = serde_json::to_string(&UserId::from(5_u128)) .expect("Serialization error");
    assert_eq!(
        user_id_string,
        "\"05000000-0000-0000-0000-000000000000\"".to_owned(),
        "Serialization from 5 is not correct"
    );
}
```
