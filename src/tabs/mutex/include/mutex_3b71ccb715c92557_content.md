

Семафор поддерживает набор разрешений. 
Разрешения используются для синхронизации доступа к общему ресурсу. 
Семафор отличается от мьютекса тем, что он может разрешить одновременному доступу к общему ресурсу более чем одному вызывающему объекту.

Перед доступом к ресурсу поток уменьшает счетчик семафора, а после завершения работы с ресурсом увеличивает его счетчик.
<pre><code class="language-rust">
use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::sync::{Semaphore, TryAcquireError};
use std::sync::Arc;

#[tokio::main]
async fn main() {
    let semaphore_a = Arc::new(Semaphore::new(10));
    let semaphore_b = Arc::new(Semaphore::new(10));

    let mut handles = Vec::new();
    {
        let a = Arc::clone(&semaphore_a);
        let b = Arc::clone(&semaphore_b);
        let handle = tokio::spawn(async move{
            let response =  0;
            if let Ok(permit_a) = a.try_acquire(){
                if let Ok(permit_b) = b.try_acquire(){
                    // Send the request.
                    let response =  1;
                    // Drop the permit after the request has been sent.
                    //drop(permit_a);
                    //drop(permit_b);
                   std::thread::sleep(std::time::Duration::from_secs(2)); 
                    return response;
                }
            }
            response 
        });
        handles.push(handle);
    }
    {
        let a = Arc::clone(&semaphore_a);
        let b = Arc::clone(&semaphore_b);
        let handle = tokio::spawn(async move{
            /*
            let response =  0;
            if let Ok(permit_b) = b.try_acquire(){
                if let Ok(permit_a) = a.try_acquire(){
                    // Send the request.
                    let response =  2;
                    // Drop the permit after the request has been sent.
                    //drop(permit_b);
                    //drop(permit_a);
                    //std::thread::sleep(std::time::Duration::from_secs(2)); 
                    return response;
                }
            }*/
            let permit_b = b.acquire().await.unwrap();
            let permit_a = a.acquire().await.unwrap();
            let response =  2;
            response 
        });
        handles.push(handle);
    }
        
    // Collect responses from tasks.
    let mut responses = Vec::new();
    for jh in handles {
        let response = jh.await.unwrap();
        responses.push(response);
    }
    // Process responses.
    println!("{:?}",responses);

}
 
</code></pre>
