

Только в крайних случаях:
* Имитация исключений в C
* Быстрый выход из глубокой рекурсии
* Реализация co-routines (очень редко)
* Реакция на критические сигналы
* Старые C-проекты, написанные до эпохи safer-C

Пример Мини-механизм TRY / CATCH / THROW в C

```c

#include <stdio.h>
#include <setjmp.h>

jmp_buf __exc_env;
int __exc_value = 0;

#define TRY if ((__exc_value = setjmp(__exc_env)) == 0)
#define CATCH else
#define THROW(x) longjmp(__exc_env, x)

// Функция, которая "кидает исключение"
void do_work(int n) {
    if (n == 0) {
        THROW(100); // бросили ошибку с кодом 100
    }
    printf("Работаем нормально: n=%d\n", n);
}

int main(void) {
    TRY {
        printf("Начинаем TRY...\n");
        do_work(0);
        printf("ЭТА строка уже не выполнится\n");
    }
    CATCH {
        printf("Поймано исключение! Код = %d\n", __exc_value);
    }

    printf("Программа продолжила работу после CATCH\n");
    return 0;
}
```
