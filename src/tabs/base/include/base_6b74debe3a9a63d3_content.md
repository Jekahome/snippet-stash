

Прозрачность
PhantomData является прозрачным для Auto-traits (Send, Sync, Unpin, UnwindSafe, and RefUnwindSafe), что означает, например, что `PhantomData<usize>` есть Send и Sized, а не `PhantomData<dyn Any>`  ни Send, ни Sized
```rust
struct Nonce<Of>(PhantomData<Of>, usize);

// This compiles OK, as `Nonce<()>` is `Send`.
let nonce: Nonce<()> = Nonce(PhantomData, 1);
thread::spawn(move || {
    println!("{nonce:?}");
});

// This doesn't compile, as `Nonce<Rc<()>>` is not `Send`.
let nonce: Nonce<Rc<()>> = Nonce(PhantomData, 2);
thread::spawn(move || {
    println!("{nonce:?}");
});
fn main(){
// This doesn't compile, as `dyn Any` is not `Sized`.
    let nonce: Nonce<dyn Any> = Nonce(PhantomData, 3);
}
```


Чтобы избежать таких проблем, давайте просто **сформируем правильный тип внутри PhantomData**, чтобы у нас всегда были нужные реализации Auto-traits (Send, Sync, Unpin, UnwindSafe, and RefUnwindSafe), несмотря на подставленный тип:
```rust
struct Nonce<Of: ?Sized>(PhantomData<AtomicPtr<Box<Of>>>, usize);

// This compiles OK now, despite `Rc<()>` is not `Send`.
let nonce: Nonce<Rc<()>> = Nonce(PhantomData, 2);
thread::spawn(move || {
    println!("{nonce:?}");
});
fn main(){
// This compiles OK now, as any `?Sized` type is allowed.
    let nonce: Nonce<dyn Any> = Nonce(PhantomData, 3);
}
```
