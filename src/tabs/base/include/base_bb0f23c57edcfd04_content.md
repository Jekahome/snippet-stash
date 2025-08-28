


<pre><code class="language-rust">
struct Droppable {
    name: &'static str,
}
// Это простая реализация `drop`, которая добавляет вывод в консоль.
impl Drop for Droppable {
    fn drop(&mut self) {
        println!("> Сбросили {}", self.name);
    }
}
fn main() {
    let _a = Droppable { name: "a" };
    // блок А
    {
        let _b = Droppable { name: "b" };
        // блок Б
        {
            let _c = Droppable { name: "c" };
            let _d = Droppable { name: "d" };
            println!("Выходим из блока Б");
        }
        println!("Вышли из блока Б");
        println!("Выходим из блока А");
    }
    println!("Вышли из блока А");

    // Переменную можно сбросить вручную с помощью функции `drop`.
    drop(_a);// переменная a удалится сдесь иначе после завершения программы
    // Попробуйте закомментировать эту строку

    println!("Конец главной функции.");

    // *Нельзя* сбросить `_a` снова, потому что переменная уже
    // (вручную) сброшена.
}

// $ RUST_BACKTRACE=short cargo run 
</code></pre>
