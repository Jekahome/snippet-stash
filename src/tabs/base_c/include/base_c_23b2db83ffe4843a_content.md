

Для мутации данных передавайте их по указателю
static хранит память между вызовами

Для запрета мутации (imutable) используйте const указатель

```

void foo(const int *n){... может принять как обычный так и константный указатель, а вот обычный указатель не может принять константный

int x = 1;
const int *ptr = &x;
*ptr = 2; // Error read-only
```

Пример:

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

void foo(int *n){
    static int total = 0;
    total+=*n;
    *n = total;
} 

int global_value = 123;

void foo_const_value(int const *n){
    n=&global_value;// поменять значение самого указателя на новый адрес мы можем, но это ни как не влияет на его первоначальные данные
    //*n=8; Error менять значение по адресу на который указывает указатель мы не можем
    printf("foo_const_value:%d\n",*n);// 123
}

void foo_const_ptr(int *const n){
    // n=&global_value; Error менять адрес указатель мы не можем
    *n=8; // менять значение по адресу на который указывает указатель мы можем
    printf("foo_const_ptr:%d\n",*n);// 8
}

void foo_const_ptr_and_value(int const *const n){
    //n=&global_value;  Error менять адрес указатель мы не можем
    //*n=8;             Error менять значение по адресу на который указывает указатель мы не можем
    printf("foo_const_ptr_and_value:%d\n",*n);// 8
}
 
int main(void) { 
    
    int x = 1;

    foo(&x);
    printf("%d\n", x);// 1

    foo(&x);
    printf("%d\n", x);// 2

    printf("%d\n", x);// 2
    foo_const_value(&x);// 123
    printf("%d\n", x);// 2

    foo_const_ptr(&x);// 8
    printf("%d\n", x);// 8

    foo_const_ptr_and_value(&x);// 8

    return EXIT_SUCCESS;
}
```

---

```

int x = 10, y = 20;

const int *ptr1 = &x;  // Указатель на константу
// *ptr1 = 15;         // ОШИБКА: нельзя менять значение
ptr1 = &y;             // МОЖНО: менять адрес

int *const ptr2 = &x;  // Константный указатель
*ptr2 = 15;            // МОЖНО: менять значение
// ptr2 = &y;          // ОШИБКА: нельзя менять адрес

const int *const ptr3 = &x;  // Константный указатель на константу
// *ptr3 = 15;               // ОШИБКА
// ptr3 = &y;                // ОШИБКА

```

