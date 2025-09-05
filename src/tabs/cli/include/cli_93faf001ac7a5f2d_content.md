


<pre><code class="language-rust">
// cargo run --bin parser_vtt <PATH TO SUBTITLES>
pub fn main() -> Result<(), std::io::Error> {
    let args: Vec<String> = std::env::args().collect(); 
    if args.len() < 2 {
        return Err(std::io::Error::other("file notfound"));
    }
    let from_sub = args[1].clone();

    normalize_subtitles(from_sub.as_str())?;
    Ok(())
}
</code></pre>
