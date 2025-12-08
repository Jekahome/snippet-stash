


```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

#define PI 3.14159

int main(void){
    x = PI * r * r;

    // Компилятор фактически увидит:
    x = 3.14159 * r * r;

    return EXIT_SUCCESS;
}

```

---

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

#define LENGTH_NAME 40
#define MY_TEXT "Женя" // компилятор сам добавит \0

//#define PI_F 3.1415926535897932384626433832795028841971f // float хранит 6–9 знаков после запятой
//#define PI_D 3.1415926535897932384626433832795028841971 // double хранит 15–17 знаков после запятой
//#define PI_LD 3.1415926535897932384626433832795028841971L // long double хранит 18–19 знаков после запятой

const float PI_F = 3.141593f;
const double PI_D = 3.141592653589793;
const long double PI_LD = 3.141592653589793239L;

int main(void) {
   // по умолчанию printf/scanf выводит только 6 знаков после запятой
    printf("%.6f\n",PI_F);          // 3.141593
    printf("%.15f\n", PI_D);// 3.141592653589793
    printf("%.18Lf\n",PI_LD);       // 3.141592653589793239
    
    return EXIT_SUCCESS;
}

```
