


<pre><code class="language-rust">
fn main(){
    // extract_with_key(key)
    let mut map:HashMap<i32, &str> = HashMap::<i32, &str>::new();
     map.insert(123, "hello");
    let value:(i32,&str,HashMap::<i32, &str>) = map.extract_with_key(&123).unwrap();
    assert_eq!(123,value.0);// old key
    assert_eq!("hello",value.1);// old value
    assert!(value.2.is_empty());// current map

    // union(map)
    let map1 = hashmap!{1 => 1, 3 => 3};
    let map2 = hashmap!{2 => 2, 3 => 4};
    assert_eq!(hashmap!{1 => 1, 2 => 2, 3 => 3}, map1.union(map2));

    // union_with(map,F) сами решаем какое значение при совпадении брать
    let map1 = hashmap!{1 => 1, 3 => 3};
    let map2 = hashmap!{2 => 2, 3 => 4};
     assert_eq!(hashmap!{1 => 1, 2 => 2, 3 => 4}, map1.union_with(map2,|v1,v2|{ v2}));

    // union_with_key(map,F) сами решаем какое значение при совпадении брать , ключ в помощь
    let map1 = hashmap!{1 => 1, 3 => 3};
    let map2 = hashmap!{2 => 2, 3 => 4};
    assert_eq!(hashmap!{1 => 1, 2 => 2, 3 => 4},map1.union_with_key(map2,|k,v1,v2|{v2 }));

    // unions(core::iter::IntoIterator)
    // https://doc.rust-lang.org/nightly/core/iter/trait.IntoIterator.html
    let map1 = hashmap!{1 => 1, 3 => 3};
    let map2 = hashmap!{2 => 2};
    assert_eq!(hashmap!{1 => 1, 2 => 2, 3 => 3}, HashMap::unions(vec![map1, map2]));

    // unions_with(core::iter::IntoIterator, F) unions_with_key(core::iter::IntoIterator, F)
    let map1 = hashmap!{1 => 1, 3 => 3};
    let map2 = hashmap!{1 => 10,2 => 2};
    assert_eq!(hashmap!{1 => 10, 2 => 2, 3 => 3},  HashMap::unions_with(vec![map1, map2],|v1,v2|{v2}));
    //assert_eq!(hashmap!{1 => 10, 2 => 2, 3 => 3},  HashMap::unions_with_key(vec![map1, map2],|k,v1,v2|{v2}));

    // difference(map)
    let map1 = hashmap!{1 => 1, 3 => 4};
    let map2 = hashmap!{2 => 2, 3 => 5};
    assert_eq!(hashmap!{1 => 1, 2 => 2}, map1.difference(map2));

    // difference_with(map,F) difference_with_key(map,F)
    let map1 = hashmap!{1 => 1, 3 => 4};
    let map2 = hashmap!{2 => 2, 3 => 5};
    // assert_eq!(hashmap!{1 => 1, 2 => 2}, map1.difference_with(map2,|v1,v2|{None}));
    assert_eq!(hashmap!{1 => 1, 2 => 2, 3 => 5}, map1.difference_with(map2,|v1,v2|{Some(v2)}));
    //assert_eq!(hashmap!{1 => 1, 2 => 2, 3 => 5}, map1.difference_with_key(map2,|k,v1,v2|{Some(v2)}));
}
</code></pre>
