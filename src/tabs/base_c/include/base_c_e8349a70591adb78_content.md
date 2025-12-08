

Это позволяют **хранить, передавать и вызывать** функции как данные — почти как функции высшего порядка в Rust или callbacks в C++.

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE, exit
 
int add(int a, int b) { 
    return a + b; 
}
int main(void){
    int (*func_ptr)(int, int) = add;

    int result = func_ptr(2, 3); // или = (*func_ptr)(2, 3);
    printf("%d",result);
 
    return EXIT_SUCCESS;
}

```
