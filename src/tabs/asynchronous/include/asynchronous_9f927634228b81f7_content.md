

```
 async fn work(delay: u64) -> String {
    tokio::time::sleep(std::time::Duration::from_secs(delay)).await;
    println!("Sleep:{delay}");
    std::future::ready(format!("Sleep {}",delay)).await
}
#[tokio::main]
pub async fn run(){  
    // Не блокирующие вычисления
    let (first, second,..) = tokio::join!(
        // парралельное выполнение задач
        tokio::task::spawn(async {
            work(5).await
        }),
        tokio::task::spawn(async {
            work(2).await
        }),
        tokio::task::spawn(async {
            work(1).await
        }),
    ); 
    // Не блокирующие вычисления
    tokio::join!(
        work(5),work(2),work(1),
    );
   // Блокирующее исполнение т.е. последовательно синхронно
    work(5).await;
    work(2).await;
    work(1).await;  
}
```
