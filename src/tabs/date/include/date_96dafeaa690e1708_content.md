


<pre><code class="language-rust">
use std::time::{Duration, Instant}; 
fn main() {
   let now = Instant::now();

// спим в течение 2 секунд
   std::thread::sleep(std::time::Duration::new(2, 0));
   println!("{}", now.elapsed().as_secs()); // 2
}
</code></pre>

---
 
<pre><code class="language-rust">
use std::time::{Duration, Instant};
use std::thread::sleep;
fn main(){
    let now = Instant::now();// стартуем метку

// спим
    sleep(Duration::new(3, 0));// или sleep(Duration::from_secs(3));
    let new_now = Instant::now();// новая метка

// фиксируем продолжительность между отрезками
    println!("{:?}", new_now.duration_since(now).as_secs());// 3
    println!("{:?}",now.elapsed().as_secs());// 3 паникует если текущее время меньше чем текущее время
}
</code></pre>
