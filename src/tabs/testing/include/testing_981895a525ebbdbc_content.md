


<pre><code class="language-rust">
pub trait Writer{ fn print_stdout_result(&self, output: &[u8]) -> Result<(), Error>;}
pub struct Service<W: Writer> {  writer: W}
impl Service<ImplWriter> {
    pub fn new() -> Self { Self { writer: ImplWriter::default() } }
}
impl<W: Writer + Default> Service<W> {
    pub fn new_with_writer( writer: W ) -> Self { Self { writer}}
   // ... весь функционал тут
}
// Default для вызова new без передачи Writer по умолчанию
#[derive(Default)]
pub struct ImplWriter;
impl Writer for ImplWriter {
    fn print_stdout_result(&self, output: &[u8]) -> Result<(), Error> { // Sends [u8] data to the io::stdout output stream
        if !output.is_empty() { 
            let stdout = io::stdout();
            let mut handler = stdout.lock();
            handler.write_all(output).map_err(Error::Io)?;
            handler.flush().map_err(Error::Io)?;
        } Ok(()) }
}
impl<W: Writer + Default> Service<T,W> {
    pub fn new() -> Self { Self { writer: W::default() } }
    pub fn new_with_writer( writer: W) -> Self { Self { writer} }  // можно использовать при тестировании
    pub fn example(&self) {
        self.writer.print_stdout_result("123".as_bytes());      
    }
}
fn main(){  let service = Service::new(); /* default отработает*/ }
Как тестировать
mod test{
  // Своя реализация Writer
  pub struct TestImplWriter{
    pub stdout: Rc<RefCell<Vec<u8>>>, 
  }
  impl Default for TestImplWriter {
    fn default() -> Self { Self { stdout: Rc::new(RefCell::new(Vec::new())) }}// не будет использоваться
  }
  impl  TestImplWriter {
    pub fn new(&mut self,stdout: Rc<RefCell<Vec<u8>>>){ self.stdout = stdout; }
  }
  impl Writer for TestImplWriter {
    fn print_stdout_result(&self, output: &[u8]) -> Result<(), errors::Error> {
        if !output.is_empty() {  self.stdout.borrow_mut().extend_from_slice(output); } Ok(())
    }
}
#[test]
fn test(){
     let result_stdout = Rc::new(RefCell::new(Vec::new()));
     let mut writer = TestImplWriter::default();
     writer.new(result_stdout.clone(), result_stderr.clone());

     let service = Service::new_with_writer( writer );
     service.example();
     let guard = result_stdout.borrow();
     let output_str = String::from_utf8_lossy(&guard);
     assert_eq!(output_str, "123");
}}

</code></pre>
