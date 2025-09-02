


<pre><code class="language-rust">
fn main(){
    match exec_ctx.logout_user() {
        Ok(_) => Ok(true),
        Err(_e) => Err(CustomError::BadRequest("User not logged in".to_string())), ❌
    }

    exec_ctx.logout_user()
        .map(|_| true)
        .map_err(|_| CustomError::BadRequest("User not logged in".to_string())) ✅ 
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    match &self.id {
        Some(value) => Some(value.clone()),❌
        None => None,
    }
    self.id.map(Clone::clone) ✅
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    match exec_ctx.update_user(Box::new(update_user)) {
        Ok(user) => Ok(Userjuniper::from(user)), ❌
        Err(e) => Err(e),
    }

    exec_ctx.update_user(Box::new(update_user)).map(Userjuniper::from) ✅ 
}
</code></pre>

---

<pre><code class="language-rust">
    fn birth_date(&self) -> Option<String> {
       /* match &self.birth_date {
            Some(value) => Some(value.clone()), ❌
            None => None,
       }*/
       self.birth_date.clone().map(std::string::String) ✅ 
    }
</code></pre>

---

<pre><code class="language-rust">
    fn birth_date(&self) -> Option<&str> {
        /* match &self.birth_date {
           Some(v) => Some(v.as_str()), ❌
           None => None,
        }*/
        self.birth_date.as_ref().map(std::string::String::as_str)  ✅
    }
</code></pre>
