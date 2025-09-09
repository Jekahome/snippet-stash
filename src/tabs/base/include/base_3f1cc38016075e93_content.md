


```rust
fn main(){
    let arr = [1,2,3];
    let mut a =arr;
    a[0]=99;
    print!("{:?}{:?}",a,arr);//[99, 2, 3][1, 2, 3] ошибки нет arr скопирован

    let arr =vec![1,2,3];
    let a =arr;
    print!("{:?}",arr);// ошибка arr перемещен и ссылка на ресурс удалена у него

    let s="ss";
    let mut c =s;
    c="cc";
    println!("{} and {}", c,s);// cc and ss

    let mut s="ss";
    let mut c =&mut s;
    *c="cc";
    println!("{} ", c);
    println!("{}", s);// ошибка ссылка на ресур перемещена в c
}
```

