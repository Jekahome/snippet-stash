


<pre><code class="language-rust">
use std::collections::btree_map::BTreeMap;
fn main(){
    // У клиента бара измерен уровень алкоголя в крови
    struct Person { blood_alcohol: f32 }

   // Все заказы, сделанные в баре, по идентификатору клиента.
    let orders = vec![1,2,1,2,3,4,1,2,2,3,4,1,1,1];

   // Наши клиенты.
    let mut blood_alcohol = BTreeMap::new();

    for id in orders {
        // Если мы видим этого клиента впервые, инициализируйте его
        // без алкоголя в крови. В противном случае просто извлеките их.
        let person = blood_alcohol.entry(id).or_insert(Person { blood_alcohol: 0.0 });

        // Снизьте уровень алкоголя в крови. Заказ и распитие пива занимают время!
        person.blood_alcohol *= 0.9;

        // Проверьте, достаточно ли они трезвы, чтобы выпить еще пива.
        if person.blood_alcohol > 0.3 {
            // Слишком пьян...  
            println!("Sorry {}, I have to cut you off", id);
        } else {
            // еще пива
            person.blood_alcohol += 0.1;
        }
    }
}
</code></pre>
