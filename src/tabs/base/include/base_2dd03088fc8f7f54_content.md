

// pub trait Copy: Clone {...

Хочешь быть `Copy` то реализуй еще и `Clone`

И не должно быть реализации `Drop`

Если тип `Copy` то его `Clone` реализация должна только вернуть `*self`

<pre><code class="language-rust">
//#[derive(Clone,Copy,Debug)] через derive будет добавлено ограничение копирования по параметрам типа, что не всегда желательно.
#[derive(Debug)]
struct WithCopy(i32);

impl Copy for WithCopy{}
impl Clone for WithCopy{
     fn clone(&self) -> Self {
        *self
     }
}
</code></pre>


---
Хочешь быть только `Clone`. Будет семантика `moving`
<pre><code class="language-rust">
#[derive(Debug)]
struct WithoutCopy(i32);

impl Clone for WithoutCopy{
     fn clone(&self) -> Self {
        WithoutCopy(self.0)
     }
}

fn main() { 
    let a = WithCopy(1);
    let b = a;// Copy
    println!("{:?} {:?}",a,b);
    
    let a = WithoutCopy(1);
    let b = a;// moving semantic (Перемещение указателя на данные в куче, данные остали на том же адресе)
    //println!("{:?}",a);// Error
    println!("{:?}",b);

    let c = b.clone();
    println!("{:?} {:?}",c,b);  
}
</code></pre>
