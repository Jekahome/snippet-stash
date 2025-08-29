

Эту черту редко нужно использовать, потому что помимо того, что параметрический полиморфизм превосходит специальный полиморфизм в большинстве сценариев, последний также можно эмулировать с помощью перечислений, которые более безопасны для типов и требуют меньше косвенности. 

Например, мы могли бы написать приведенный выше пример так:
<pre><code class="language-rust">
#[derive(Default)]
struct Point {
    x: i32,
    y: i32,
}

impl Point {
    fn inc(&mut self) {
        self.x += 1;
        self.y += 1;
    }
}

enum Stuff {
    Integer(i32),
    String(String),
    Point(Point),
}

fn map_stuff(mut stuff: Stuff) -> Stuff {
    match &mut stuff {
        Stuff::Integer(num) => *num += 1,
        Stuff::String(string) => *string += "!",
        Stuff::Point(point) => point.inc(),
    }
    stuff
}

fn main() {
    let mut vec = vec![
        Stuff::Integer(0),
        Stuff::String(String::from("a")),
        Stuff::Point(Point::default()),
    ];
    // vec = [0, "a", Point { x: 0, y: 0 }]
    vec = vec.into_iter().map(map_stuff).collect();
    // vec = [1, "a!", Point { x: 1, y: 1 }]
}
</code></pre>
