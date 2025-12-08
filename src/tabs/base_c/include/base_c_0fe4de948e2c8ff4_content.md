

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE, exit

void process(int (*handler)(int), int x) {
    printf("%d\n", handler(x));
}

// Через typedef проще синтаксис
typedef int (*Handler)(int);

void process2(Handler handler, int x) {
    printf("%d\n", handler(x));
}

int main(void){
    int square(int x) { return x*x; }

     process(square, 5); // 25

     process2(square, 5); // 25

     return EXIT_SUCCESS;
}

```
