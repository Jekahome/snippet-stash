


<pre><code class="language-rust">
fn main(){
let xs = Mutex::new([0,0,0,0]);

crossbeam::scope(|scope_|{
    for _ in 0..10{ // запускаем 10 потоков
        scope_.spawn(||{
            let mut guard = xs.lock().unwrap();// блокируем данные
            // теперь с данными безопасно обращаться так как мы держим блокировку Mutex
            let xs:&mut[i32;4] = &mut guard;// разименовывание Mutex
            for i in xs{
                *i+=1;
            }
        });
    }
});
println!("{:?}",*xs.lock().unwrap());// [10,10,10,10]
}
</code></pre>
