


<pre><code class="language-rust">
fn zipmap<F: Fn(&T) -> R, T, R>(xs: &[T], fs: &[F]) -> Vec<R> {
    let iter = xs.iter().zip(fs);
    let mut res = Vec::with_capacity(iter.len()); // ^^
    for (x, f) in iter {
         res.push(f(x));
    }
    res
}
fn next(x: &i32) -> i32 { x + 1 }
fn prev(x: &i32) -> i32 { x - 1 }

fn main(){
  let lymda = |v:&i32|->i32 {
    v*10
  };
  let res =  zipmap(&[2,3,4],&[lymda,lymda,lymda]);
  assert_eq!([20, 30, 40],&res[..]);
  
   let res =  zipmap(&[2,3,4],&[next,next,next]);
  assert_eq!([3, 4, 5],&res[..]);
  
  let res =  zipmap(&[2,3,4],&[prev,prev,prev]);
  assert_eq!([1, 2, 3],&res[..]);
  
  //let res =  zipmap(&[2,3,4],&[next, prev,next]);// mismatched types
  // Решение приведение типа ф-ции к адресам этих ф-ций для однотиного вызова
  let slice:&[fn(&i32) -> i32;3]=&[next, prev,next];
  let res =  zipmap(&[2,3,4],slice);
  assert_eq!([3, 2, 5],&res[..]);
  
  let fs: Vec<fn(&i32) -> i32> = vec![next, prev,next];
  let res =  zipmap(&[2,3,4],&fs);
  assert_eq!([3, 2, 5],&res[..]);
}
</code></pre>
