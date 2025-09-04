

#### Методы std::borrow::Cow

[enum.Cow.html#method.to_mut](https://doc.rust-lang.org/std/borrow/enum.Cow.html#method.to_mut)

**into_owned()** - Извлекает имеющиеся данные.

**is_borrowed** - Возвращает true, если данные заимствованы, т.е. если to_mut потребует дополнительной работы. **nightly**

**is_owned()** - Возвращает true, если данные принадлежат пользователю, т. е. если to_mut не будет операцией no-op. **nightly**

**to_mut()** - Получает изменяемую ссылку на принадлежащую ему форму данных. Клонирует данных, если они еще не принадлежат ему.

