

```
#[derive(Debug, Clone)]
pub struct Point {
        x: Cell<i32>,
        y: Cell<i32>,
}
impl Point {
        pub fn new(x: Cell<i32>, y: Cell<i32>) -> Point {
            Point { x, y }
        }
        pub fn set_x(&mut self, x: i32) {
            self.x.set(x);
        }
        pub fn set_y(&mut self, y: i32) {
            self.y.set(y);
        }
        pub fn get_x(&self) -> i32 {
            self.x.get()
        }
}
#[test]
fn test() {
    let mut point: Point = Point::new(Cell::new(3), Cell::new(3));
    {
        let mut ref_point: &mut Point = &mut point;
        //let point_clone:Point_send = point.clone();
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
    // println!("point={:#?}",point);
    assert_eq!(point.get_x(), 0);
}
```

