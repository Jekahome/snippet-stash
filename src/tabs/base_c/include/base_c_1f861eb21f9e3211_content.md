

**Целые числа со знаком** (при желании для любого типа со знаком можно указывать ключевое слово signed, делая
явным тот факт, что этот тип поддерживает знак):
* int
* short или short int
* long или long int
* long long или long long int

```

signed long long int x = -8;
printf("%lld\n" , x);// -8

```

**Целые числа без знака** (указывайте ключевое слово unsigned перед
желаемым типом):
* unsigned int или unsigned
* unsigned short
* unsigned long

```

Тип unsigned int: %u = 10
Тип unsigned short: %hu = 11
Тип unsigned long: %zu = 12
Тип unsigned long long: %llu = 13
Тип size_t: %zu = 4     ( "unsigned long" %lu or "unsigned int" %u )

unsigned x = 8;
printf("%lld\n" , x);// 8

```

**Символы** (в одних реализациях применяется тип char со
знаком, в других он без знака. Язык С позволяет использовать ключевые слова signed и
unsigned для указания нужной формы)
* signed char
* unsigned char

Исторически сложилось так, что байт символа чаще всего имеет длину 8 битов, но он может быть длиной 16 битов или больше, если это необходимо для представления базового набора символов.

```

Тип unsigned char (число): %hhu = 120
Тип unsigned char (символ): %c = x
Тип signed char (число): %hhd = -1
Тип signed char (символ): %c = �
Тип char*: %s = Hello

```

**Булевские значения**

Логический тип _Bool или bool (unsigned int). Значения true/false определены в stdbool.h

Для пред­ставления true применяется 1, а для представления false — 0

**Вещественные числа с плавающей запятой** (эти типы могут иметь как положительные, так и отрицательные значения т.е. они signed):
* float
* double
* long double

```c

Тип float: %f = -1.000000
Тип double: %lf = 3.140000
Тип long double: %Lf = 3.140000

float a = 8.0f;
float b = -8.0f;
double c = 5.0;
double d = -5.0;
long double ld = 5.5L;
printf("%f %f %lf %lf %Lf", a, b, c, d, ld);

```

