

```rust
struct Person;

impl Person {
// По умолчанию время жизни берется из self
// о так как мы возвращаем y у него другое время жизни - ошибка
// this parameter and the return type are declared with different lifetimes...
    /*fn test(&self,y:&i32)->&i32{ // на самом деле компилято добавляет сахар fn test<'a,'b>(&'a self,y:&'b i32)->&'a i32 // а нам нужно время жизни 'b
        y
    }*/
    
    fn test<'a,'b>(&'a self,y:&'b i32)->&'b i32{
        y
     }
    // или указать время жизни только для y
    // для остальных ссылок будет созданно автоматически Elision
    fn test2<'b>(&self,y:&'b i32)->&'b i32{
        y
    }
}
fn main(){}
```
