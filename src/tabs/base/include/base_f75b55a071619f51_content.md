

<pre><code class="language-rust">
enum Creature {
    Crab(String),
    Lobster(String),
    Person(String),
}

fn main() {
    let state = Creature::Crab("Ferris");

    if let Creature::Crab(name) | Creature::Person(name) = state {
        println!("This creature's name is: {}", name);
    }
}
</code></pre>
