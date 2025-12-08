

Если выражение оценивается как ложное (=== ну­левое), макрос assert() выводит в стандартный поток ошибок (stderr) сообщение об ошибке и вызывает функцию abort(), которая прекращает выполнение програм­мы.


```

#include <assert.h>  // для assert()
#include <stdlib.h>  // для abort(), если assert сработает
#include <stddef.h> // NULL

int main(void){
    assert(ptr != NULL);
    return EXIT_SUCCESS;
}

```

В релизной сборке можно отключить:

```

#define NDEBUG
#include <assert.h>
```
