


<pre><code class="language-rust">
use std::collections::VecDeque;
fn main(){
    let mut buf: VecDeque<u32> = VecDeque::with_capacity(10);
    // let mut buf = VecDeque::new();
    buf.push_front(1);;//push_front Добавляет элемент в начало
    buf.push_back(3);//push_back  Добавляет элемент в конец
    assert_eq!(buf.front(), Some(1));//back Предоставляет ссылку на первый элемент
    assert_eq!(3, *buf.back().unwrap());//back Предоставляет ссылку на последний элемент // back_mut изменяемая  ссылка
    assert_eq!(buf.pop_back(), Some(3)); //pop_back  Удаляет последний элемент из VecDequeи возвращает его, или Noneесли он пуст
    assert_eq!(buf.pop_front(), Some(1));//pop_front Удаляет первый элемент и возвращает его
}
</code></pre>
