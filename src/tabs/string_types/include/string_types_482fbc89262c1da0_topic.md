


* **matches(Pattern) -> Iterator`<Item = &str>`** - фильтрует совпавшее
* **rmatches(Pattern) -> Iterator`<Item = &str>`** - как matches() только сбор с конца строки
* **match_indices(Pattern) -> Iterator`<Item = (usize, &str)>`** - как matches() только возвращает кортеж с номером байта совпадения
* **rmatch_indices(Pattern) -> Iterator`<Item = (usize, &str)>`** - как match_indices() только сбор с конца строки разделитель -  std::str::pattern::Pattern

Итератор по непересекающимся совпадениям шаблона в пределах данного среза строки.
