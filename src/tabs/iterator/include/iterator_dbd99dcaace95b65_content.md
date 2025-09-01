


<pre><code class="language-rust">
fn main(){
    let a = [1, 4, 2, 3];
    let sum = a.iter()
        .cloned()
        .inspect(|x| println!("about to filter: {}", x))
        .filter(|x| x % 2 == 0)
        .inspect(|x| println!("made it through filter: {}", x))
        .fold(0, |sum, i| sum + i);

     let lines = ["1", "2", "a"];
     let sum: i32 = lines
            .iter().map(|line| line.parse::<i32>())
            .inspect(|num| {
                if let Err(ref e) = *num { println!("Parsing error: {}", e);}
            })
            .filter_map(Result::ok).sum();
     println!("Sum: {}", sum);
}
</code></pre>
