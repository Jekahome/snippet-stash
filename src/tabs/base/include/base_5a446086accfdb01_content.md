

```rust
fn typed_example2(){
        #[allow(unused_variables)] // не выдавать предупреждение
         let x = 5;
         
         let y = 5;
         
          #[warn(unused_variables)]   // выдавать предупреждение
         let z = 5;
}
 /*
     warning: unused variable: `y`
      --> src/main.rs:17:10
       |
    17 |      let y = 5;
       |          ^ help: consider prefixing with an underscore: `_y`
       |
       = note: #[warn(unused_variables)] on by default
       
       warning: unused variable: `z`
      --> src/main.rs:20:10
       |
    20 |      let z = 5;
       |          ^ help: consider prefixing with an underscore: `_z`
 */
fn main(){}
```
