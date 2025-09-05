


<pre><code class="language-rust">
fn main(){
    let fut = async {
        foo().await?;
        bar().await?;
        Ok::<(), MyError>(())  
    };
}
</code></pre>
