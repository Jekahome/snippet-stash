

```c
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS
int main(void) { 
    int a,b,c=4;
    printf("a=%d b=%d c=%d\n",a,b,c);// a=32767 b=-1801395848 c=4 // данные в 'a' и 'b' мусор

    int d,e,f;
    d=e=f=8; // сомнительное удобство
    
    // Значением всего выражения является значение выражения справа от знака операции запятая.
    int x = (249,7,8,500); // оператор запятая все порешал за вас !!!
    printf("%d ",x);// 500

    return EXIT_SUCCESS;
}
```
