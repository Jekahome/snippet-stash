

Зачем нужно
* проверка размеров структур (bin-протоколы)
* проверка ABI-совместимости
* проверка конфигурации compile-time
* проверка платформозависимых предположений
* замена ручных #if

Пример: размер структуры соответствует протоколу ABI

```c

#include <stdint.h> // int8_t, uint16_t
struct Msg {
    uint8_t id;
    uint16_t len;
};

_Static_assert(sizeof(struct Msg) == 3, "Message size mismatch");

```

Пример: убедиться, что int = 4 байта

```c

_Static_assert(sizeof(int) == 4, "int must be 4 bytes");

```

Пример: проверка полей перед отправкой в DMA (embedded)

```c

_Static_assert(__alignof__(DMA_Descriptor) == 4, "DMA descriptor must be 4-byte aligned");

```
