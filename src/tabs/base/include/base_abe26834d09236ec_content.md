


<pre><code class="language-rust">
use std::ops::Add;
use std::marker::PhantomData;

/// Создайте пустые перечисления для определения unit types.
#[derive(Debug, Clone, Copy)]
enum Inch {}
#[derive(Debug, Clone, Copy)]
enum Mm {}

/// `Length` это тип с параметром фантомного типа `T`,
/// и не является универсальным по типу длины (то есть `f64`).
///
/// `f64` уже реализует `Clone` и `Copy`.
#[derive(Debug, Clone, Copy)]
struct Length<T>(f64, PhantomData<T>);

/// The `Add` trait defines the behavior of the `+` operator.
impl<T> Add for Length<T> {
    type Output = Length<T>;

    // add() returns a new `Length` struct containing the sum.
    fn add(self, rhs: Length<T>) -> Length<T> {
        // `+` calls the `Add` implementation for `f64`.
        Length(self.0 + rhs.0, PhantomData)
    }
}
fn main() {
    // Определяет one_foot, чтобы иметь параметр фантомного типа Inch.
    let one_foot:  Length<Inch> = Length(12.0, PhantomData);
    // `one_meter` имеет параметр фантомного типа `Mm`.
    let one_meter: Length<Mm>   = Length(1000.0, PhantomData);

    // Поскольку Length реализует Copy, add () не использует 
    // one_foot и one_meter, но копирует их в self и rhs.
    let two_feet = one_foot + one_foot;
    let two_meters = one_meter + one_meter;

    println!("one foot + one_foot = {:?} in", two_feet.0); // 24.0
    println!("one meter + one_meter = {:?} mm", two_meters.0); // 2000.0

    // Nonsensical operations fail as they should:
    // Compile-time Error: type mismatch.
    //let one_feter = one_foot + one_meter;
}
</code></pre>
