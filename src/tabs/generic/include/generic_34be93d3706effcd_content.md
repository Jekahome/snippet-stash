

В ситуациях, когда вам нужно иметь дело с разными типами, но все возможные типы образуют закрытый набор (вы знаете все используемые типы), динамическую отправку можно заменить статической отправкой по цене некоторого enum шаблона.

Пример динамической диспетчеризации
<pre><code class="language-rust">
trait SayHello {
    fn say_hello(&self);
}
struct English;
impl SayHello for English {
    fn say_hello(&self) {
        println!("Hello!")
    }
}
struct Spanish;
impl SayHello for Spanish {
    fn say_hello(&self) {
        println!("Hola!")
    }
}
fn main(){
 // Здесь мы должны использовать трейт-объект, чтобы содержать разные типы.
 let greetings: Vec<Box<dyn SayHello>> = vec![
    Box::new(English),
    Box::new(Spanish),
 ];
}
</code></pre>

Может быть переработан следующим образом (насколько мы знаем , что только English и Spanish будут использоваться типы):
Перепишем для статической диспетчеризации
<pre><code class="language-rust">
trait SayHello {
    fn say_hello(&self);
}
struct English;
impl SayHello for English {
    fn say_hello(&self) {
        println!("Hello!")
    }
}
struct Spanish;
impl SayHello for Spanish {
    fn say_hello(&self) {
        println!("Hola!")
    }
}
enum Language {
    English(English),
    Spanish(Spanish),
}
impl SayHello for Language {
    fn say_hello(&self) {
        match self {
            Language::English(l) => l.say_hello(),
            Language::Spanish(l) => l.say_hello(),
        }
    }
}
fn main(){
 // Мы содержим разные типы без использования типовых объектов.
 let greetings: Vec<Language> = vec![English, Spanish];
}
</code></pre>
