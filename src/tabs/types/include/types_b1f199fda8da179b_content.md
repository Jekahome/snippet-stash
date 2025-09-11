

Иногда полезно добавить дополнительную безопасность типов, введя новые типы . Например, код, обрабатывающий числовые значения в различных единицах измерения, таких как миллиметры, сантиметры, граммы, килограммы и т. д., может захотеть использовать систему типов, чтобы исключить такие ошибки, как добавление миллиметров к граммам

Другое использование новых типов включает использование PhantomData для добавления времени жизни к необработанным указателям или для реализации шаблона Phantom type «фантомных типов».

```rust
use std::ops::Add;

struct Millimeters(f64);
struct Grams(f64);

impl Add<Millimeters> for Millimeters {
    type Output = Millimeters;

    fn add(self, other: Millimeters) -> Millimeters {
        Millimeters(self.0 + other.0)
    }
}
// Likewise: impl Add<Grams> for Grams {}
fn main(){}
```
