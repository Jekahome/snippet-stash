

```rust
struct App(Option<Database>);
// struct App(Database);

struct Database;
impl Database {
    fn shutdown(self){ /*move*/}
}
impl App {
    fn drop(&mut self){
      // self.0.shutdown(); // не может выйти из заимствованного контента cannot move out of borrowed content
      let db = self.0.take().unwrap();
      assert!(self.0.is_none());
      db.shutdown();
    }
}
fn main(){}
```
