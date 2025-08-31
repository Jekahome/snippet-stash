


<pre><code class="language-rust">
fn main(){
    // Макрос вывода в `stdout` с переносом на новую строку
    println!("Значение x равно {} и значение y равно {}", x, y);
    eprintln!("Error: Could not complete task"); // output to io::stderr 

    // Макрос вывода в stdout без переноса строки
    print!("Значение x равно {}", x);
    eprint!("Error: Could not complete task");// output to io::stderr 

    // Макрос вызывает остановку текущего потока исполнения с заданным сообщением.
    panic!("msg")

    // Макрос сравнивает два значения и вызывает panic!() при не равенстве их
    assert_eq!(1,1)

    // Макрос вызывает panic! если передать false
    assert!(false);

    // Макрос не равенства
    assert_ne!(2, 3);
    assert_ne!(2, 3, "we are testing that the values are not equal");

    // Макрос код который не должен исполнится 
    unreachable!()

    // Плейсхолдер для ещё не написанного кода
    unimplemented!()
    todo!();

    // Проверяет переменную среды во время компиляции
    let path: &'static str = env!("PATH");
    let key: Option<&'static str> = option_env!("SECRET_KEY");

    // Макрос возвращает имя файла в котором вызван
    std::file!() 
}
</code></pre>
