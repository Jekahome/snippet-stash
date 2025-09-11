

```rust
trait AGATOR{  
    fn new() -> Self;
}
struct AG<T=u32>{
    value:Vec<T>
  
}
impl AGATOR for AG<u8>{
    fn new() -> Self{
        Self{value:vec![]}
    }
}
impl AGATOR for AG<u16>{
    fn new() -> Self{
        Self{value:vec![]}
    }
}
fn main(){}
```

---

```rust
use std::marker::PhantomData;

trait Creator{ // только для реализации метода new для MyStruct с FROM=u32 по дефолту
    fn new(_:&[u8]) -> Self;
}
struct MyStruct<FROM=u32>{
    value:Vec<u8>,
    _marker:PhantomData<FROM>
}
impl<FROM> Creator for MyStruct<FROM>{
    fn new(value:&[u8]) -> Self{
        Self{value:value.to_vec(),_marker:PhantomData::<FROM>}
    }
}
// конкретные реализации для типов
impl MyStruct<u32> {
    fn show(&self)->u32{
      let res:u32 = u32::from_be_bytes(TryFrom::try_from(self.value.clone()).unwrap());
      println!("u32:{}",&res);
      res
    }
}
impl MyStruct<usize> {
    fn show(&self)->usize{
      let res:usize = usize::from_be_bytes(TryFrom::try_from(self.value.clone()).unwrap());
      println!("usize:{}",&res);
      res
    }
}
fn main() {
    let s:MyStruct<u32> = MyStruct::<u32>::new(&[0,0,0,4]);
    s.show();

    let s:MyStruct<usize> = MyStruct::new(&[0,0,0,4,0,0,0,4]);
    s.show();

    let s:MyStruct<usize> = MyStruct::<usize>::new(&[0,0,0,4,0,0,0,4]);
    s.show();
}
```
