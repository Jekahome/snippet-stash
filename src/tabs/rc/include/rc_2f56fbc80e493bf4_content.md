


<pre><code class="language-rust">
fn main(){
    let mut x = Rc::new(3);
        //let _y = Rc::clone(&x);
    if Rc::strong_count(&x)==1 && Rc::weak_count(&x)==0 {
        let y = Rc::get_mut(&mut x);// получим None если есть еще указатель
        match y {
            Some(v) => {*v+=1; println!("Some={}",v)},
            None => println!("None")
        }
    }

    let mut x = Rc::new(3);
    *Rc::get_mut(&mut x).unwrap() = 4;
    assert_eq!(*x, 4);

    //let _y = Rc::clone(&x);
    //assert!(Rc::get_mut(&mut x).is_none());
}
</code></pre>
