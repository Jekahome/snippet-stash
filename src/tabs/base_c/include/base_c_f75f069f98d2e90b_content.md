

Демонстрация использования переполнения буфера


<details>
<summary>Пример</summary>

```

// main.c -- программа входа
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <unistd.h> // Для низкоуровневого чтения (read)

#define BUFFER_SIZE 1 // Размер нашего уязвимого буфера

int main(void) { 
    // 1. Флаг, который мы хотим затереть (4 байта)
    // Размещается на стеке
    int32_t security_flag = 0xDEADBEEF; 
    
    // 2. Уязвимый буфер (1 байт)
    // Размещается на стеке
    char query[BUFFER_SIZE]; 
    
    // Внимание: GCC может переупорядочить эти переменные на стеке!
    // Для 64-битных систем они могут быть расположены как [query] [padding] [security_flag]
    
    int qsize;
    char *content_length_str;

    // --- Имитация CGI: Чтение CONTENT_LENGTH ---
    content_length_str = getenv("CONTENT_LENGTH");
    if (content_length_str == NULL) {
        fprintf(stderr, "Ошибка: Не установлена переменная CONTENT_LENGTH.\n");
        return 1;
    }

    qsize = atoi(content_length_str);
    
    printf("--- Демонстрация переполнения (Стек) ---\n");
    printf("1. CONTENT_LENGTH: %d\n", qsize);
    printf("2. Исходное значение security_flag: %x\n", security_flag);
    
    // 3. Вычисляем точный размер padding (выравнивания)
    // На стеке переменные могут идти в обратном порядке от порядка объявления (query, затем security_flag).
    // Мы берем разницу между адресом query и адресом security_flag.
    // Используем uintptr_t для безопасной арифметики с указателями.
    uintptr_t query_addr = (uintptr_t)query;
    uintptr_t flag_addr = (uintptr_t)&security_flag;

    // Расстояние (включая флаг)
    size_t offset_bytes = (flag_addr > query_addr) ? 
                          (flag_addr - query_addr) + sizeof(security_flag) :
                          (query_addr - flag_addr) + sizeof(query); // В случае обратного порядка

    printf("3. Разница в адресах: %zu байт\n", (size_t)abs((long)query_addr - (long)flag_addr));
    
    // --- ОПАСНАЯ ОПЕРАЦИЯ: read() ---
    // Используем read() для низкоуровневого чтения из stdin.
    // Мы читаем из stdin qsize байтов, которые переполняют query.
    ssize_t bytes_read = read(STDIN_FILENO, query, qsize); 

    printf("4. Прочитано байтов: %zd\n", bytes_read);
    
    // --- Проверка результата ---
    
    if (security_flag != 0xDEADBEEF) {
        printf("🚨 УСПЕХ: Флаг был изменен! Переполнение достигнуто.\n");

        printf("5. Фактическое значение security_flag: %#x\n", security_flag);

        // 💡 Вывод содержимого памяти по байтам (помогает понять порядок)
        printf("6. Флаг побайтно (в обратном порядке чтения):\n");

        // Указатель на 4-байтный флаг
        unsigned char *p = (unsigned char *)&security_flag;

        // Итерация по 4 байтам флага
        for (int i = 0; i < sizeof(security_flag); i++) {
            // В little-endian архитектуре p[0] - младший байт (CC), p[3] - старший байт (BB)
            printf("   Байт %d: 0x%02x (%c)\n", i, p[i], p[i]); 
        }
    } else {
        printf("❌ НЕУДАЧА: Необходимо увеличить CONTENT_LENGTH.\n");
    }
    
    return 0; 
}
/*
gcc main.c -o stack_exploit -O0 -fno-stack-protector
env CONTENT_LENGTH=4 ./stack_exploit <<< $(python3 -c 'import sys; sys.stdout.buffer.write(b"0ABCD")')


--- Демонстрация переполнения (Стек) ---
1. CONTENT_LENGTH: 4
2. Исходное значение security_flag: deadbeef
3. Разница в адресах: 1 байт
4. Прочитано байтов: 4
🚨 УСПЕХ: Флаг был изменен! Переполнение достигнуто.
5. Фактическое значение security_flag: 0xde434241
6. Флаг побайтно (в обратном порядке чтения):
   Байт 0: 0x41 (A)
   Байт 1: 0x42 (B)
   Байт 2: 0x43 (C)
   Байт 3: 0xde (�)
*/

```

</details>
