


<pre><code class="language-rust">
fn main(){
    //Двоичный поиск сортированного вектора для данного элемента.
    let mut vec:Vector<&str> = vector!["d","b","a","c"];
    vec.sort_by(|left, right| left.cmp(right));
    println!("Index:{}",vec.binary_search(&"d").unwrap());
    assert_eq!(3,vec.binary_search(&"d").unwrap());
    assert_eq!(3,vec.binary_search_by(|val|val.cmp(&"d")).unwrap());

    //Двоичный поиск выполняет этот отсортированный срез с функцией извлечения ключа
    let mut vec:Vector<(&str,i32)> = vector![("d",4),("b",40),("a",5),("c",41)];
    vec.sort_by(|left, right| left.0.cmp(right.0));
    println!("vec:{:?}",vec);// ("a", 5), ("b", 40), ("c", 41), ("d", 4)
    println!("Index:{}",vec.binary_search_by_key(&"d", |&(a,b)| a).unwrap());// Index:3
}
</code></pre>
