


```rust
struct Names {
    exclusions: Vec<String>,
    names: HashSet<String>,
}

impl Names {
    fn apply_exclusions(&mut self) {
        self.exclusions.drain(..).for_each(|name| {
            self.names.remove(&name);
        })
    }
}
fn main(){}
```

---

```rust
impl Names {
    fn apply_exclusions(&mut self) {
        let mut exclusions = mem::take(&mut self.exclusions);
        exclusions.drain(..).for_each(|name| {
            self.remove_name(&name);
        });
    }

    fn remove_name(&mut self, name: &str) {
        self.names.remove(name);
    }
}
fn main(){}
```
