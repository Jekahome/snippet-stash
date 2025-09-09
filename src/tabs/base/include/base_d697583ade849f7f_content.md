

Например, это очень плохой код:
```rust
fn grant_permissions(role: &Role) -> Permissions {
    match role {
        Role::Reporter => Permissions::Read,
        Role::Developer => Permissions::Read & Permissions::Edit,
        _ => Permissions::All, // anybody else is administrator 
    }
}
fn main(){}
```

Используя полноту, код можно изменить таким образом, чтобы он прерывался во время компиляции всякий раз, когда добавляется новый Role вариант:
```rust
fn grant_permissions(role: &Role) -> Permissions {
    match role {
        Role::Reporter => Permissions::Read,
        Role::Developer => Permissions::Read & Permissions::Edit,
        Role::Admin => Permissions::All, 
    }
}
fn main(){}
```


Структуры:
```rust
struct Address {
    country: Country,
    city: City,
    street: Street,
    zip: Zip,
}
// плохо:
impl fmt::Display for Address {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        writeln!(f, "{}", self.country)?;
        writeln!(f, "{}", self.city)?;
        writeln!(f, "{}", self.street)?;
        write!(f, "{}", self.zip)
    }
}
// хорошо:
impl fmt::Display for Address {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let Self {
            country,
            city,
            street,
            zip,
        } = self;
        writeln!(f, "{country}")?;
        writeln!(f, "{city}")?;
        writeln!(f, "{street}")?;
        write!(f, "{zip}")
    }
}
fn main(){}
```


