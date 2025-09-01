

Инструкция `for in` неявно вызывает для коллекции реализацию **into_iter** которая потребляет коллекцию и она после недоступна
<pre><code class="language-rust">
fn main(){
    let xs = [1,2,3];
    let xs = vec![1,2,3];
    let mut it = xs.into_iter();
    while let Some(x) = it.next() {
        println!("{:?}",x);    
    }
}
</code></pre>
