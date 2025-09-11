


Устранение несоответствия ABI C
```
#![feature(repr_transparent)]

#[repr(transparent)]
struct Grams(f64);

#[repr(transparent)]
struct Millimeters(f64);
```
