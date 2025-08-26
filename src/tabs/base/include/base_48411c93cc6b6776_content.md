


<pre><code class="language-rust">
 enum Message{
        Hello{id:i32}
 }

fn main(){
 let msg = Message::Hello {id:5};
 match msg { 
        Message::Hello {id: id_variable @ 3...7}=>{},
        Message::Hello {id:10...12}=>{},
        Message::Hello {id}=>{}
 }
}
</code></pre>
