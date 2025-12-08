

**1. Оператор строкизация #** — превращает аргумент в строку

```c

#define STR(x) #x

STR(123) → "123"

```

**2. Оператор ##** — конкатенация токенов объединяет две лексемы в одну.

```c

#include <stdlib.h> // EXIT_SUCCESS
#define XNAME(n) x ## n

#define PRINT_XN(n) printf ("х" #n " = %d\n", x ## n);// кирилическая 'х' и латинска 'x' это разные символы :)

#define MAKE_FUNC(name)      \
    void func_##name(int n) {        \
        printf("%d\n", n);                   \
    }                                                \
    void name(int n) {        \
        printf("%d\n", n);                   \
    }
    
// определение функции
MAKE_FUNC(test);

int main(void) {
    int XNAME(1) = 14; // превращается в int x1 = 14;
    int XNAME(2) = 20; // превращается в int x2 = 20;
    printf("%d %d",x1,x2);

    PRINT_XN(1); // превращается в printf("x1 = %d\n", x1);
    PRINT_XN(2); // превращается в printf("x2 = %d\n", x2);
 
    func_test(5);
    test(5);

    return EXIT_SUCCESS;
}

```
