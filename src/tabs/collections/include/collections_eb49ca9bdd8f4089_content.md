


<pre><code class="language-rust">
fn main(){
    let mut count: BTreeMap<&str, usize> = BTreeMap::new();

    // подсчитайте количество вхождений букв в векторе
    for x in vec!["a","b","a","c","a","b"] {
        *count.entry(x).or_insert(0) += 1;
    }
}
</code></pre>

---

Когда пользователь вызывает `map.entry(&key)`, карта будет искать ключ, а затем выдаст вариант Entry перечисления:

Если **Vacant**(entry), ключ не был найден. В этом случае единственной допустимой операцией является insert значение в записи. Когда это будет сделано, вакантная запись будет потреблена и преобразована в изменяемую ссылку на значение, которое было вставлено. Это позволяет дополнительно манипулировать значением, превышающим время жизни самого поиска. Это полезно, если сложная логика должна выполняться над значением независимо от того, было ли значение только что вставлено.

Если **Occupied**(entry), то ключ был найден. В этом случае пользователь имеет несколько вариантов: они могут get, insert или remove значение занимаемой записи. Кроме того, они могут преобразовать занятую запись в изменяемую ссылку на ее значение, обеспечивая симметрию свободному insert случаю.
<pre><code class="language-rust">
use std::collections::btree_map::BTreeMap;
fn main(){
    let mut count = BTreeMap::new();
    let message = "she sells sea shells by the sea shore";
    // Подсчитывает количество одинаковых символов
    for c in message.chars() {
        *count.entry(c).or_insert(0) += 1;
    }
    assert_eq!(count.get(&'s'), Some(&8));

    println!("Number of occurrences of each character");
    for (char, count) in &count {
        println!("{}: {}", char, count);
    }
// Number of occurrences of each character
//  : 7 a: 2 b: 1 e: 7 h: 4 l: 4 o: 1 r: 1 s: 8 t: 1 y: 1
}
</code></pre>
