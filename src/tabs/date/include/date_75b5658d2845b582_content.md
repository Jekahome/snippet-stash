

**Измерение времени выполнения**
```rust
fn expensive_calculation() {
    // Имитация тяжелых вычислений
    let mut sum = 0;
    for i in 0..1_000_000 {
        sum += i;
    }
}

fn main() {
    let start = Instant::now();
    expensive_calculation();
    let duration = start.elapsed();
    
    println!("Вычисления заняли: {:.2} мс", duration.as_secs_f64() * 1000.0);
}
```

**FPS (кадров в секунду) счетчик**
```
use std::thread;
use std::time::{Instant, Duration};

let mut last_frame = Instant::now();
let mut frame_count = 0;

loop {
    // Отрисовка кадра
    render_frame();
    
    frame_count += 1;
    let now = Instant::now();
    let elapsed = now - last_frame;
    
    if elapsed >= Duration::from_secs(1) {
        println!("FPS: {}", frame_count);
        frame_count = 0;
        last_frame = now;
    }
}
```

**Таймаут операций**
```
fn operation_with_timeout(timeout: Duration) -> Result<String, &'static str> {
    let start = Instant::now();
    
    while Instant::now() - start < timeout {
        if let Some(result) = try_get_result() {
            return Ok(result);
        }
        thread::sleep(Duration::from_millis(10));
    }
    
    Err("Таймаут операции")
}
```

**Профилирование кода**
```
fn profile_function() {
    let timings = vec![
        ("parse_input", Instant::now()),
        ("process_data", Instant::now()),
        ("generate_output", Instant::now()),
    ];
    
    // Замеряем каждый этап
    parse_input();
    let parse_time = timings[0].1.elapsed();
    
    process_data();
    let process_time = timings[1].1.elapsed();
    
    generate_output();
    let output_time = timings[2].1.elapsed();
    
    println!("Профилирование:");
    println!("  Parse: {:?}", parse_time);
    println!("  Process: {:?}", process_time);
    println!("  Output: {:?}", output_time);
}
```

**Дебаунсинг (антидребезг)**  - это техника обработки входных сигналов, которая устраняет ложные срабатывания, вызванные механическими вибрациями или электрическими помехами.
```
struct Debouncer {
    last_event: Option<Instant>,
    cooldown: Duration,
}
impl Debouncer {
    fn new(cooldown: Duration) -> Self {
        Self { last_event: None, cooldown }
    }
    fn should_trigger(&mut self) -> bool {
        let now = Instant::now();
        match self.last_event {
            Some(last) if now - last < self.cooldown => false,
            _ => {
                self.last_event = Some(now);
                true
            }
        }
    }
}
```
