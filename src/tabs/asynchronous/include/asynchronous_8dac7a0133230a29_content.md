

```
use futures::prelude::*;
fn poll_widget() -> futures::Async<u32> {
    let mut rng = thread_rng();
    let n: u32 = rng.gen_range(0, 100);
    if n > 89{
      futures::Async::Ready(n)
    }else{
     futures::Async::NotReady
    }
}
#[derive(Debug)]
pub struct MyTask(String);

impl Future for MyTask {
    type Item = String;
    type Error = ();

    fn poll(&mut self) -> Result<futures::Async<String>, ()> {
        let mut rng = thread_rng();
        let n: u32 = rng.gen_range(0, 100);
        if n > 89{
            println!(""Результат = {:?}"", n);
            Ok(futures::Async::Ready(format!(""{}"",n)))
        }else{
            Ok(futures::Async::NotReady)
        }

        /* 
        match poll_widget() {
            futures::Async::Ready(widget) => {
                println!(""widget={:?}"", widget);
                Ok(futures::Async::Ready(()))
            }
            futures::Async::NotReady => {
                Ok(futures::Async::NotReady)
            }
        }
        */
    }
}
```
