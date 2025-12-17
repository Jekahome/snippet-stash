

```rust
// Компактная версия с битовыми флагами
use std::fmt;

#[repr(u8)]
#[derive(Clone, Copy)]
enum ColorMask {
    Red = 0b100,
    Green = 0b010,
    Blue = 0b001,
}

#[derive(Clone, Copy)]
struct SimpleColor(u8);

impl SimpleColor {
    const NAMES: [&'static str; 8] = [
        "Черный", "Синий", "Зеленый", "Голубой",
        "Красный", "Пурпурный", "Желтый", "Белый"
    ];
    
    fn new() -> Self {
        SimpleColor(0)
    }
    
    // Создание цвета с компонентами (исправленная версия)
    fn from_components(red: bool, green: bool, blue: bool) -> Self {
        let mut color = SimpleColor::new();
        color.set(ColorMask::Red, red);
        color.set(ColorMask::Green, green);
        color.set(ColorMask::Blue, blue);
        color
    }
    
    fn set(&mut self, mask: ColorMask, value: bool) {
        if value {
            self.0 |= mask as u8;      // Установить бит
        } else {
            self.0 &= !(mask as u8);   // Сбросить бит
        }
    }
    
    fn get(&self, mask: ColorMask) -> bool {
        (self.0 & mask as u8) != 0
    }
    
    fn name(&self) -> &'static str {
        SimpleColor::NAMES[self.0 as usize]
    }
}

impl fmt::Display for SimpleColor {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:03b} ({})", self.0, self.name())
    }
}

fn main() {
    println!("Минимальный пример:");
    
    // Желтый = Красный + Зеленый
    println!("\n=== Создание желтого цвета ===");
    
    // Способ 1: Используя set()
    let mut yellow = SimpleColor::new(); // 000
    yellow.set(ColorMask::Red, true);    // Добавляем красный: 100
    yellow.set(ColorMask::Green, true);  // Добавляем зеленый: 110
    println!("Желтый: {} = {:03b}", yellow.name(), yellow.0); // 110
    
    // Способ 2: Создание сразу с двумя компонентами
    let yellow2 = SimpleColor::from_components(true, true, false);
    println!("Желтый (через from_components): {}", yellow2);
    
    // Способ 3: Побитовые операции напрямую
    let yellow_code = ColorMask::Red as u8 | ColorMask::Green as u8;
    let yellow3 = SimpleColor(yellow_code);
    println!("Желтый (побитовые операции): {}", yellow3);
    
    // Проверяем наличие компонентов
    println!("\n=== Проверка компонентов желтого ===");
    println!("Есть красный? {}", yellow.get(ColorMask::Red));
    println!("Есть синий? {}", yellow.get(ColorMask::Blue));
    println!("Есть зеленый? {}", yellow.get(ColorMask::Green));
    
    // Белый = Красный + Зеленый + Синий
    println!("\n=== Создание белого цвета ===");
    
    // Способ 1: Используя set()
    let mut white = SimpleColor::new(); // 000
    white.set(ColorMask::Red, true);    // Добавляем красный: 100
    white.set(ColorMask::Green, true);  // Добавляем зеленый: 110
    white.set(ColorMask::Blue, true);   // Добавляем синий: 111
    println!("Белый: {} = {:03b}", white.name(), white.0); // 111
    
    // Способ 2: Создание сразу со всеми компонентами
    let white2 = SimpleColor::from_components(true, true, true);
    println!("Белый (через from_components): {}", white2);
    
    // Способ 3: Побитовые операции напрямую
    let white_code = ColorMask::Red as u8 | ColorMask::Green as u8 | ColorMask::Blue as u8;
    let white3 = SimpleColor(white_code);
    println!("Белый (побитовые операции): {}", white3);
    
    // Все возможные цвета
    println!("\n=== Все цвета ===");
    for i in 0..8 {
        let color = SimpleColor(i);
        println!("{}: {}", i, color);
    }
    
    // Демонстрация работы с цветом
    println!("\n=== Демонстрация изменений ===");
    let mut color = SimpleColor::new();
    println!("Начальный: {}", color);
    
    color.set(ColorMask::Red, true);
    println!("Добавили красный: {}", color);
    
    color.set(ColorMask::Green, true);
    println!("Добавили зеленый: {}", color);
    
    color.set(ColorMask::Blue, true);
    println!("Добавили синий: {}", color);
    
    color.set(ColorMask::Green, false);
    println!("Убрали зеленый: {}", color);
}
```
