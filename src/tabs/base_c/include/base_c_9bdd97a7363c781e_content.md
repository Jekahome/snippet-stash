

**File result_gen.h**

```

#ifndef RESULT_GEN_H
#define RESULT_GEN_H

#include <stdio.h>
#include <stdlib.h>

/*
OkType — тип значения, когда операция успешна (T в Rust)
ErrType — тип ошибки (E в Rust), может быть struct, enum, строка и т.д.
Name — имя нового типа Result, который мы генерируем
*/
#define DEFINE_RESULT(OkType, ErrType, Name)                          \
typedef struct {                                                      \
    int is_ok;      /* 1 = Ok, 0 = Err */                             \
    union {                                                           \
        OkType ok;     /* успешное значение */                        \
        ErrType err;   /* ошибка */                                   \
    } val;                                                            \
} Name;                                                               \
/* Функции-конструкторы */                                            \
static inline Name Name##_ok(OkType v) {                              \
    Name r; r.is_ok = 1; r.val.ok = v; return r;                      \
}                                                                     \
                                                                      \
static inline Name Name##_err(ErrType e) {                            \
    Name r; r.is_ok = 0; r.val.err = e; return r;                     \
}                                                                     \
/* Функции доступа */                                                 \
/* unwrap() с проверкой, печатает payload */                          \
static inline OkType Name##_unwrap(Name r) {                          \
    if (!r.is_ok) {                                                   \
        fprintf(stderr, "unwrap() called on Err: %s (code %d)\n",     \
            r.val.err.message, r.val.err.code);                       \
        abort();                                                      \
    }                                                                 \
    return r.val.ok;                                                  \
}                                                                     \
                                                                      \
/* unwrap_err() с проверкой */                                        \
static inline ErrType Name##_unwrap_err(Name r) {                     \
    if (r.is_ok) {                                                    \
        fprintf(stderr, "unwrap_err() called on Ok\n");               \
        abort();                                                      \
    }                                                                 \
    return r.val.err;                                                 \
}                                                                     \
                                                                      \
/* unwrap_or(default) */                                              \
static inline OkType Name##_unwrap_or(Name r, OkType def) {           \
    return r.is_ok ? r.val.ok : def;                                  \
}                                                                     \
                                                                      \
/* expect(msg) */                                                     \
static inline OkType Name##_expect(Name r, const char* msg) {         \
    if (!r.is_ok) {                                                   \
        fprintf(stderr, "%s: %s (code %d)\n", msg,                    \
            r.val.err.message, r.val.err.code);                       \
        abort();                                                      \
    }                                                                 \
    return r.val.ok;                                                  \
}
#endif

```

**File fs_error.h**

```

#ifndef FS_ERROR_H
#define FS_ERROR_H

typedef enum {
    FS_ERR_NONE,
    FS_ERR_NOT_FOUND,
    FS_ERR_PERMISSION
} FsErrorKind;

typedef struct {
    FsErrorKind kind;
    const char* message;
    int code;
} FsError;

static inline FsError fs_error(FsErrorKind kind, const char* msg, int code) {
    FsError e = { kind, msg, code };
    return e;
}

#endif

```

**File fs_result.h**

```

#include "result_gen.h"
#include "fs_error.h"

// Result<char*, FsError> — операция возвращает строку (например, путь)
DEFINE_RESULT(char*, FsError, FsResult)

```

**File math_error.h**

```

#ifndef MATH_ERROR_H
#define MATH_ERROR_H

typedef enum {
    MATH_ERR_NONE,
    MATH_ERR_DIV_ZERO,
    MATH_ERR_OVERFLOW
} MathErrorKind;

typedef struct {
    MathErrorKind kind;     // тип ошибки
    const char* message;    // текстовое описание
    int code;               // числовой код
} MathError;

static inline MathError math_error(MathErrorKind kind, const char* msg, int code) {
    MathError e = { kind, msg, code };
    return e;
}

#endif

```

**File math_result.h**

```

#ifndef MATH_RESULT_H
#define MATH_RESULT_H

#include "result_gen.h"
#include "math_error.h"

// Result<int, MathError>
DEFINE_RESULT(int, MathError, MathResult)

#endif

```

**File main.c**

```

#include "math_result.h"
#include "fs_result.h"
#include <stdio.h>

MathResult divide(int a, int b) {
    if (b == 0) {
        return MathResult_err(math_error(MATH_ERR_DIV_ZERO,
                                         "division by zero", 1001));
    }
    return MathResult_ok(a / b);
}
FsResult read_file(const char* path) {
    if (!path) {
        return FsResult_err(fs_error(FS_ERR_NOT_FOUND, "Path is NULL", 404));
    }
    // ...
    return FsResult_ok("file contents"); // условно
}
int main() {
    MathResult r1 = divide(10, 2);
    MathResult r2 = divide(10, 0);

    if (r1.is_ok) {
        printf("Result: %d\n", MathResult_unwrap(r1));
    } else {
        MathError e = MathResult_unwrap_err(r1);
        printf("Error: %s (code %d)\n", e.message, e.code);
    }

    if (r2.is_ok) {
        printf("Result: %d\n", MathResult_unwrap(r2));
    } else {
        MathError e = MathResult_unwrap_err(r2);
        printf("Error: %s (code %d)\n", e.message, e.code);
    }

    //-------------------------------------------------------
    FsResult r = read_file(NULL);

    if (r.is_ok) {
        printf("File: %s\n", FsResult_unwrap(r));
    } else {
        FsError e = FsResult_unwrap_err(r);
        printf("Error: %s (code %d)\n", e.message, e.code);
    }

    return 0;
}
```
