


<pre><code class="language-rust">
use rayon::ThreadPool;
fn main(){
// Создается пул потоков с 22 потоками
    let pool:ThreadPool = rayon::ThreadPoolBuilder::new().num_threads(22).build().unwrap();
//Чтобы вместо этого создать глобальный пул потоков, используйте build_global():
   // rayon::ThreadPoolBuilder::new().num_threads(22).build_global().unwrap();
}
</code></pre>

**install** - Выполняется op в threadpool. Любые попытки использовать  join, scope или параллельные итераторы будут работать в пределах этого ThreadPool.
<pre><code class="language-rust">
use rayon::ThreadPool;
fn main(){
    let pool:ThreadPool = rayon::ThreadPoolBuilder::new().num_threads(22).build().unwrap();
    let n = pool.install(|| fib(20));
    println!("{}", n);
    fn fib(n: usize) -> usize {
        if n == 0 || n == 1 {
            return n;
        }
        let (a, b) = rayon::join(|| fib(n - 1), || fib(n - 2)); // runs inside of `pool`
        return a + b;
    }
}
</code></pre>


**current_num_threads** - Возвращает (текущее) количество потоков в пуле потоков.
<pre><code class="language-rust">
use rayon::ThreadPool;
fn main(){
    let pool:ThreadPool = rayon::ThreadPoolBuilder::new().num_threads(22).build().unwrap();
    println!("current_num_threads = {}", pool.current_num_threads());// 22
}
</code></pre>


**scope** - Создает область действия, которая выполняется в этом пуле потоков. Эквивалентно `pool.install(|| my_func(...))`
<pre><code class="language-rust">
use rayon::ThreadPool;
fn main(){
    let pool:ThreadPool = rayon::ThreadPoolBuilder::new().num_threads(22).build().unwrap();
    let mut v:Vec<usize> = vec![];
    pool.scope(|s| {
        let mut v2 = &mut v;
        s.spawn(move |s| { // task s.1
            v2.push(1);
           // println!("Name thread = {} ,ID = {:?}",thread::current().name().unwrap_or("unknown name"),thread::current().id());
        });
    });
    println!("{:?}",v);
}
</code></pre>
