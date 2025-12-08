

Таблица модификаторов длины
 
Для printf() модификаторы длины менее критичны, потому что маленькие типы (char, short) автоматически продвигаются до int,
а вот в scanf() это уже жесткое требование, иначе получишь undefined behavior и краш.

| Модификатор | Тип аргумента                           | Пример вызова                            | Пример формата      |
| ----------- | --------------------------------------- | ---------------------------------------- | ------------------- |
| *(нет)*     | `int *`, `unsigned int *`               | `scanf("%d", &i);`                       | `%d`, `%u`          |
| `hh`        | `signed char *`, `unsigned char *`      | `scanf("%hhd", &c);`                     | `%hhd`, `%hhu`      |
| `h`         | `short *`, `unsigned short *`           | `scanf("%hd", &s);`                      | `%hd`, `%hu`        |
| `l`         | `long *`, `unsigned long *`, `double *` | `scanf("%ld", &l);`, `scanf("%lf", &d);` | `%ld`, `%lu`, `%lf` |
| `ll`        | `long long *`, `unsigned long long *`   | `scanf("%lld", &ll);`                    | `%lld`, `%llu`      |
| `j`         | `intmax_t *`, `uintmax_t *`             | `scanf("%jd", &x);`                      | `%jd`, `%ju`        |
| `z`         | `size_t *`                              | `scanf("%zu", &z);`                      | `%zu`               |
| `t`         | `ptrdiff_t *`                           | `scanf("%td", &t);`                      | `%td`               |
| `l`         | `double *`                         | `scanf("%lf", &ld);`                     | `%lf`               |
| `L`         | `long double *`                         | `scanf("%Lf", &ld);`                     | `%Lf`               |
| *(float)*   | `float *`                               | `scanf("%f", &f);`                       | `%f`                |

Пример:

```c
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    char *name="";
    float salary=0.0f;

    printf("Введите имя:");
    scanf("%s", &name);
    
    printf("Введите желаемую сумму месячной зарплаты:\n");
    scanf("%f", &salary);

    printf("Вы ввели имя:%s и запралату:%f\n", &name, &salary);
    return EXIT_SUCCESS;
}
```
