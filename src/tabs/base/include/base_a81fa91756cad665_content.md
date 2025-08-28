


Позволяет выполнить некоторый код, когда значение выходит из области видимости
Часто Drop используют, чтобы освободить ресурсы, представленные структурой (struct). 
Например, счётчик ссылок `Arc<T>` уменьшает число активных ссылок в `drop()`, и когда оно достигает нуля, освобождает хранимое значение.

<pre><code class="language-rust">
struct Firework {
    strength: i32,
}

impl Drop for Firework {
    fn drop(&mut self) {
        println!("БАБАХ силой {}!!!", self.strength);
    }
}

fn test() {
    let firecracker = Firework { strength: 1 };
    let tnt = Firework { strength: 100 };
}
test();
// БАБАХ силой 100!!!
// БАБ
</code></pre>
