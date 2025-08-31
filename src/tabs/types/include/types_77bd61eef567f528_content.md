


<pre><code class="language-rust">
trait Base<RHS=u32> {
    fn base(&self, rhs: RHS) -> String;
    fn default(&self,rhs:RHS)  where RHS:std::fmt::Debug{
        println!("Base default {:?}",rhs);
    }
    fn default_static(rhs:RHS) where RHS:std::fmt::Debug{
        println!("Base default {:?}",rhs);
    }
}
struct A{}
// Используем параметр общего тип по умолчанию т.е. rhs должен быть u32
impl Base for A{
    fn base(&self, rhs: u32) -> String{
        String::from("")
    }
}
// Переопределяем u32 на свой тип &'a str для типажа
impl<'a> Base<&'a str> for A{
    fn base(&self, rhs: &str) -> String{
        String::from("")
    }
    fn default_static(rhs:&str) {
        println!("Base for A rhs:&str = {:?}",rhs);
    }
}  
</code></pre>
Получается если тип реализован то он заменяет тип типажа по умолчанию даже если сам метод трейта не переопределен в реализации !

---
 
<pre><code class="language-rust">
trait Base<RHS=u32> {
    fn base(&self, rhs: RHS) -> String;
    fn default(&self,rhs:RHS)  where RHS:std::fmt::Debug{
        println!("Base default {:?}",rhs);
    }
    fn default_static(rhs:RHS) where RHS:std::fmt::Debug{
        println!("Base default {:?}",rhs);
    }
}

struct A{

}
// Используем параметр общего тип по умолчанию т.е. rhs должен быть u32
impl Base for A{

    fn base(&self, rhs: u32) -> String{
        String::from("")
    }
}
// Переопределяем u32 на свой тип &'a str для типажа
impl<'a> Base<&'a str> for A{

    fn base(&self, rhs: &str) -> String{
        String::from("")
    }
    fn default_static(rhs:&str) {
        println!("Base for A rhs:&str = {:?}",rhs);
    }
}
// Переопределяем u32 на свой тип String для типажа
impl Base<String> for A{

    fn base(&self, rhs: String) -> String{
        String::from("")
    }
    fn default(&self,rhs:String) {
        println!("Base for A rhs:String = {:?}",rhs);
    }
}
// Переопределяем u32 на свой тип &'a [i32] для типажа
impl<'a> Base<&'a [i32]> for A{

    fn base(&self, rhs: &[i32]) -> String{
        String::from("")
    }
}
// Переопределяем u32 на свой тип i32 для типажа
impl<'a> Base<i32> for A{

    fn base(&self, rhs: i32) -> String{
        String::from("")
    }
    fn default(&self,rhs:i32) {
        println!("Base for A rhs:i32 = {:?}",rhs);
    }
    fn default_static(rhs:i32) {
        println!("Base for A rhs:i32 = {:?}",rhs);
    }
}
fn main(){
    let a:A = A{};
    a.base("str");
    a.base(String::from("String"));
    let v = vec![1,2,3];
    a.base(&v[..]);
    a.base(1_i32);

    <A as Base<u32>>::default_static(1_u32);// Base default 1 // т.е. отработает реализация Base по умолчанию
    <A as Base<i32>>::default_static(1_i32);// Base for A rhs:i32 = 1 //  т.е. отработает реализация A так как i32 реализованно для Base
    <A as Base<&str>>::default_static("str");// Base for A rhs:&str = "str" //  т.е. отработает реализация A так как &str реализованно для Base

    a.default(1_i32);// Base for A rhs:i32 = 1 //  т.е. отработает реализация A так как i32 реализованно для Base

    a.default(1_u32);// Base default 1 // т.е. отработает реализация Base по умолчанию потому что мы не реализовали для u32 вариант а u32 есть по умолчанию
    a.default("str");// Base default "str"// т.е. отработает реализация Base по умолчанию но с типом &str
    a.default(String::from("String"));// Base for A rhs:String = "String" // а у String реализации есть метод default ,поэтому отработает переопределенный метод String
    // Получается если тип реализован то он заменяет тип типажа по умолчанию даже если сам метод трейта не переопределен в реализации !
}
</code></pre>
