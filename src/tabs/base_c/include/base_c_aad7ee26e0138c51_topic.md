

**Проблема обычного union — компилятор НЕ знает, какой тип сейчас хранится**

Компилятор НЕ следит за тем, "что сейчас в union лежит"

Вариантный тип (tagged union) решает эту проблему

Это уже НЕ просто union, это 100% безопаснее обычного union

Это struct, содержащая:
* tag — тип данных
* union — сами данные

Для чего нужен tagged union?
* JSON-парсер в C
* AST-узел в компиляторе
* Реализация std::variant из C++
* События (event system)


Идея tagged union — как в Rust enum

```
enum Value {
    Int(i32),
    Float(f32),
    Str(String)
}
```
