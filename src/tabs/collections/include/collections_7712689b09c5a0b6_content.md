


<pre><code class="language-rust">
fn main(){
    //Вставляет значение в отсотрированный вектор Time: O(log n)
    let mut vec = vector![1, 2, 3, 7, 8, 9];
    vec.insert_ord(5);
    vec.insert_ord(4);
    vec.insert_ord(0);
    vec.insert_ord(10);
    assert_eq!(vector![0,1, 2, 3, 4, 5, 7, 8, 9,10], vec);

    let mut vec:Vector<i32> = Vector::new();
    vec.insert_ord(5);
    vec.insert_ord(4);
    vec.insert_ord(0);
    vec.insert_ord(10);
    assert_eq!(vector![0,4, 5,10], vec);
}
</code></pre>
