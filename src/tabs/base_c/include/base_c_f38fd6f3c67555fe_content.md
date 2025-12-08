


```

Если есть определение DEBUG
#ifdef DEBUG
    #include "test.h"
    #define STABLES 5
#else
   #include "test_2.h"
   #define STABLES 6
#endif

//---------------------------------------------------------------------
Если еще нет такой константы то определить ее
#ifndef CONFIG_LOADED
#define CONFIG_LOADED // макрос-флаг просто существует
#endif

// #ifndef используется для предотвращения многократного вклю­чения файла, если этот код будет включен в другом месте еще раз то флаг THINGS_H уже будет существовать и внутрь компилятор не зайдет
// things.h  
#ifndef THINGS_H
#define THINGS_H
  // содержимое файла
#endif

//---------------------------------------------------------------------
Если иначе
#if VERSION == 2
    ...
#elif VERSION == 3
    ...
#else
    ...
#endif

#if defined (IBMPC)
    #include "ibmpc.h"
#elif defined (VAX)
    #include "vax.h"
#elif defined (МАС)
    #include "mac.h"
#else
    #include "general.h"
#endif

```
