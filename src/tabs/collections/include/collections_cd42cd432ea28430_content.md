


<pre><code class="language-rust">
fn main(){
// Vacant(VacantEntry<'a, K, V>) свободная запись
// key()  insert(value) into_key()
    let mut map: HashMap<&str, u32> = HashMap::new();

    if let Entry::Vacant(object_VacantEntry) = map.entry("poneyland"){

        // VacantEntry.key()
         println!("Ключ {} свободен",object_VacantEntry.key());

        // VacantEntry.insert(value) вставка значения с созданным ключем.После это расходуется VacantEntry
        let value = object_VacantEntry.insert(12);
        println!("value:{:?}",value);// value:12

        // VacantEntry.into_key() расходует ключ если небыло вставки до этого
        //let key = object_VacantEntry.into_key();
        //println!("key:{}",key);
    };
}
</code></pre>
