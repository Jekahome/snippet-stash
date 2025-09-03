


<pre><code class="language-rust">
#[tokio::test]
async fn setup_create_account() {
    // setup env ...
  
    // run test
    let join_handle = tokio::spawn(async {
        test_unified().await?;
        Ok::<(), io::Error>(())
    });

    let err = match join_handle.await {
        Ok(Err(e)) => Some(Box::new(e)),
        Err(e) => Some(Box::new(e.into())),
        Ok(Ok(_)) => None,
    };

    // clear env ...

    if let Some(err) = err {
        println!("Test failed, rethrowing panic...");
        panic::resume_unwind(err);
    }
}
</code></pre>
