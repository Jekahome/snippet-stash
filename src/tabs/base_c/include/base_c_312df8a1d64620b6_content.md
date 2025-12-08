

**atoi()** — строка → int

```

#include <stdlib.h>

int num = atoi("123");        // 123
int negative = atoi("-456");  // -456
int invalid = atoi("12abc");  // 12 (игнорирует хвост)
```

**strtol()** — строка → long (рекомендуемый)

```

#include <stdlib.h>

char *endptr;
long num = strtol("123", &endptr, 10);  // 123

// Проверка ошибок:
char str[] = "123abc";
long val = strtol(str, &endptr, 10);
if (*endptr != '\0') {
    printf("Нечисловые символы: %s\n", endptr);  // "abc"
}

```

**sscanf()** — форматированное чтение из строки

```

int num, count;
char str[] = "123 456";

count = sscanf(str, "%d", &num);  // num = 123, count = 1
count = sscanf("abc", "%d", &num); // count = 0 (ошибка)

```

**Для разных типов**:

```

#include <stdlib.h>

int i = atoi("123");           // int
long l = atol("123456");       // long  
long long ll = atoll("123");   // long long
double d = atof("3.14");       // double

// Или с проверкой ошибок:
long l = strtol("123", NULL, 10);
double d = strtod("3.14", NULL);
```


