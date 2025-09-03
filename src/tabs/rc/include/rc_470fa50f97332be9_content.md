


<pre><code class="language-rust">
fn main(){
    // В противном случае возвращается Err с тем же Rc, который был передан.
    match Rc::try_unwrap(x){
         Ok(n) => println!("Ok:{}",n),
         Err(e) => println!("{}",e)
    }
    let x = Rc::new(4);
    let _y = Rc::clone(&x);// создает новую ссылку на данные

    //if Rc::strong_count(&x) < 2 {
            match Rc::try_unwrap(x){
                Ok(n) => println!("Ok:{}",n),
                Err(e) => println!("Err {}",e)//Err 4
            }
    //}
    // assert_eq!(*Rc::try_unwrap(x).unwrap_err(), 4);
}
</code></pre>
