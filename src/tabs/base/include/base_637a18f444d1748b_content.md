

```rust
#[derive(Debug)]
struct Person {
    name: String,
    age: u32,
}
// moving
fn birthday_immutable(person: Person) -> Person {
    Person {
        name: person.name,
        age: person.age + 1,
    }
}
// shared
fn birthday_l_immutable(person: &Person) -> Person {
    Person {
        name: person.name.clone(),
        age: person.age + 1,
    }
}
// mut moving
fn birthday_mutable(mut person: Person) -> Person {
    person.age += 1;
    person
}
// mut shared
fn birthday_l_mutable(person: &mut Person){
    person.age += 1;
}

fn main() {
    let alice1 = Person { name: String::from("Alice"), age: 30 };
    println!("Alice 1: {:?}", alice1);
    let alice2 = birthday_immutable(alice1);
    println!("Alice 2: {:?}", alice2);
    let alice3 = birthday_mutable(alice2);
    println!("Alice 3: {:?}", alice3);
    
    let mut alice4 = Person { name: String::from("Alice"), age: 30 };
    birthday_l_mutable(&mut alice4);
    println!("Alice 4: {:?}", alice4);
    
    let alice5 = birthday_l_immutable(&alice4);
     println!("Alice 5: {:?}", alice5);
}
```

