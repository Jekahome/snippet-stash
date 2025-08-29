


<pre><code class="language-rust">
use std::marker::PhantomData;

/// Создаём пустые перечисления для определения типов единиц измерения.
#[derive(PartialEq)]
enum Inch {} 

#[derive(PartialEq)]
enum Mm {}

#[derive(PartialEq)]
struct Length<TUnit>(f64, PhantomData<TUnit>);
 
fn main() {
    // Создание разных типов:
    // тип для Length<Inch> где PhantomData захватывает тип Inch
    let one_foot: Length<Inch> = Length::<Inch>(12.0, PhantomData);
    let one_foot_2: Length<Inch> = Length::<Inch>(12.0, PhantomData);
    if one_foot == one_foot_2{}// одинаковые типы можно сравнивать

    // тип для Length<Mm> где PhantomData захватывает тип Mm
    let one_meter: Length<Mm> = Length::<Mm>(1000.0, PhantomData);  
    let one_meter_2: Length<Mm> = Length::<Mm>(1000.0, PhantomData);
    if one_meter == one_meter_2{}// одинаковые типы можно сравнивать

    // error[E0308]: mismatched types
    //if one_foot == one_meter{}// разные типы нельзя сравнивать
}
</code></pre>
