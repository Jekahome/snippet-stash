

```rust
use std::hash::{Hash, Hasher};
#[derive(Debug,Eq, PartialEq)] // #[derive(Hash)]
struct Person {
    id: u32,
    name: String,
    phone: u64,
}
impl Hash for Person {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.id.hash(state);
        self.phone.hash(state);
    }
}
fn main(){
    let person:Person = Person{id:1u32,name:String::from(""),phone:2u64};
    let mut hasher = std::collections::hash_map::DefaultHasher::new();
    person.hash(&mut hasher);
    println!("Result: {:x}",hasher.finish() );// 7209bbd64c42b281
}
```

---

```rust
use std::collections::HashMap;
let mut hash_map = HashMap::new();
fn main(){
    hash_map.insert(
       Person{id:1u32,name:String::from(""),phone:2u64},
       "My favorite.".to_string(),
    );
}
```
