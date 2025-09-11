

**Первый вариант: громоздкий**
```
struct MyStruct;
impl !Send for MyStruct {}
impl !Sync for MyStruct {}
```

**Второй вариант: с лишними данными внутри структуры**
```
// Если типы внутри структуры есть Send и Sync то и структура тоже.
struct MyStruct {
    // adds 8 bytes to every instance
    _not_send_or_sync: std::rc::Rc<()>,
}
```

**Третий вариант: без лишних данных**
```
// Можно использовать маркер PhantomData:
type NotSendOrSyncPhantom = std::marker::PhantomData<std::rc::Rc<()>>;// Rc это !Send !Sync
struct MyStruct {
    // не добавляет дополнительного размера экземплярам
    _not_send_or_sync: NotSendOrSyncPhantom,
}
```





