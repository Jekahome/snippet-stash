


<pre><code class="language-rust">
fn main(){
    let words = ["alpha", "beta", "gamma"];
    // chars() returns an iterator
    let merged: String = words.iter()
                                      .flat_map(|s| s.chars())
                                      .collect();
    assert_eq!(merged, "alphabetagamma");

    // Через map
      let words = ["alpha", "beta", "gamma"];
      // chars() returns an iterator
      let merged: String = words.iter().map(|s| s.chars()).flatten().collect();
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// Вывести по стране ее города:
    use std::collections::HashMap;
    let mut major_cities = HashMap::new();
    major_cities.insert("Japan", vec!["Tokyo", "Kyoto"]);
    major_cities.insert("The United States", vec!["Portland", "Nashville"]);
    major_cities.insert("Brazil", vec!["São Paulo", "Brasília"]);
    major_cities.insert("Kenya", vec!["Nairobi", "Mombasa"]);
    major_cities.insert("The Netherlands", vec!["Amsterdam", "Utrecht"]);
    let countries = ["Japan", "Brazil", "Kenya"];
    for &city in countries.iter().flat_map(|country| &major_cities[country]) {
         println!("{}", city);
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// Пифагоровы Тройки
    let triplets = (1u32..)
        .flat_map(|z| (1..=z).map(move |y| (y, z)))
        .flat_map(|(y, z)| (1..=y).map(move |x| (x, y, z)))
        .filter(|(x, y, z)| x*x + y*y == z*z);

    let first_ten: Vec<(u32, u32, u32)> = triplets.take(10).collect();

    // [(3, 4, 5), (6, 8, 10) ... (20, 21, 29)]
    println!("{}", first_ten)
/*
    map : трансформирует элементы последовательности
    flat_map : превращает элемент в последовательность
    filter , take , ...
    collect превращает "ленивый" итератор в коллекцию
*/
}
</code></pre>
