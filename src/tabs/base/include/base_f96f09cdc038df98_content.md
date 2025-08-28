


<pre><code class="language-rust">
trait Say{
    fn say(&self) where Self: std::fmt::Debug{
        println!("say:{:?}",self);
    }
}
#[derive(Debug)]
struct MyStruct(i32);
impl Say for MyStruct{}

fn main(){
    let my = MyStruct(7);
    my.say(); // прямой вызов

    MyStruct::say(&my); // расширенный вариант вызова

    Say::say(&my); // вариант вызова через трейт

    <MyStruct as Say>::say(&my); // расширенный вариант вызова через трейт
}
</code></pre>
