

Нам следует использовать ссылки, если наша структура не требует владения переменной. 

Нужно ли использовать переменную вне структуры?  - берем &str

Мой тип большой? Если тип большой, то передача по ссылке позволит сберечь память.

Буфер типа String с большим количеством данных может значительно замедлить программу.

**По поводу `'static`**

Мы можем вместо String передать строку с постоянным временем жизни, но она будет занимать место всегда в программе (в бинарном файле) !
<pre><code class="language-rust">
struct Person {
    name: &'static str,
}
impl Person {
    fn greet(&self) {
        println!("Привет, меня зовут {}", self.name);
    }
}
fn main() {
    let person = Person { name: "Herman" };
    person.greet();
}
</code></pre>

---

<pre><code class="language-rust">
#[derive(Clone)]
struct User{
    username:String // структура должна владеть своими данными которые принадлежа ей
}
struct User2<'a>{
    username: &'a str; // если структура не владеет своими данными они будут уничтожены согласно правилам времени жизни
}
fn main() {
    let username: String = String::from("Jeka");
    let user: User = User{username};

    let username:&str = "Jeka";
    let user2:User2 = User2{username};

    let user2:User2 = User2{username: &user.username};
}
</code></pre>
