

```c
// main.c -- программа входа
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS
int main(void){
    int i; // резервирование памяти для типа int 
    printf("i=%d\n",i);// i=32766 это случайное число на стеке, “неопределённое поведение” (undefined behavior)

    i = 99; // присваивание
    printf("i=%d\n",i);// i=99

    int y = 5; // инициализация

    // множественное присвоение справа на лево
    int a,b,c;
    a = b = c = 9;

    return EXIT_SUCCESS;
}
```

Но если компилировать через gcc с флагами предупреждениями статического анализа:
```
$ gcc -std=c99 -Wall -Wextra -O0 main.c -o main.out
```

то мы получим предупреждение:
```
main.c: In function ‘main’:
main.c:4:5: warning: ‘i’ is used uninitialized [-Wuninitialized]
    4 |     printf("i=%d\n",i);
       |     ^~~~~~~~~~~~~~~~~~
main.c:3:9: note: ‘i’ was declared here
    3 |     int i;
       |      
   ^
```

А вот что покажет компилятор clang с настройкой проверки использования неинициализированной памяти:
```
$ clang -fsanitize=memory main.c -o main.out
```

```
==28405==WARNING: MemorySanitizer: use-of-uninitialized-value
    #0 0x5b568b676378 in main (/home/jeka/Projects/C/HelloWorld/my_program.out+0xca378) (BuildId: d142d2104297a1903d9a60471c8722da7d51b49b)
    #1 0x7e1bc2a2a1c9 in __libc_start_call_main csu/../sysdeps/nptl/libc_start_call_main.h:58:16
    #2 0x7e1bc2a2a28a in __libc_start_main csu/../csu/libc-start.c:360:3
    #3 0x5b568b5de2f4 in _start (/home/jeka/Projects/C/HelloWorld/my_program.out+0x322f4) (BuildId: d142d2104297a1903d9a60471c8722da7d51b49b)

SUMMARY: MemorySanitizer: use-of-uninitialized-value (/home/jeka/Projects/C/HelloWorld/my_program.out+0xca378) (BuildId: d142d2104297a1903d9a60471c8722da7d51b49b) in main
Exiting
```
