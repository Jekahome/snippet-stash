

Как вы помните, память под **статические данные** выделяется во время загрузки программы в память, а память под **автоматические данные** выделяется, когда поток управления программы входит в блок, и освобождается, когда поток уп­равления покидает блок.

Некоторые операции по выделению памяти про­исходят автоматически. 
Например, в результате объявлений резервируется пространство памяти, достаточное для хранения переменной float и
строки.

```c

float х;
char place [] = "Поющие в терновнике";
int plates[100]; // явно запросить определенный объем памяти

```

Во всех показанных случаях объявление также предоставляет идентификатор выделенной памяти, так что для обращения к данным можно исполь­зовать `х` или `place`.

Язык С выходит за эти рамки. Во время выполнения программы можно выделять дополнительную память.

функция malloc возвращает адрес первого байта в  выделенном блоке памяти, если не удастся выделить память то вернет NULL

```c

#include <stdio.h>
#include <stdlib.h> // malloc, EXIT_SUCCESS
#include <string.h> // для memset
#include <stddef.h> // для NULL, size_t
#include <stdint.h> // для SIZE_MAX максимальное значение типа size_t

// проверка переполнения 
size_t calculate_needed_memory(size_t element_count, size_t element_size) {
    if (element_count > SIZE_MAX / element_size) {
        return 0;   
    }
    return element_count * element_size;
}

int main() { 
    int *arr = NULL;
    size_t array_size = 100;
    size_t needed = calculate_needed_memory(array_size, sizeof(*arr));
    
    if (needed == 0) {
        fprintf(stderr, "Слишком большой размер запрашиваемой памяти: %ld\n", needed);
        return EXIT_FAILURE;
    }
    // int *arr = malloc(array_size * sizeof(*arr));
    // или без проверки переполнения размера
    arr = malloc(needed);

    if (arr == NULL) {
        fprintf(stderr, "Не удалось выделить память для массива\n");
        return EXIT_FAILURE;
    }
    // Указатель на первый адрес последовательности неинициализирован, поэтому перед использованием нужно заполнить данными
    // самому либо изначально использовать для выделения памяти `calloc`
    // Использование памяти
    for (size_t i = 0; i < array_size; i++) {
        arr[i] = (int)(i * i);
    }
    printf("%d",arr[0]);
    
    // Не забываем освободить!
    free(arr);
    arr = NULL;  // Хорошая практика
      
    return EXIT_SUCCESS;
}
```
