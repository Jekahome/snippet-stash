


<pre><code class="language-rust">
fn main(){
    // entry(key)
    *map.entry(123).or_insert("hello")="new str";
    assert_eq!(Some(&"new str"),map.get(&123));

    // update(key,value)
    let map:HashMap<i32, &str> = map.update(123,"hello");
    assert_eq!(Some(&"hello"),map.get(&123));

     // update_with(key,value,F) Если есть ключ 123 тогда значение дает F
    let map:HashMap<i32, &str> = map.update_with(123,"hello",|k,v| "hello 2" );
     assert_eq!(Some(&"hello 2"),map.get(&123));
     
    //update_lookup_with_key(key,value,F)
    let (old_value,map) = map.update_lookup_with_key(123,"hello 2",|k,v,oldV| "hello 3" );
    assert_eq!(Some("hello 2"),old_value);
    assert_eq!(Some(&"hello 3"),map.get(&123));

    // alter(F,key)
    let mut map:HashMap<i32, &str> = map.alter( |oldV|{Some("hello")} ,123);
    assert_eq!(Some(&"hello"),map.get(&123));

    // without(key)
    map.insert(124, "hello 2");
    let map:HashMap<i32, &str> = map.without(&123);
    assert_eq!(hashmap!{124 => "hello 2"},map);

    //extract(key)
     let (v,map) = map.extract(&124).unwrap();
     assert_eq!(v, "hello 2" );
     assert_eq!(map, HashMap::<i32, &str>::new());
}
</code></pre>
