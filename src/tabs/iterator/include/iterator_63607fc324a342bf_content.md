

Можно собирать итераторы в Result или Option
<pre><code class="language-rust">
fn main(){
    let items = vec![3_u16, 2, 1/*, 0*/];
    let res: Option<Vec<u16>> = items
      .iter()
      .map(|x| x.checked_sub(1))// трансформируем значение в Option
      .collect();// достаются значения из Some иначе результат None
    println!("{:?}",res);// Some([2, 1, 0])
}
</code></pre>
