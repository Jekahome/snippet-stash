

Создает новый итератор, где каждая итерация вызывает предоставленное закрытие `F: FnMut() -> Option<T>`
<pre><code class="language-rust">
fn main(){
    let mut count = 0;
    let counter = std::iter::from_fn(move || {
        // Увеличиваем счёт. Вот почему мы начали с нуля.
        count += 1;

        // Проверьте, закончили ли мы подсчет или нет.
        if count < 6 {
            Some(count)
        } else {
            None
        }
    });
    assert_eq!(counter.collect::<Vec<_>>(), &[1, 2, 3, 4, 5]);
}
</code></pre>
