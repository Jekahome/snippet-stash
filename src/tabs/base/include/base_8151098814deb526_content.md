

```rust
// Статическая диспетчеризация
fn call_with_one<F>(func: F) -> usize where F: Fn(usize) -> usize {
    func(1)
}
// Динамическая диспетчеризация
fn call_with_one_dyn<T>(func: &T) -> usize where T: Fn(usize) -> usize {
    func(1)
}
// Обобщение аргументов ф-ции
fn call_with_one_t<T,N,M>(func: T,n:N) -> M
    where T: Fn(N) -> M  {
    func(n)
}
use std::marker::PhantomData; // через PhantomData прокидываем и тягаем за собой в объекте типы (свойство state)
struct  Cacher<N,M,T> where T:std::ops::Fn(N)->M
{
    calculation:  T,
    state: std::marker::PhantomData<(N,M)>
}
impl <T>Cacher<usize,usize,T>  where T:std::ops::Fn(usize)->usize{}
impl <T>Cacher<u32,u32,T>  where T:std::ops::Fn(u32)->u32{}
impl <N,M,T>Cacher<N,M,T>  where T:std::ops::Fn(N)->M{
    fn new(func:T)->Self{
        Cacher{  calculation:func,  state:PhantomData  }
    }
}
fn main(){
    let closure:fn(usize) -> usize = |x:usize| {x * 2 } ;
    let closure:_ = |x:_| x * 2;
    assert_eq!(call_with_one(closure), 2);
    assert_eq!(call_with_one_dyn(&closure), 2);
    assert_eq!(call_with_one_t(closure,1), 2);

    let casher:_ = Cacher{calculation:closure,state: PhantomData};
    let casher:Cacher<usize,usize,fn(usize) -> usize > = Cacher::new(closure);
    let casher:Cacher<_,_,fn(_) -> _ > = Cacher::new(closure);
    println!("{}",(casher.calculation)(1));
    // Использование реализации для u32
    let closure:fn(u32) -> u32 = |v:u32|->u32{1u32};
    let casher:Cacher<_,_,fn(_) -> _ > = Cacher::new(closure);
    println!("{}",(casher.calculation)(1));
}
```
