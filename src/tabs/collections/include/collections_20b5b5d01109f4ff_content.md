


<pre><code class="language-rust">
fn main(){
// append(BTreeMap) перемещает значения затирая совпавшие ключи, источник расходуется
    let mut a = BTreeMap::new();
    a.insert(10, "a");
    a.insert(2, "b");
    a.insert(3, "c");

    let mut b = BTreeMap::new();
    b.insert(3, "d");//
    b.insert(4, "e");
    b.insert(5, "f");

    a.append(&mut b);
    println!("{:#?}",a);
}
</code></pre>
