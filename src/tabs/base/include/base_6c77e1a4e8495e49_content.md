


<pre><code class="language-rust">
// Иногда бывает, что у вас есть неиспользуемые параметры типа, которые указывают,
// к какому типу данных привязана структура, хотя эти данные фактически не найдены в самой структуре.

struct Post<S> {
    post_id: u64,
    user: User,
    title: String,
    body: String,
    state: PhantomData<S>,
}

/// Состояния
struct New;
struct Unmoderated;

///Вариант основан на преобразованим From and PhantomData

/// New -- Unmoderated
impl From<Post<New>> for Post<Unmoderated> {
    fn from(_val: Post<New>) -> Post<Unmoderated> {
        Post {
            post_id: _val.post_id,
            user: _val.user,
            title: _val.title,
            body: _val.body,
            state: PhantomData,
        }
    }
}

/// Create new Post
/// state New
fn new(user: User, title: String, body: String) -> Post<New> {
    let post: Post<New> = Post {
        post_id: 1u64,
        user: user,
        title: title, // String::from("title"),
        body: body,
        state: PhantomData,
    };
    post
}

fn publish(post: Post<New>) -> Post<Unmoderated> {
    println!("New -- \"publish()\" --> Unmoderated");
    post.into()
}

fn main() {
    let user = User {
        user_id: 1u64,
        full_name: String::from("Egor Egorov"),
        email: String::from("email@mail.ru"),
    };

    let post_new:Post<New> = new(user, String::from("title"), String::from("body"));
    
    let post_unmoderated:Post<Unmoderated> = publish(post_new);// переход в другое состояние
}
</code></pre>
