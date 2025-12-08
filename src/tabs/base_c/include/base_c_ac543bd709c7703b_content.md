

**Файл config.h**

```

#ifndef CONFIG_H
#define CONFIG_H

// Разные настройки для разных билдов
#ifdef DEBUG
    #define LOG_LEVEL 3
    #define ASSERT_ENABLED 1
    #define BUFFER_SIZE 1024
#else
    #define LOG_LEVEL 0
    #define ASSERT_ENABLED 0  
    #define BUFFER_SIZE 4096
#endif

// Feature flags
#ifdef FEATURE_NETWORK
    #define NETWORK_ENABLED 1
#else
    #define NETWORK_ENABLED 0
#endif

#endif

```

**Файл main.c**

```

#include "config.h"
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int main(void){
    printf("%d", LOG_LEVEL);
    printf("%d", ASSERT_ENABLED);
    printf("%d", BUFFER_SIZE);
    return EXIT_SUCCESS;
}

```

Передаем указание через флаги компилятора какие константы активировать

```
# Debug версия
gcc -DDEBUG -DFEATURE_NETWORK program.c -o program_debug

# Release версия  
gcc -O2 -DNDEBUG program.c -o program_release

# Минимальная версия
gcc -DNDEBUG program.c -o program_minimal

```

