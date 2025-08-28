


<pre><code class="language-rust">
use std::convert::TryFrom;

struct SuperiorThanZero(i32);

impl TryFrom<i32> for SuperiorThanZero {
    type Error = &'static str;

    fn try_from(value: i32) -> Result<Self, Self::Error> {
        if value < 0 {
            Err("SuperiorThanZero only accepts value superior than zero!")
        } else {
            Ok(SuperiorThanZero(value))
        }
    }
}
fn main(){
     if let Ok(superior) = SuperiorThanZero::try_from(44_i32){

    }
}
</code></pre>
