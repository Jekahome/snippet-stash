

rayon::join    могут использовать эксклюзивный стек

Делает два закрытия и потенциально запускает их параллельно. Он возвращает пару результатов от этих закрытий.

Предполагается, что указанные замыкания join() являются задачами, связанными с ЦП, которые не выполняют операции ввода-вывода или другие блокирующие операции.

Более того, если вы заблокируете одно закрытие, ожидающее другого (например, используя канал), это может привести к блокировке.
<pre><code class="language-rust">
fn main(){
     let res = rayon::join(|| { "str" }, || { 2 });
     print!("{:?}",res);// ("str", 2)

     let mut v = vec![5, 1, 8, 22, 0, 44];
     let (lo, hi):(&mut[i32],&mut[i32]) = v.split_at_mut(3);

     let res = rayon::join(|| { lo.sort(); lo}, || { hi.sort();hi });

     let y: Vec<_> = vec![res.0,res.1].into_par_iter().flatten().collect();
     print!("{:?}",y);// [1, 0, 5, 22, 8, 44]

    let par_iter = res.0.par_iter().chain(res.1.par_iter());
    let y: Vec<_> = par_iter.cloned().collect();
    print!("{:?}",y);// [1, 0, 5, 22, 8, 44]

    let y:Vec<_> = res.0.into_par_iter().interleave(res.1).collect();
    print!("{:?}",y);// [1, 0, 5, 22, 8, 44]
}
</code></pre>

---

Сортировка разделением на части вектора
<pre><code class="language-rust">
fn main(){
    let mut v = vec![5, 1, 8, 22, 0, 44];
    quick_sort(&mut v);
    assert_eq!(v, vec![0, 1, 5, 8, 22, 44]);
}

fn quick_sort<T:PartialOrd+Send+std::fmt::Debug>(v: &mut [T]) {
    if v.len() > 1 {
        let mid = partition(v);
        let (lo, hi) = v.split_at_mut(mid);//split_at_mut() Разделяет один срез на два по индексу разделителя.

        println!("lo={:?} hi={:?}",lo,hi);
        rayon::join(|| quick_sort(lo),
                    || quick_sort(hi));
    }
}

// Partition rearranges all items `<=` to the pivot
// item (arbitrary selected to be the last item in the slice)
// to the first half of the slice. It then returns the
// "dividing point" where the pivot is placed.
fn partition<T:PartialOrd+Send+std::fmt::Debug>(v: &mut [T]) -> usize {
    let pivot = v.len() - 1;
    let mut i = 0;
    for j in 0..pivot {
        if v[j] <= v[pivot] {
            v.swap(i, j);//меняет местами
            i += 1;
        }
    }
    v.swap(i, pivot);
    i
}
</code></pre>
