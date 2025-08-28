

Классический пример — буферизованный вывод. 

При закрытии потока нужно записать все данные, но нужно обработать ошибки.
Не допустить вызова drop

Эмуляция Линейных Типов
<pre><code class="language-rust">
use std::error::Error;
struct SafeBufWrite;
impl SafeBufWrite {
   fn flush(&mut self) -> Result<(),&'static dyn Error> { Ok(()) }
   fn close(mut self) -> Result<(),&'static dyn Error> {
      self.flush()?; // записать все данные
      std::mem::forget(self); // обезвредили drop (forget Вступает во владение и «забывает» о значении, не запуская его деструктор)
      Ok(())
   }
}
impl Drop for SafeBufWrite {
   fn drop(&mut self) {
      let _ = self.flush(); // игнорируем ошибки
      panic!("should be flushed explicitly")  // Если не вызвать метод close, при срабатывании drop будет ошибка
   }
}
fn main() {
   let buff = SafeBufWrite;
   let _ = buff.close();
}
</code></pre>
