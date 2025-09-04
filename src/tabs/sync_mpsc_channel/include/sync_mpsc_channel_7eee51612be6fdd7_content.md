

**select!** выдаст первое пришедшее сообщение или случайное в случае одновременного прибытия
<pre><code class="language-rust">
#[macro_use]
extern crate crossbeam_channel;
fn main(){
    let (tx, rx): (crossbeam_channel::Sender<&str>, crossbeam_channel::Receiver<&str>) = crossbeam_channel::unbounded();
    let (tx2, rx2): (crossbeam_channel::Sender<&str>, crossbeam_channel::Receiver<&str>) = crossbeam_channel::unbounded();

     thread::spawn(move || {
            tx.send("Hello");
     });
     thread::spawn(move || {
           tx2.send("Hi");
    });

     select! {
          recv(rx, msg) => println!("Message: {:?}",msg.unwrap()),
          recv(rx2, msg) => println!("Message: {:?}",msg.unwrap()),
          default => println!("the channel is full"),
    }
}
</code></pre>
