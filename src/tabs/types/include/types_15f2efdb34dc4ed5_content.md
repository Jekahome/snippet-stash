


<pre><code class="language-rust">
enum Message{Write(String)}
fn main(){
    let v = vec!["Hello".to_string(),"World".to_string()];
    let res:Vec<Message> = v.into_iter().map(Message::Write).collect();
    
    for e in res{
        match e{
            Message::Write(s) => println!("{:?}",s)
        }
    }
}
</code></pre>
