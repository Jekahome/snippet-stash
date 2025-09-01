


<pre><code class="language-rust">
fn main(){
    let iter1 = 0..10;
    let mut names = &mut vec![1, 2, 3];
    let iter2 = names.iter_mut();
    let iter3 = [10, 20, 30,40,50].iter();
    let iter3 = [10, 20, 30,40,50].into_iter();
    let iter4 = "привет".char_indices();
    let iter5 = "привет".bytes();
    let iter6 = "МИР\tТРУД МАЙ".split_whitespace();
    let iter7 = "foo\r\nbar\n\nbaz\n".lines();
    let iter8 = "abcXXXabcYYYabc".matches("abc");
}
</code></pre>
