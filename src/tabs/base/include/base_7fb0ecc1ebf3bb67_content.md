


<pre><code class="language-rust">
struct User {
    name: String,
    age: u32,
}
// К сожалению, стандартная библиотека не может предоставить универсальную реализацию, которая избавит нас от этого шаблона
impl AsRef<User> for User {
    fn as_ref(&self) -> &User {
        self
    }
}
enum Privilege {
    BanUsers,
    EditPosts,
    DeletePosts,
}
// Хотя у модераторов есть некоторые особые привилегии, они всё равно остаются обычными пользователями и должны иметь возможность делать всё то же самое
struct Moderator {
    user: User,
    privileges: Vec<Privilege>
}
impl AsRef<Moderator> for Moderator {
    fn as_ref(&self) -> &Moderator {
        self
    }
}
impl AsRef<User> for Moderator {
    fn as_ref(&self) -> &User {
        &self.user
    }
}
// это должно быть доступно для пользователей и модераторов (которые также являются пользователями)
fn create_post<U: AsRef<User>>(u: U) {
    let user = u.as_ref();
    // etc
}
fn example(user: User, moderator: Moderator) {
    create_post(&user);
    create_post(&moderator); // ✅
}
</code></pre>
