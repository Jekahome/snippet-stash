

Для реализации **std::iter::IntoIterator** для типа A необходимо:
- реализовать std::iter::Iterator для оболочки WraperA
- а для A реализовать std::iter::IntoIterator

Для возможности использовать ссылку для into_iter() следует реализовать `IntoIterator for &'a A` и `impl<'a> IntoIterator for &'a mut A`

(Если тип является итерируемым, мы почти всегда используем некий пользовательский тип итератора, который выполняет итерацию по нему, а не пытается заставить его выполнять итерацию по самому себе)


Если для типов **IntoIterator** есть реализации по ссылке, то не будет потребления значения
```
impl<T> IntoIterator for Vec<T>
impl<'a, T> IntoIterator for &'a Vec<T>
impl<'a, T> IntoIterator for &'a mut Vec<T>
```
