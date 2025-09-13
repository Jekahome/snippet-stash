

```
extern crate atomic;
#[derive(Copy, Clone, Eq, PartialEq, Debug, Default, NoUninit)]
#[repr(C)]
struct Bar(u64, u64);

#[test]
fn atomic_bar() {
    let a = Atomic::default();
    assert_eq!(Atomic::<Bar>::is_lock_free(), false);
    assert_eq!(format!("{:?}", a), "Atomic(Bar(0, 0))");
    assert_eq!(a.load(SeqCst), Bar(0, 0));
    a.store(Bar(1, 1), SeqCst);
    assert_eq!(a.swap(Bar(2, 2), SeqCst), Bar(1, 1));
    assert_eq!(
        a.compare_exchange(Bar(5, 5), Bar(45, 45), SeqCst, SeqCst),
        Err(Bar(2, 2))
    );
    assert_eq!(
        a.compare_exchange(Bar(2, 2), Bar(3, 3), SeqCst, SeqCst),
        Ok(Bar(2, 2))
    );
    assert_eq!(a.load(SeqCst), Bar(3, 3));
}
```
