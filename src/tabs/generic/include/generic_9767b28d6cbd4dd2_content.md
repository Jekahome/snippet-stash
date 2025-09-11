


```rust
trait CommandHandler<C: Command> {
    type Context: ?Sized;
    type Result;

    fn handle_command(&self, cmd: &C, ctx: &Self::Context) -> Self::Result;
}
// что позволяет использовать «неразмерные» типы, такие как объекты типажей

impl CommandHandler<CreateUser> for User {
    type Context = dyn UserRepository;
    type Result = Result<(), UserError>;
    
    fn handle_command(&self, cmd: &CreateUser, user_repo: &Self::Context) -> Self::Result {
        // Here we operate with the `UserRepository`
        // via its trait object `&dyn UserRepository`
    }
}
fn main(){}
```
