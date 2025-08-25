

```
use termion::{color, style};
let mut image = image::open("examples/image/function/crop.png").unwrap().to_luma();
let v = image.into_vec();
for (index, value) in v.iter().enumerate() {
    if index % 60 == 0 { println!(""); }
    if value < &50 {
        print!("{}{number:>width$}{}", color::Fg(color::Green), style::Bold, number = value, width = 4);
    } else if value < &90 {
        print!("{}{number:>width$}{}", color::Fg(color::Blue), style::Bold, number = value, width = 4);
    } else {
        print!("{}{number:>width$}{}", color::Fg(color::LightRed), style::Reset, number = value, width = 4);
    }
}
```
