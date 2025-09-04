

Канал не более 5 сообщений
 
<pre><code class="language-rust">
fn main(){
   let (tx, rx): (crossbeam_channel::Sender<u32>, crossbeam_channel::Receiver<u32>) = crossbeam_channel::bounded( 5 );
}
</code></pre>
