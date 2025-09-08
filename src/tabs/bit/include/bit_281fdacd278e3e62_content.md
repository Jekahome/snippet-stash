

```
     0011
     0101
     ----
     0110
```

<pre><code class="language-rust">
fn main(){
    println!("0011 XOR 0101 is {:04b}", 0b0011 ^ 0b0101); // = 0110 = 6
    println!("{}", 0b0110);

// ----------------------------------------------------------
// поменять местами значения переменных без создания временной
    let mut x = 9;
    let mut y = 5;
    let mut temp = x;
    x = y;
    y = temp;
    println!("x={} y={}",x,y);
// или воспользовать побитовой операцией XOR
    let mut x = 9;
    let mut y = 5;
    x = x^y; // первая операция XOR создаст шифр с помощью которого можно расшифровать то или иное значение
    y = x^y;
    x = x^y;
    println!("x={} y={}",x,y);
// Не использовать способ XOR если переменные ссылаются на одну и туже область памяти,иначе затрется значение (актуально для C++)
    let mut value:i32 = 9;
    let shared:&mut i32 = &mut value;
    unsafe {
        let x = shared as *mut i32;
        let y = shared as *mut i32;
        *x = *x^*y;
        *y = *x^*y;
        *x = *x^*y;
        assert_eq!(0,*x);
        assert_eq!(0,*y);
    }
}
</code></pre>
