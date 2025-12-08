

Используется для управления поведением компилятора, например:
* подавление предупреждений
* выравнивание структур
* оптимизации
* предупреждения или сообщения во время компиляции

**Пример подавление предупреждений через макрос**

```c

#include <stdio.h> 
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

#define DISABLE_WARNING _Pragma("GCC diagnostic ignored \"-Wunused-variable\"")

int main(void) {
    DISABLE_WARNING
    int x; // предупреждение НЕ появится
    return EXIT_SUCCESS;
}

```

**Пример выравнивание (упаковка) структуры через макрос**

```c

#include <stdio.h> 
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

// pack — это инструкция компилятору о том, как выравнивать поля структуры в памяти (pack — только для бинарных протоколов)
// pack(N) говорит компилятору: выравнивание всех полей ограничено N байтами.
// «packed struct» уплотнение - снимаем автоматическое выравнивание полей
// * Когда структура должна точно соответствовать конкретному формату данных (например, сетевой пакет)
// * Embedded / microcontrollers памяти мало → экономим байты
// * Совместимость с чужими структурами, C/C++ структуры на диске или в сети должны «идентично» лежать байт в байт
// Ограничение
// * pack(push,1) может снижать производительность на CPU, потому что выравнивание нарушено
// * Компилятор может игнорировать pack
// * На некоторых архитектурах принудительное pack может быть запрещено для корректности.
#include <stdio.h>
#define PACKED _Pragma("pack(push,1)")
#define PACKED_END _Pragma("pack(pop)")
 
PACKED
struct X {
    char a;
    int b;
} x;
PACKED_END

struct Y {
    char a;
    int b;
} y;

int main(void) {
    DISABLE_WARNING

    printf("x=%lu byte\n",sizeof x); // 5 byte
    printf("y=%lu byte\n",sizeof y); // 8 byte
    return EXIT_SUCCESS;
}

```

**Пример вывести сообщение компилятору во время сборки**

```c

#ifdef DEBUG
#pragma message "DEBUG mode enabled"
#endif

//-------------------------------------------------------------------------------------
#define MSG(x) _Pragma(#x)

MSG(message "Сборка модуля X...")
MSG(message "TODO: доделать проверку ошибок")
/*
gcc -std=c99 -Wall -Wextra -Wformat -Werror -Wconversion -Wformat=2 -Wformat-security -fdiagnostics-color=always -fmessage-length=0 -Wformat-diag -O0 define.c -o my_program.out
define.c:4:16: note: ‘#pragma message: Сборка модуля X...’
    4 | #define MSG(x) _Pragma(#x)
      |                ^~~~~~~
define.c:6:1: note: in expansion of macro ‘MSG’
    6 | MSG(message "Сборка модуля X...")
      | ^~~
define.c:4:16: note: ‘#pragma message: TODO: доделать проверку ошибок’
    4 | #define MSG(x) _Pragma(#x)
      |                ^~~~~~~
define.c:7:1: note: in expansion of macro ‘MSG’
    7 | MSG(message "TODO: доделать проверку ошибок")
      | ^~~
*/


#pragma message "Сборка модуля X..."
#pragma message "TODO: доделать проверку ошибок"
/*
gcc -std=c99 -Wall -Wextra -Wformat -Werror -Wconversion -Wformat=2 -Wformat-security -fdiagnostics-color=always -fmessage-length=0 -Wformat-diag -O0 define.c -o my_program.out
define.c:9:9: note: ‘#pragma message: Сборка модуля X...’
    9 | #pragma message "Сборка модуля X..."
      |         ^~~~~~~
define.c:10:9: note: ‘#pragma message: TODO: доделать проверку ошибок’
   10 | #pragma message "TODO: доделать проверку ошибок"
      |         ^~~~~~~
*/

```
