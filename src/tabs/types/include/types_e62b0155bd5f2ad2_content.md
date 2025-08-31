


<pre><code class="language-rust">
#[derive(Debug)]
struct FoldUserState;// Типы команд
#[derive(Debug)]
struct CreateUser;
#[derive(Debug)]
enum TestEnum{
    One,Two
}
trait CommandStateT{}// Типаж команд
impl CommandStateT for FoldUserState{}
impl CommandStateT for CreateUser{}
impl CommandStateT for TestEnum{}
trait CommandGateway<C: CommandStateT> {
    type Result;
    fn command(&self, cmd: C) -> Self::Result;
}

struct Service;
// Перегрузка по состоянию объекта !!!!
// Реализация CommandGateway для разных типов CommandStateT
impl CommandGateway<FoldUserState> for Service {
    type Result = Option<i32>;
    fn command(&self, cmd:  FoldUserState) -> Self::Result {
         println!("FoldUserState={:?}",cmd);
         Some(1)
    }
}
impl CommandGateway<CreateUser> for Service {
    type Result = Option<i32>;
    fn command(&self, cmd: CreateUser) -> Self::Result {
            println!("CreateUser={:?}",cmd);
            None
    }
}
impl CommandGateway<TestEnum> for Service {
    type Result = Option<i32>;
    fn command(&self, cmd: TestEnum) -> Self::Result {
           println!("TestEnum={:?}",cmd);
           None
    }
}
fn main() {
   let service = Service{};
   service.command(CreateUser);// CreateUser=CreateUser
   service.command(FoldUserState);// FoldUserState=FoldUserState
   service.command(TestEnum::One);// TestEnum=One
   service.command(TestEnum::Two);// TestEnum=Two
}
</code></pre>
