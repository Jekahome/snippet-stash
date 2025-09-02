

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   `fn successors<T, F>(first: Option<T>, succ: F) -> Successors<T, F> where  F:FnMut(&T) -> Option<T>`

Создает новый итератор, в котором каждый последующий элемент вычисляется на основе предыдущего.
<pre><code class="language-rust">
use std::iter::successors;
fn main(){
    let powers_of_10 = successors(Some(1_u16), |n| n.checked_mul(10));
    assert_eq!(powers_of_10.collect::<Vec<_>>(), &[1, 10, 100, 1_000, 10_000]);


    let res = successors(Some(1_u32),|v|{ 
        if *v < 5 {
            Some(v+1)
        }
        else{ None }
    });
    assert_eq!(res.collect::<Vec<_>>(), &[1, 2, 3, 4, 5]);

    let f = |v:&u32|{
        if *v < 5 {
            Some(v+1)
        }
        else{ None }
    };

    let res =  successors(Some(1_u32),f);
    assert_eq!(res.collect::<Vec<_>>(), &[1, 2, 3, 4, 5]);
}
</code></pre>
