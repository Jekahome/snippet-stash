


<pre><code class="language-rust">
use std::convert::AsRef;
use std::ops::Deref;
use std::fmt::Debug;
#[derive(Debug,Clone,Copy)]
struct Wrapi32(i32);
impl AsRef< i32> for Wrapi32 {
    fn as_ref(&self) -> &i32 {
        &self.0
    }
}
fn foo_gen_type_as_ref< T:Debug+Copy,R:Deref< Target = T>,W:AsRef< T>>(arg:W) {
    let v:&T = &*arg.as_ref();
    // или
    //let v = *Deref::deref(&arg.as_ref());
    println!("{:?}",v);
}

fn main(){
    foo_gen_type_as_ref::< i32,&i32,Wrapi32>(Wrapi32(5));  
}
</code></pre>
