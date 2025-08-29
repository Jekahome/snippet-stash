

В этом примере impl не может быть непосредственно выражен без утверждения where:
<pre><code class="language-rust">
trait WrapTrait:Debug{
    type Value;
    fn get_value(&self)->&Self::Value;
}

#[derive(Debug)]
struct Test<T>(T);

impl<T:Debug> WrapTrait for Test<T>{
    type Value = T;
    fn get_value(&self)->&T where T:Debug{
        &self.0
    }
}

// как выразить внутренний тип `Value` в сигнатуре ф-ции?
// Нам это нужно так как `get_value` возвращает внутренний тип `Value` и мы его печатаем

fn foo<T:WrapTrait>(t:&T) where T::Value: Debug {
    println!("Hello {:?}",t.get_value());
}
</code></pre>

---- 

<pre><code class="language-rust">
use std::ops::{Add, Mul};
fn dot<T>(v1: &[T], v2: &[T]) -> T
    where T: Add<Output=T> + Mul<Output=T> + Default + Copy {
        let mut total = T::default();
        for i in 0 .. v1.len() {
               total = total + v1[i] * v2[i];
        }
        total
}
#[test]
fn test_dot() {
    assert_eq!(dot(&[1, 2, 3, 4], &[1, 1, 1, 1]), 10);
    assert_eq!(dot(&[53.0, 7.0], &[1.0, 5.0]), 88.0);
}
</code></pre>
