

```
use std::time::Duration;
fn test_crossbeam(){
    let (tx, rx): (crossbeam_channel::Sender<&str>, crossbeam_channel::Receiver<&str>) = crossbeam_channel::unbounded();
    let (tx2, rx2): (crossbeam_channel::Sender<&str>, crossbeam_channel::Receiver<&str>) = crossbeam_channel::unbounded();

     thread::spawn(move || {
         std::thread::sleep(Duration::new(2, 0));
         tx.send("Hello");
     });
    thread::spawn(move || {
        std::thread::sleep(Duration::new(2, 0));
        tx2.send("Hi");
    });

   /* select! {
       recv(rx, msg) => println!("Message: {:?}",msg.unwrap()),
       recv(rx2, msg) => println!("Message: {:?}",msg.unwrap()),
       default => println!("the channel is full"),
    }*/
    
    let timeout = Duration::from_millis(100);

    select! {
        recv(rx, msg) => match msg {
            Some(msg) => println!("received {:?}", msg),
            None => println!("the channel is closed"),
        }
         recv(rx2, msg) => match msg {
            Some(msg) => println!("received {:?}", msg),
            None => println!("the channel is closed"),
        }
    recv(crossbeam_channel::after(timeout)) => println!("timed out; the channel is still empty"),
    }
}
```
