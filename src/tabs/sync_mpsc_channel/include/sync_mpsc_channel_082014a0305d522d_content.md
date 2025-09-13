

```
use std::sync::mpsc::{Sender, Receiver};
use std::thread::JoinHandle;
fn test2() {
    let (tx, rx): (Sender<String>, Receiver<String>) = mpsc::channel::<String>();
    // Создаем 2 потока и в каждом клонируем передатчик tx который отправляет данные в общий приемник rx
    for i in (0..2){
       let  tx_ = mpsc::Sender::clone(&tx);
        thread::Builder::new().name(i.to_string()).spawn(move || {
            let vals = vec![
                format!("{} {}", "hi ", thread::current().name().unwrap_or("unknown name")),
                format!("{} {}", "from ", thread::current().name().unwrap_or("unknown name")),
                format!("{} {}", "the ", thread::current().name().unwrap_or("unknown name")),
                format!("{} {}", "thread ", thread::current().name().unwrap_or("unknown name"))
            ];
            for val in vals {
                tx_.send(val).unwrap();
                thread::sleep(Duration::from_secs(1));
            }
        });
     }
    /*let mut ids = Vec::with_capacity(8usize);
   for _ in 0..8 {
       ids.push(rx.recv());
   }
   for val in ids {
       println!("Got: {:?}", val);
   }*/
    // Что бы не зависало нужно получить все данные из оригинального Sender tx а не клона его или через фиксированный цикл итераций
    let  tx_ = mpsc::Sender::clone(&tx);
    thread::Builder::new().name("tx".to_string()).spawn(move || {
        let vals = vec![
            format!("{} {}", "hi ", thread::current().name().unwrap_or("unknown name")),
            format!("{} {}", "from ", thread::current().name().unwrap_or("unknown name")),
            format!("{} {}", "the ", thread::current().name().unwrap_or("unknown name")),
            format!("{} {}", "thread ", thread::current().name().unwrap_or("unknown name"))
        ];
        for val in vals {
            tx_.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

   std::mem::drop(tx);
   
    while let Ok(j) = rx.recv() {
        println!("Got: {:?}", j);
    }
}
```
