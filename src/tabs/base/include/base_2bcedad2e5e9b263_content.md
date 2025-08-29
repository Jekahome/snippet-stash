


<pre><code class="language-rust">
use std::default::Default;
use std::mem;
use std::collections::HashSet;

#[derive(Debug,PartialEq)]
struct Names {
    exclusions: Vec<String>,
    names: HashSet<String>,
}
impl Names {
    //fn apply_exclusions(&mut self) {
    // error: for_each уже позаимствовал self
    //    self.exclusions.drain(..).for_each(|name| {
    //        self.names.remove(&name);
    //    })
    //}
     fn apply_exclusions(&mut self) {
        let mut names = mem::replace(&mut self.names, HashSet::new());
        self.exclusions.drain(..).for_each(|name| {
            names.remove(&name);
        });
        mem::replace(&mut self.names, names);
    }
}
fn main() {
    let mut e = Names{exclusions:vec!["Einar".to_owned(), "Olaf".to_owned(), "Harald".to_owned()],
    names: [ "Einar".to_owned(), "Olaf".to_owned(), "Harald".to_owned() ].iter().cloned().collect::<HashSet<String>>()};
   
    e.apply_exclusions();
    println!("{:?}",e);
}
</code></pre>
