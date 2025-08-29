

Использование типажей и ассоциированных типов
В некоторых случаях вместо PhantomData можно использовать типажи (traits) и ассоциированные типы для указания зависимостей между типами:
Когда нужно указать зависимости между типами через типажи.

<pre><code class="language-rust">
trait MyTrait {
    type Output;
    fn get_output(&self) -> Self::Output;
}

struct MyStruct;

impl MyTrait for MyStruct {
    type Output = i32;
    fn get_output(&self) -> i32 {
        42
    }
}

fn main() {
    let s = MyStruct;
    println!("{}", s.get_output());
}

</code></pre>

