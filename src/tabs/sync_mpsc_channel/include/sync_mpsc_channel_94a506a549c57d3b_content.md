

crate crossbeam может гарантировать что поток не переживет ссылку на данные т.е. можно передавать ссылку на изменяемые данные.
<pre><code class="language-rust">
extern crate crossbeam;
fn main(){
    let mut xs:[i32;4] =[0,0,0,0];
    crossbeam::scope(|scope_|{
        for i in &mut xs{
            scope_.spawn(move || {
                *i+=1;
            });
        }
    });
    println!("{:?}",xs);
}
</code></pre>
