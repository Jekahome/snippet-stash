

Вот почему иногда кажется что getchar() "не работает" - данные просто застряли в буфере ядра или stdio.

```
[Пользователь] -> [Клавиатура] -> [Ядро TTY] -> [stdio] -> [getchar()]
     ↓              ↓              ↓             ↓           ↓
   Нажал 'A'     Буфер 16B      Буфер 4K      Буфер 8K     Ваш код
```

**Уровни буферизации:**

1. Терминал/Клавиатура (железный буфер)**

Физический буфер клавиатуры ~ 16-32 байта.
Хранит нажатые клавиши ДО их обработки.

```
    // Прерывание клавиатуры → скан-коды → ASCII
    // Может хранить несколько нажатых клавиш до обработки
```

**2. Ядро ОС (буфер TTY)**

Драйвер терминала в ядре ~ 4K.
Обрабатывает специальные символы (Ctrl+C, Backspace).

```
    #include <stdio.h>
    #include <termios.h>

    int main() {
        struct termios t;
        tcgetattr(0, &t);
        
        printf("Размер буфера ядра: %d\n", t.c_cc[VTIME]);  // Настройки TTY
        printf("Канонический режим: %s\n", (t.c_lflag & ICANON) ? "ON" : "OFF");
    }
```

**3. Библиотека stdio (пользовательский буфер)**

BUFSIZ (обычно 4K-8K) в вашей программе.
Добавляет свою буферизацию поверх ядра.

```
    #include <stdio.h>
    #include <stdio_ext.h>

    int main() {
        printf("Размер буфера stdio: %d\n", BUFSIZ);  // Обычно 8192
        
        // Можно посмотреть/изменить буферизацию
        printf("Тип буферизации stdin: ");
        if (stdin->_flags & _IO_UNBUFFERED) printf("UNBUFFERED\n");
        else if (stdin->_flags & _IO_LINE_BUF) printf("LINE BUFFERED\n");
        else printf("FULLY BUFFERED\n");
    }
```

**Практическая демонстрация:**

```c
#include <stdio.h>
#include <unistd.h>
#include <string.h>

int main() {
    char input[100];
    
    printf("Введите строку: ");
    
    // 1. Пользователь вводит "hello" + Enter
    // 2. Данные идут: клавиатура → ядро → stdio
    // 3. fgets читает ИЗ БУФЕРА stdio, а не напрямую с клавиатуры!
    fgets(input, sizeof(input), stdin);
    
    // Убираем \n
    input[strcspn(input, "\n")] = 0;
    
    printf("Вы ввели: '%s'\n", input);
    
    // Докажем что данные уже в буфере ядра
    printf("Оставшиеся данные в буфере ядра: ");
    system("stty -echo -icanon min 0 time 0; cat | od -c");
}
```






