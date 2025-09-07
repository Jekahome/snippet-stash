


<pre><code class="language-rust">
async fn async_test() -> std::io::Result<()> {
    use async_std::fs::File;
    use futures::io::AsyncReadExt;
 
    let mut file =  File::open("src/foo.txt").await?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer).await?;
    println!("buffer:{:?}",buffer);
    Ok(())
}
fn main(){
    async_test().await;
}
</code></pre>
