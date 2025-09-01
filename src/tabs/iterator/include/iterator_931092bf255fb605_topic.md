

**Адаптеры**

**flat_map**`<U, F>(self, f: F) -> FlatMap<Self, U, F>`  - Создает итератор, который работает как map, но выравнивает вложенную структуру

Замыкание map возвращает один элемент для каждого элемента, а Замыкание `flat_map()` возвращает итератор для каждого элемента. Превращает элемент в последовательность

**flatten**`(self) -> Flatten<Self>` - Создает итератор, выравнивающий вложенную структуру.
(хотите удалить один уровень косвенности)

[method.flatten](https://doc.rust-lang.org/nightly/std/iter/trait.Iterator.html#method.flatten)

[method.fuse](https://doc.rust-lang.org/nightly/std/iter/trait.Iterator.html#method.fuse)

