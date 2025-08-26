

Это мономорфизация типажем т.е. статическая диспетчеризация:
<pre><code class="language-rust">
fn call_with_one<F>(some_closure: F) -> i32
    where F : Fn(i32) -> i32 {
    some_closure(1)
}
fn main(){
 let answer = call_with_one(|x| x + 2);
 assert_eq!(3, answer);
}
</code></pre>
 
Это динамическая диспетчеризация так как &Fn это типаж-объект:
<pre><code class="language-rust">
fn call_with_one(some_closure: &Fn(i32) -> i32) -> i32 {
    some_closure(1)
}
fn main(){
 let answer = call_with_one(&|x| x + 2);
 assert_eq!(3, answer);
}
</code></pre>
