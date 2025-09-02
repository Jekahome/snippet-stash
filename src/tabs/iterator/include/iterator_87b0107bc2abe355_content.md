

Существует несколько вариаций метода zip, которые позволяют объединять два итератора в один, создавая кортежи из соответствующих элементов. 

Это позволяет легко обрабатывать данные, поступающие из разных источников, одновременно 
<pre><code class="language-rust">
use std::iter::zip;
fn main(){
    let xs = [1, 2, 3];
    let ys = [4, 5, 6];
    let mut iter = zip(xs, ys);
    assert_eq!(iter.next().unwrap(), (1, 4));
    assert_eq!(iter.next().unwrap(), (2, 5));
}
</code></pre>
