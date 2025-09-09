

Замыкание соответствует типажу `FnOnce`  потому что перемещает тип moving.
Следовательно, вызвать ее можно только один раз, после переменная удалится
```rust
fn main(){
 let name1 = String::from("Alice");
 let welcom = move || {
     let mut name2 = name1;
     name2 += " and Bob";
     println!("Welcome, {}", name2);
 };
 // welcom();
 // welcom();// Error  
 call_FnOnce(welcom);
}
```

---

Замыкание соответствует типажу Fn  потому что нет мутации и нет перемещения `move`.
А типаж `Fn` реализует сразу и `FnMut` и `FnOnce`
```rust
fn main(){
 let name:&str = "Gogo";
 let visit1 = || {
    println!("Hello {}", name);
 };
 call_Fn(&visit1);
 call_FnMut(&visit1);
 call_FnOnce(&visit1);
}
```

---

Замыкание соответствует типажу `FnMut` потому что изменяет в замыкании переменную. 
А `FnMut` так же является трейтом `FnOnce`
```rust
fn main(){

 let mut count = String::new();
 let visit2 = || {
    count.push('1');
    println!("You are visitor #{}", count);
 };
 call_FnMut(visit2);
 call_FnMut(visit1);// ограничения FnMut сильнее Fn поэтому Fn можно использовать
}
```

--- 

Замыкание соответствует сразу Fn и FnMut и FnOnce
```rust
fn main(){
 let say_hi = {
        let name = String::from("Alice");
        move || println!("Hello, {}", name)
 };
 call_Fn(&say_hi);
 call_FnMut(&say_hi);
 call_FnOnce(&say_hi);
}
fn call_Fn<F>(f: F) where F: Fn() {
    for _ in 1..6 {
        f();
    }
}
fn call_FnMut<F>(mut f: F) where F: FnMut() {
    for _ in 1..6 {
        f();
    }
}
fn call_FnOnce<F>(f: F) where F: FnOnce() {
    f();
}
```

