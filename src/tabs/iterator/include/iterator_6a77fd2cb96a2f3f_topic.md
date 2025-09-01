

**Адаптеры**

Combining with other iterators

* **chain**`(IntoIterator<Item = T>) -> Iterator<Item = T>` - дописывает итератор в конец итератора
* **zip**`(IntoIterator<Item=U>)->Iterator<Item=(T,U)>` - два итератора в один итератор пар соответствии позиции
* **array_chunks**`<const N: usize>(self) -> ArrayChunks<Self, N>` - Возвращает итератор по N элементам итератора одновременно
* **unzip**`<A, B, FromA, FromB>(self) -> (FromA, FromB)`  - потребляет весь итератор пар, создавая две коллекции: одну из левых элементов пар и одну из правых элементов.
* **scan**`(S, (&mut S, T) -> Option<U>) -> Iterator<Item = U>` - как fold но возвращает новый итератор
* **fuse**`(self) -> Fuse<Self>` - Создает итератор, который заканчивается после первого [None]
