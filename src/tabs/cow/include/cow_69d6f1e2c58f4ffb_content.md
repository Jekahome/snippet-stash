

Отличным примером того, как вы можете использовать суперспособности Cow в своих собственных структурах, ссылаясь на входные данные, а не на их копирование, является атрибут `#[serde(borrow)]`

Serde будет по умолчанию заполнить эту bar Cow принадлежащей String
<pre><code class="language-rust">
#[derive(Debug, Deserialize)]
struct Foo<'input> {
    bar: Cow<'input, str>,
}
</code></pre>


Однако, если вы  пишете это как
<pre><code class="language-rust">
#[derive(Debug, Deserialize)]
struct Foo<'input> {
    #[serde(borrow)]
    bar: Cow<'input, str>,
}
</code></pre>

Serde попытается создать заимствованную версию Cow::Borrowed

Это будет работать, однако, когда **входную строку не нужно настраивать**.


