

Есть две версии Cow:
* beef::Cow - состоит из трех слов: указатель, длина и емкость. Он хранит тег владения в емкости.
* beef::lean::Cow - имеет ширину 2 слова и сохраняет длину, емкость и тег владельца в одном слове.

```rust
use beef::Cow;
fn main(){
    let borrowed: Cow<str> = Cow::borrowed("Hello");
    let owned: Cow<str> = Cow::owned(String::from("World"));

    assert_eq!(
        format!("{} {}!", borrowed, owned),
        "Hello World!",
    );
}
```

---

Этот фрагмент демонстрирует использование типа Cow (Clone-on-write) для оптимизации работы со строками: программа выделяет память под новую строку только в том случае, если в исходном тексте действительно есть заглавные буквы.

```rust
use std::borrow::Cow;

fn to_lowercase_if_needed(text: &str) -> Cow<'_,str> {
    if !text.chars().any(char::is_uppercase) {
        Cow::Borrowed(text)
    } else {
        Cow::Owned(text.to_lowercase())
    }
}

#[test]
fn test_to_lowercase_if_needed_variant_selection() {
    assert!(matches!(
        to_lowercase_if_needed("привет!"),
        Cow::Borrowed(_)
    ));
    assert!(matches!(
        to_lowercase_if_needed("ПрИвЕт!"),
        Cow::Owned(_)
    ));
}
```


