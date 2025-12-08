

Это аналог compile-time switch по типам.

Используется в C для реализации type-safe макросов, т.к. перегрузки (как в C++) нет.

Пример: перегрузка функций

```

#include <stdio.h>
#include <stdlib.h> /// EXIT_SUCCESS

// функция max подставляется в код по типу аргумента
#define max(a, b) \
    _Generic((a), \
        int:    max_int, \
        double: max_double, \
        float:  max_float \
    )(a, b)

/* --- Реальные функции для каждого типа --- */
int max_int(int a, int b) {
    return (a > b) ? a : b;
}

float max_float(float a, float b) {
    return (a > b) ? a : b;
}

double max_double(double a, double b) {
    return (a > b) ? a : b;
}

//--------------------------------------
// функция print подставляется в код по типу аргумента
#define print(x) _Generic((x), \
    int:    print_int, \
    char*:  print_str \
)(x)

/* --- Реальные функции для каждого типа --- */
void print_int(int x){
    printf("%d\n",x);
}
void print_str(char* x){
    printf("%s\n",x);
}

int main(void) {
    int   x = max(2, 3);          // выбирает max_int
    float y = max(2.1f, 3.5f);    // выбирает max_float
    double z = max(2.1, 3.5);     // max_double
    printf("%d %f %f\n",x,y,z);
    
    print(1);
    print("Hello");
  
    return EXIT_SUCCESS;
}

```
