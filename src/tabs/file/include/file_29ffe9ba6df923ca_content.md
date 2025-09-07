


<pre><code class="language-rust">
fn file_content(path_file: &PathBuf) -> Result<(), Error> {
    let metadata = fs::metadata(&path_file).map_err(|e| Error::FileNotFound(e))?;
    if !metadata.is_file() {
        return Err(Error::NotFile);
    }

    let file = File::open(path_file).map_err(|e| Error::FileNotFound(e))?;
    let reader = BufReader::new(file);
    let stdout = io::stdout();
    let mut handle = stdout.lock();
    let mut total_bytes_read = 0;
    for line in reader.lines() {
        let line = line.map_err(|e| Error::FileContentInvalidUtf8(e))?;
        total_bytes_read += line.len() as u64;
        if total_bytes_read > MAX_FILE_SIZE_BYTES {
            return Err(Error::FileSizeExceeded(MAX_FILE_SIZE_BYTES));
        }
        handle
            .write_all(line.as_bytes())
            .map_err(|e| Error::IoError(e))?;
        handle.write_all(b"\n").map_err(|e| Error::IoError(e))?;
    }
    Ok(())
}
</code></pre>
