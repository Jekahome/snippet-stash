


<pre><code class="language-rust">
trait Pilot {
    fn fly(&self);
}
trait Wizard {
    fn fly(&self);
}

struct Human;

impl Pilot for Human {
    fn fly(&self) { println!("This is your captain speaking.");}
}
impl Wizard for Human {
    fn fly(&self) {println!("Up!");}
}
impl Human {
    fn fly(&self) { println!("*waving arms furiously*");}
}
fn main() {
    let person = Human;
    Pilot::fly(&person);// конкретно для impl Pilot
    <Human as Pilot>::fly(&person);// конкретно для impl Pilot
    
    Wizard::fly(&person);// конкретно для impl Wizard
    <Human as Wizard>::fly(&person);// конкретно для impl Wizard

    person.fly();// ближняя реализация в самом Human
}
</code></pre>
