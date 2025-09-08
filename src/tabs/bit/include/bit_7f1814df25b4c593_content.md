

Пример (упаковка нескольких флагов в один `u8`):
* Можно хранить до 8 булевых флагов в одном байте.
* Экономит память при большом количестве небольших значений.

<pre><code class="language-rust">
struct Flags {
    bits: u8,
}

impl Flags {
    fn new() -> Self {
        Flags { bits: 0 }
    }

    fn set(&mut self, pos: u8, value: bool) {
        if value {
            self.bits |= 1 << pos;
        } else {
            self.bits &= !(1 << pos);
        }
    }

    fn get(&self, pos: u8) -> bool {
        (self.bits >> pos) & 1 == 1
    }
}
fn main() {
    let mut f = Flags::new();
    f.set(0, true);
    f.set(3, true);

    println!("Bits: {:08b}", f.bits); // 00001001
    println!("Bit 3? {}", f.get(3)); // true
}
</code></pre>

 




