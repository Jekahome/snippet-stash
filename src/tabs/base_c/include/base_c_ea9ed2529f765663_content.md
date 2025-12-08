

- wchar_t предназначен для хранения «широких» символов (обычно 2 или 4 байта).

- Строки wchar_t* поддерживают Unicode напрямую (UTF-32 на Linux)

Стандартные функции strlen и printf не знают о многобайтовых символах, используйте wcslen и wprintf

Функции wprintf, wcslen, wcscpy работают с wchar_t

```c

#include <wchar.h>  
#include <locale.h>
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main() {
    setlocale(LC_ALL, ""); // Настройка локали для корректного вывода

    wchar_t s[] = L"Привет, 🌍!";

    wprintf(L"%ls\n", s);
    wprintf(L"Длина: %zu\n", wcslen(s));

    return EXIT_SUCCESS;
}
```
