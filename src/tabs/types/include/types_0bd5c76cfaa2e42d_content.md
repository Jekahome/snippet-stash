


<pre><code class="language-rust">
enum Animal{
 Fox{name:String},
 Elk{name:String,size:usize}
} 
 
impl Animal{
    fn say(&self){
        match self{
            Animal::Fox{name} =>{
                println!("{}",name);
            },
            Animal::Elk{name,..} =>{
                println!("{}",name);
            },
        }
        
    }
} 
fn main() {
  let fox = Animal::Fox{name:"agg".to_string()};
  fox.say();
}
</code></pre>
