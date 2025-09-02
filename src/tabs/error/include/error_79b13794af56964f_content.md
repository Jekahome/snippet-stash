


<pre><code class="language-rust">
fn create_user(new_user:Result<i32,&'static str>,param1:bool) -> Result<i32,&'static str> { 
        let var:Option<i32> = Some(1);
            var.map_or(Err("CustomError::Unauthorized"), |_| {
                new_user
                    .map(|_| {
                        // db validate
                        if param1 {   
                            println!("param1");
                            return Err("param1 CustomError::Validation");
                        }
                        Ok(())
                    })
                    .map_err(|_| {
                        println!("map_err");
                        "map_err CustomError::Validation"
                    })
                    .and_then( |res| {
                      // так как  сюда прийдет результат из map Ok 
                      // но может содержать Ok(Err) тогда мы развернем результат
                       res
                    })
                     .and_then(move |res| {
                     // тут мы уверенны что результат из map был Ok
                       println!("create_user_db {:?}",res);
                       Ok(1)
                    })
            })
            .and_then(|value| Ok(value))
}
fn main() {
    println!("{:?}",create_user(Ok(1),false));
}
</code></pre>
