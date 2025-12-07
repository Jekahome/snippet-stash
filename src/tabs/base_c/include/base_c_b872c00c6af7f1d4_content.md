

Пример:

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main() {
    int a = 10, b = 20;
    
    // Находим максимальное число
    int max = (a > b) ? a : b;
    printf("Максимум: %d\n", max);  // Вывод: 20
    
    // Проверка четности
    int number = 7;
    char* result = (number % 2 == 0) ? "четное" : "нечетное";
    printf("%d - %s\n", number, result);  // Вывод: 7 - нечетное
    
    return EXIT_SUCCESS;
}

```

---

Пример:

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

void print_positive() {
    printf("Положительное\n");
}

void print_negative() {
    printf("Отрицательное\n");
}

int main() {
    int num = -5;
    
    // Вызов разных функций
    (num >= 0) ? print_positive() : print_negative();
    
    // В аргументах функций
    printf("Число %d %s\n", num, (num >= 0) ? "положительное" : "отрицательное");
    
    return EXIT_SUCCESS;
}
```
