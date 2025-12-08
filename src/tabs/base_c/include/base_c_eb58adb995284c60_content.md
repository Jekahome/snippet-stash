

```c

// Флаги устройств (каждый бит = отдельная настройка)
#define FLAG_A (1 << 0)  // 0b00000001
#define FLAG_B (1 << 1)  // 0b00000010  
#define FLAG_C (1 << 2)  // 0b00000100

unsigned int settings = FLAG_A | FLAG_C;  // 0b00000101

// Проверка флага
if (settings & FLAG_A) {
    // Флаг A установлен
}

// Извлечение группы флагов
unsigned int extracted = getbits(settings, 2, 2);  // Флаги B и C

```
