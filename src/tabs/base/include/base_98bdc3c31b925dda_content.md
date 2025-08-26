


<pre><code class="language-rust">
fn main(){
    let mut v_func:Vec<Box<dyn Fn(usize)->usize>> = vec![];
    v_func.push(Box::new(|val|{val+1usize}));
    v_func.push(Box::new(|val|{val+2usize}));
    
    let f:fn(usize)->usize = |val:usize| -> usize {val*val};
    v_func.push(Box::new(f));
    
    for (index,f) in v_func.iter().enumerate(){
       println!("{}",f(index));  // 1 3 4
    } 
}
</code></pre>
