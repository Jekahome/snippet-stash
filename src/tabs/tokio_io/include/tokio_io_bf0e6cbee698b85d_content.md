


<pre><code class="language-rust">
use tokio::task;
// Ошибки в многопоточном асинхронные контексты требуют дополнительных ограничений
type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;

// Теперь мы хотим как получить некоторые данные, так и провести на них интенсивный анализ процессора.
async fn get_and_analyze(n: usize) -> Result<(u64, u64)> { 
    tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;   
    println!("Dataset {}", n);

    let txt = "dlfkjgnkldngldfnknngldfknglkdfngld";

    // Мы отправляем нашу аналитическую работу в поток, в котором не запущена среда выполнения.
     // чтобы мы не блокировали время выполнения анализом данных
    let res = tokio::task::spawn_blocking(move ||analyze(&txt)).await?;
// let res = futures::future::ok::<(u64, u64),Box<dyn std::error::Error + Send + Sync>>((78_u64,88_u64) ).await?;
    println!("Processed {}", n);
    Ok(res)
}

// Подсчитав количество единиц и нулей в байтах
fn analyze(txt: &str) -> (u64, u64) {
    let txt = txt.as_bytes();
    // Давайте потратим как можно больше времени и посчитаем их за два прохода
    let ones = txt.iter().fold(0u64, |acc, b: &u8| acc + b.count_ones() as u64);
    let zeros = txt.iter().fold(0u64, |acc, b: &u8| acc + b.count_zeros() as u64);
    (ones, zeros)
}
async fn app() -> Result<()> {
    // Мы можем собирать фьючерсы в коллекцию.
    let mut futures = vec![];
    for i in 1..=10 {
        let fut = task::spawn(get_and_analyze(i));
        futures.push(fut);
    }
    let results = futures::future::join_all(futures).await;
    let mut total_ones = 0;
    let mut total_zeros = 0;
    // Возврат ошибок с использованием символа `?` В итераторах может быть немного сложным. 
    // Используя цикл for для проверки и работы с результатами часто может быть более эргономично
    for result in results {
        // `spawn_blocking` returns a `JoinResult` we need to unwrap first
        let ones_res: Result<(u64, u64)> = result?;
        let (ones, zeros) = ones_res?;
        total_ones += ones;
        total_zeros += zeros;
    }
    println!("Ratio of ones/zeros: {:.02}",total_ones as f64 / total_zeros as f64);
    Ok(())
}
fn main() {
    let mut rt = tokio::runtime::Runtime::new().unwrap();
    match rt.block_on(app()) {
        Ok(_) => println!("Done"),
        Err(e) => eprintln!("An error ocurred: {}", e),
    };  
}
</code></pre>
