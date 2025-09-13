

Trait `std::cmp::PartialEq` - отношение частичной эквивалентности

Как я могу сравнить два разных типа?

```
pub trait PartialEq<Rhs = Self>
where
    Rhs: ?Sized,
{
    // Required method
    fn eq(&self, other: &Rhs) -> bool;

    // Provided method
    fn ne(&self, other: &Rhs) -> bool { ... }
}
```


 




