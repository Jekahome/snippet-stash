


<pre><code class="language-rust">
// В crate `uppercase_attr`
use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, ItemFn};

#[proc_macro_attribute]
pub fn uppercase(_attr: TokenStream, item: TokenStream) -> TokenStream {
    // Разбор входного токена как функции
    let input = parse_macro_input!(item as ItemFn);
    let name = &input.sig.ident;
    let block = &input.block;
    let attrs = &input.attrs;
    let vis = &input.vis;
    let sig = &input.sig;

    // Генерация новой функции с преобразованием возвращаемой строки в верхний регистр
    let expanded = quote! {
        #(#attrs)*
        #vis #sig {
            let result = (|| #block)();
            println!("Function {} returned: {}", stringify!(#name), result.to_uppercase());
            result.to_uppercase()
        }
    };
    TokenStream::from(expanded)
}
// использование в основном проекте
use uppercase_attr::uppercase;

#[uppercase]
fn greet() -> String {
    "Hello, Rust!".to_string()
}
fn main() {
    let message = greet();
    println!("Final message: {}", message); // Function greet returned: HELLO, RUST!
}
</code></pre>
