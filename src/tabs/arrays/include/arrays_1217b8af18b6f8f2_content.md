


<pre><code class="language-rust">
fn main(){
    let mut vector = vec![1, 2, 3, 4, 5, 6, 7, 8];
    let slice:&[i32] = &vector[3..6];
    let slice:&mut [i32] = &mut vector[3..6];
    let slice:&[i32] = vector.as_slice();

    let mut array = [10, 20, 30, 40, 50];
    let slice: &mut [i32] = &mut array[1..4];
}
</code></pre>
