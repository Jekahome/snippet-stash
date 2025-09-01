

Удаление элементов вектора (собрать индексы для удаления потом отсортировать индексы по возрастанию и в цикле по ним удаляя элементы из вектора v.remove сдивагать index удаляемого элемента)
<pre><code class="language-rust">
fn filter(v:&mut [32]){
    let mut indexes:Vec<usize>=vec![];
    for (pos,value) in v.iter().enumerate(){
         if *value%2!=0{
             indexes.push(pos);
         }
    }
   indexes.sort();
   let mut correct_pos = 0;
   for pos in indexes{
      v.remove(pos-correct_pos);
      correct_pos+=1;
   }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut v = vec![1, 2, 3];

    v.sort_unstable();
    if let Ok(index) = v.binary_search(&value){
      assert_eq!(v.remove(index), 2);
      assert_eq!(v, [1, 3]);
    }
}
</code></pre>
