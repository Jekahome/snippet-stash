


<pre><code class="language-rust">
fn main(){
  let user1 = User {
        active: user1.active,
        username: user1.username,
        email: String::from("user1@example.com"),
        sign_in_count: user1.sign_in_count,
  }; 
 let user2 = User {
        email: String::from("user2@example.com"),
        ..user1
  };
}
</code></pre>
