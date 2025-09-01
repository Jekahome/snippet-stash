

Річ у тому як викликається trait `PartialEq`. 

Якщо ви пишете `v == self.0`, то буде викликатися `v.eq(self.0)`. 

Якщо ви пишете `self.0 == v`, то буде викликатися `self.0.eq(v)`, а це помилка, тому що для `T` ніде не вимагається `PartialEq<V>`. 

Якщо ви не вказуєте generic параметер для `PartialEq`, то там по дефолту `Self`. 

Тобто `T: PartialEq` означає `T: PartialEq<T>`
<pre><code class="language-rust">
use std::cmp::PartialEq;

pub struct Foo<T>(T);
impl<T> Foo<T> {
    pub fn new(key: T) -> Self {
        Self(key)
    }
}
impl<T: PartialEq> Foo<T> {
    pub fn cmp<V: PartialEq<T>>(&self, v: V) -> bool {
        v == self.0
        // self.0 == v // для такого сравнения типа надо добавить   ` -> bool where T:PartialEq<V>`
    }
    pub fn cmp2(&self, v: &T) -> bool {
        v == self.0
    }
}

fn main() {
    let f = Foo::new("hello".to_owned());
    
    assert!(f.cmp("hello"));
    assert!(f.cmp("hello".to_string()));
    
    let f = Foo::new(1);
    assert!(f.cmp(1));
}
</code></pre>
