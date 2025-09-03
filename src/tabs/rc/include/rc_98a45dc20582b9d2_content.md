


<pre><code class="language-rust">
fn main(){
    let x = Rc::new(5);
    let weak_five = Rc::downgrade(&x);
    println!("weak_count={}",Rc::weak_count(&x));
    println!("strong_count={}",Rc::strong_count(&x));
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
// ссылки удаляются
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    println!("count after creating a = {}", Rc::strong_count(&a));// 1
    let b = Cons(3, Rc::clone(&a));
    println!("count after creating b = {}", Rc::strong_count(&a));// 2
    {
        let c = Cons(4, Rc::clone(&a));
        println!("count after creating c = {}", Rc::strong_count(&a));// 3
    }
    println!("count after c goes out of scope = {}", Rc::strong_count(&a));// 2
}
</code></pre>
