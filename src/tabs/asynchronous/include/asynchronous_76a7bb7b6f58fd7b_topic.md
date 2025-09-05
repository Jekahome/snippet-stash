

#### crate futures

futures — это библиотека, которая предоставляет дополнительные инструменты для работы с Future и Stream, 
такие как:
- Различные утилиты для комбинаторов, которые упрощают работу с цепочками вызовов (join_all, and_then).
- Множественные типы Future и Stream, которые используются для создания сложных асинхронных операций.
- future::poll_fn и другие вспомогательные функции, которые позволяют создавать кастомные Future

futures может быть полезен, если вы:
- Хотите использовать дополнительные утилиты для комбинаторов, обработки ошибок и управления потоками выполнения.
- Разрабатываете библиотеки или инструменты, которые должны работать вне зависимости от конкретного асинхронного рантайма, и вам нужно использовать Future и Stream API, которые предоставляют больше гибкости.

[futures-rs/Homepage](https://rust-lang.github.io/futures-rs/blog/2018/07/19/new-website.html)

[Yafutures-rs/GitHub](https://github.com/rust-lang/futures-rs)
 
[futures/0.3.17](https://docs.rs/futures/0.3.17/futures/index.html)
 
[utures-tutorial/Комбинаторы](https://rustycrate.ru/%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5/2016/09/16/futures-tutorial.html#kombinatory-future)

