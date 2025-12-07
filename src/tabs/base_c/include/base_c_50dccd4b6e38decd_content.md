


```
#include <unistd.h>
#include <termios.h>
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int getch_immediate() {
    char c;
    
    // Настройка raw режима
    struct termios old, new;
    tcgetattr(STDIN_FILENO, &old);
    new = old;
    new.c_lflag &= ~(ICANON | ECHO);
    new.c_cc[VMIN] = 1;   // Ждать 1 символ
    new.c_cc[VTIME] = 0;  // Без таймаута
    tcsetattr(STDIN_FILENO, TCSANOW, &new);
    
    // ПРЯМОЙ системный вызов - обходит ВСЕ буферы
    ssize_t result = read(STDIN_FILENO, &c, 1);
    
    // Восстановление режима
    tcsetattr(STDIN_FILENO, TCSANOW, &old);
    
    return (result == 1) ? (unsigned char)c : EOF;
}

int main() {
    printf("Нажимайте клавиши (q для выхода):\n");
    int c;
    while ((c = getch_immediate()) != 'q') {
        printf("Символ: '%c' (ASCII: %d)\n", c, c);
    }
    return EXIT_SUCCESS;
}
```
