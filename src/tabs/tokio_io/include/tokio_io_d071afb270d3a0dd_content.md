


<pre><code class="language-rust">
use tokio::task;
fn example() -> std::future::Ready<String>{
    let f: std::future::Ready<String> = std::future::ready("Hello world ex_1".to_string());
    f
}
fn main(){
    let future = async {  
        // Требуется async блок или другое будущее и создается новая задача для одновременного выполнения этой работы:
        // let concurrent_future: tokio::task::JoinHandle<String> = tokio::task::spawn(example());
        let concurrent_future: tokio::task::JoinHandle<String> = tokio::task::spawn(std::future::ready("Hello world".to_string()));
        concurrent_future.await
    };
    let mut rt = tokio::runtime::Runtime::new().unwrap();
    let result = rt.block_on(future);
    println!("{:?}",result);
}
</code></pre>


Пример:
<pre><code class="language-rust">
async fn work(sleep:usize) -> String{
    let mut s = "".to_owned();
    for i in (0..10000000*sleep){
       s.push_str(&format!("{}",i));
    }
    println!("Sleep {}",sleep);
    std::future::ready(format!("Sleep {}",sleep)).await
}
fn main(){
    let mut rt = tokio::runtime::Runtime::new().unwrap();
    rt.block_on(
        async {
          // не блокирующие вычисления
           tokio::join!(
                tokio::task::spawn(async {
                     work(5).await; 
                }),
                tokio::task::spawn(async {
                    work(1).await;
                }),
                tokio::task::spawn(async {
                     work(4).await;
                }),
                tokio::task::spawn(async {
                    work(5).await;
                })
            );
            // Output: Sleep 1, Sleep 4, Sleep 5, Sleep 5 ( вариант 5 не ждал 5 секунд, они работали когда шло время у 1 и 4 секунд)
          // Варианты ниже не будут работать параллельно так как в ф-ции work нет await на долгую работу и переключения не будет!!!

          // 1. Этот вариант без `tokio::task::spawn` блокирует следующие await пока предыдущие не отработают
           tokio::join!(
                work(5),work(1),work(4)
            );
         // Output: Sleep 5, Sleep 1, Sleep 4

        // 2. Или так, все равно await тут не переключается на другой  await т.е. блокирует
         work(5).await;
         work(1).await;
         work(4).await;
         }
    );
}
</code></pre>
