


<pre><code class="language-rust">
use std::thread;
use std::time::Duration;
use std::sync::{Mutex,Arc};
struct Philosopher {
    name:String,
    left:usize,
    right:usize
}
impl  Philosopher{
    fn new(name:&str,left:usize,right:usize)->Self{
        Philosopher{name:name.to_string(),left:left,right:right}
    }
    fn eat(&self,table:&Table_){
        let left_=table.forks[self.left].lock().unwrap();
        thread::sleep(Duration::from_millis(150));
        let right_=table.forks[self.right].lock().unwrap();
        println!("{} начала есть.", self.name);
        thread::sleep(Duration::from_millis(1000));
        println!("{} закончила есть.", self.name);
    }
}
struct Table_{
    forks:Vec<Mutex<()>>
}

fn main(){
    let table:Arc<Table_> = Arc::new(Table_{forks:vec![Mutex::new(()),Mutex::new(()),Mutex::new(()),Mutex::new(()),Mutex::new(()) ]});
    let philosophers = vec![
        Philosopher::new("Джудит Батлер", 0, 1),
        Philosopher::new("Рая Дунаевская", 1, 2),
        Philosopher::new("Зарубина Наталья", 2, 3),
        Philosopher::new("Эмма Гольдман", 3, 4),
        Philosopher::new("Анна Шмидт", 0, 4),
    ];
    let handlers:Vec<_> = philosophers.into_iter().map(|p|{
        let table=table.clone();
        thread::spawn(move||{
            p.eat(&table);
        })
    }).collect();
    for h in handlers{
        h.join().unwrap();
    }
}
</code></pre>
