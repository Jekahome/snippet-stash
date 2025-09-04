


<pre><code class="language-rust">
use std::sync::{Arc, Mutex};
use std::thread;
use std::sync::mpsc;// канал
use std::sync::mpsc::{Receiver,Sender};
 
fn main() {
     let data = Arc::new(Mutex::new(vec![1u32, 2, 3]));

   // Каналы имеют две конечные точки: `Sender <T>` и `Receiver <T>`,
    //  где `T` - тип передаваемого сообщения
    let (tx, rx): (Sender<i32>, Receiver<i32>) = std::sync::mpsc::channel();// создать новый канал , tx --> rx
     for i in 0..3 {
         // clone увеличивает внутренний счетчик, и ее забирает поток
         let (data, tx) = (Arc::clone(&data), tx.clone());
         // поток завладевает data в качестве окружения замыкания
         thread::spawn(move || {
             // новый поток
             let mut data = data.lock();// lock(), который захватывает блокировку мьютекса.
             match data {
                 Ok( mut _data) => { _data[i] += 1;  },// мы свободно изменяем данные, так как у нас есть блокировка.
                 Err(e) => {}
             }
             tx.send(i as i32);// передает по каналу данные или пустой кортеж (), а затем в главном потоке ждем, пока не будут приняты все значений
             // tx.send(()) пустой кортеж () не несёт никаких данных это просто сигнал
             // мы можем отправить по каналу любое значение, которое реализует типаж Send
         });
     }
     //println!("{:?}",data);// Mutex { data: [1, 2, 3] } еще не завершились потоки
   // Пробежимся по всем потокам и будем знать что они завершились
     for _ in 0..3 {
         // то что вернул после синхронизации канал
        let r = rx.recv().ok().expect("Could not receive answer");
         println!("{}",r);// 120 021 короче пралелльная работа
     }
     //thread::sleep_ms(50);
     println!("{:?}",data);// Mutex { data: [2, 3, 4] }
}
</code></pre>
