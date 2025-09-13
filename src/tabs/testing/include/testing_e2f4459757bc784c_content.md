

```
#[derive(Clone, Copy, Debug, Deserialize, Display, Eq, FromStr, PartialEq, Serialize,)]
pub struct UserId(uuid::Uuid);

#[test]
fn deserialization() {
    let user_id: UserId =
        serde_json::from_str("\"05000000-0000-0000-0000-000000000000\"").expect("Deserialization error");
    assert_eq!(
        UserId::from(5_u128),
        user_id,
        "Deserialization in 5 is not correct"
    );
    assert_ne!(
        uuid::Uuid::from(6_u128),
        uuid::Uuid::from(user_id),
        "Deserialization is not correct"
    );
}
```
