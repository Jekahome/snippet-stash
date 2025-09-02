

Решить как показать ошибку пользователю.
<pre><code class="language-rust">
fn main() -> anyhow::Result<()>{
    return Err(anyhow::anyhow!("Missing attribute: {}", 3));
   // anyhow::bail!("Missing attribute: {}", 3);
   
    let any:anyhow::Error = anyhow::anyhow!("Missing attribute: {}", 3);
    return Err(any.context(format!("Context attribute: {}",3)));
  
    return Err(anyhow::Error::new(SumFileError::ZeroSum(ZeroSumKind)).context(format!("Context attribute: {}",3)));
    // return Err(anyhow::Error::msg(format!("Missing attribute: {}",3)));
  
   let err:std::result::Result<_,SumFileError> = Ok(SumFileError::ZeroSum(ZeroSumKind));
   let _ = err?;// from anyhow::Result
   let _ = sum_file(std::path::Path::new("src/main.rs"))?;

    // From/Into
    match "...".parse::<i32>(){
        Err(parse_err) => {
            let _err:anyhow::Error = parse_err.clone().into();
            let err: anyhow::Error = anyhow::Error::from(parse_err);
            // Display 
            println!("{}",err);// invalid digit found in string
        },
        _ =>{}
    }
   Ok(())
}
</code></pre>
