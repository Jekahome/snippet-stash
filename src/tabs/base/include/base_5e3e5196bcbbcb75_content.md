

Нарушение правил работы со ссылками, при одновременном существовании мутабельной `&mut num` и не мутабельной ссылки `&mut`

```rust
struct NumMutFef<'a>{
    num: &'a mut i32
}
 
fn main(){
    let mut num = 3;
    let num_mut_ref = NumMutFef{
        num: &mut num
    };
    println!("{}", &num);// ✅ OK
    // Но как такое может быть, если ссылка `&mut num` в NumMutFef живет до конца функции main и использование shared ссылки `&num` в `println!("{}", &num);` использует ее повторно! По идее компилятор должен запретить использовать нам shared ссылку, но так и будет если мы явно реализуем трейт Drop, что затрет оптимизацию компилятора с сокращенным временем жизни мутабельной ссылки до вызова shared ссылки.  
}
```


Теперь мы реализуем Drop, что расширит время жизни мутабельной ссылки, как это и должно быть до конца функции main

```rust
struct NumMutFef<'a>{
    num: &'a mut i32
}
impl Drop for NumMutFef<'_> {
    fn drop(&mut self) {}
}
fn main(){
    let mut num = 3;
    let num_mut_ref = NumMutFef{
        num: &mut num
    };
    println!("{}", &num);// ❌ ERROR
}
```


Оптимизация с сокращенным временем жизни, выглядит так:
```rust
struct NumMutFef<'a>{
    num: &'a mut i32
}
impl Drop for NumMutFef<'_> {
    fn drop(&mut self) {}
}
fn main(){
    let mut num = 3;
    {
        let num_mut_ref = NumMutFef{
            num: &mut num
        };
    }
    println!("{}", &num);// ✅ OK
}
```

Или явно вызвать drop, что явно сократит время жизни и компилятор разрешит использовать shared ссылку после drop
 
```rust
struct NumMutFef<'a>{
    num: &'a mut i32
}
impl Drop for NumMutFef<'_> {
    fn drop(&mut self) {
         
    }
}
fn main(){
    let mut num = 3;

    let num_mut_ref = NumMutFef{
        num: &mut num
    };
    drop(num_mut_ref);
    println!("{}", &num);
}
```


