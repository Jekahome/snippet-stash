


<pre><code class="language-rust">
fn main(){
    let v1: Vec<i32> = Vec::new();// через new (Vec::<i32>::new())
    let mut v1: Vec<u32> = Vec::with_capacity(99);
    let v:Vec<i32> = Vec::default();
    let v2: Vec<i32> = vec![];// через macro vec! (Пустой вектор создается нулевой емкостью и выделяет память 4, 8, 16 и 32)
    let v = vec![1i32;3]; // [1,1,1]
    let mut v3 = vec![1u8, 2, 3, 4, 5];// v: Vec<u8>
    let v:Vec<String> = (0..N).map(|i|format!("{}",i)).collect::<Vec<String>>();

    println!("Третий элемент вектора v равен {}", v3[2]);

    for i in &v3 {
        println!("Ссылка {}", *i);// разименовывание , println может сам это делать
    }

    for i in &mut v3 {
        println!("Изменяемая ссылка {}", *i);
    }

    //Владение вектором
    // передача владения циклу for, после него вектор удаляется из стека и кучи
    for i in v3 {
        println!("Владение вектором и его элементами {}", i);
    }

    //По вектору можно легко итерироваться
    for x in xs.iter() {
        println!("> {}", x);
    }
    //Благодаря методу `iter_mut`, можно обойти вектор при этом изменить каждое значение в нем.
    for x in xs.iter_mut() {
        *x *= 3;
    }
    println!("Обновленный вектор: {:?}", xs);

    while let Some(top) = v3.pop() {
        //13,12,11,3,
        print!("{},", top);
    }
}
</code></pre>
