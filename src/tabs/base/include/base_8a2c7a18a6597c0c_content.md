


<pre><code class="language-rust">
#[test]
#[ignore = "not yet implemented"]
fn mytest() {
    // тест игнорируется
}

#[test]
#[should_panic(expected = "values don't match")]
fn mytest() {// Атрибут should_panic заставляет тест проходить только в том случае, если он действительно паникует 
    assert_eq!(1, 2, "values don't match");
}
</code></pre>
