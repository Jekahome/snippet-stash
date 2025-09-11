

Они внешне похожи, но type могут иметь дело только с параметрами типа.

`use` не могу этого сделать:
```
 pub type Strings = Vec<String>;
 pub type Map<I> where I: Iterator = HashMap<I::Item, String>;
```
