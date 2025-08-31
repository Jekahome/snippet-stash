


<pre><code class="language-rust">
static NUM: i32 = 18;// `'static` lifetime.

//Возвращает ссылку на `NUM`, где ее` `static`
// время жизни привязано к времени входного аргумента.
fn coerce_static<'a>(_: &'a i32) -> &'a i32 {
    &NUM
}
fn main() {
    {
        let static_string = "I'm in read-only memory";
        println!("static_string: {}", static_string);
        // Когда `static_string` выходит за пределы области видимости, ссылка
          // больше нельзя использовать, но данные остаются в двоичном формате.
    }

    {
        //Создайте целое число, используемое для `coerce static`:
         let lifetime_num = 9;
        // Заклинание `NUMBER` на время жизни` lifetime_num`:
        let coerced_static = coerce_static(&lifetime_num);

        println!("coerced_static: {}", coerced_static);
    }
    println!("NUM: {} stays accessible!", NUM);
}
</code></pre>
