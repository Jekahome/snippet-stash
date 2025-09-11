

```
fn foo(path: &std::path::Path) -> std::result::Result<(), Box<dyn std::error::Error>> {
    Err(Box::new( std::io::Error::new(std::io::ErrorKind::Other, "oh no!"))
} 
```
