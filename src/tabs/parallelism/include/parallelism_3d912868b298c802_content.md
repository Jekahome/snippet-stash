


<pre><code class="language-rust">
fn main(){
//par_chars Возвращает итератор по символам строкового среза 
    let word = "hello";
    let mut chars = word.par_chars();
    let mut v: Vec<char> = vec![];
    chars.for_each(|mut s|  {
        print!("{}",s);
    });// ehllo
}
</code></pre>

---

<pre><code class="language-rust">
use std::sync::mpsc::channel;
fn main(){
    let mut chars = word.par_chars();
    let (sender, receiver) = channel();
    chars.for_each_with(sender, |s, mut x| {  s.send(x.to_uppercase().to_string()).unwrap()});
    let mut res: String = receiver.iter().collect::<String>();
    println!("{}",res);// LHLOE
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let (sender, receiver) = channel();
    (0..5).into_par_iter().for_each_with(sender, |s, x| s.send(x).unwrap());
    let mut res: Vec<_> = receiver.iter().collect();
    res.sort();
    assert_eq!(&res[..], &[0, 1, 2, 3, 4]);
}
</code></pre>


**par_char_indices** - Возвращает параллельный итератор над символами строки с их позициями.
<pre><code class="language-rust">
fn main(){
    let min = "hello".par_char_indices().min_by_key(|&(_i, c)| c as i32);
    assert_eq!(Some((1, 'e')), min);
}
</code></pre>


**par_bytes** - Возвращает параллельный итератор по байтам строки
<pre><code class="language-rust">
fn main(){

    let max = "hello".par_bytes().max();
    assert_eq!(Some(b'o'), max);
    //string.as_bytes().par_iter().cloned()
}
</code></pre>


**par_split** - Возвращает параллельный итератор над подстроками, разделенными заданным символом или предикатом, похожим на str::split

**par_split_terminator** - не создает пустую подстроку после концевого терминатора
<pre><code class="language-rust">
fn main(){

    let total = "1, 2, buckle, 3, 4, door"
        .par_split(',')
        .filter_map(|s| s.trim().parse::<i32>().ok())
        .sum();
    assert_eq!(10, total);
}
</code></pre>
