

<pre><code class="language-rust">
    type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;
     async fn future(name:&str) -> Result<String> {
        Ok(format!("Hello {}",name)) 
    }
или
    async fn future(name:&str) -> String {
        format!("Hello {}",name)
           или
        // std::future::ready(format!("Hello {}",name)).await
        // futures::future::ready("Hello world".to_string()).await
        // futures_util::future::err(ErrorBadRequest("no luck"))   
    }
или 
    // Синтаксис async/await заворачивает String в  impl Future<Output = String>   
    async fn future(name:&str) -> String {
        // use crate futures
        let f: futures::future::Ready<u32> = futures::future::ready(format!("Hello {}",name));
        //let f: futures::future::Pending<String> = futures::future::pending(); 

        // use std
        //let f: std::future::Ready<String> = std::future::ready(format!("Hello {}",name));
        //let f: std::future::Pending<String> = std::future::pending();
        f.await
    }
или
    fn future(name:&str) -> impl std::future::Future<Output = String> {
        // use crate futures
        let f: futures::future::Ready<String> = futures::future::ready(format!("Hello {}",name));
        //let f: futures::future::Pending<String> = futures::future::pending(); 
    
        // use std
        //let f: std::future::Ready<String> = std::future::ready(format!("Hello {}",name));
        //let f: std::future::Pending<String> = std::future::pending();
        f
    }
или
    fn future(name:&str) ->  impl std::future::Future<Output = String>{
        async {
            format!("Hello {}",name)
        }
    }
</code></pre>
