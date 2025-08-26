


<pre><code class="language-rust">
fn modify_reference(value: &mut &mut i32) {
    **value += 1; 
}

fn main() {
    let mut x = 10;
    let mut_ref = &mut x; // Изменяемая ссылка на x.
    let mut ref_to_mut_ref = mut_ref; // Изменяемая ссылка на изменяемую ссылку.

    modify_reference(&mut ref_to_mut_ref); // Передаём изменяемую ссылку на изменяемую ссылку.

    println!("x: {}", x); // Вывод: x: 11
} 
 
// Ссылки на ссылки (&mut &mut T или &&T) появляются, когда есть специфические ситуации, требующие дополнительного уровня ссылок.
</code></pre>
