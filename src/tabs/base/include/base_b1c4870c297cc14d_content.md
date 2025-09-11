


<pre><code class="language-rust">
 #[derive(Debug)]
 struct Item{
       data:i32
  }

 #[derive(Debug)]
 struct List{
      values:Vec<Item>
 }
    
 impl std::default::Default for List{
     fn default() -> List{
            List{values:Vec::new()}
           // или уже с данными List{values:vec!(Item{data:100})}
      }
 }

fn main(){
   let l: List = std::default::Default::default();
   println!("{:?}",l );// List { values: [] }
   // если с данными println!("{}",l.values[0].data); // 100
}
</code></pre>
