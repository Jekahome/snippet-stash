

Тип `fn` называется указателем на функцию.

Указатели на функции реализовать все три замыкающих трейта (`Fn, FnMut и FnOnce`), так что вы всегда можете передать указатель на функцию в качестве аргумента для функции, ожидающей замыкание. 

Лучше всего писать функции, используя общий тип `fn` и одну из характеристик закрытия, чтобы ваши функции могли принимать либо функции, либо закрытия.
<pre><code class="language-rust">
fn main(){
 fn add_one(x: i32) -> i32 {
    x + 1
 }
 // Ф-ция высшего порядка
 fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
 }

 // my_f указатель на функцию
 let my_f:fn(i32)->i32 = add_one;
 println!("my_f = {:p}", my_f);// my_f = 0x55c21df2db60

 // использование ф-ции fn:
 let answer = do_twice(add_one, 5);
 println!("The answer is: {}", answer);

 // использования замыкания closure:
 let closure = |x| {x+1};
 let answer = do_twice(closure, 5);
 println!("The answer is: {}", answer);
}
</code></pre>

 
