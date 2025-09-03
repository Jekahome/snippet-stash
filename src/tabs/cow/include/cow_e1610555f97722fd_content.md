

<pre><code class="language-rust">
struct User<'a> {
    first_name: Cow<'a, str>,
    last_name: Cow<'a, str>,
}
impl<'a> User<'a> {
    pub fn new_owned(first_name: String, last_name: String) -> User<'static> {
        User {
            first_name: Cow::Owned(first_name),
            last_name: Cow::Owned(last_name),
        }
    }
    pub fn new_borrowed(first_name: &'a str, last_name: &'a str) -> Self {
        Self {
            first_name: Cow::Borrowed(first_name),
            last_name: Cow::Borrowed(last_name),
        }
    }

    // универсальный метод
    pub fn new<S>(first_name: S, last_name: S) -> User<'a> where S: Into<Cow<'a, str>> {
        User { 
            first_name: first_name.into(),
            last_name: last_name.into()
         }
    }

    pub fn first_name(&self) -> &str {
        &self.first_name
    }
    pub fn last_name(&self) -> &str {
        &self.last_name
    }
}
struct User2{
    first_name: Cow<'static, str>,
    last_name: Cow<'static, str>,
}
impl User2 {
    pub fn new<S>(first_name: S, last_name: S) -> User2 where S: Into<Cow<'static, str>> {
        User2 { 
            first_name: first_name.into(),
            last_name: last_name.into()
         }
    }

    pub fn first_name(&self) -> &str {
        &self.first_name
    }
    pub fn last_name(&self) -> &str {
        &self.last_name
    }
}
// Для serde надо явно указать borrow поля
#[derive(Debug, serde::Deserialize)]
struct User3{
    #[serde(borrow)]
    first_name: Cow<'static, str>,
    #[serde(borrow)]
    last_name: Cow<'static, str>,
}
fn main(){
// Статическое время жизни, поскольку оно владеет данными
    //let user: User<'static> = User::new_owned("James".to_owned(), "Bond".to_owned());
    let user: User<'static> = User::new("James".to_owned(), "Bond".to_owned());
    println!("Name: {} {}", user.first_name, user.last_name);

// Статическое время жизни, поскольку оно заимствует статические данные
    //let user: User<'static> = User::new_borrowed("Felix", "Leiter");
    let user: User<'static> = User::new("Felix", "Leiter");
    println!("Name: {} {}", user.first_name, user.last_name);

    let first_name: String = "Eve".to_owned();
    let last_name: String = "Moneypenny".to_owned();

// Нестатическое время жизни, поскольку оно заимствует данные
    let user: User = User::new_borrowed(&first_name, &last_name);
    println!("Name: {} {}", user.first_name, user.last_name);

    let user: User2 = User2::new("James".to_owned(), "Bond".to_owned());
    println!("Name: {} {}", user.first_name, user.last_name);
    let user: User2 = User2::new("Felix", "Leiter");
    println!("Name: {} {}", user.first_name, user.last_name);
}
</code></pre>
