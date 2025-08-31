

Файл .rustfmt.toml

```
Параметры по умолчанию вывести в файл rustfmt.toml
$ rustfmt --print-config default rustfmt.toml

Список всех параметров
$ rustfmt --help=config

max_width = 100 # Максимальная ширина каждой строки
hard_tabs = false # Использовать символы табуляции для отступа, пробелы для выравнивания
tab_spaces = 4 # Количество пробелов на вкладке
newline_style = 'Auto' # [Auto|Windows|Unix|Native] Окончания строк Unix или Windows
use_small_heuristics = 'Default' # [Off | Max | Default] Использовать ли другое форматирование для элементов и выражений, если они удовлетворяют эвристическому понятию 'small'
reorder_imports = true # Изменение порядка импорта и извлечения ящиков в алфавитном порядке
reorder_modules = true # Изменить порядок операторов в алфавитном порядке в группе
remove_nested_parens = true # Удалить вложенные парены
edition = '2015' # [2015 | 2018] Редакция парсера (RFC 2052)
merge_derives = true # Объединить несколько `#[derive(...)]` в один
use_try_shorthand = false # Заменить использование попытки! макрос по? стенография
use_field_init_shorthand = false # Использовать сокращение поля инициализации, если это возможно
force_explicit_abi = true # Всегда печатать abi для внешних элементов
```
