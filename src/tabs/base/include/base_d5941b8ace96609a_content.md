
<pre><code class="language-rust">
fn main(){
 let s = r"foo"; // или let s = "foo";
 let s = r#""foo""#; // или let s = "\"foo\"";
 let s = r##"foo #"# bar"##;// или let s = "foo #\"# bar";

 //  foo::try(); // Error try это ключевое слово языка
 foo::r#try();
}
</code></pre>

