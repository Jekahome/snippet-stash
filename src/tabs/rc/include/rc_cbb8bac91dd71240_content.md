

Rc, в отличие от этого Box, не копирует весь контекст и данные при вызове clone, он только копирует и передает ссылку на объект в куче, «толстый указатель» с виртуальной таблицей, указывающей на правильную реализацию типа Т. 

Наши объекты должны быть, Sized если мы хотим использовать clone метод. 

При вызове clone нам не нужно знать размер объекта, который мы копируем. 

Единственное, что мы копируем, это ссылка на объект, живущий в куче, и мы увеличиваем счетчик 1.


```
use std::rc::Rc;
pub struct Server {
    engine: Rc<Engine>,
}
impl Default for Server {
    fn default() -> Self{
        // Instantiate a default Engine client
        let client = Rc::new(Docker::new());
        Server {
            engine: client,
        }
    }
}
impl Server {
    pub fn new() -> Server{
        Default::default()
    }
    // Overrides the default engine
    pub fn init_engine(&mut self, engine: Rc<Engine>)-> &mut Server{
        self.engine = engine;
        self
    }
    // [...] collection of init functions
    pub fn build(&self) -> Server{
        Server { engine: self.engine.clone()}
    }
}
```
