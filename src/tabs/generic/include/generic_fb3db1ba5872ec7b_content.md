

`#![feature(trait_upcasting)]` предоставляет мощный инструмент для работы с трейт-объектами в Rust, упрощая преобразования между ними и делая код более гибким и выразительным.
upcasting в контексте Rust означает преобразование ссылок или умных указателей от одного трейт-объекта к другому, который является супертрейтом. Это аналогично концепции наследования в объектно-ориентированных языках, где подкласс может быть приведён к суперклассу.
<pre><code class="language-rust">
#![feature(trait_upcasting)]

trait A {
    fn foo(&self);
}

trait B: A {
    fn bar(&self);
}

struct MyStruct;

impl A for MyStruct {
    fn foo(&self) {
        println!("A::foo");
    }
}

impl B for MyStruct {
    fn bar(&self) {
        println!("B::bar");
    }
}

fn main() {
    let my_struct = MyStruct;
    let b: &dyn B = &my_struct;
    let a: &dyn A = b as &dyn A; // Апкастинг с помощью `as` // b.upcast();
    a.foo(); // Вывод: A::foo
}

</code></pre>
