

**Адаптеры** Reversing and cycling

* **rev**`() -> Iterator<Item = T>` - Изменяет направление итератора на обратное
* **cycle**`() -> Iterator<Item = T> where Self: Clone` - Повторяет итератор бесконечно
* **cloned**`() -> Iterator<T> where T: Clone` - Создает итератор, который клонирует все его элементы ссылки
* **copied**`() -> Iterator<T> where T: Copy` - Создает итератор, который копирует все его элементы. 
Это полезно, когда у вас есть итератор над &T, но вам нужен итератор над T.
* **by_ref**`(&mut self) -> &mut Self` - Заимствует итератор, а не потребляет его. Это полезно, чтобы разрешить применение адаптеров итератора при сохранении права собственности на исходный итератор.

[method.copied](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.copied)
