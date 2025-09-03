


<pre><code class="language-rust">
#[derive(Clone, Copy, Debug, Deserialize, Display, Eq, FromStr, PartialEq, Serialize,)]
pub struct UserId(uuid::Uuid);

#[test]
fn from_str() {
    let five_uuid = "05000000-0000-0000-0000-000000000000";
    let user_id = five_uuid
        .parse::<UserId>()
        .expect("Failed to parse from string");
    assert_eq!(UserId::from(5_u128), user_id, "FromStr is not correct");
}
#[test]
fn from_str_v4() {
    let value = uuid::Uuid::new_v4();
    let user_id = value
        .to_string()
        .parse::<UserId>()
        .expect("Failed to parse from string");
    assert_eq!(UserId::from(value), user_id, "FromStr is not correct");
}
</code></pre>
