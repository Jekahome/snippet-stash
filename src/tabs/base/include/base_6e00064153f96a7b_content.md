

При сопоставлении с образом `match, let if, for` происходит деструкция
```rust
fn main(){
 let maybe_name = Some(String::from("Alice"));
 
 match maybe_name { 
    Some(ref n) => println!("Hello, {}", n),
    _ => {},
 }
 // мы имеем доступ к maybe_name так как match не завладела данными при деструкции из-за ref
 println!("{:?} ", maybe_name);
}
```

--- 

Не перемещаем (**moving**) String, а берем на него ссылку
```rust
fn main(){
 let query_params: Vec<(String, String)> = vec![("key".to_string(),"value".to_string())];
 for &(ref name,ref  value) in &query_params { // без ref тип должен быть Copy
    println!("{:?}={:?}", name, value);
 }
}
```
