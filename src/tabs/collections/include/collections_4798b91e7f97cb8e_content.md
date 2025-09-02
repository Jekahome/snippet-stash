

<pre><code class="language-rust">
fn main(){
// Разделяет коллекцию на две по заданному ключу.
    let mut a = BTreeMap::new();
    a.insert(1, "a");
    a.insert(2, "b");
    a.insert(3, "c");
    a.insert(17, "d");
    a.insert(41, "e");

    let b = a.split_off(&3);

    println!("{:?}",b );// {3: "c", 17: "d", 41: "e"}
    println!("{:?}",a );// {1: "a", 2: "b"}
}
</code></pre>
