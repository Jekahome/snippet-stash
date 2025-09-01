


<pre><code class="language-rust">
// Временная сложность алгоритма - квадратичная сложность O(N^2)
fn algo_7_bubble_sort(v:&mut [i32]){
    for i in 0..v.len()-1 {
        for j in 0..v.len()-1 {
            if v[j] > v[j+1]{
                let swap = v[j];
                v[j]=v[j+1];
                v[j+1]=swap;
            }
        }
    }
}
pub fn main() {
    let mut v = vec![1,3,2,1];
    algo_7_bubble_sort(&mut v);
    assert_eq!(v.as_slice(),&[1,1,2,3]);
}
</code></pre>
