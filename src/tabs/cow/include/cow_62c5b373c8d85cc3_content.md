

Это правильно: Клонировать для изменения, а не копировать для чтения. 

Это потому, что в Rust, Copy trait гарантированно является простой memcpy операцией, 
а Clone также может выполнять пользовательскую логику (например, рекурсивно клонировать `HashMap<String, String>`

Благодаря реализации Deref признака вы можете использовать ссылку на `Cow<'static, str>` вместо `&str`.
Это означает, что `Cow<'static, str>` можно увидеть ссылку на строку без необходимости ее преобразования.
<pre><code class="language-rust">
pub struct MySQL {
        pub host: Cow<'static, str>,   // вместо  pub host:&a str
}
impl Default for MySQL {
    fn default() -> Self {
       MySQL {host: "127.0.0.1".into() } ✅    
    }
}

У Cow есть Deref. Достаточно просто писать "127.0.0.1" вместо Cow::Borrowed. 
<pre><code class="language-rust">
impl Default for MySQL {
    fn default() -> Self {
        MySQL {host: Cow::Borrowed("127.0.0.1")} ❌
    }
}
</code></pre>
</code></pre>
