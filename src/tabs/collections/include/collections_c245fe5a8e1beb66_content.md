


<pre><code class="language-rust">
fn main(){
    // intersection(map) intersection_with(map) intersection_with_key(map)
    let map1 = hashmap!{1 => 1, 2 => 2};
    let map2 = hashmap!{2 => 3, 3 => 4};
    //assert_eq!(hashmap!{2 => 2}, map1.intersection(map2)); 
    //assert_eq!(hashmap!{2 => 2}, map1.intersection_with(map2,|v1,v2|{v1}));
    assert_eq!(hashmap!{2 => 3}, map1.intersection_with_key(map2,|k,v1,v2|{v2}));

    // is_submap_by(map,F) map2 полностью входит в map1 (ключи и значения их равны)
    let map1 = hashmap!{1 => 1, 2 => 2, 3 => 8 ,5 => 5};
    let map2 = hashmap!{2 => 2, 3 => 8 };
    if map2.len() <= map1.len(){
     assert!(map2.is_submap_by(map1,|v1,v2|{ v2==v1}));
    }

    // is_proper_submap_by(map,F) map2 полностью входит в map1 (ключи и значения их равны)
    // должен иметь меньше ключей
    let map1 = hashmap!{1 => 1, 2 => 2, 3 => 8 ,5 => 5};
    let map2 = hashmap!{2 => 2, 3 => 8,5 => 5};
    if map2.len() < map1.len(){
     assert!(map2.is_proper_submap_by(map1,|v1,v2|{ v2==v1}));
    }

    // is_submap(map)  map2 полностью входит в map1 (ключи и значения их равны)
    let map1 = hashmap!{1 => 1, 2 => 2, 3 => 8 ,5 => 5};
    let map2 = hashmap!{2 => 2, 3 => 8,5 => 5};
    if map2.len() <= map1.len(){
     assert!(map2.is_submap(map1));
    }
    //is_proper_submap(map) map2 полностью входит в map1 (ключи и значения их равны)
    // должен иметь меньше ключей
    let map3 = hashmap!{1 => 1, 2 => 2};
    let map4 = hashmap!{1 => 1, 2 => 2};
    assert!(!map3.is_proper_submap(map4));
}
</code></pre>
