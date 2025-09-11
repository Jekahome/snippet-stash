

У этого решения есть важное ограничение: оно работает только в том случае, если вам нужно учитывать фиксированную группу типов. 
```rust
enum Value {
    Int(isize),
    Text(String)
}

// возьмите супертип и используйте подтип
fn print_value(val: Value) {
    match val {
        Value::Int(number) =>
            println!("A number w/ {} ones in binary", number.count_ones()),
        Value::Text(string) =>
            println!("A string as bytes: {:?}", string.as_bytes())
    }
}
fn main(){}
```
