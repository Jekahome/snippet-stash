

Получатель — это специализированная версия адреса, поддерживающая только один тип сообщения. Его можно использовать в случае, если сообщение необходимо отправить субъекту другого типа. Объект-получатель может быть создан из адреса с помощью Addr::recipient().

Для объектов адреса требуется тип субъекта, но если мы просто хотим отправить конкретное сообщение субъекту, который может обработать это сообщение, мы можем использовать интерфейс Recipient.

Например, получателя можно использовать для системы подписки.
<pre><code class="language-rust">
use actix::prelude::*;

struct MyActor {
    val: usize,
}
impl Actor for MyActor {
    type Context = Context<Self>;
}

#[actix::main]
async fn main() {
    let addr:Addr<MyActor> = MyActor::create(|ctx: &mut Context<MyActor>| MyActor { val: 10 });
}
</code></pre>
