


<pre><code class="language-rust">
fn dot_product(vec1:&[i32],vec2:&[i32])-> i32{
 // vec1.iter().zip(vec2).map(|(e1, e2)|e1*e2).fold(0,|a,b| a+b) ❌ не паралельно
    vec1.par_iter().zip(vec2).map(|(e1, e2)|e1*e2).reduce(0,|a,b| a+b) // ✅ паралельно
}
</code></pre>

**Не параллельный инкремент**
<pre><code class="language-rust">
fn increment_all(counts:&mut[u32]){
    for c in counts.iter_mut(){
        *c+=1;
    }
}
</code></pre>

**Параллельный инкремент**
<pre><code class="language-rust">
fn par_increment_all(counts:&mut[u32]){
    counts.par_iter_mut().for_each(|c| *c+=1);
}

fn main(){
   let mut m = [1,2,3];
   par_increment_all(&mut m);
   println!("{:?}",m);
}
</code></pre>

