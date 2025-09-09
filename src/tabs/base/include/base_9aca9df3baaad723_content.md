

Реализация для одного типа u32
```rust
struct Cacher<T> where T: Fn(u32) -> u32
{
    calculation: T,
    value: Option<u32>,
}

impl<T> Cacher<T> where T: Fn(u32) -> u32
{
    fn new(calculation: T) -> Cacher<T> {
        Cacher {
            calculation,
            value: None,
        }
    }
// Производим вычисление через замыкание только если self.value  == None иначе возвращаем   self.value
    fn value(&mut self, arg: u32) -> u32 {
        match self.value {
            Some(v) => v,
            None => {
                let v = (self.calculation)(arg);
                self.value = Some(v);
                v
            },
        }
    }
}
```

---- 

```rust
use std::borrow::Cow;
struct CacherStr<N,M,T> where T:std::ops::Fn(N)->M {
    calculation:  T,
    state: std::marker::PhantomData<(N,M)>,
    map:HashMap<Cow<'static, str>, Cow<'static, str>>,
}
impl <T> CacherStr< Cow< 'static, str>,Cow< 'static, str>,T> where T: Fn(Cow< 'static, str>) -> Cow< 'static, str> {
    fn new_str (calculation: T) -> CacherStr< Cow< 'static, str>,Cow< 'static, str>,T> {
        CacherStr {
            calculation,
            state: PhantomData,
            map:HashMap::new()
        }
    }
    fn value<K>(&mut self, arg: K) -> Cow< 'static, str>  where K: Into< Cow< 'static, str>>+Copy{
        if self.map.contains_key(&arg.into()){
            (*self.map.get(&arg.into()).unwrap()).clone()
        }else{
            let v = (self.calculation)(arg.into());
            self.map.insert(arg.into(),v.clone());
            v
        }
    }
}
```

