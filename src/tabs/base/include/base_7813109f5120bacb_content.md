

Rust не позволит иметь две мутабельные ссылки
```rust
pub struct MyStruct{
    pub a:i32,
    pub b:i32   
}

impl MyStruct{
    fn a_mut(&mut self) -> &mut i32{
        &mut self.a
    }
    fn b_mut(&mut self) -> &mut i32{
        &mut self.b
    }
}
fn main(){
    let mut my_struct = MyStruct{a:1, b:2};
    
// Тут нет ошибки так как мы берем ссылку на разеын данные, которые не пересекаются общим self
    let a = &mut my_struct.a;
    let b = &mut my_struct.b;
    assert_eq!(*a,1); // ✅ OK
    assert_eq!(*b,2);

// Тут есть ошибка так как мы возврашаем мутабельную ссылку через `&mut self` которая может быть только одна в этой области действия времени жизни
    let mut my_struct = MyStruct{a:1, b:2};
    let a = my_struct.a_mut();
    let b = my_struct.b_mut();
    assert_eq!(*a,1); // ❌ ERROR
    assert_eq!(*b,2);

// Для массива существует метод **split_at_mut** который позволит иметь две мутабельные ссылки на не пересекающиеся данные
}
```

