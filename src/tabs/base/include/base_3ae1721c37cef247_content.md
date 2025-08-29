

**Первый вариант: громоздкий**
<pre><code class="language-rust">
struct MyStruct;
impl !Send for MyStruct {}
impl !Sync for MyStruct {}
</code></pre>

**Второй вариант: с лишними данными внутри структуры**
<pre><code class="language-rust">
// Если типы внутри структуры есть Send и Sync то и структура тоже.
struct MyStruct {
    // adds 8 bytes to every instance
    _not_send_or_sync: std::rc::Rc<()>,
}
</code></pre>

**Третий вариант: без лишних данных**
<pre><code class="language-rust">
// Можно использовать маркер PhantomData:
type NotSendOrSyncPhantom = std::marker::PhantomData<std::rc::Rc<()>>;// Rc это !Send !Sync
struct MyStruct {
    // не добавляет дополнительного размера экземплярам
    _not_send_or_sync: NotSendOrSyncPhantom,
}
</code></pre>





