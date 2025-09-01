


<pre><code class="language-rust">
fn main(){
    let mut v = [1, 0, 3, 0, 5, 6];
    // scoped to restrict the lifetime of the borrows
    {
        let (left, right) = v.split_at_mut(2);
        assert!(left == [1, 0]);
        assert!(right == [3, 0, 5, 6]);
        left[1] = 2;
        right[1] = 4;
    }
    assert!(v == [1, 2, 3, 4, 5, 6]);
}
</code></pre>
