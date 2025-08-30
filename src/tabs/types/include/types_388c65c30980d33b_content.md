


<pre><code class="language-rust">
fn main(){
 // Convert 10 to hex
 let dec = bibicode::NumeralSystem::new("", vec!(vec!("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"))).unwrap();
 let hex = bibicode::NumeralSystem::new("0x", vec!(vec!("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"))).unwrap();
 let coder = bibicode::BibiCoder::new(dec, hex);
 let test = coder.swap("2000").unwrap();
 println!("{:?}",test);

// Convert 10 to 2
 let dec = bibicode::NumeralSystem::new("", vec!(vec!("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"))).unwrap();
 let bin = bibicode::NumeralSystem::new("", vec!(vec!("0", "1"))).unwrap();
 let coder = bibicode::BibiCoder::new(dec, bin);
 let test = coder.swap("123").unwrap();
 assert_eq!("1111011",&test);
// Convert 2 to 10
 let dec = bibicode::NumeralSystem::new("", vec!(vec!("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"))).unwrap();
 let bin = bibicode::NumeralSystem::new("", vec!(vec!("0", "1"))).unwrap();
 let coder = bibicode::BibiCoder::new(bin , dec);
 let test = coder.swap("1111011").unwrap();
 assert_eq!("123",&test);
}
</code></pre>
