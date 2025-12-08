

Он позволяет переключать локаль — набор правил для:
* отображения чисел (1,234.56 vs 1.234,56)
* отображения дат
* алфавитного порядка для strcoll
* классификации символов (isdigit, isalpha, toupper, tolower)
* денежных символов (€, $)
* имён месяцев, дней недели (в POSIX)
* широких символов (`<wchar.h>` зависит от локали)

| Категория     | Что управляет                                            |
| ------------- | -------------------------------------------------------- |
| `LC_ALL`      | всё                                                      |
| `LC_NUMERIC`  | формат чисел                                             |
| `LC_TIME`     | названия месяцев/дней, формат дат                        |
| `LC_MONETARY` | вывод валют                                              |
| `LC_COLLATE`  | сортировка строк                                         |
| `LC_CTYPE`    | классификация символов (`toupper`, `tolower`, `isdigit`) |
| `LC_MESSAGES` | язык сообщений программ                                  |

Пример

```

#include <stdio.h>
#include <locale.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    // переключение на русскую локаль
    setlocale(LC_ALL, "ru_RU.UTF-8");
    printf("%'.2f\n", 1234567.89);  // 1 234 567,89
   
    // сортировка строк по правилам языка
    setlocale(LC_COLLATE, "ru_RU.UTF-8");
    printf("%d\n", strcoll("Ёж", "Яблоко"));

    // классификация символов
    // Без локали:
    setlocale(LC_CTYPE, "C"); // дефолт
    printf("%d\n", isalpha('ё'));  // 0 — не буква
    // С русской локалью:
    setlocale(LC_CTYPE, "ru_RU.UTF-8");
    printf("%d\n", isalpha('ё'));  // 1 — буква

    // валюты
    setlocale(LC_MONETARY, "ru_RU.UTF-8");
    struct lconv *lc = localeconv();
    printf("Currency symbol: %s\n", lc->currency_symbol); // ₽

    return EXIT_SUCCESS;
}

```
