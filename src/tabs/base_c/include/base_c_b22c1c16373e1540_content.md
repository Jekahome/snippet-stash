

**Выборка части битовой последовательности**

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

/*
x = 0b11010110  (214)
p = 5, n = 3

Биты      :  1  1  0  1  0  1  1  0
Позиция:  7  6  5  4  3  2  1  0
                          ↑ ↑ ↑
                           p=5, берем 3 бита: позиции 5,4,3

Значения битов:
позиция 5: 0
позиция 4: 1  
позиция 3: 0

Результат: 0b010 = 2
*/

// Функция getbits извлекает n битов из числа x, начиная с позиции p  
// биты нумеруются с 0, начиная с младших  
unsigned int getbits(unsigned int x, int p, int n){
    return (x >> (p + 1 - n)) & ~(~0U << n);
}

// или так
unsigned int getbits_alt(unsigned int x, int p, int n) {
    unsigned int mask = (1U << n) - 1;  // Создаем маску n единиц
    return (x >> (p - n + 1)) & mask;   // Сдвигаем и применяем маску
}

void print_binary(unsigned int num) {
    for (int i = 31; i >= 0; i--) {
        printf("%d", (num >> i) & 1);
        if (i % 4 == 0) printf(" ");  // Разделитель каждые 4 бита
    }
    printf("\n");
}

int main(void){
    // для 214
    print_binary(214);// 0000 0000 0000 0000 0000 0000 1101 0110 
    //                                                   ↑↑ ↑
    //                                                   54 3

    unsigned int result = getbits(214, 5, 3);
    printf("result=%u\n", result); // = 2 (что соответствует 0b010)

    result = getbits_alt(214, 5, 3);
    printf("%u\n", result); // = 2 (что соответствует 0b010)
    result = 2;
    print_binary(result);// 0000 0000 0000 0000 0000 0000 0000 0010 
    
    // для 216
    print_binary(216);// 0000 0000 0000 0000 0000 0000 1101 1000
    result = getbits_alt(216, 5, 3);
    printf("%u\n", result);// = 3 (что соответствует 0b011)
    print_binary(3);// 0000 0000 0000 0000 0000 0000 0000 0011
    return EXIT_SUCCESS;
}
```
