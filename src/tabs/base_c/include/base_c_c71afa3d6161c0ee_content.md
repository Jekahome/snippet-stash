

Применение:
* Нужен контроль над размером буфера
* Нужна построчная буферизация (_IOLBF)
* Точный контроль над типом буферизации

Ключевые сценарии применения:
* Большие файлы → большие буферы (_IOFBF, 64K+)
* Интерактивный вывод → построчная буферизация (_IOLBF)
* Реал-тайм логи → без буферизации (_IONBF)
* Критические ошибки → немедленный вывод
* Оптимизация производительности → подбор размера буфера

Результат: Ускорение операций I/O в 2-10 раз за счет уменьшения системных вызовов!

```
// Влияет на то, как stdio буферизует данные
setvbuf(stdin, NULL, _IONBF, 0);  // Выключить буферизацию stdio


=== СРАВНЕНИЕ РАЗМЕРОВ БУФЕРА ===
Без буферизации:   310.039 ms
Буфер 1K:          11.933 ms
Буфер 64K:         6.871 ms
Ускорение 64K vs без буфера: 45.12x

=== ПРАКТИЧЕСКОЕ ПРИМЕНЕНИЕ: ЛОГИРОВАНИЕ ===
Логи записаны. Проверьте error.log - ошибка должна быть сразу!

```

---


<details>
<summary>Пример</summary>

```
#include <stdio.h>
#include <unistd.h>
#include <time.h>
#include <stdlib.h>

// 1. Оптимизация записи в файл
void file_write_optimization() {
    printf("=== ОПТИМИЗАЦИЯ ЗАПИСИ В ФАЙЛ ===\n");
    
    FILE *fp = fopen("large_output.txt", "w");
    if (!fp) {
        perror("fopen");
        return;
    }
    
    // Устанавливаем большой буфер 64K для записи
    char *buffer = malloc(65536);
    setvbuf(fp, buffer, _IOFBF, 65536);  // Полная буферизация
    
    clock_t start = clock();
    
    // Пишем 100,000 строк
    for (int i = 0; i < 100000; i++) {
        fprintf(fp, "Line %d: This is some data that we're writing to the file\n", i);
    }
    
    clock_t end = clock();
    printf("Запись с буферизацией 64K: %.3f ms\n", 
           (double)(end - start) * 1000 / CLOCKS_PER_SEC);
    
    fclose(fp);
    free(buffer);
}

// 2. Построчная буферизация для интерактивного вывода
void line_buffered_output() {
    printf("\n=== ПОСТРОЧНАЯ БУФЕРИЗАЦИЯ ===\n");
    
    // Устанавливаем построчную буферизацию для stdout
    setvbuf(stdout, NULL, _IOLBF, BUFSIZ);
    
    printf("Эта строка появится сразу: ");
    fflush(stdout);  // Явный сброс буфера
    sleep(2);
    
    printf("а эта - тоже сразу благодаря \\n\n");  // \n вызывает сброс буфера
    sleep(1);
    
    printf("Строка 1 без перевода...");
    sleep(1);
    printf("Строка 2 без перевода...");  
    sleep(1);
    printf("И только теперь \\n выведет все сразу\n");
}

// 3. Отключение буферизации для реального времени
void unbuffered_realtime() {
    printf("\n=== РЕЖИМ БЕЗ БУФЕРИЗАЦИИ ===\n");
    
    // Отключаем буферизацию для stderr (часто используется по умолчанию)
    setvbuf(stderr, NULL, _IONBF, 0);
    
    fprintf(stderr, "Ошибка: ");
    sleep(1);
    fprintf(stderr, "сообщение выводится ");
    sleep(1); 
    fprintf(stderr, "немедленно!\n");
}

// 4. Оптимизация чтения большого файла
void efficient_file_reading() {
    printf("\n=== ОПТИМИЗАЦИЯ ЧТЕНИЯ ===\n");
    
    FILE *fp = fopen("/usr/share/dict/words", "r");  // Большой файл
    if (!fp) {
        perror("fopen");
        return;
    }
    
    // Устанавливаем буфер 32K для чтения
    char *read_buffer = malloc(32768);
    setvbuf(fp, read_buffer, _IOFBF, 32768);
    
    char line[256];
    int line_count = 0;
    
    clock_t start = clock();
    
    while (fgets(line, sizeof(line), fp)) {
        line_count++;
    }
    
    clock_t end = clock();
    printf("Прочитано %d строк за %.3f ms\n", line_count,
           (double)(end - start) * 1000 / CLOCKS_PER_SEC);
    
    fclose(fp);
    free(read_buffer);
}

// 5. Сравнение производительности с разными буферами
void buffer_size_comparison() {
    printf("\n=== СРАВНЕНИЕ РАЗМЕРОВ БУФЕРА ===\n");
    
    const int NUM_WRITES = 100000;
    
    // Тест 1: Без буферизации
    FILE *fp1 = fopen("test1.txt", "w");
    setvbuf(fp1, NULL, _IONBF, 0);
    
    clock_t start = clock();
    for (int i = 0; i < NUM_WRITES; i++) {
        fprintf(fp1, "Data %d\n", i);
    }
    clock_t time1 = clock() - start;
    fclose(fp1);
    
    // Тест 2: Буфер 1K
    FILE *fp2 = fopen("test2.txt", "w");
    char buf1k[1024];
    setvbuf(fp2, buf1k, _IOFBF, 1024);
    
    start = clock();
    for (int i = 0; i < NUM_WRITES; i++) {
        fprintf(fp2, "Data %d\n", i);
    }
    clock_t time2 = clock() - start;
    fclose(fp2);
    
    // Тест 3: Буфер 64K
    FILE *fp3 = fopen("test3.txt", "w");
    char *buf64k = malloc(65536);
    setvbuf(fp3, buf64k, _IOFBF, 65536);
    
    start = clock();
    for (int i = 0; i < NUM_WRITES; i++) {
        fprintf(fp3, "Data %d\n", i);
    }
    clock_t time3 = clock() - start;
    fclose(fp3);
    free(buf64k);
    
    printf("Без буферизации:   %.3f ms\n", (double)time1 * 1000 / CLOCKS_PER_SEC);
    printf("Буфер 1K:          %.3f ms\n", (double)time2 * 1000 / CLOCKS_PER_SEC);
    printf("Буфер 64K:         %.3f ms\n", (double)time3 * 1000 / CLOCKS_PER_SEC);
    printf("Ускорение 64K vs без буфера: %.2fx\n", (double)time1 / time3);
}

// 6. Практический пример: логирование с разной буферизацией
void logging_example() {
    printf("\n=== ПРАКТИЧЕСКОЕ ПРИМЕНЕНИЕ: ЛОГИРОВАНИЕ ===\n");
    
    FILE *debug_log = fopen("debug.log", "w");
    FILE *error_log = fopen("error.log", "w");
    
    // Отладочные логи - полная буферизация для производительности
    char debug_buffer[8192];
    setvbuf(debug_log, debug_buffer, _IOFBF, 8192);
    
    // Логи ошибок - без буферизации, чтобы видеть ошибки сразу
    setvbuf(error_log, NULL, _IONBF, 0);
    
    for (int i = 0; i < 10; i++) {
        // Обычные логи - буферизуются
        fprintf(debug_log, "Debug: Iteration %d\n", i);
        
        if (i == 5) {
            // Критическая ошибка - выводится немедленно
            fprintf(error_log, "ERROR: Something went wrong at iteration %d!\n", i);
        }
        
        sleep(1);
    }
    
    // Явно сбрасываем буфер отладочных логов
    fflush(debug_log);
    
    fclose(debug_log);
    fclose(error_log);
    
    printf("Логи записаны. Проверьте error.log - ошибка должна быть сразу!\n");
}

int main() {
    file_write_optimization();
    line_buffered_output(); 
    unbuffered_realtime();
    efficient_file_reading();
    buffer_size_comparison();
    logging_example();
    
    // Удаляем временные файлы
    remove("large_output.txt");
    remove("test1.txt");
    remove("test2.txt"); 
    remove("test3.txt");
    remove("debug.log");
    remove("error.log");
    
    return 0;
}
```

</details>
