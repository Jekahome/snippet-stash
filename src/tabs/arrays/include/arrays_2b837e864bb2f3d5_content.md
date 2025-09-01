


<pre><code class="language-rust">
fn main(){
let mut vec = Vec::with_capacity(10); увеличивает скорость работы избегая не нужного выделения памяти в процессе работы !!!

vec.extend_from_slice(&[1,2,3,4,5,6,7,8,9,10,11]); // перераспределение емкости вектора
assert_eq!(vec.capacity(), 20);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3].iter().cloned());
assert_eq!(vec.capacity(), 10);
vec.shrink_to_fit();
assert!(vec.capacity() >= 3);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
 // После создания , резервирует емкость
//reserve(&mut self, additional: usize)
    let mut vec = vec![1];
    vec.reserve(10);
    assert!(vec.capacity() >= 11);
    //Резервирует минимальную емкость для получения еще большего количества элементов, которые нужно вставить в данный Vec 
    //Предпочитайте reserve, если ожидаются будущие вставки.
// reserve_exact(&mut self, additional: usize)
    let mut vec = vec![1];
    vec.reserve_exact(10);
    assert!(vec.capacity() >= 11);
}
</code></pre>
