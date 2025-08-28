

реализация Drop по умолчанию для структур содержащих `*mut` не годится, поскольку единственное, что содержится в нашем Дереве , — это root: `*mut Node`, а Rust понятия не имеет, как его «отбросить». Если мы запустим наши тесты без явной реализации трейта Drop, будут утечки памяти. 
<pre><code class="language-rust">
impl Drop for Tree {
    fn drop(&mut self) {
        // Probably not the most efficient way to destroy the whole tree, but
        // it's simple and it works :)
        while !self.root.is_null() {
            self.remove_node(self.root);
        }
    }
}
</code></pre>
