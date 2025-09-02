


<pre><code class="language-rust">
fn main(){
// Сохраняется порядок сортировки
    let mut a:BTreeMap<i32,&str> = BTreeMap::new();
    a.insert(10, "a");
    a.insert(2, "b");
    a.insert(3, "c");
    println!("{:?}",a);// {2: "b", 3: "c", 10: "a"}

    let mut a = BTreeMap::new();
    a.insert("d", 1);
    a.insert("c", 1);
    a.insert("a", 1);
    println!("{:?}",a);// {"a": 1, "c": 1, "d": 1}
}
</code></pre>
