


<pre><code class="language-rust">
use std::path::PathBuf;

fn main() {
    // Создание
    let mut path = PathBuf::new();
    path.push("/usr");             // push: добавляем компонент
    path.push("local");
    path.push("bin");
    println!("path = {:?}", path); // "/usr/local/bin"

    // Преобразование
    let p_ref = path.as_path();    // as_path: ссылка на Path
    println!("as_path = {:?}", p_ref);

    let os_str = path.as_mut_os_string(); // as_mut_os_string: доступ к OsString
    os_str.push("-custom");
    println!("as_mut_os_string = {:?}", path);

    // Работа с именем и расширением
    path.set_file_name("program"); // set_file_name: заменяет имя файла
    println!("set_file_name = {:?}", path); // "/usr/local/program"

    path.set_extension("exe");     // set_extension: меняет расширение
    println!("set_extension = {:?}", path); // "/usr/local/program.exe"

    // Модификация пути
    path.pop();                    // pop: убирает последний компонент
    println!("pop = {:?}", path);  // "/usr/local"

    // Работа с ёмкостью
    let mut p2 = PathBuf::with_capacity(50); // резервируем место
    p2.push("hello");
    println!("p2 = {:?}, capacity = {}", p2, p2.capacity());

    p2.reserve(20);                // увеличить capacity
    println!("reserve = {}", p2.capacity());

    p2.shrink_to_fit();            // уменьшить до длины
    println!("shrink_to_fit = {}", p2.capacity());

    // Полное преобразование
    let boxed = path.clone().into_boxed_path(); // Box<Path>
    let os_string = path.clone().into_os_string(); // OsString
    println!("into_boxed_path = {:?}", boxed);
    println!("into_os_string = {:?}", os_string);
}
</code></pre>
