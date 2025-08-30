


<pre><code class="language-rust">
trait Say{
    type S:?Sized;
    fn say(&self)->&Self::S;
}
struct Cat(String);
struct Dog(i32);
impl Say for Cat{
   type S=str;
   fn say(&self)->&Self::S{&self.0} 
}
impl Say for Dog{
   type S=i32;
   fn say(&self)->&Self::S{&self.0} 
}
enum Animal{
    Cat(Cat),
    Dog(Dog)
}
impl Animal{
    fn say(&self){
        match self{
          Animal::Cat(cat) => print!("{}",cat.say()),
          Animal::Dog(dog) => print!("{}",dog.say())
        }
    }
}
fn main(){
    let cat = Animal::Cat(Cat(String::from("mya")));
    cat.say();
    let dog = Animal::Dog(Dog(123));
    dog.say();

     let dog = Animal::Dog(Dog(123));
     if let Animal::Dog(animal) = dog { print!("{:?}",animal.say());}
}
</code></pre>
