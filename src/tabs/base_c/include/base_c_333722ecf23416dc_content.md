

Прототип функции `foo` без указания его аргументов позволяет пропустить проверку компилятора и это не дает сообщения ошибки. 

`$ gcc -std=c99 -O0 test.c -o test.out`

Теперь ошибка несовпадения типов параметров будет проигнорирована

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int foo();// не верный прототип

int foo_correct(int a);// верный прототип
// int foo_correct(int);// или так

int foo_correct_two(char, int);// верный прототип, типы и последовательность параметров должны совпадать с реализацией

int main(void) {
 
    printf("%d\n",foo("dddd"));              // 1879986180
    printf("%d\n",foo_correct("dddd")); // 1879986180
    
    return EXIT_SUCCESS;
}
int foo(int a){
    return a;
}
int foo_correct(int a){
    return a;
}
int foo_correct_two(char c, int a){
    return (int)c+a;
}

```

Но верно указанные типы аргументов `foo_correct` помогут компилятору выдать сообщение о ошибке:
```
gcc -std=c99 -Wall -Wextra -Wformat -Wformat=2 -Wformat-security -O0 test.c -o test.out
for.c: In function ‘main’:
for.c:7:31: warning: passing argument 1 of ‘foo_correct’ makes integer from pointer without a cast [-Wint-conversion]
    7 |     printf("%d\n",foo_correct("dddd"));
      |                               ^~~~~~
      |                               |
      |                               char *
for.c:3:21: note: expected ‘int’ but argument is of type ‘char *’
    3 | int foo_correct(int a);
```
