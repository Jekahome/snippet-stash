

`T: 'static` следует читать как «T ограничен сроком службы `'static`», а не как «T имеет срок службы `'static`»

Тип с временем жизни `'static`  (`&'static T`) отличается от типа, ограниченного временем жизни `'static` (`T: 'static`). 
Ограничение `T` временем `'static` могут быть динамически выделены во время выполнения, могут быть безопасно и свободно изменены, могут быть удалены и могут существовать произвольное время.
Ограничение `T:'static` включает все, `&'static T` однако он также включает в себя все принадлежащие типы, такие как `String`, Vec и т. д

Можно генерировать случайные динамически распределяемые данные во время выполнения и возвращать ссылки `'static` на них за счет утечки памяти, например
<pre><code class="language-rust">

use rand;
// generate random 'static str refs at run-time
fn rand_str_generator() -> &'static str {
    let rand_string = rand::random::<u64>().to_string();
    Box::leak(rand_string.into_boxed_str())
}
</code></pre>

--- 
<pre><code class="language-rust">
use rand;

fn drop_static<T: 'static>(t: T) {
    std::mem::drop(t);
}

fn main() {
    let mut strings: Vec<String> = Vec::new();
    strings.push("string".to_string());
    strings.push("string".to_string());

    // строки являются принадлежащими типами, поэтому они ограничены 'static
    for mut string in strings {
      
        string.push_str("a mutation");// все строки изменяемы
        
        drop_static(string); // ✅ все строки сбрасываются
    }
}
</code></pre>
