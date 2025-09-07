

<pre><code class="language-rust">
fn main(){
    let s = include_str!("rayon2.rs");
    println!("{:?}",s);
}
</code></pre>

---

<pre><code class="language-rust">
mod my_module {
    pub fn print_location() {
        println!("Файл: {}", file!());          // имя файла, где вызван макрос
        println!("Строка: {}", line!());        // номер строки, где вызван макрос
        println!("Модуль: {}", module_path!()); // путь к модулю, где вызван макрос
    }
}

fn main() {
    println!("Вызов из main:");
    println!("Файл: {}", file!());
    println!("Строка: {}", line!());
    println!("Модуль: {}", module_path!());

    println!("\nВызов из my_module:");
    my_module::print_location();
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
  // Записать отформатированные данные в буфер
     use std::io::Write;

    let mut w:Vec<u8> = Vec::new();
    write!(&mut w, "test").unwrap();
    write!(&mut w, "formatted {}", "arguments").unwrap();
    //assert_eq!(w, b"testformatted arguments");

    let mut w = String::new();
    write!(&mut w, "test").unwrap();
    write!(&mut w, "formatted {}", "arguments").unwrap();
    assert_eq!(w, "testformatted arguments");
 
    let mut w:Vec<u8>= Vec::new();
    writeln!(&mut w)?;
    writeln!(&mut w, "test")?;
    writeln!(&mut w, "formatted {}", "arguments")?;

    assert_eq!(&w[..], "\ntest\nformatted arguments\n".as_bytes());
}
</code></pre>

