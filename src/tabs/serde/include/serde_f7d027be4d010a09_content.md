

Используйте представление перечисления без тегов для этого перечисления

`#[serde(untagged)]`



<pre><code class="language-rust">
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize,PartialEq, Debug)]
#[serde(untagged)] 
enum Message {
    Singl (User),
    Batch (Vec<User>),
}

#[derive(Serialize, Deserialize,PartialEq,Debug)]
struct User{
    name:String
}

fn main() {
  let res = serde_json::from_str::<Message>( r#"[{"name": "jeka"}, {"name": "tolik"}]"#).unwrap();
  assert_eq!(Message::Batch(vec![User{name:"jeka".to_string()},User{name:"tolik".to_string()}]),res);
 
  let res = serde_json::from_str::<Message>( r#"{"name": "jeka"}"#).unwrap();
  assert_eq!(Message::Singl(User{name:"jeka".to_string()}),res);
}
</code></pre>
