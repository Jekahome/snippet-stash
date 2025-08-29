


<pre><code class="language-rust">
fn mut_log<T: Any + Debug>(value: &mut T,value2: &mut Any) {
    
    let value_any = value as &mut Any;// достаем тип

   // попробуйем преобразовать наше значение в String или Number. 
    if value_any.is::<String>() {
         if let Some(as_string) = value_any.downcast_mut::<String>(){
             as_string.push_str(" World");
         }
    }else if value2.is::<i8>() {
         if let Some(as_number) = value2.downcast_mut::<i8>(){
            *as_number+=27;
         }
    }
}
</code></pre>
