

**Порядок вычисления выражений.** В языках С и C++ порядок вычисления операндов выражений и аргументов функций, а также некоторых других значений **не определен**. 

Рассмотрим следующее присваивание:

```c
n = (getchar() << 8) | getchar();
```

Вторая функция getchar могла быть вызвана первой, поскольку порядок записи выражения не всегда совпадает с порядком его выполнения.

---

**Выключаем канонический режим**

```c
#include <stdio.h>
#include <termios.h>
#include <unistd.h>
#include <stdlib.h> // EXIT_SUCCESS

void set_noncanonical() {
    struct termios t;
    tcgetattr(STDIN_FILENO, &t);
    t.c_lflag &= ~ICANON;  // Выключаем канонический режим
    t.c_cc[VMIN] = 1;           // Минимум 1 символ для read()
    t.c_cc[VTIME] = 0;         // Без таймаута
    tcsetattr(STDIN_FILENO, TCSANOW, &t);
}

int main() {
    set_noncanonical();
    
    printf("Теперь символы читаются сразу (без Enter): ");
    int c = getchar();
    printf("Получили: '%c'\n", c);
    
    // Не забудь восстановить режим!
    return EXIT_SUCCESS;
}
```


