

Если выражение оценивается как ложное (=== ну­левое), макрос assert() выводит в стандартный поток ошибок (stderr) сообщение об ошибке и вызывает функцию abort(), которая прекращает выполнение програм­мы.


```c
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE и для abort(), если assert сработает
#include <stddef.h> // NULL

//#define NDEBUG // отключение проверок assert (должен быть определен до импорта assert.h)
#include <assert.h>  // для assert()
 
void test(int *ptr){

   assert(ptr != NULL);

   printf("OK:\naddress:%p\ndata:%d\n", (void*)ptr, *ptr);
}

int main() {
   int *ptr = NULL;

    //int x=4;
    //ptr = &x;    
    
   test(ptr);
   return EXIT_SUCCESS;
}
```

* Компиляция и запуск с включеной проверкой assert:
```
gcc -std=c99 -Wall -Wextra -Wformat -Werror -Wconversion -Wformat=2 -Wformat-security -fdiagnostics-color=always -fmessage-length=0 -Wformat-diag -O0 error.c -o main && ./main
my_program.out: error.c:10: test: Assertion `ptr != NULL' failed.

```

* Компиляция и запуск с выключеной проверкой assert т.е. RELEASE:

 Макрос DNDEBUG отключающий assert можно передать при компиляции, это и есть режим release в языке C
```
gcc -std=c99 -DNDEBUG -Wall -Wextra -Wformat -Werror -Wconversion -Wformat=2 -Wformat-security -fdiagnostics-color=always -fmessage-length=0 -Wformat-diag -O0 error.c -o main && ./main

```

**как видно assert не проверялся и ошибка пошла дальше!!!**
```

 
