

В этом примере мы создаем свою версию типа `Result`,
 который всегда будет использовать перечисление ConcreteError в `Result<T, E>` вместо типа `E`
```
  use std::result;

  enum ConcreteError {
       Foo,
       Bar,
   }

  type Result<T> = result::Result<T, ConcreteError>;
```
