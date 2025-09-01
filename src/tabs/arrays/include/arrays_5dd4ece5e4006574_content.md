


<pre><code class="language-rust">
#![feature(array_methods)]
fn main() {
    let mut arr:[String;3] = ["hello".to_string(),"".to_string(),"".to_string()];
    let arr_refs: [&mut String; 3] = arr.each_mut();
    *arr_refs[0] = "bye".to_string();
    assert_eq!(arr_refs, [&mut "bye".to_string(),&"".to_string(),&"".to_string()]);
    assert_eq!(arr, ["bye".to_string(),"".to_string(),"".to_string()]);
}
</code></pre>

Run:
```
$ cargo +nightly run
```
