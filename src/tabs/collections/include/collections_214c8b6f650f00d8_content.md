


<pre><code class="language-rust">
fn main(){
    // Serialize
    let mut map: HashMap<String, Vec<String>> = HashMap::with_capacity(1000);
    // ....
    let s_string = serde_json::to_string(&map).unwrap();// Serialize
    let mut f = File::open("src/helper/data_serialize/sample.json")?;//открыть/создать
    f.write_all(s_string.as_bytes())?;// запись в файл
     
    // Deserialize
    let mut f = std::fs::File::open("src/helper/data_serialize/sample.json")?;
    let mut lookup: HashMap<String, serde_json::Value> = serde_json::from_reader(&mut f).unwrap();
    let keys:Vec<String> = lookup.keys().map(|k|k.to_owned()).collect();
    let mut map: HashMap<String, Vec<String>> = HashMap::new();
    for key in keys {
        let (k, v) = lookup.remove_entry(&key).unwrap();
        let vector:Vec<String> = v.as_array().unwrap().iter().map(|v|v.as_str().unwrap().to_owned()).collect();
        map.insert(k, vector);
    }
    println!(""serialized = {:#?}"", map);                                                                                                                                                                                               
}
</code></pre>
