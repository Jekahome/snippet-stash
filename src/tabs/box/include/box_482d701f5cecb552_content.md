


```rust
use std::collections::HashMap;
use std::thread;
use std::time::Duration;

struct Cacher<N,M>{
    calculation:Box<Fn(N)->M>,
    map:HashMap<u32, u32>
}

impl Cacher<u32,u32>{
    fn new<T:'static + Fn(u32) -> u32>(calculation: T) -> Cacher<u32,u32> {
        Cacher {
            calculation:Box::new(calculation),
            map:HashMap::new()
        }
    }
    fn value(&mut self, arg: u32) -> u32 {
        if self.map.contains_key(&arg){
            *self.map.get(&arg).unwrap()
        }else{
            let v = (self.calculation)(arg);
            self.map.insert(arg,v);
            v
        }
    }
}

fn generate_workout(intensity: u32, random_number: u32) {
    let mut lazy_evaluation_result = Cacher::new(|num| {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    });
fn main(){}
```
