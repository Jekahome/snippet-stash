


<pre><code class="language-rust">
fn main(){
    let mut data = Rc::new(5);

    *Rc::make_mut(&mut data) += 1;        //data=6  Не будет клонировать ничего
    let mut other_data = Rc::clone(&data);// Не будет клонировать внутренние данные
    //  `data` и` other_data` еще указывают на одно значение.
    *Rc::make_mut(&mut data) += 1;        //other_data=6 data=7  Внутренние данные сколонировал .
    // Теперь `data` и` other_data` указывают на разные значения.
    *Rc::make_mut(&mut data) += 1;        //other_data=6 data=8  Не будет клонировать ничего
    *Rc::make_mut(&mut other_data) *= 2;  //other_data=12  Не будет клонировать ничего

//  Теперь `data` и` other_data` указывают на разные значения.
    assert_eq!(*data, 8);
    assert_eq!(*other_data, 12);
}
</code></pre>
