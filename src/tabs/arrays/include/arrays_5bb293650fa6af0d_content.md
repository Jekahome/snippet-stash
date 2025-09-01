


<pre><code class="language-rust">
fn no_mut_arr(a:&[i32;3]){
    //a[0] = 9; //ошибка изменять запрещенно
    assert_eq!(a[0],1);
}

// чтоб изменять массив его надо передать и принять как mut
fn mut_arr(a:&mut [i32;3]){
    a[0] = 9;
}

fn main() {
    let mut arr =[1,2,3];
    no_mut_arr(& arr);
    
    mut_arr(&mut arr);
    assert_eq!(arr[0],9);
}
</code></pre>
