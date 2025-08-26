

Мы можем возвращать замыкания по значению, как и любой другой тип!
Так как Rust требует размер возвращаемых значений мы можем передать только ссылку на ф-цию.

`move` делает наш `Fn` что бы он создавал новый фрейм стека

`Box` дает известный размер замыкания
<pre><code class="language-rust">
fn returns_closure_2() -> Box<dyn Fn(i32) -> i32> {
    let num = 5;
    Box::new(move |x| x + num)
}
fn returns_closure() -> impl Fn(i32) -> i32 {
    |x| x + 1
}
fn returns_fn<MY_F>(f:MY_F) -> impl Fn(i32) -> i32 where MY_F:Fn(i32) -> i32 {
    f
}
fn returns_fn_2() -> impl Fn(i32) -> i32 {
    fn some_fn(x:i32)->i32{
      x+1
    } 
    some_fn   
}
fn some_fn(x:i32)->i32{
    x+1
}
fn main() {
   let f = returns_closure_2();
   let answer = f(1);
   assert_eq!(6, answer);

  let f_closure = returns_closure();
  assert_eq!(f_closure(2),3);
  
   let f_fn = returns_fn(some_fn);
  assert_eq!(f_fn(2),3);
     
   let f_fn = returns_fn_2();
  assert_eq!(f_fn(2),3);
}
</code></pre>
