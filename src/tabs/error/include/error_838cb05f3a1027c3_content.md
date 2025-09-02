


<pre><code class="language-rust">
fn do_something_that_might_fail(i: i32) -> Result<f32,String> {
    if i == 42 {
        Ok(13.0)
    } else {
        Err(String::from("this is not the right number"))
    }
}

fn foo2()-> Result<(),String> {
// с ?
   let v:f32 = do_something_that_might_fail(42)?;
// map_err
  fn foo2()-> Result<(),MyError> {
    do_something_that_might_fail(42).map_err(|e|MyError(e))?   

// без ?
    let res = do_something_that_might_fail(42);
    let v:f32;
    if res.is_ok(){
        v = res.unwrap();
    }else{
        return Err(res.err().unwrap());
    }
   Ok(())
}
</code></pre>
