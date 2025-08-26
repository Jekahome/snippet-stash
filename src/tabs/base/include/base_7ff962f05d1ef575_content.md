

**clone** не создает для клонированного vec такую же емкость как у оригинала, из-за этого клонированный `Vec` снова выделит емкость

**clone_from** является альтернативой clone `a.clone_from(&b);` эквивалентно `a = b.clone();` но сразу создает емкость клонируемого объекта
 
<pre><code class="language-rust">
fn main(){
 let mut v1: Vec<u32> = Vec::with_capacity(99);
 let v2: Vec<u32> = vec![1, 2, 3];
 v1.clone_from(&v2); // емкость v1 используется для v2
 assert_eq!(v1.capacity(), 99);
}
</code></pre>
