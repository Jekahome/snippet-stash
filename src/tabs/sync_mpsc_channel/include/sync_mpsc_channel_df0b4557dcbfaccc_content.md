

Есть поток и надо что-либо в него передать.
Передача изменяемых данных не копируя их - синхронизированные изменяемые данные.
<pre><code class="language-rust">
use std::sync::mpsc::channel;
fn main(){
    let (tx,rx) = channel();
    let result = std::thread::spawn( move ||{ 
        let mut xs:Vec<i32> = rx.recv().unwrap();// Ресивер получает данные
        xs[2]=10;
        xs.push(40);
        println!("{:?}",xs);// [1, 2, 10, 40]
    });

    let mut xs = vec![1,2,3];// буффер останется в куче передается только ссылка на буффер
    tx.send(xs).unwrap();// Трансмитер отправляет данные

    result.join();// результат получим после отправки в канал данных иначе зависнем
}
</code></pre>
