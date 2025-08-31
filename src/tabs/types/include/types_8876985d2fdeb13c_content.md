


<pre><code class="language-rust">
struct BitsNStrings<'a> {
    mybits: [u32; 2],
    mystring: &'a str,
}
const BIT1: u32 = 1 << 0;

fn main() {
  const BIT2: u32 = 1 << 1;

  const BITS: [u32; 2] = [BIT1, BIT2];
  const STRING: &'static str = "bitstring";

  const BITS_N_STRINGS: BitsNStrings<'static> = BitsNStrings {
      mybits: BITS,
      mystring: STRING,
  };
  print!("{}",BIT2);// встраиваются (inline) в каждое место, где есть их использование
}
</code></pre>
