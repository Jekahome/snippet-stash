


<pre><code class="language-rust">
struct User<'u>{
   name:&'u str
}
// Обьяснили компилятору что время жизни 'u будет жить по крайней мере до тех пор, пока живет 'b
struct Boxed<'b,'u:'b>{
   user:&'b User<'u >
}
fn main(){
   let user:User = User{name:"Jeka"};
   let _box:Boxed = Boxed{user:&user};
}
</code></pre>
