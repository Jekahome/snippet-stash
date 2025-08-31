



Макрос **try!** используется для обработки ошибок. 
Он принимает нечто возвращающее `Result<T, E>` и возвращает `T` если было возвращено `Ok<T>` иначе он делает возврат из функции со значением `Err(E)`
<pre><code class="language-rust">
use std::fs::File;
fn foo() -> std::io::Result<()> {
     let f = File::create("foo.txt");
     let f = match f {
          Ok(t) => t,
          Err(e) => return Err(e),
     };
     Ok(())
}
</code></pre>
