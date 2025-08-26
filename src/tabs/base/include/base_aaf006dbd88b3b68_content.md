

```
match Err::<&str,_>("Error"){
     Ok(_) => {},
     res => { print!("{:?}",res);}
}
```
