


```rust
use std::env;
// $env:CASE_INSENSITIVE=1 
// cargo run to poem.txt

// CASE_INSENSITIVE=1 cargo run to poem.txt
fn main() -> Result<(), &'static str> {
    let args: Vec<String> = std::env::args().collect(); 

    // cargo run query_value filename_value
    let query = args[1].clone();
    let filename = args[2].clone();
    println!("query={:?}",query);
    println!("filename={:?}",filename);

    let case_sensitive = env::var("CASE_INSENSITIVE").is_err();
    println!("env::var CASE_INSENSITIVE ={:?}",! case_sensitive);

    // env::set_var
    let key = "CASE_INSENSITIVE";
    env::set_var(key, "1");
    assert_eq!(env::var(key), Ok("1".to_string()));

    // env::remove_var
    env::remove_var(key);
    assert!(env::var(key).is_err());

    // var
    let key = "CASE_INSENSITIVE";
    match env::var_os(key) {
        Some(val) => println!("{}: {:?}", key, val),
        None => println!("{} is not defined in the environment.", key)
    }
    Ok(())
}
```

---

```rust
fn main(){
    std::env::set_var("URL_REMOTE_SERVER",  "http://192.168.0.104:4011");
    if std::env::args().len() > 1 {
         let args: Vec<String> = std::env::args().collect(); 
         std::env::set_var("URL_REMOTE_SERVER",  args[1].clone());
    }
   let url = std::env::var("URL_REMOTE_SERVER").unwrap()
}
```

