


<pre><code class="language-rust">
// В crate `repeat_macro`
use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, LitInt};

#[proc_macro]
pub fn repeat(input: TokenStream) -> TokenStream {
    // Разбор входного токена как целого числа
    let count = parse_macro_input!(input as LitInt).base10_parse::<usize>().unwrap();

    // Генерация повторяющегося кода
    let expanded = quote! {
        {
            for _ in 0..#count {
                println!("Repeated!");
            }
        }
    };

    expanded.into()
}
// использование в основном проекте
use repeat_macro::repeat;

fn main() {
    repeat!(3);
    // Выведет:
    // Repeated!
    // Repeated!
    // Repeated!
}

</code></pre>
