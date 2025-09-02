


<pre><code class="language-rust">
fn main(){
     use std::collections::HashMap;
    // let mut map: HashMap<&str, i32> = HashMap::new();
    let mut map: HashMap<&str, i32> = HashMap::with_capacity(10);
    map.insert("a", 1);  map.insert("b", 2);  map.insert("c", 3);

    if map.contains_key("key"){
        let x = map.get_mut("key").unwrap();  
        *x=*x+1;
     }else{
         map.insert("key",1);
     }

//contains_key(key) проверяет наличие ключа
    assert_eq!(map.contains_key("b"), true);
//get(key) Возвращает ссылку на значение, соответствующее ключу
    assert_eq!(map.get("b"), Some(&2));
    if let Some(x) = map.get_mut("b") {
        *x = 100;
    }
//keys() Итератор посещает все ключи в произвольном порядке.
    for key in map.keys() {
        println!("{}", key);
    }
//values() Итератор посещает все значения в произвольном порядке.
    for val in map.values() {
        println!("{}", val);
    }
    for val in map.values_mut() {
        *val = *val + 10;
    }
// проход по HashMap
    for (key, value) in &map {
        println!("{}: \"{}\"", key, value);
    }
    for (key, val) in map.iter() {
        println!("key: {} val: {}", key, val);
    }
    for (_, val) in map.iter_mut() {
        *val *= 2;
    }
    //remove(key) Удаляет ключ с карты, возвращая значение в ключе, если ключ был ранее в map
    map.insert("a", 1);
    assert_eq!(map.remove("a"), Some(&1));
    //remove_entry(key) Удаляет ключ с карты, возвращая сохраненный ключ и значение, если ключ был ранее в map.
    assert_eq!(map.remove_entry("b"), Some(( "b",2)));
}
</code></pre>
