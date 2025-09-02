


<pre><code class="language-rust">
fn main(){
// Создает итератор из диапазона
    // паникует если srart > end или start == end
    use std::collections::BTreeMap;
    use std::ops::Bound::Included;

    let mut map = BTreeMap::new();
    map.insert(3, "a");
    map.insert(5, "b");
    map.insert(8, "c");
    for (&key, &value) in map.range((Included(&4), Included(&8))) {
        println!("{}: {}", key, value);
    }
    assert_eq!(Some((&5, &"b")), map.range(4..).next());
}
</code></pre>
