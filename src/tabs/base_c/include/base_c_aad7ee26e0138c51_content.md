


**И это и UB, и ошибочно, и вообще непредсказуемо**

```

union U x;
x.f = 1.23f;
printf("%d\n", x.i);

```

**Вариантный тип (tagged union)**

**Файл safe_value.h**

```

// Пользователь видит только API, не поля.
#ifndef SAFE_VALUE_H
#define SAFE_VALUE_H

#include <stddef.h>

typedef struct Value Value;

typedef enum {
    TYPE_INT,
    TYPE_FLOAT,
    TYPE_STR
} ValueType;

Value value_int(int x);
Value value_float(float x);
Value value_str(const char* s);

int         value_as_int(const Value* v);
float       value_as_float(const Value* v);
const char* value_as_str(const Value* v);

ValueType value_type(const Value* v);

void value_free(Value* v);

#endif

```

**Файл safe_value.c (реализация — поля скрыты)**

```

#include "safe_value.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

struct Value {
    ValueType type;
    union {
        int    i;
        float  f;
        char*  s;
    } data;
};

#define CHECK_TYPE(v, expected)                                   \
    do {                                                          \
        if ((v)->type != (expected)) {                            \
            fprintf(stderr, "Type error: expected %d, got %d\n",  \
                    (expected), (v)->type);                       \
            abort();                                              \
        }                                                         \
    } while (0)

Value value_int(int x) {
    Value v;
    v.type = TYPE_INT;
    v.data.i = x;
    return v;
}

Value value_float(float x) {
    Value v;
    v.type = TYPE_FLOAT;
    v.data.f = x;
    return v;
}

Value value_str(const char* s) {
    Value v;
    v.type = TYPE_STR;
    v.data.s = strdup(s);
    return v;
}

int value_as_int(const Value* v) {
    CHECK_TYPE(v, TYPE_INT);
    return v->data.i;
}

float value_as_float(const Value* v) {
    CHECK_TYPE(v, TYPE_FLOAT);
    return v->data.f;
}

const char* value_as_str(const Value* v) {
    CHECK_TYPE(v, TYPE_STR);
    return v->data.s;
}

ValueType value_type(const Value* v) {
    return v->type;
}

void value_free(Value* v) {
    if (v->type == TYPE_STR) {
        free(v->data.s);
    }
    v->type = TYPE_INT;
    v->data.i = 0;
}

```

**Файл main.c — использование (безопасное)**

```

#include "safe_value.h"
#include <stdio.h>

int main() {
    Value a = value_int(10);
    Value b = value_float(3.14f);
    Value c = value_str("hello");

    printf("a = %d\n", value_as_int(&a));
    printf("b = %f\n", value_as_float(&b));
    printf("c = %s\n", value_as_str(&c));

    value_free(&c);

    return 0;
}

```

