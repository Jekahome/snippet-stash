


```rust
// без Copy не работает
#[derive(Clone,Copy)]
pub struct Unit(pub i32);

fn foo(value:&Unit) {
    let value = value.clone();
    
     let param1 = Some(1);
     param1.and_then(move |_v|{
            let param = Some(1);
            param.and_then(move |_v|{
               ex(move|&value|{1},&value);
               Some(1)
            }).and_then(move |_v|{
               let _p:Unit = value;
                Some(1)
            });
        Some(1)
     }); 
} 

pub fn ex( f: fn(&Unit) -> i32,arg:&Unit)  
{
 //f(arg);
}

fn main() {
    let unit = Unit(1);
    foo(&unit); 
}
```
