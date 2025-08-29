


<pre><code class="language-rust">
trait Foo {
    fn method(&self) -> String;
}
impl Foo for u8 {
    fn method(&self) -> String { format!("u8: {}", *self) }
}
impl Foo for String {
    fn method(&self) -> String { format!("string: {}", *self) }
}
/*
Статическая диспетчеризация позволяет встраивать вызовы функций, потому что вызываемый объект известен во время компиляции.
Мономорфизация:При компиляции Rust создаст конкретные типы generic согласно вызовам в коде для u8 и String
fn static_dispatch_u8(x: u8) {
    x.method();
}

fn static_dispatch_string(x: String) {
    x.method();
}
*/
fn static_dispatch<T: Foo>(x: &T) {
    println!("Static dispatch: {}",x.method());
}
/*
Динамическая диспетчеризация - точный тип может быть известен только во время выполнения.
`type erasure` стрирание оригинально типа.
&Trait или Box<Trait> уже не является трейт-обьектами, только `dyn Trait`
*/
fn dynamic_dispatch(x: &dyn Foo) {
    println!("Dynamic dispatch: {}",x.method());
}
fn main() {
    let x = 5u8;
    let y = "Hello".to_string();

    static_dispatch(&x);
    static_dispatch(&y);

    dynamic_dispatch(&x as &dyn Foo);
    dynamic_dispatch(&y as &dyn Foo);

    let buf:Vec<&dyn Foo> = vec![&x as &dyn Foo,&y as &dyn Foo];
    for b in buf.iter(){
        dynamic_dispatch(*b);
    }
    for b in buf{
        dynamic_dispatch(&*b);
    }
}
</code></pre>
