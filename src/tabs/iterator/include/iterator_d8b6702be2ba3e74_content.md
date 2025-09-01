

**Владеющий итератор IntoIter**
<pre><code class="language-rust">
use std::iter::Iterator;
struct Foo<T>{
   data:Vec<T>
}

pub struct WrapIntoIter<T>(Foo<T>);
impl<T> Foo<T> {
    pub fn into_iter(self) -> WrapIntoIter<T> {
        WrapIntoIter(self)
    }
}
impl<T> Iterator for WrapIntoIter<T> {
    type Item = T;
    fn next(&mut self) -> Option<Self::Item> {
        // access fields of a tuple struct numerically
        self.0.data.pop()
    }
}
</code></pre>

---

**Заимствующий итератор shared Iter**
<pre><code class="language-rust">

pub struct WrapIter<'a, T> {
    current_index:usize,
    next: &'a Foo<T>,
}
// Здесь нет времени жизни,так как Foo не имеет связанных сроков жизни
impl<T> Foo<T> {
    pub fn iter<'a>(&'a self) -> WrapIter<'a, T> {
        WrapIter{current_index:0,next: self }
    }
}
impl<'a, T> Iterator for WrapIter<'a, T> {
    type Item = &'a T;
    fn next(&mut self) -> Option<Self::Item> {
       // своя логика того как отдавать по очереди данные и поля WrapIter структуры в помощь
       if self.current_index < self.next.data.len(){
           self.current_index+=1;
           return Some(&self.next.data[self.current_index-1]);
       }
       None
    }
}
</code></pre>

---
 
**Мутирующее заимствование IterMut**
<pre><code class="language-rust">
pub struct WrapIterMut<'a, T> {
    current_index:usize,
    next:  &'a mut Vec<T>
}
impl<T> Foo<T> {
    pub fn iter_mut<'a>(&'a mut self) -> WrapIterMut<'a, T> {
        WrapIterMut{current_index:0,n: self.data.len(), next:  &mut self.data }
    }
}
impl<'a, T: std::fmt::Debug + Default> Iterator for WrapIterMut<'a, T> {
    type Item = &'a mut T;

    fn next(&mut self) -> Option<Self::Item> {
        // своя логика того как отдавать по очереди данные и поля WrapIter структуры в помощь
            let result = unsafe {
            match self.current_index {
                // Безопасность: Поскольку каждая из этих трех ветвей
                // выполняется ровно один раз, мы выдаем не более одной изменяемой ссылки к каждой части self.next
                // Так как self.next действителен для 'a. Каждое частичное заимствование также допустимо для 'a
                n if n < self.n => &mut *(&mut self.next[self.current_index] as *mut _),
               // n if n < self.n => &mut *(self.next.get_mut(self.current_index).unwrap() as *mut _),
                _ => return None
            }
        };
        // Если self.index не равен 0, 1 или 2, мы уже вернули
        // Так что это поднимает нас до 1, 2 или 3.
        self.current_index += 1;
        Some(result)
    }
}
fn main() {
    let foo:Foo<i32> = Foo{data:vec![1,2,3]};
    let mut iter = foo.into_iter();
    assert_eq!(iter.next(), Some(3)); assert_eq!(iter.next(), Some(2));assert_eq!(iter.next(), Some(1)); assert_eq!(iter.next(), None);
     
    let foo:Foo<i32> = Foo{data:vec![1,2,3]};
    for i in foo.into_iter() { // владеющий цикл также доступен, благодаря impl<T> Iterator
        println!("{}",i);
    }
     
    let foo:Foo<i32> = Foo{data:vec![1,2,3]};
    for i in foo.iter() { println!("{}",i); } // общее заимствование, благодаря WrapIter
    for i in foo.iter() { println!("{}",i);}
   
    let mut foo:Foo<i32> = Foo{data:vec![1,2,3]};
    for i in foo.iter_mut() { // мутирующее заимствование, благодаря WrapIterMut
        println!("iter_mut {}",i);
    }
}
</code></pre>
