


<pre><code class="language-rust">
use std::fmt::Debug;
use std::any::Any;
fn main(){
   let my_string:String = "Hello World".to_string();
    do_work(&my_string);

    let my_i8: i8 = 100;
    do_work(&my_i8);

   let mut mut_string:String = "Hello".to_string();
   let mut mut2_i8: i8 = 100;
   mut_log(&mut mut_string,&mut mut2_i8);
   println!("{} ,{}",mut_string,mut2_i8);// Hello World ,100
}

// Эта функция хочет записать свой параметр перед выполнением с ней работы.
fn do_work<T: Any + Debug>(value: &T) {
    log(value);
    // ...сделать другую работу
}

// Функция Logger для любого типа, который реализует Debug
fn log<T: Any + Debug>(value: &T) {
    let value_any = value as &Any;

    // попробуйем преобразовать наше значение в String или Number. 
    if value_any.is::<String>() {
         if let Some(as_string) = value_any.downcast_ref::<String>(){
            println!("String ({}): {}", as_string.len(), as_string);
         }
    }else if value_any.is::<i8>() {
         if let Some(as_number) = value_any.downcast_ref::<i8>(){
            println!("Number: {}", as_number);
         }
    }
}
</code></pre>
