


<pre><code class="language-rust">
trait FullName {
    fn full_name(&self) -> String;
}
struct Player {
    first_name: String,
    last_name: String,
}
impl FullName for Player {
    fn full_name(&self) -> String {
        format!("{} {}", self.first_name, self.last_name)
    }
}
impl Player {
    fn pl_full_name(&self) -> String {
        format!("{} {}", self.first_name, self.last_name)
    }
}
fn main() {
    let player = Player {
        first_name: "Roger".to_string(),
        last_name: "Federer".to_string(),
    };

    println!("Player 02: {}", player.full_name());
    println!("Player 02: {}", player.pl_full_name());
}
</code></pre>
