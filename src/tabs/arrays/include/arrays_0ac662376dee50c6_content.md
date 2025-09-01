


<pre><code class="language-rust">
fn main(){
    let mut inp_file = File::create(Path::new("RGraph/data2.js")).unwrap();

    let mut f = File::open("source/12345.WAV").unwrap();
    inp_file.write( b"var dataarr = [").unwrap();
    let take=50;
    for (index,byte) in f.bytes().skip(44).take(take).enumerate() {
        inp_file.write(format!("{}",byte.unwrap()).as_bytes()).unwrap();
        if index<take-1 {inp_file.write(b",").unwrap();}
    }

    inp_file.write( b"];").unwrap();
}
</code></pre>
