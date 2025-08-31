

Чтобы запретить rustfmt форматировать макрос или атрибут, используйте: 

```
#[rustfmt::skip::macros(target_macro_name)] или 
#[rustfmt::skip::attributes(target_attribute_name)]
```

---

```
#![rustfmt::skip::attributes(custom_attribute)]

#[custom_attribute(formatting , here , should , be , Skipped)]
#[rustfmt::skip::macros(html)]
fn main() {
    let macro_result1 = html! { <div>Hello</div>}.to_string();
}
```
