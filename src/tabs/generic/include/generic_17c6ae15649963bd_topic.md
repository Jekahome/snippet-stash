

`dyn Ttrait`

Признак должен соответствовать особым требованиям безопасности объекта :

- Черта не может требовать `Self: Sized`.
- Метод ссылается на `Self` тип в своих аргументах или возвращаемом типе.
- Метод имеет параметры универсального типа.
- Метод не имеет получателя.
- Признак не может содержать связанные константы.
- Признак не может использоваться `Self` в качестве параметра типа в списке суперпризнаков.

[Trait object Безопасность объекта](https://doc.rust-lang.org/book/ch17-02-trait-objects.html#object-safety-is-required-for-trait-objects)

[Object Safety](https://doc.rust-lang.org/reference/items/traits.html#object-safety)

[Николас Мацакис: Особенности асинхронности Dyn, часть 2](https://smallcultfollowing.com/babysteps/blog/2021/10/01/dyn-async-traits-part-2)

 





