

**From полезен для выполнения преобразований между строками.**

```
impl From<&mut str> for String
impl From<&str> for String
impl From<&str> for Arc<str>
impl From<&str> for Rc<str>
impl From<&str> for Vec<u8, Global>
impl From<Cow<'_, str>> for Box<str, Global>
impl<'a> From<&'a str> for Cow<'a, str>
impl From<String> for Box<str, Global>

Если: `From<T> for U` "auto implies" => `Into<U> for T`
```
