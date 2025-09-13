

```
#[test]
fn cargo_compile_simple() -> Result<(), Box<dyn std::error::Error>>{
    use assert_fs::prelude::*;
    use assert_cmd::prelude::*;
    use predicates::prelude::*;
    use assert_cmd::cmd::Command;

    let mut binding = Command::cargo_bin("example_test").expect("bin file not found");
    let mut cmd = binding.timeout(std::time::Duration::from_secs(1));

    cmd.arg("hello");
    cmd.assert()
        .success()
        .stdout(predicate::str::contains("args:hello"))
        .code(0);
    Ok(()) 
}
```
