

```rust
fn main(){
    let mut i = 0;
    loop {
        i=i+1;
        if i == 3 {continue;}
        println!("Зациклились! {}",i );
        if i >= 10 {break};
    }

    // возврат значения из loop после break
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;
        }
    };
}
```
