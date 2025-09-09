

```rust
fn is_palindrome(items: &[char]) -> bool {
    match items {
        [first, middle @ .., last] => first == last && is_palindrome(middle),
        [] | [_] => true,
    }
}
fn main(){
 assert_eq!(is_palindrome(&['r', 'a', 'c', 'e', 'c', 'a', 'r']), true);
 assert_eq!(is_palindrome(&['h', 'e', 'l', 'l', 'o']), false);
}
```
