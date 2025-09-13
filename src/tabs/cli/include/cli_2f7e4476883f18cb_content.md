

```
use std::env;
fn test_env(){
/*<absent> если переменная не определена;
<empty> если переменная определена, но является пустой строкой;
значение переменной в других случаях.*/

// ENV_VAR_ONE=1 cargo run 
let vars:[&str;3]=["ENV_VAR_ONE","ENV_VAR_TWO","ENV_VAR_THREE"];

for var in vars.into_iter(){
    match env::var_os(var) {
        Some(value) => {
               if value.is_empty() { 
                  println!("{}: <empty>",  var);
               }else{ println!("{}: {:?}", var, value); }   
         },
        None => {println!("{}: <absent>",var);}
    }
}
```
