

**Не кодируйте жестко**, откуда вы читаете данные - используйте: 
<pre><code class="language-rust">
// ✅
fn parse(reader: impl std::io::Read) {

}

// ❌ вместо 

fn parse(filename: &str){
 ...
}
</code></pre>


