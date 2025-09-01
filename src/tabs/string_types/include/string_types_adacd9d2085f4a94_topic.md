

**find(Pattern) -> Option`<usize>`** - Возвращает индекс байта первого символа этого строкового среза, который соответствует шаблону

Возвращает индекс байта первого символа этого строкового среза, который соответствует шаблону.
Возвращает None, если шаблон не совпадает.
std::str::pattern::Pattern может быть символом &str, char или лямбда, который определяет, соответствует ли символ.

**rfind(Pattern) -> Option`<usize>`** - Возвращает индекс байта последнего совпадения

[method.find](https://doc.rust-lang.org/std/primitive.str.html#method.find)

[trait.Pattern](https://doc.rust-lang.org/std/str/pattern/trait.Pattern.html)


