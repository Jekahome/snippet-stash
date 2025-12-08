

**Пример хвостовой рекурсии** (вызов функции на повтор происходит в конце)

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

void up_and_down(int);// прототип
int main(void) {
    up_and_down(1);
    return EXIT_SUCCESS;
}
void up_and_down(int n){ // на каждом новом фрейме рекурсии переменная n будет уникальной
    printf("Уровень %d: ячейка n %p\n", n, &n) ; // 1
    if (n < 4)
        up_and_down(n+1);
    printf ("УРОВЕНЬ %d: ячейка n %p\n", n, &n) ; // 2 Эта часть будет выполнятся в обратном порядке вызова так как происходит раскрутка вызовов от конца к началу
}
/*
Уровень 1: ячейка n 0x7ffdc208936c
Уровень 2: ячейка n 0x7ffdc208934c
Уровень 3: ячейка n 0x7ffdc208932c
Уровень 4: ячейка n 0x7ffdc208930c
УРОВЕНЬ 4: ячейка n 0x7ffdc208930c  <----- после окончания условия продолжения рекурсии, 
УРОВЕНЬ 3: ячейка n 0x7ffdc208932c  <----- сразу же происход размотка стека вызовов обратно в том же порядке
УРОВЕНЬ 2: ячейка n 0x7ffdc208934c
УРОВЕНЬ 1: ячейка n 0x7ffdc208936c
*/

```

---

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int factorial(int);
int main(void) {
    printf("%d",factorial(10));
    return EXIT_SUCCESS;
}
int factorial(int number){
    // если произведена попытка вычислить факториал нуля 
    if (number < 1) return 0;
    // если вычисляется факториал единицы
    // именно здесь произведется выход из рекурсии
    else if (number == 1) return 1;
    // любое другое число вызывает функцию заново с формулой N-1
    else return number * factorial(number-1);//Если факториал 5-ти => 5*4*3*2*1//Для проверки установить тут точку останова
}

```
