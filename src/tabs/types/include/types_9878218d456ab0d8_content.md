


<pre><code class="language-rust">
// Создадим `enum`, который классифицирует веб-событие. Обратите внимание как
// имена и тип вместе определяют вариант:
// `PageLoad != PageUnload` and `KeyPress(char) != Paste(String)`.
// Каждый из них уникален.
    enum WebEvent {
        // `enum` так же может быть `единичным`,
        PageLoad,
        PageUnload,
        // может быть как кортежная структура,
        KeyPress(char),
        Paste(String),
        // или как просто структура.
        Click { x: i64, y: i64 },
    }

//  Функция, которая принимает `WebEvent` в качестве аргумента
// и не возвращает ничего.
    fn inspect(event: WebEvent) {
        match event {
            WebEvent::PageLoad => println!("страница загружена"),
            WebEvent::PageUnload => println!("страница не загружена"),
            // Деструктурируем `c` из `enum`.
            WebEvent::KeyPress(c) => println!("нажата клавиша '{}'.", c),
            WebEvent::Paste(s) => println!("вставлено значение \"{}\".", s),
            // Деструктурируем `Click` в `x` и `y`.
            WebEvent::Click { x, y } => {
                println!("clicked at x={}, y={}.", x, y);
            },
        }
    }
fn main(){ 
    let pressed = WebEvent::KeyPress('x');
    // `to_owned()` создаёт копию `String` из среза строки.
    let pasted  = WebEvent::Paste("мой текст".to_owned());
    let click   = WebEvent::Click { x: 20, y: 80 };
    let load    = WebEvent::PageLoad;
    let unload  = WebEvent::PageUnload;

    inspect(pressed);
    inspect(pasted);
    inspect(click);
    inspect(load);
    inspect(unload);
}
</code></pre>
