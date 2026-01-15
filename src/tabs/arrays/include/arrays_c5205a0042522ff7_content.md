

**Консервативная проверка Drop**

Компилятор видя в сигнатуре реализации трейта Drop - `drop(&mut self)` предполагает худший случай, то что мы можем использовать self, а если self это ссылка то она должна иметь время жизни строго больше самого контейнера. 

Drop-check:
* Для generic типов `impl<T> Drop for Foo<T> { ... }` компилятор требует:

```
    T должен быть валиден на момент срабатывания drop(Foo<T>)
```

* А если `T = &'a U`, то это превращается в:

```
    'a должен переживать Foo
```

И такое поведение, является проблемой почти для всех контейнеров стандартной библиотеки:
```
Vec<T>
Box<T>
Option<T>
BinaryHeap<T>
```

Например мы бы не смогли использовать контейнер так:
```
fn f<'a>(x: &'a i32) {
    let v: Vec<&'a i32> = vec![x];
} // ❌ 'a обязан переживать v
```

Что делает `Vec<&T>` практически бесполезным, навязывая лишние lifetime-ограничения, которых в реальности нет.


**Как это исправляют** #[may_dangle] — это unsafe-обещание автора типа - Я гарантирую, что `drop()` не будет обращаться к `T`

В стандартной библиотеке Rust (std) `Vec<T>` делает:
```
unsafe impl<#[may_dangle] T> Drop for Vec<T> { … }
```
Это nightly-only feature внутри std, но сам стандартный library crate скомпилирован и доступен в stable.

И тогда компилятор:
* снимает требование «T должен быть жив»
* разрешает dangling T при drop (разрешает иметь ссылку или указатель указывающую на память, которая уже недействительна в связи с уничтожением или время жизни за пределами сроков заимствования)


```rust
#![allow(unused_variables)]
#![allow(dead_code)]
#![allow(unused_assignments)]

// nightly для #[may_dangle]
#![feature(dropck_eyepatch)] // для #[may_dangle]


use std::fmt::Debug;

#[derive(Debug)]
struct MyVec<T: Debug>{
    value: T
} 
impl<T: std::fmt::Debug> Drop for MyVec<T> {
    fn drop(&mut self) {
       println!("{:?}",self.value);
    }
}

// Вариант с #[may_dangle]
#[derive(Debug)]
struct MyVec2<T: Debug>{
    value: T
} 
// Это безопасно только если ты ручаешься, что drop() не разыменовывает T
unsafe impl<#[may_dangle]T: std::fmt::Debug> Drop for MyVec2<T> {
    fn drop(&mut self) {
       // Если твоя программа реально создаст dangling ссылку и разыменует её в drop, это UB.
       // println!("MyVec2:{:?}",self.value);
    }
}
 
fn make_myvec<'a>(x: &'a i32) -> MyVec<&'a i32> {
    MyVec { value: x }
}

fn make_myvec2<'a>(x: &'a i32) -> MyVec2<&'a i32> {
    MyVec2 { value: x }
}

fn make_vec<'a>(x: &'a i32) -> Vec<&'a i32> {
    vec![x]
}

fn main() {
    let v:MyVec<&i32>;
    let v2:MyVec2<&i32>;
    let u:Vec<&i32>;
    {
        let data = 42;
 
        v2 = make_myvec2(&data);// ✅ компилируется
        u = make_vec(&data); // ✅ компилируется
        
        // Rust консервативно считает, что в drop() ты можешь использовать self.value
        //v = make_myvec(&data); // ❌ компилятор выдаст ошибку
    }
}
```

---

**Зачем Vec нужен PhantomData**

```
struct Vec<T> {
    ptr: *mut T,
    len: usize,
    cap: usize,
    _marker: PhantomData<T>,
}
```

Vec хранит не сами данные, а указатель `ptr: *mut T` — raw pointer.

Компилятор не видит владения через raw pointer, потому что он не трекает память в heap за пределами типовой системы.

Но Rust должен знать, кто владеет T, чтобы:
* правильно проверять lifetimes
* проверять Send/Sync
* автоматически реализовывать auto traits

Для подсказки компилятору что Vec владеет данными используется логическая подсказка через `PhantomData<T>`




