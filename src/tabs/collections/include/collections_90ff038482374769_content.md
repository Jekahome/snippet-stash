


<pre><code class="language-rust">
#[macro_use] // для hashmap!
extern crate im;
use im::hashmap::HashMap;
fn main() {
    // let map = HashMap::singleton(123, "onetwothree");
    //let mut map = hashmap!{123 => "onetwothree"};
    let mut map:HashMap<i32, &str> = HashMap::<i32, &str>::new();
    //let mut map:HashMap<i32, i32> = map.new_from();

    for i in map.iter(){
      println!("Key={} value={}",i.0,i.1);
    }

    if map.is_empty() {
      map.insert(123, "hello");
    }
    //iter
    for i in map.iter_mut(){
      *i="new str";
      println!("{:?}",i);
    }
    // keys() values()
    let keys: Vec<_> = map.keys().cloned().collect();
    println!("{:?}",keys);
    let values: Vec<&str> = map.values().cloned().collect();
    println!("{:?}",values);

    // get(key) get_mut(key)
    *map.get_mut(&123).unwrap()="hello";
    assert_eq!(map.get(&123),Some(&"hello"));

    // contains_key(key) 
    // remove(key)
    if map.contains_key(&123){
     let value:&str = map.remove(&123).unwrap();
     assert_eq!("hello",value);
    }
    //remove_with_key(key)
    map.insert(123, "hello");
    let value:(i32,&str) = map.remove_with_key(&123).unwrap();
    assert_eq!((123,"hello"),value);
}
</code></pre>
