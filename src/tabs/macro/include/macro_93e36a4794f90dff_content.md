

Эти макросы позволяют автоматически реализовывать трейты для структур и перечислений. 
Стандартные трейты, такие как `Debug, Clone и Serialize`, часто реализуются с помощью `#[derive]`. 

Пользователи могут создавать свои собственные derive макросы для автоматической генерации кода.

* Первое заключается в том, что derive макросы добавляются к входным токенам, а не заменяют их полностью. 
   Это означает, что определение структуры данных остается нетронутым, но макрос имеет возможность добавлять связанный код.

* Во-вторых, макрос derive может объявлять связанные вспомогательные атрибуты, которые затем могут использоваться для маркировки частей структуры данных, требующих специальной обработки. 
Например, crate **serde** предоставляет макрос `derive` с вспомогательными атрибутами, такими как `Serialize` и `Deserialize`
<pre><code class="language-rust">
#[derive(Debug, Deserialize)]
struct MyData {
    #[serde(default = "generate_value")]
    value: String,
...
</code></pre>


* Последний аспект derive макросов, о котором следует знать, заключается в том, что crate syn может взять на себя большую часть тяжелой работы, связанной с разбором входных токенов в эквивалентные узлы в AST

---
 
<pre><code class="language-rust">
#[derive(Debug, Clone)]
struct Point {
    x: f64,
    y: f64,
}
//или создать собственный 
// В crate `hello_derive`
use proc_macro::TokenStream;
use quote::quote;
use syn;

#[proc_macro_derive(Hello)]
pub fn hello_derive(input: TokenStream) -> TokenStream {
    // Разбор входного токена
    let ast = syn::parse(input).unwrap();

    // Генерация кода
    impl_hello(&ast)
}

fn impl_hello(ast: &syn::DeriveInput) -> TokenStream {
    let name = &ast.ident;
    let gen = quote! {
        impl Hello for #name {
            fn hello() {
                println!("Hello from {}", stringify!(#name));
            }
        }
    };
    gen.into()
}
// использование в основном проекте
use hello_derive::Hello;

trait Hello {
    fn hello();
}

#[derive(Hello)]
struct MyStruct;

fn main() {
    MyStruct::hello(); // Выведет: Hello from MyStruct
}
</code></pre>
