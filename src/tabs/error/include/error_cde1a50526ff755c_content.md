


<pre><code class="language-rust">
fn main_with_eyre() -> eyre::Result<()> {
    let _ = sum_file(std::path::Path::new("src/main.rs"))?;// from eyre::Result

    let res:eyre::Result<i32> = sum_file(std::path::Path::new("src/main.rs")).map_err(|e|e.into());
    /*
    Format backtrace {:?}
    Format Debug {:#?}

    println!("{:?}",res);
        Err(invalid digit found in string
        Location:
            /rustc/eb26296b556cef10fb713a38f3d16b9886080f26/library/core/src/convert/mod.rs:717:9)

    println!("{:#?}",res);
        Err(
            Parse(
                ParseIntError {
                    kind: InvalidDigit,
                },
            ),
        )
    */
   if false{
       // return Err(eyre::eyre!("Missing attribute: {}", 3));
          return Err(eyre::eyre!(SumFileError::ZeroSum(ZeroSumKind)));
   }
   Ok(())
}
</code></pre>
