


<pre><code class="language-rust">
fn main() {
    let v:Vec<i32> = vec![1,2];
    // По умолчанию лямбда захватывает значение по ссылке
    // но поток может пережить ф-цию main и мы можем обратится к не существующей памяти вектора
    thread::spawn(|| {   
            println!("{:?}",v);
     }).join();
    // решение move захватывает переменную по значению, передается ссылка на вектор а буффер остается на месте не копируется каждый раз 
    thread::spawn(move || {   
            println!("{:?}",v);
     }).join();
    // ... тут вектора уже нет
}
</code></pre>


Обычные потоки не могут заимствовать данные из своего окружения.
Однако для этого вы можете использовать поток с ограниченной областью действия thread::**scope**
<pre><code class="language-rust">
use std::thread;
fn main() {
    let s = String::from("Hello");

    thread::scope(|scope| {
        scope.spawn(|| {
            println!("Length: {}", s.len());
        });
    });
}
</code></pre>
