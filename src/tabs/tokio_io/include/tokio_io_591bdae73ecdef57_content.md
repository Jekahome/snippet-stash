


<pre><code class="language-rust">
async fn foo() -> Result<i32,std::io::Error>{
    Ok(123)
}

#[tokio::main]
async fn main() -> Result<(),std::io::Error>{
    //let fut:&dyn std::future::Future<Output = Result<i32, std::io::Error>> = &foo();
    let fut = foo();
    let res:i32 = fut.await?;
    assert_eq!(123,res);
    Ok(())
}
</code></pre>
