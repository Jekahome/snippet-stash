


<pre><code class="language-rust">
fn main(){
// std::any::type_name_of_val(&T)

 let my_int=6;
 println!("Тип my_int: {}", std::any::type_name_of_val(&my_int)); // Тип my_int: i32
}
</code></pre>
