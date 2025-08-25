

```
fn exec_command_yarn_test(
    path_yarn: Option<&PathBuf>,
    path_dir: &PathBuf,
    path_file: &PathBuf,
) -> Result<(), Error> {
    let command = {
        if path_yarn.is_none() {
            PathBuf::from("yarn")
        } else {
            path_yarn.unwrap().to_path_buf()
        }
    };

    #[cfg(target_os = "windows")]
    let output = {
        let path_file = path_file
            .to_string_lossy()
            .replace(r"\\", "/")
            .replace("\\", "/");
        Command::new("cmd")
            .current_dir(path_dir)
            .arg("/C")
            .arg(command)
            .arg("test")
            .arg(path_file)
            .arg("--passWithNoTests")
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .output()
            .map_err(|e| Error::YarnExecute(e))?
    };

    #[cfg(not(target_os = "windows"))]
    let output = Command::new(command)
        .current_dir(path_dir)
        .arg("test")
        .arg(path_file)
        .arg("--passWithNoTests")
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .output()
        .map_err(|e| Error::YarnExecute(e))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(Error::YarnWrongSetting(stderr.into()));
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);
    let mut combined_output = String::new();
    combined_output.push_str(&stdout);
    combined_output.push_str(&stderr);
    print_success_result(combined_output.as_bytes());

    Ok(())
}
fn print_success_result(result: &[u8]) -> Result<(), Error> {
    let stdout = io::stdout();
    let mut handle = stdout.lock();

    handle.write_all(&result).map_err(|e| Error::IoError(e))?;
    handle.flush().map_err(|e| Error::IoError(e))?;
    Ok(())
}

fn print_failure_result(err: Error) -> Result<(), Error> {
    let stderr = io::stderr();
    let mut handle = stderr.lock();

    writeln!(handle, "{}", err).map_err(|e| Error::IoError(e))?;
    handle.flush().map_err(|e| Error::IoError(e))?;
    Ok(())
}
pub fn wrap_exec_command_yarn_test(
    path_yarn: Option<&PathBuf>,
    path_dir: &PathBuf,
    path_file: &PathBuf,
) {
    if let Err(e) = exec_command_yarn_test(path_yarn, path_dir, path_file) {
        // Sends Error data to the io::stderr output stream
        print_failure_result(e);
    }
}
```

