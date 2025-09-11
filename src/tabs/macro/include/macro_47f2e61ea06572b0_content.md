

**С помощью декларативного макроса**
```rust
extern crate step_3_2;
use step_3_2::btreemap_proc;
macro_rules! btreemap_decl {
    ( $(( $key:expr, $val:expr )),* $(,)?) => {{
        let mut map = std::collections::BTreeMap::new();
        $(
            map.insert($key, $val);
        )*
        map
    }};
}
fn main() {
    let map_decl = btreemap_decl![
        (1, "one"),
        (2, "two"),
        (3, "three"),
        (4, "four"),
        (5, "five"),
    ];
    let map_proc = btreemap_proc![
        (1, "one"),
        (2, "two"),
        (3, "three"),
        (4, "four"),
        (5, "five"),
    ];
    dbg!(&map_proc);
    assert_eq!(map_decl, map_proc);
}
```

---

**С помощью процедурного макроса**
```rust
extern crate proc_macro;
use proc_macro::TokenStream;
use quote::quote;
use syn::parse::{Parse, ParseBuffer, Result};
use syn::punctuated::Punctuated;
use syn::{parenthesized, parse_macro_input, Expr};
/// Parses `(Expr, Expr)`
struct Pair {
    first: Expr,
    second: Expr,
}
impl Parse for Pair {
    fn parse<'a>(input: &'a ParseBuffer<'a>) -> Result<Self> {
        let content;
        parenthesized!(content in input);
        let first = content.parse()?;
        content.parse::<syn::Token![,]>()?;
        let second = content.parse()?;

        Ok(Pair { first, second })
    }
}
/// Parses `(Expr, Expr),*`
struct Pairs {
    pairs: Punctuated<Pair, syn::Token![,]>,
}
impl Parse for Pairs {
    fn parse<'a>(input: &'a ParseBuffer<'a>) -> Result<Self> {
        Ok(Pairs {
            pairs: input.parse_terminated(Pair::parse)?,
        })
    }
}
#[proc_macro]
pub fn btreemap_proc(input: TokenStream) -> TokenStream {
    let Pairs { pairs } = parse_macro_input!(input as Pairs);
    let inserts = pairs
        .into_iter()
        .map(|Pair { first, second }| quote! { map.insert(#first, #second); })
        .collect::<Vec<_>>();
    let res = quote! {{
        let mut map = std::collections::BTreeMap::new();
        #(#inserts)*
        map
    }};
    res.into()
}
fn main(){}
```




