

```rust
#[derive(Deserialize, Debug, PartialEq)]
#[serde(untagged)]
#[serde(field_identifier, rename_all = "lowercase")]
pub enum Size {
    Small,
    Medium,
    Large,
}
impl Default for Size {
    fn default() -> Size {
        Size::Medium
    }
}
pub fn default_kaboom() -> u16 {
    8080
}
#[derive(Deserialize, Debug, PartialEq)]
pub struct Foo {
    env_var_one: String,
    baz: bool,
    zoom: Option<u16>,
    doom: Vec<u64>,
    #[serde(default = "default_kaboom")]
    kaboom: u16,
    #[serde(default)]
    debug_mode: bool,
    #[serde(default)]
    size: Size,
    provided: Option<String>
}
 
fn main() {
    let data = vec![
        (String::from("ENV_VAR_ONE"), String::from("test")),
        (String::from("BAZ"), String::from("true")),
        (String::from("DOOM"), String::from("1,2,3")),
        (String::from("SIZE"), String::from("small")),
        (String::from("PROVIDED"), String::from("test")),
    ];
    match envy::from_iter::<_, Foo>(data.clone().into_iter()) {
        Ok(config) => {
            println!("{:#?}", config);
        }
        Err(error) => {eprintln!("{:#?}", error);}
    }
    match envy::from_iter::<_, Foo>(data.into_iter()) {
        Ok(foo) => {
            assert_eq!(
                foo,
                Foo {
                    env_var_one: String::from("test"),
                    baz: true,
                    zoom: None,
                    doom: vec![1, 2, 3],
                    kaboom: 8080,
                    debug_mode: false,
                    size: Size::Small,
                    provided: Some(String::from("test")),
                }
            )
        }
        Err(e) => panic!("{:#?}", e),
    }
    let data = vec![
        (String::from("APP_ENV_VAR_ONE"), String::from("test")),
        (String::from("APP_BAZ"), String::from("true")),
        (String::from("APP_DOOM"), String::from("1,2,3")),
        (String::from("APP_SIZE"), String::from("small")),
        (String::from("APP_PROVIDED"), String::from("test")),
    ];
    match envy::prefixed("APP_").from_iter::<_, Foo>(data.clone().into_iter()) {
        Ok(config) => {
            println!("{:#?}", config);
        }
        Err(error) => {eprintln!("{:#?}", error);}
    }
    match envy::prefixed("APP_").from_iter::<_, Foo>(data.into_iter()) {
        Ok(foo) => {
            assert_eq!(
                foo,
                Foo {
                    env_var_one: String::from("test"),
                    baz: true,
                    zoom: None,
                    doom: vec![1, 2, 3],
                    kaboom: 8080,
                    debug_mode: false,
                    size: Size::Small,
                    provided: Some(String::from("test")),
                }
            )
        }
        Err(e) => panic!("{:#?}", e),
    }
```
