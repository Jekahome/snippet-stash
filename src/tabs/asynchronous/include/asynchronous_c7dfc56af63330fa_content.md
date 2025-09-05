

<pre><code class="language-rust">
use std::process::{Stdio, Command};

#[tokio::main]
async fn main() {
    let handle = tokio::task::spawn(async move {
        let (is_err,s) = read_dir().await;
        print(is_err,s);
    });
     
    // Цикл для периодической проверки состояния задачи
    loop {
        // Проверяем, завершилась ли задача
        if handle.is_finished() {
            // Дожидаемся завершения задачи и обрабатываем результат
            handle.await.unwrap();
            break;
        }
        println!("wait...");// Выполняем другие задачи, если нужно
        // Ждем некоторое время перед следующей проверкой
        std::thread::sleep(std::time::Duration::from_millis(500));
    }
}
async fn read_dir() -> (bool, String){
    std::thread::sleep(std::time::Duration::from_secs(3));// stopper

    let executable_path = "/home/jeka/Projects/Rust/58/58web3/target/debug/llm-system-fuction";
    
    // Запускаем первую программу асинхронно
    let output = Command::new(executable_path)
        .args(["rl","-d","/home/jeka/Projects/Rust/ttttttest/src"])
        .stdout(Stdio::piped())
        .output()
        .expect("Failed to execute process");
 
    if output.status.success() {
        let stdout: String = String::from_utf8_lossy(&output.stdout).into_owned();
       return (true,stdout);
    } else {
        let stderr: String = String::from_utf8_lossy(&output.stderr).into_owned();
        return (false,stderr);
    }
}
fn print(is_err: bool, out: String){
    if is_err {  eprintln!("{}", out); } else { println!("{}", out); }
}
</code></pre>
