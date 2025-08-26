

Так неправильно:   
 
(Каждый вызов замыкание будет перемешать вектор)
<pre><code class="language-rust">
fn main(){
     let no_gc = vec!["C", "C++", "Rust"];         
     let has_gc = |lang: &str| -> bool {
            !no_gc.contains(&lang)
    };
}
</code></pre>

----
Правильно:
<pre><code class="language-rust">
fn main(){
   let has_gc = {
// Нет смысла вектор перемещать в замыкание так как он будет геолацироваться в памяти каждый раз
// при вызове замыкания и уничтожаться каждый раз!
// И если замыкание ничего не замыкает т.е. пустой Environment то это просто функция получается
        let no_gc = vec!["C", "C++", "Rust"];
// Возвращает
// Реализует все три трейта FnOnce,FnMut,Fn так как ничего не делает со своим окружением ни удаляет ни изменяет
        move |lang: &str| -> bool {
            !no_gc.contains(&lang)
        }
    };
    assert!(has_gc("Java"));
}
</code></pre>
