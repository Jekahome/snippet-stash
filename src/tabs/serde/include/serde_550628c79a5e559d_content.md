

Сериализуйте и десериализуйте это поле, используя заданное

`#[serde(rename = "name")]`

`#[serde(rename(serialize = "ser_name", deserialize = "de_name"))]`



<pre><code class="language-rust">
#[derive(Serialize,Deserialize)]
struct People{
    #[serde(rename = "something")]
    some_thing:i32
}
</code></pre>
