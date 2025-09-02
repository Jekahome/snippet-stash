


<pre><code class="language-rust">
fn sq(x: u32) -> Option<u32> { Some(x * x) }
fn nope(_: u32) -> Option<u32> { None }
fn main(){
    assert_eq!(Some(2).and_then(sq).and_then(sq), Some(16));
}
</code></pre>

---

<pre><code class="language-rust">
enum Food { CordonBleu, Steak, Sushi }
fn have_ingredients(food:Food)->Option<Food>{ Some(food)}
fn have_recipe(food:Food)->Option<Food>{ Some(food)}
fn cookable_v1(food: Food) -> Option<Food> {
    match have_ingredients(food) {
        None       => None,
        Some(food) => match have_recipe(food) {
            None       => None,
            Some(food) => Some(food),
        },
    }
}

 // или так
fn cookable_v2(food: Food) -> Option<Food> {
    have_ingredients(food).and_then(have_recipe)
}
fn main()-> Result<(),String> {
   cookable_v1(Food::CordonBleu);
   cookable_v2(Food::CordonBleu);
   Ok(())
}
</code></pre>
