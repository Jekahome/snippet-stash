

```rust
fn main(){
// т.е. есть такая ф-ция 
    fn do_twice(f: fn(i32) -> i32){}
// она может принять closure: (тут произойдет приведение closure к типу Function pointers )
   let closure = |x| {x+1};
   let answer = do_twice(closure, 5);
// но если closure с захватом переменной то не выйдет:
   let some_var = 8;
   let closure = |x| {x+some_var};
   let answer = do_twice(closure, 5);
}
```
