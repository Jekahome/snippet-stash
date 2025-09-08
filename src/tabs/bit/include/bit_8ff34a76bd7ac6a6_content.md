

В этом примере создается структура MyMask с типом u8, которая инкапсулирует битовую маску. 

Перечисление MyFlags содержит флаги FlagA, FlagB и FlagC. 

Методы set и get позволяют устанавливать и проверять значения соответствующих флагов.
<pre><code class="language-rust">
use bitmask::bitmask;

bitmask! {
    pub mask MyMask: u8 where flags MyFlags {
        FlagA = 0b00000001,
        FlagB = 0b00000010,
        FlagC = 0b00000100,
    }
}
fn main() {
    let mut mask = MyMask::new();
    mask.set(MyFlags::FlagA, true);
    mask.set(MyFlags::FlagB, false);

    println!("Mask: {:08b}", mask.bits);
    println!("FlagA is set: {}", mask.get(MyFlags::FlagA));
    println!("FlagB is set: {}", mask.get(MyFlags::FlagB));
}
</code></pre>
