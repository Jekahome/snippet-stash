

Пример реализации типа onlysync.
Небезопасная работа с необработанными указателями не реализует черты Send и Sync по умолчанию.
<pre><code class="language-rust">
#[derive(Debug)]
pub struct OnlySync {
    pub field: *mut i32,
}
unsafe impl Sync for OnlySync {}
impl OnlySync {
    pub fn new() -> Arc<Mutex<OnlySync>> {
        Arc::new(Mutex::new(OnlySync { field: &mut 1 }))
    }
}
impl Drop for OnlySync {
    fn drop(&mut self) {}
}

fn main() {
    let mut onlySync: Arc<Mutex<OnlySync>> = OnlySync::new();

    use notsync::{self, Point as Point_send};
    let mut point: Point_send = Point_send::new(Cell::new(3), Cell::new(3));
    {
        let mut ref_point: &mut Point_send = &mut point;

        crossbeam::scope(|scope_| {
            scope_
                .spawn(move || {
                    //ref_point.x.set(0);
                    //point_clone.x.set(0);
                    ref_point.set_x(0);
                    // println!("point_clone={:#?}",point_clone);
                })
                .join();
        });
    }
    thread::sleep_ms(50);
    assert_eq!(point.get_x(), 0);
}
</code></pre>
