


<pre><code class="language-rust">
#[derive(Debug)]
struct Person{
    first:String
}
// ошибка, структура удалиться раньше чем время жизни ссылки на эти данные
fn hello() -> &str {
    let person = Person {
        first: "Yehuda".to_string()
    };
    person.first.as_str()
}
fn main(){
   let mut v  = vec![];
   let s = hello(&mut v);
   println!("{}",s);
}
</code></pre>

Решение:
<pre><code class="language-rust">
#[derive(Debug)]
struct Person{
    first:String
}
fn hello(v:&mut Vec<Person>) -> &str {
    let person = Person {
        first: "Yehuda".to_string()
    };
    v.push(person);
    v[0].first.as_str()
}

fn main(){
   let mut v  = vec![];
   let s = hello(&mut v);
   println!("{}",s);
}
</code></pre>
