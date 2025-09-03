


<pre><code class="language-rust">
#[test]
#[should_panic] если не будет panic тест сработает
fn it_works() {
    assert!(false);
}

#[test]
#[should_panic(expected = "empty input")]
fn empty_input() {
    parse("").unwrap();
}
</code></pre>
