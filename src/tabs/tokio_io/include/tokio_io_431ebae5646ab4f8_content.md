

При этом позаботьтесь о том, чтобы общий объем параллелизма был ограничен. 
Например, при написании цикла принятия TCP убедитесь, что общее количество открытых сокетов ограничено. 

<pre><code class="language-rust">
#![allow(unused_must_use)]
use tokio::time::{sleep, Duration};

async fn load(t:u64){
    sleep(Duration::from_secs(t)).await;
}
 
#[tokio::main]
async fn main(){
    /*let _ = tokio::join!(
        tokio::task::spawn(async {
             load(2).await;
       }),
       tokio::task::spawn(async {
           load(1).await;
       })
    );*/

    let handle1 = tokio::spawn(async {
         load(2).await;
    });
    let handle2 = tokio::spawn(async {
         load(1).await;
    });
    handle1.await;
    handle2.await;
}
</code></pre>
