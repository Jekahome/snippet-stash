

Средство проверки заимствований не позволит нам извлечь из name перечисления (потому что что- то должно быть там). 
Мы, конечно, могли бы `.clone()` назвать и поместить клон в наш `MyEnum::B`, но это будет экземпляр антипаттерна «Клон для проверки заимствований». 
В любом случае, мы можем избежать лишнего распределения, изменив `e` только изменяемое заимствование.
<pre><code class="language-rust">
use std::fmt::Debug;
use std::default::Default;
use std::mem;

#[derive(Debug,PartialEq)]
enum MyEnum {
    A { name: String, x: u8 },
    B { name: String }
}

fn a_to_b(e: &mut MyEnum) {
    if let MyEnum::A{ name, x:_x @ 3...7 } = e {
        // это извлекает наше имя и вставляет вместо него пустую строку 
        // (обратите внимание, что пустые строки не выделяются). 
        // Затем создаем новый вариант перечисления (который будет 
        // присваивается `* e`)
        
        *e = MyEnum::B{ name: mem::take(name) }
        //*e = MyEnum::B{ name: mem::replace(name,Default::default()) }
    }
}
fn main() {
    let mut e = MyEnum::A{name:"foo".to_owned(),x:4};
    a_to_b(&mut e);
    assert_eq!(e,MyEnum::B{name:"foo".to_owned()});
    println!("{:?}",e);
}
</code></pre>
