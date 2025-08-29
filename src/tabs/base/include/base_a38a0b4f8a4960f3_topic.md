

#### Атрибуты (Условная компиляция) 

[conditional-compilation](https://doc.rust-lang.org/reference/conditional-compilation.html)

[effective-rust/features](https://www.lurklurk.org/effective-rust/features.html)

чи можу я ввімкнути якось умовну компіляцію? 
Типу:

```
fn test() {
  #[cfg(my_flag)]
   call_my_cfg_fn();
} 
$ RUSTFLAGS='--cfg my_flag'
```




