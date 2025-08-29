


<pre><code class="language-rust">
use std::marker::PhantomData;
struct Authenticator<T: GetInstance> {
    _marker: PhantomData<*const T>, // Использование `* const T` указывает на то, что мы не владеем T
}
impl<T: GetInstance> Authenticator<T> {
    fn new() -> Authenticator<T> {
        Authenticator {
            _marker: PhantomData,
        }
    }
    fn auth(&self, id: i64) -> bool {
        T::get_instance(id).is_some()
    }
}
trait GetInstance {
    type Output; // Using nightly this could be defaulted to `Self`
    fn get_instance(id: i64) -> Option<Self::Output>;
}

struct Foo;
impl GetInstance for Foo {
    type Output = Self; 
    fn get_instance(id: i64) -> Option<Foo> {
        // Здесь вы можете сделать что-то вроде поиска в базе данных или что-то подобное
        if id == 1 {
            Some(Foo)
        } else {
            None
        }
    }
}

struct User;
impl GetInstance for User {
    type Output = Self;
    fn get_instance(id: i64) -> Option<User> {
        // Здесь вы можете сделать что-то вроде поиска в базе данных или что-то подобное
        if id == 2 {
            Some(User)
        } else {
            None
        }
    }
}
fn main() {
    let user_auth = Authenticator::<User>::new();
    let other_auth = Authenticator::<Foo>::new();
    
    assert!(user_auth.auth(2));
    assert!(!user_auth.auth(1));
    
    assert!(other_auth.auth(1));
    assert!(!other_auth.auth(2));
}
</code></pre>
