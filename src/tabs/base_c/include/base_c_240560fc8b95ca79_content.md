

Для сопоставления в switch 
* нельзя: использовать переменные, строки, float/double и выражения и const
* можно: макрос, литералы 

(Почему нельзя переменные и т.д.  в switch - потому что компилятор должен знать на этапе компиляции как построить таблицу переходов между состояниями switch, а переменные дают понимание только в момент выполнения в runtime)

Обработка нескольких значений одним case (это наз. **проваливание**, как вариант реализации диапазона значений):

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main() {
    char operation = '+';
    int a = 10, b = 5;
    
    switch (operation) {
        case '+':
            printf("Результат: %d\n", a + b);
            break;
        case '-':
        case '*':
        case '/':
            printf("Операция %c пока не поддерживается\n", operation);
            break;
        default:
            printf("Неизвестная операция\n");
    }
    
    return EXIT_SUCCESS;
}

```

Использование с enum (как замена переменных и т.д. того чего нельзя использовать)

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

enum Color { RED=49, GREEN, BLUE };

int main() {
    // вместо int можно все что угодно использовать, главное сопоставить это с вариантом enum и его уже отдать в switch
    int n = getchar();
    printf("%d\n",n);// 1=49, 2=50

    enum Color color = n == 49? RED: GREEN;

    printf("%d\n",color);

    switch (color) {
        case RED:
            printf("Красный\n");
            break;
        case GREEN:
            printf("Зеленый\n");
            break;
        case BLUE:
            printf("Синий\n");
            break;
    }
    
    return EXIT_SUCCESS;
}

``` 
