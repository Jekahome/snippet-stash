

Когда вы возвращаете ссылку из функции

Рассмотрим следующую функцию, которая возвращает значение ключа, если он существует, и вставляет новое значение в противном случае (для целей этого раздела предположим, что entry API для карт не существует)
<pre><code class="language-rust">
fn get_default<'m,K,V:Default>(map: &'m mut HashMap<K,V>,key: K) -> &'m mut V {
    match map.get_mut(&key) { // -------------+ 'm
        Some(value) => value,              // |
        None => {                          // |
            map.insert(key, V::default()); // |
            //  ^~~~~~ ERROR               // |
            map.get_mut(&key).unwrap()     // |
        }                                  // |
    }                                      // |
}                                          // v
</code></pre>

Причина в том, что в `Some` ветке значение возвращается вызывающей стороне. Поскольку value это ссылка на map, это означает, что объект map будет оставаться заимствованным до некоторой точки `'m` в вызывающей стороне
<pre><code class="language-rust">
fn caller() {
    let mut map = HashMap::new();
    ...
    {
        let v = get_default(&mut map, key);         // -+ 'm
          // +-- get_default() -------------------+     |
          // | match map.get_mut(&key) {          |     |
          // |   Some(value) => value,            |     |
          // |   None => {                        |     |
          // |     ..                             |     |
          // |   }                                |     |
          // +------------------------------------+     |
        process(v);                                     |
    } // <----------------------------------------------+
    ...
}
</code></pre>

В то время как до того, как время жизни value было ограничено совпадением (2. Проблема при условном потоке управления), это новое время жизни распространяется на вызывающую, и поэтому заимствование не заканчивается только потому, что мы вышли из совпадения. Следовательно, он все еще находится в области действия, когда мы пытаемся вызвать insert после совпадения.
<pre><code class="language-rust">
fn get_default2<'m,K,V:Default>(map: &'m mut HashMap<K,V>, key: K)  -> &'m mut V {
    if map.contains(&key) {
    // ^~~~~~~~~~~~~~~~~~ 'n
        return match map.get_mut(&key) { // + 'm
            Some(value) => value,        // |
            None => unreachable!()       // |
        };                               // v
    }
    // тут никогда get_mut до этого не вызывался т. е. нет второго заимствования
    map.insert(key, V::default()); // OK now.
    map.get_mut(&key).unwrap()
}
</code></pre>

Блок `if` дал нам область, где заимствование начинается в точке `get_mut`, и это заимствование длится до точки `'m` в вызывающей стороне, и программа проверки заимствований может видеть, что это заимствование даже не началось за пределами `if`. Таким образом, он не рассматривает объем заимствования в том месте, где мы вызываем `map.insert`

Если использовать специально написанный entry API то:
<pre><code class="language-rust">
fn get_default3<'m,K,V:Default>(map: &'m mut HashMap<K,V>,key: K) -> &'m mut V {
    map.entry(key).or_insert_with(|| V::default())
}
</code></pre>



