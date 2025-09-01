


<pre><code class="language-rust">
fn main(){
    let x:[i32;3] = [1, 2, 3];
    let mut temp = 0;
    let y:[i32;3] = x.map(|v| { temp += 1; v * temp });
    assert_eq!(y, [1, 4, 9]);

    let x:[&str;4] = ["Ferris", "Bueller's", "Day", "Off"];
    let y:[usize;4] = x.map(|v| v.len());
    assert_eq!(y, [6, 9, 3, 3]);
}
</code></pre>
