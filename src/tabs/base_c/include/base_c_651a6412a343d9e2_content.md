

standart C11

Макрос, который возвращает строку (спецификатор) в зависимости от типа

```c

#include <stdio.h>

#define get_format_specifier(X) _Generic((X), \
    unsigned char:   "%hhu", \
    unsigned int:   "%u", /* or %x for 16 base*/\
    unsigned short:   "%hu", \
    unsigned long:    "%lu", /* or %lx for 16 base or %lo for 8 base*/ \
    unsigned long long:   "%llu", /* or %llx for 16 base or %llo for 8 base*/\
    signed char:   "%hhd", \
    signed int:    "%d", /* or %i. Default int. Spec %d for decimal. How work "%i" => If value "0x..." or "0X..." -> 16 base. If value "05.." -> 8 base */\
    signed short:  "%hd", /* or %hi */ \
    signed long:  "%ld", /* or %li */\
    signed long long:  "%lld", /* or %lli */\
    float:  "%f", /* or %e or %g. Default %.6f but float contains %.6f - %.9f */\
    double: "%lf", /* or %lg. Default %.6f but double contains %.15f - %.17f */\
    long double: "%Lf",/* or %Lg. Default %.6f but long double contains %.18f - %.19f */\
    char*:  "%s",\
    void*:  "%p",\
    size_t: "%zu", /* equivalent "unsigned long" %lu or "unsigned int" %u  */\
    default: "Неизвестный тип" \
)

int main() {
    unsigned char un0 = 120;
    unsigned int un1 = 10; // equivalent size_t
    unsigned short un2 = 11;
    unsigned long un3 = 12LU; // equivalent size_t
    unsigned long long un4 = 13LLU;
 
    printf("Тип unsigned char (число): %s = %hhu\n", get_format_specifier(un0), un0);
    printf("Тип unsigned char (символ): %%c = %c\n", un0);
    printf("Тип unsigned int: %s = %d\n", get_format_specifier(un1),un1);
    printf("Тип unsigned short: %s = %hu\n", get_format_specifier(un2), un2);
    printf("Тип unsigned long: %s = %lu\n", get_format_specifier(un3), un3);
    printf("Тип unsigned long long: %s = %llu\n", get_format_specifier(un4), un4);
    printf("\n-----------------------------------------\n");

    signed char sn0 = -1;
    signed int sn1 = -10;
    signed short sn2 = -11;
    signed long sn3 = -12L;
    signed long long sn4 = -13LL;
     
    printf("Тип signed char (число): %s = %hhd\n", get_format_specifier(sn0), sn0);
    printf("Тип signed char (символ): %%c = %c\n", sn0);
    printf("Тип signed int: %s = %d\n", get_format_specifier(sn1),sn1);
    printf("Тип signed short: %s = %hd\n", get_format_specifier(sn2), sn2);
    printf("Тип signed long: %s = %ld\n", get_format_specifier(sn3), sn3);
    printf("Тип signed long long: %s = %lld\n", get_format_specifier(sn4), sn4);
    printf("\n-----------------------------------------\n");

    float f = -1.0f;
    double d = 3.14;
    long double ld = 3.14L;
    char *s = "Hello";
    size_t sz = sizeof(sn1);

    printf("Тип float: %s = %.6f\n", get_format_specifier(f), f);
    printf("Тип double: %s = %.6lf\n", get_format_specifier(d), d);
    printf("Тип long double: %s = %.6Lf\n", get_format_specifier(ld), ld);
    printf("Тип char*: %s = %s\n", get_format_specifier(s), s);
    printf("Тип size_t: %s = %zu\n", get_format_specifier(sz), sz);
 
    // Use
    long double your_type = 0.5487L;
    const char *target_fmt = get_format_specifier(your_type);
    printf(target_fmt, your_type);

    return 0;
}
```
