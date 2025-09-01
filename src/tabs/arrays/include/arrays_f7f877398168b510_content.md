


<pre><code class="language-rust">
use std::ops::Index;
#[derive(Debug,Default)]
struct Person{
    id:u32
}
struct PersonId(u32);
 
impl Index<PersonId> for Vec<Person>{
     type Output = Person;
     fn index(&self,idx: PersonId) -> &Person{
         let idx = idx.0 as usize;
         &self[idx]
        /* for x in self.iter() {
           if x.id as usize == idx  {
              return x;
           }
         }
         &self[0] */
     }
}
fn main(){
   let v:Vec<Person> = vec![Person{id:10},Person{id:13}];
   let index:PersonId = PersonId(1);
   print!("{:?}",v[index] );// Person{id:13}
}
</code></pre>
