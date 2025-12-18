

**В языке C нельзя выполнять арифметику напрямую с типами меньше, чем int**

```c
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS
int main(void) {
    char signed x = 127;
    
    printf("%d\n",x + (char signed)1);// 128 из-за Integer Promotion (целочисленное продвижение). Число 1 это signed int поэтому x приводится к int
    printf("%d\n", (char)(x + 1));  //  -128 а вот явное приведение 128 к char signed приведет к переполнению

    return EXIT_SUCCESS;
}

```
---

В дополнительном коде после для `int8_t 127` идет `-128`. Если ты пишешь цикл `for (int8_t i = 0; i < 150; i++)`, он станет **вечным**, потому что `i` никогда не дойдет до 150 — оно превратится в минус и пойдет по кругу.

```c
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h> // EXIT_SUCCESS
int main() {
 
    //signed char i = 120;// тоже самое int8_t
    int8_t i = 120;
    while (i <= 127) {
        printf("%d\n", i);
        i++; // Здесь случится прыжок 127 -> -128
        
        if (i == 5) break;
    }  
    return EXIT_SUCCESS;
}
```



