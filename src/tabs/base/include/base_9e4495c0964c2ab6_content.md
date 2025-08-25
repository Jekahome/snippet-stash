

```
[dependencies] ansi_term = "0.11"

use ansi_term::Colour::{Black, Red, Green, Yellow, Blue, Purple, Cyan, Fixed};
use ansi_term::Style;

println!("Demonstrating {} and {}!",
         Blue.bold().paint("blue bold"),
         Yellow.underline().paint("yellow underline"));

let red_string: String = Red.paint("another red string").to_string();
println!("{}",red_string);

let blue_fon: String = Blue.on(Yellow).paint("Blue on yellow!").to_string();
println!("Синий шрифт, желтый фон {}",blue_fon);

let color_134: String = Fixed(134).paint("A sort of light purple.").to_string();
println!("Цвет 134 шрифта из 256  {}",color_134);

let color_fon: String = Fixed(221).on(Fixed(124)).paint("Mustard in the ketchup.").to_string();
println!("Цвет № 221 шрифт, № 124 фон {}",color_fon);
```
