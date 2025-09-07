


<pre><code class="language-rust">
pub struct WriteAdaptor<'a> {
    fmt_write: &'a mut dyn std::fmt::Write,
}
impl<'a> WriteAdaptor<'a> {
    pub fn new(fmt_write: &'a mut dyn std::fmt::Write) -> Self {
        Self { fmt_write }
    }
}
impl<'a> std::io::Write for WriteAdaptor<'a> {
    fn write(&mut self, buf: &[u8]) -> io::Result<usize> {
        let s = std::str::from_utf8(buf).map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?;

        self.fmt_write
            .write_str(s)
            .map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;

        Ok(s.as_bytes().len())
    }

    fn flush(&mut self) -> io::Result<()> {
        Ok(())
    }
}
fn main(){
// Можно использовать:
    let mut serializer = serde_json::Serializer::new(WriteAdaptor::new(&mut writer));
    let mut serializer = serializer.serialize_map(None)?;
    serializer.serialize_entry("level", &meta.level().as_serde())?;
    serializer.end()
}
</code></pre>

---

<pre><code class="language-rust">
struct A{
    buff:std::fs::File
}
 
type Result<T> = std::result::Result<T, std::io::Error>;

impl std::io::Write for A{
    fn write(&mut self, buf: &[u8])->Result<usize>{
        println!("{:?}",buf);
        self.buff.write_all(buf);
        Ok(buf.len() as usize)
    }
    fn flush(&mut self) -> Result<()>{Ok(())}
}
fn main(){
    let file:std::fs::File = OpenOptions::new()
        .create(true)
        .write(true)
        .truncate(true)
        .open("test.log")
        .unwrap();

    let f:A = A{buff:file};
}
</code></pre>
