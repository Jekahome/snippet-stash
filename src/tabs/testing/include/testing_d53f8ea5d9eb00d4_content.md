


**Первый вариант** тестирования stdout/stderr через передачу писателя в аргументах функции.

Недостаток, то что по всей цепочке вызовов передается `&Mutex<dyn Write + Send>`
```
use std::rc::Rc;
use std::fmt::Write as _;
use std::io::{self, Write};

pub struct Service<T: AIClient> {
    client: T,
}
fn print_stderr_result(
        &self,
        output: &[u8],
        stderr: &Mutex<dyn Write + Send>,
    ) -> Result<(), Error> {
        if !output.is_empty() {
            let mut handler = stderr.lock().unwrap(); 
            handler.write_all(output).map_err(Error::Io)?;
            handler.write_all(b"\n").map_err(Error::Io)?;
            handler.flush().map_err(Error::Io)?;
        }
        Ok(())
}
#[test]
fn test(){
 service.print_stderr_result(err.to_string().as_bytes(), &Mutex::new(io::stderr()));

 let mut result_stderr = Mutex::new(Vec::new());
 service.print_stderr_result(err.to_string().as_bytes(), &mut result_stderr);
 let guard = result_stderr.lock().unwrap();
 let output_stderr = String::from_utf8_lossy(&guard);
 assert!(output_stderr.len() > 0);
}
```

---

**Второй вариант** держать свойство с писателем и использовать его только в нужном методе.

Недостаток, лишнее поле только для нужд тестирования.
```
pub struct Service<T: AIClient> {
    client: T,
    pub writer: Option<StdoutWriter>,
}
type StdoutWriter = Rc<Mutex<dyn Write + Send>>;
 
fn print_stderr_result(
    &self,
    output: &[u8],
) -> Result<(), Error> {
    if !output.is_empty() {
        if let Some(w) = &self.writer{
            let mut handler = w.lock().unwrap();
            handler.write_all(output).map_err(Error::Io)?;
            handler.write_all(b"\n").map_err(Error::Io)?;
            handler.flush().map_err(Error::Io)?;
        }else{
                let stderr = io::stderr();
                let mut handler = stderr.lock();
                handler.write_all(output).map_err(Error::Io)?;
                handler.write_all(b"\n").map_err(Error::Io)?;
                handler.flush().map_err(Error::Io)?;
        }
    }
    Ok(())
}
#[test]
fn test(){
    let mut test_stderr = Rc::new(Mutex::new(Vec::new()));
    service.writer = Some(test_stderr.clone());
    service.print_stderr_result(err.to_string().as_bytes());
    let guard = test_stderr.lock().unwrap();
    let output_stderr = String::from_utf8_lossy(&guard);
    assert!(output_stderr.len() > 0);
}
```
