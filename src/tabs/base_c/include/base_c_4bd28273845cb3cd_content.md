

То есть операции читают/пишут целиком, без разрыва посередине, и с нужными гарантиями памяти.

```c

#include <stdatomic.h>

_Atomic int counter = 0;
atomic_int counter; // (atomic_int — typedef из <stdatomic.h>)

```

Зачем это нужно? Проблема обычной переменной в многопоточности:

```c

int counter = 0;

void thread() {
    counter++;   // НЕ атомарно! три операции == load → add → store, может прерваться посредине процесса.
}

```
---

Но круче — используются функции из библиотеки tdatomic.h

```c

#include <stdatomic.h>

atomic_int counter;

void thread() {
    // Загрузка / запись:
    int v = atomic_load(&x);
    atomic_store(&x, 123);

    atomic_fetch_add(&counter, 1);
 
    atomic_fetch_sub(&x, 1);

   atomic_compare_exchange_strong(&x, &expected, new_value);// Сравнить-и-поменять (CAS)
}

```


