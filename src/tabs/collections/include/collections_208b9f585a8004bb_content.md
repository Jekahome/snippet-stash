


<pre><code class="language-rust">
fn main(){
   let mut map = BTreeMap::new();
    // let mut map: BTreeMap<&str, i32> = ["Alice", "Bob", "Carol", "Cheryl"].iter().map(|&s| (s, 0)).collect();

    if ! map.is_empty() {
        map.len()
    }

// Ключом может быть любая заимствованная форма типа ключа карты, но порядок в заимствованной форме должен соответствовать порядку по типу ключа.

 //insert(value) Вставляет пару ключ-значение в карту.
   // Если на карте не было этого ключа, возвращается None.
   // Если на карте действительно присутствовал этот ключ, значение обновляется, и возвращается старое значение.
    assert_eq!(None,map.insert(1, "a"));
    assert_eq!(Some("a"),map.insert(1, "c"));
   // map.insert("a", 1); ключи одного типа

// remove(key) Удаляет ключ с карты, возвращая значение в ключе, если ключ был ранее на карте.
    assert_eq!(map.remove(&1), Some("c"));

// contains_key(key) проверяет существование значения для ключа
    if map.contains_key(&1) == true {
        // get() Возвращает ссылку на значение, Option
        if let Some(v) = map.get(&1){
            println!("{}",v);
        }
        //  Возвращает измененную ссылку на значение,Option
        if let Some(x) = map.get_mut(&1) {
            *x = "b";
        }
    }

    //clear() Очищает карту, удаляя все значения.
    if !map.is_empty(){
        map.clear();
    }
}
</code></pre>
