

Обычно int выбирается как размер одного машинного слова — т.е. того, что процессор обрабатывает за одну операцию.

Стандарт C99 требует только, чтобы int был не меньше 16 бит.

На современных 32-битных и 64-битных системах int обычно 4 байта

В 8-разрядных микрокомпьютерах, таких как первые машины Apple, слово состояло из 8 битов. С тех пор персональные компьютеры перешли на 16-битные, 32-битные, а в настоящее время и 64-битные слова.

На 64-битных системах int чаще всего остаётся 4 байта, а не 8, потому что стандарт не требует иначе, и это сохраняет совместимость со старым кодом.

Типичные размеры int для популярных микроконтроллеров

| Архитектура | Пример MCU                         | Компилятор        | Размер `int`          | Комментарий                                               |
| ----------- | ---------------------------------- | ----------------- | --------------------- | --------------------------------------------------------- |
| **8-бит**   | AVR (Atmega328, Arduino UNO), PIC8 | avr-gcc           | **2 байта (16 бит)**  | хотя MCU 8-битный, `int` = 16 бит для удобства арифметики |
| **16-бит**  | MSP430                             | msp430-gcc        | **2 байта (16 бит)**  | соответствует размеру слова                               |
| **32-бит**  | ARM Cortex-M (STM32, ESP32, nRF52) | arm-none-eabi-gcc | **4 байта (32 бита)** | совпадает с размером машинного слова                      |
| **64-бит**  | редко в MCU                        | —                 | **4 или 8 байт**      | обычно 4 для совместимости                                |


---



| Тип                      | Размер (байт/бит) | Диапазон                                               | Примечание                                                       |
| ------------------------ | ----------------- | ------------------------------------------------------ | ---------------------------------------------------------------- |
| `char`                   | 1 (8)             | −128 … 127                                             | знаковый по умолчанию зависит от компилятора                     |
| `signed char`            | 1 (8)             | −128 … 127                                             | явно знаковый                                                    |
| `unsigned char`          | 1 (8)             | 0 … 255                                                | беззнаковый                                                      |
| `short int`              | 2 (16)            | −32 768 … 32 767                                       | также `signed short int`                                         |
| `unsigned short int`     | 2 (16)            | 0 … 65 535                                             |                                                                  |
| `int`                    | 4 (32)            | −2 147 483 648 … 2 147 483 647                         | типичный размер на 32/64-битных системах                         |
| `unsigned int`           | 4 (32)            | 0 … 4 294 967 295                                      |                                                                  |
| `long int`               | 4 (32)            | −2 147 483 648 … 2 147 483 647                         | 32-бит на большинстве систем, на 64-битных Linux `long` = 8 байт |
| `unsigned long int`      | 4 (32)            | 0 … 4 294 967 295                                      |                                                                  |
| `long long int`          | 8 (64)            | −9 223 372 036 854 775 808 … 9 223 372 036 854 775 807 | введён в C99                                                     |
| `unsigned long long int` | 8 (64)            | 0 … 18 446 744 073 709 551 615                         |                                                                  |
| `float`                  | 4 (32)            | ±3.4×10⁻³⁸ … ±3.4×10³⁸                                 | IEEE 754 single precision                                        |
| `double`                 | 8 (64)            | ±1.7×10⁻³⁰⁸ … ±1.7×10³⁰⁸                               | IEEE 754 double precision                                        |
| `long double`            | 10 (80)           | ±3.4×10⁻⁴⁹³² … ±3.4×10⁴⁹³²                             | IEEE 754 extended precision, может быть 12/16 байт в памяти      |


Пример:

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void){
    printf("sizeof(_Bool)          = %zu\n", sizeof(_Bool));             // 1 byte
    printf("sizeof(char)           = %zu\n", sizeof(char));              // 1 byte
    printf("sizeof(signed char)    = %zu\n", sizeof(signed char));       // 1 byte
    printf("sizeof(unsigned char)  = %zu\n", sizeof(unsigned char));     // 1 byte
    printf("sizeof(short)          = %zu\n", sizeof(short));             // 2 bytes
    printf("sizeof(unsigned short) = %zu\n", sizeof(unsigned short));    // 2 bytes
    printf("sizeof(int)            = %zu\n", sizeof(int));               // 4 bytes
    printf("sizeof(unsigned int)   = %zu\n", sizeof(unsigned int));      // 4 bytes
    printf("sizeof(long)           = %zu\n", sizeof(long));              // 8 bytes
    printf("sizeof(unsigned long)  = %zu\n", sizeof(unsigned long));     // 8 bytes
    printf("sizeof(long long)      = %zu\n", sizeof(long long));         // 8 bytes
    printf("sizeof(unsigned long long) = %zu\n", sizeof(unsigned long long)); // 8 bytes
    printf("sizeof(float)          = %zu\n", sizeof(float));             // 4 bytes
    printf("sizeof(double)         = %zu\n", sizeof(double));            // 8 bytes
    printf("sizeof(long double)    = %zu\n", sizeof(long double));       // 16 bytes

   // заначение тоже можно использовать
   // sizeof (array[0])
    return EXIT_SUCCESS;
}

```
