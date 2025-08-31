


<pre><code class="language-rust">
// pub( crate) делает имя доступным во всем крейте
mod a{
    pub(super) mod b{
        pub( crate ) struct Foo;
    }
}
mod b{
    use super::a::b::Foo;
}
</code></pre>
