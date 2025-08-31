


<pre><code class="language-rust">
// Этот простой макрос называется `say_hello`.
 macro_rules! say_hello {
    // () аналог match
    // `()` указывает, что макрос не принимает аргументов.
     () => (println!("Hello!"); );
     // с аргументом x
     (x => $e:expr) => (
        // Макрос будет раскрываться с содержимым этого блока.
        println!("с аргументом x {:?}!",$e);
    );
     ($e:expr) => (
        // Макрос будет раскрываться с содержимым этого блока.
        println!("Вывод выражения {:?}!",$e);
        println!("Выражение как есть {:?}!",stringify!($e));
    );
}

macro_rules! create_function {
    // Этот макрос принимает аргумент идентификатора `ident` и
    // создаёт функцию с именем `$func_name`.
    // Идентификатор `ident` используют для обозначения имени переменной/функции.
    ($func_name:ident) => (
        fn $func_name() {
            // Макрос `stringify!` преобразует `ident` в строку.
            println!("Вызвана функция {:?}()", stringify!($func_name))
        }
    )
}
fn main() {
    // Этот вызов будет раскрыт в код `println!("Hello");`
    say_hello!();
    say_hello!(x => "c x arguments");
    say_hello!("без именной переменной");

    say_hello!({[1,2] });
    // Создадим функции с именами `foo` и `bar` используя макрос, указанный выше.
    create_function!(foo);
    foo();
}
</code></pre>
