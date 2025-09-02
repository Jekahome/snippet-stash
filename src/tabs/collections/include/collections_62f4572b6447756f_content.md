

Если вы вставляете значение, которое уже присутствует в HashSet (т.е. новое значение равно существующим, и оба они имеют одинаковый хеш), новое значение заменяет старое.
<pre><code class="language-rust">
use std::collections::HashSet;
fn main() {
   #[derive(Hash, Eq, PartialEq, Debug)]
    struct Viking {
        name: String,
        power: usize,
    }

    let mut vikings = HashSet::new();
    // let viking_names: HashSet<&'static str> = [ "Einar", "Olaf", "Harald" ].iter().cloned().collect();

    vikings.insert(Viking { name: "Einar".to_string(), power: 9 });
    vikings.insert(Viking { name: "Einar".to_string(), power: 9 });
    vikings.insert(Viking { name: "Olaf".to_string(), power: 4 });
    vikings.insert(Viking { name: "Harald".to_string(), power: 8 });

    for x in &vikings {
        println!("{:?}", x);
    }

    let viking:Viking  = Viking { name: "Einar".to_string(), power: 9 };
    if vikings.contains(&viking) {
        println!("{:?}",vikings.get(&viking));// Some(Viking { name: "Einar", power: 9 })
    }
}
</code></pre>
