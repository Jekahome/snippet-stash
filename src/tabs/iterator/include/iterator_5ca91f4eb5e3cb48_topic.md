

Реализация **IterMut**

 IterMut::next ЭТО МУТАБЕЛЬНАЯ ССЫЛКА НА ДАННЫЕ ПЕРВОИСТОЧНИКА
 КАЖДАЯ ИТЕРАЦИЯ ЭТО УНИКАЛЬНАЯ МУТАБЕЛЬНАЯ ССЫЛКА ПОЭТОМУ ЕЕ СЛЕДУЕТ ПОДМЕНЯТЬ НА СЛЕДУЮЩИЕ ДАННЫЕ ПЕРВОИСТОЧНИКА
 ПОДМЕН В ПАМЯТИ ДЛЯ `Option<>` метод `take()`
ДЛЯ других типов  `std::mem::replace(&mut self.next, None)`     

[digitrain.ru/questions/61978903](https://digitrain.ru/questions/61978903/)

[second-iter-mut](https://rust-unofficial.github.io/too-many-lists/second-iter-mut.html)
