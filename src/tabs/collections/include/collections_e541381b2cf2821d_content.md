


<pre><code class="language-rust">
use std::collections::BTreeMap;
use std::fmt;
use std::fmt::Debug;

#[derive(Debug)]
struct S1(i32);

#[derive(Debug)]
struct S2<'a >(&'a str);

trait ST{
    fn test(&self)->String;
}

impl ST for S1{
    fn test(&self)->String{
        self.0.to_string()
    }
}
impl <'a >ST for S2<'a >{
    fn test(&self)->String{
        self.0.to_string()
    }
}
impl fmt::Debug for dyn ST {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:?}", self.test())
    }
}
/*impl std::fmt::Display for S1 {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:?}",self.0 )
    }
}
impl <'a >std::fmt::Display for S2<'a > {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:?}", self.0 )
    }
}*/
fn main(){
    let mut a:BTreeMap<&str,&dyn ST> = BTreeMap::new();
    a.insert("s1", &S1(14));
    a.insert("s3", &S2("18"));
    a.insert("s2", &S2("19"));
    println!("\n\n{:?}",a);// {"s1": "14", "s2": "19", "s3": "18"}
}
</code></pre>
