


<pre><code class="language-rust">
fn split_range1(r: Range<usize>) -> (Range<usize>, Option<Range<usize>>) {
      // Мы математически не можем разделить диапазон, если есть только
      // одна точка внутри него, но мы могли бы прекратить расщепление до этого.
      if r.end - r.start <= 1 { return (r, None); }

     // Здесь наш ассортимент считается достаточно большим, чтобы его можно было разделить
     let midpoint = r.start + (r.end - r.start) / 2;
     (r.start..midpoint, Some(midpoint..r.end))
}
fn main(){
   // split Функция принимает произвольные данные и замыкание , которое знает , как разделить его, и превращает это в ParallelIterator.

  // Используя iter::split, Rayon разделит диапазон, пока не будет достаточно работы
    // чтобы подать ядра процессора, затем дать нам результирующие поддиапазон
    iter::split(0..4096, split_range1).for_each(|sub_range| {
        // Поскольку у нашего начального диапазона был размер степени двойки, заключительные поддиапазоны
        // тоже должен иметь степень двойки
        assert!((sub_range.end - sub_range.start).is_power_of_two());
    });


    // assert_eq!((3..5), std::ops::Range { start: 3, end: 5 });
    rayon::iter::split((0..10_usize),|r:Range<usize>|{
        if r.end - r.start <= 1 { return (r, None); }
        let midpoint = r.start + (r.end - r.start) / 2;
        (r.start..midpoint, Some(midpoint..r.end))
    }).for_each(|sub_range:Range<usize>| {
        //assert!((sub_range.end - sub_range.start).is_power_of_two());
         println!("{}",sub_range.start);// 1 2 3 8 5 4 7 9 0 6
    });
}
</code></pre>

<details>
<summary>Output:</summary>

```
(0..2),(2..5)
(5..7),(7..10)
(0..1),(1..2)
(2..3),(3..5)
(5..6),(6..7)
(7..8),(8..10)
(8..9),(9..10)
(3..4),(4..5)
--------------
(0..5),(5..10) => {  
                   { 
                    (0..2),(2..5) => {
                                      (0..1),(1..2) => {
                                                       None,
                                                       None,
                                                       },
                                      (2..3),(3..5) => {
                                                       None,
                                                       (3..4),(4..5)
                                                       },
                                     },
                    (5..7),(7..10) => {
                                      (5..6),(6..7) => {},
                                      (7..8),(8..10) => {
                                                         None,
                                                         (8..9),(9..10)
                                                         },
                                     }       
                   }, 
                  }
```
</details>

---

<pre><code class="language-rust">
fn main(){
 let (sender, receiver):(Sender<i32>,Receiver<i32>) = channel();
    let a: Vec<i32> =   rayon::iter::split((0..10_i32),|r:Range<i32>|{
        if r.end - r.start <= 1 { return (r, None); }
        let midpoint = r.start + (r.end - r.start) / 2;
        //println!("({}..{}),({}..{})",r.start,midpoint,midpoint,r.end);
        (r.start..midpoint, Some(midpoint..r.end))
    })
        .into_par_iter()
        .map_with(sender, |s:&mut Sender<i32>, x:Range<i32>| {
            s.send(x.end).unwrap();  
            s.send(x.start).unwrap();     // отправка значений i32 через канал
            x.start
        })
        .collect();
    let mut b: Vec<i32> = receiver.iter().collect();
}
</code></pre>


