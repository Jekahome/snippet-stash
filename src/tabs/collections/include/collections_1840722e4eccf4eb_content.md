


<pre><code class="language-rust">
fn main(){
// map.entry() возвращает Enum Entry означающий есть ключ или нет ключа
    let mut map: HashMap<&str, u32> = HashMap::new();
    match map.entry("poneyland") {
        Entry::Occupied(object_OccupiedEntry) => { println!("Значение {}",object_OccupiedEntry.get());},
        Entry::Vacant(object_VacantEntry) =>  println!("Ключ {}",object_VacantEntry.key())
    };

// или короче
// entry().or_insert() Если entry вернуло Vacant то вставка иначе вернет Occupied с объектом
    map.entry("poneyland").or_insert(12);// Entry(VacantEntry("poneyland"))

    *map.entry("poneyland").or_insert(12)+=10;// Entry(OccupiedEntry { key: "poneyland", value: 12 })

// entry().or_insert_with вставка при отсутствии ключа с помощью замыкания
    // map.entry("poneyland").or_insert_with(|| 100);

// entry().key() возвращает ключ
    println!("{:?}", map.entry("poneyland").key()); // poneyland


//  entry().and_modify() в случае (Occupied) присутствия ключа изменяет значение через замыкание
    map.entry("poneyland")
        .and_modify(|e| { *e += 1 })
        .or_insert(12);
    assert_eq!(map["poneyland"], 13);
    
//  вставляет значение по умолчанию для типа, если для текущего ключа не существует записи
// entry().or_default() не пашет вместо нее
    map.entry("poneyland").or_insert_with(Default::default);
}
</code></pre>
