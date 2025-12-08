

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

// Битовые поля — это способ упаковать множество булевых флагов в минимальное место.
// Каждое поле = 1 бит, а не 4 байта (int).
// Недостатки:
// * не переносима между разными компиляторами. Компилятор может: упаковывать слева направо или справа налево, менять порядок в зависимости от архитектуры, вставлять паддинг
// * Не работает с memcpy(...) между системами. Из-за различий в порядке бит.
// * Медленнее чем ручные маски
// * Нельзя брать адрес битового поля
struct {    
    unsigned int autfd: 1;// 1 бит
    unsigned int bldfc: 1;// 1 бит
    unsigned int undln: 1;// 1 бит
    unsigned int itals: 1;// 1 бит
    // + еще биты выравнивания до unsigned int т.е. 4 байта. Если число полей будет больше чем 32, например 33 то размер станет 8 байт
} prnt;
 
int main(void) {
    printf("sizeof=%ld byte\n", sizeof(prnt));// 4 байта
    prnt.undln = 0; // или 1
    printf("undln=%d\n", prnt.undln);// 0
   
    return EXIT_SUCCESS;
}
 
/*
Как правильно делать "битовые флаги" в embedded

uint32_t flags = 0;

#define FLAG_BOLD      (1u << 0)
#define FLAG_ITALIC    (1u << 1)
#define FLAG_UNDERLINE (1u << 2)

flags |= FLAG_BOLD;
flags &= ~FLAG_ITALIC;

if (flags & FLAG_BOLD) { ... }

Преимущества:
* полностью переносимо
* очень быстро
* легко контролировать биты
* легко передавать по сети/в файлы

*/

```
