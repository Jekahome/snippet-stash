

```

    #define SLEN 60
    #define LIM 5
   // Массивы символьных строк
    const char *mytalents[LIM] = {
        "Мгновенное складывание чисел",
        "Точное умножение", 
        "Накапливание данных",
        "Исполнение инструкций с точностью до буквы",
        "Знание языка программирования С"
    };
    // создает двумерный массив символов, а не массив строк
    char yourtalents[LIM][SLEN] = {
        "Хождение по прямой",
        "Здоровый сон", 
        "Просмотр телепередач",
        "Рассылка писем", 
        "Чтение электронной почты"
    };
    int i;
 
    for (i = 0; i < LIM; i++){
        printf("%-52s %-25s\n", mytalents [i], yourtalents [i]);
    }

    printf("\npaзмep mytalents: %zd, размер yourtalents: %zd\n",sizeof(mytalents), sizeof(yourtalents));
```
