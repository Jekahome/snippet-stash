

**Не кодируйте жестко**, откуда вы читаете данные - используйте: 
```
// ✅
fn parse(reader: impl std::io::Read) {

}

// ❌ вместо 

fn parse(filename: &str){
 ...
}
```


