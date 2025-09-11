


```
// При использовании трейт обьектов 
// Преобразование к родительскому трейту 

trait BalanceReader {  // ...}
trait BalanceWriter { // ...}

trait BalanceDao: BalanceReader + BalanceWriter + AsBalanceReader{ // ....}
fn foo(reader: &dyn BalanceReader){ // ...}
fn bar(dao: &dyn BalanceDao){
   // foo(dao);// cannot cast `dyn BalanceDao` to `dyn BalanceReader`, trait upcasting coercion is experimental
    foo(dao.as_reader());
}
// С помощью дополнительно трейта ограничителя сможем преобразовать из &dyn BalanceDao в &dyn BalanceReader
trait AsBalanceReader {
    fn as_reader(&self) -> &dyn BalanceReader;
}
impl<T:'static + BalanceReader> AsBalanceReader for T {
    fn as_reader(&self) -> &dyn BalanceReader {
        self
    }
}
```

---

Более общий вид
```
trait CastToSuper<Super; ?Sized> {
    fn as_super(&self) -> &Super;
    fn as_super_mut(&mut self) -> &mut Super;
    fn into_super_arc(self: Arc<Self>) -> Arc<Super>;
}

trait BalanceDao: BalanceReader + BalanceWriter + CastToSuper<dyn Balancereader> {
  // ...
}

impl<'a,T: 'a + BalanceReader> CastToSuper<dyn BalanceReader + 'a> for T {
    fn as_super(&self) -> &(dyn BalanceReader + 'a) {
        self
    }
    fn as_super_mut(&mut self) -> &mut (dyn BalanceReader + 'a) {
        self
    }
    fn into_super_arc(self: Arc<Self>) -> Arc<dyn BalanceReader + 'a> {
        self
    }
}
```
