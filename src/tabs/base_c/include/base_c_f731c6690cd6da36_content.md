


**exit**()  - Завершает программу глобально, вызывая:
* все функции, зарегистрированные через atexit
* закрытие stdout, stderr, файлов
* Не подходит для embedded / микроконтроллеров (без ОС).

**atexit**() - Регистрирует функцию, вызываемую при завершении exit():
в embedded чаще всего не работает, потому что нет настоящей программы завершения

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

void cleanup(void) { printf("bye!\n"); }

int main() {
    atexit(cleanup);
    exit(EXIT_FAILURE);
}

```
