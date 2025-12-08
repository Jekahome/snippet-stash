

**File option_gen.c**

```c

// option_gen.h
#ifndef OPTION_H
#define OPTION_H

#include <stdio.h>
#include <stdlib.h>

#define DEFINE_OPTION(Type, Name)                                    \
typedef struct {                                                     \
    int has_value;                                                   \
    Type val;                                                        \
} Name;                                                              \
                                                                     \
static inline Name Name##_some(Type v) {                             \
    Name o; o.has_value = 1; o.val = v; return o;                    \
}                                                                    \
                                                                     \
static inline Name Name##_none(void) {                               \
    Name o; o.has_value = 0; return o;                                \
}                                                                    \
                                                                     \
static inline Type Name##_unwrap(Name o) {                           \
    if (!o.has_value) {                                              \
        fprintf(stderr, "Option::unwrap called on None\n");          \
        abort();                                                     \
    }                                                                \
    return o.val;                                                    \
}                                                                    \
                                                                     \
static inline Type Name##_unwrap_or(Name o, Type def) {              \
    return o.has_value ? o.val : def;                                 \
}                                                                    \
                                                                     \
static inline int Name##_is_some(Name o) { return o.has_value; }     \
static inline int Name##_is_none(Name o) { return !o.has_value; }

#endif

```


**File main.c**

```c

#include "option_gen.h"
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

DEFINE_OPTION(int, OptionInt)

typedef struct {
    int age;
    char name[32];
} User;

DEFINE_OPTION(User, OptionUser)

OptionInt find_even(int* arr, int size) {
    for (int i = 0; i < size; i++) {
        if (arr[i] % 2 == 0) return OptionInt_some(arr[i]);
    }
    return OptionInt_none();
}

int main(void) {
    int a[] = {1,3,5,8,11};
    OptionInt r = find_even(a, 5);

    if (OptionInt_is_some(r)) {
        printf("Found even: %d\n", OptionInt_unwrap(r));
    } else {
        printf("No even number found\n");
    }

    // безопасно с дефолтом
    int val = OptionInt_unwrap_or(r, -1);
    printf("Value or default: %d\n", val);
    // -------------------------------------------------
    User u1 = {25, "Kolya"};
    OptionUser opt = OptionUser_some(u1); // Some
    OptionUser empty = OptionUser_none(); // None

    if (OptionUser_is_some(opt)) {
        User x = OptionUser_unwrap(opt);
        printf("User: %s, age: %d\n", x.name, x.age);
    }

    if (OptionUser_is_none(empty)) {
        printf("No user found\n");
    }
    
    return EXIT_SUCCESS;
}

```
