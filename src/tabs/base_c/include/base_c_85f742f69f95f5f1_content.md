

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

union Hold{
    int digit;
    double bigfl;
    char letter;
};

union Hold_2{
    int digit;
    double bigfl;
    char letter;
} global_fir;

int main(void){
    // присваивание (assignment) глобальной переменной
    global_fir.letter = 'Q';
    printf("%c\n",global_fir.letter);

    // Инициализация
    union Hold fit_3 = {.digit=100};
    printf("%d",fit_3.digit);
    fit_3.bigfl = 0.1;// теперь предыдущее значение fit_3.digit уже недоступно т.е. Undefined Behavior (UB).
    printf("bigfl=%f",fit_3.bigfl);
    //printf("digit=%d",fit_3.digit);// мусор

    // Присваивание 
    union Hold fit;
    fit.letter = 'W';
    printf("%c\n",fit.letter);

    fit.bigfl=8.0;
    printf("%f\n",fit.bigfl);

    // массив типов union
    union Hold arr[5];
    arr[0]=fit;
    printf("%c",arr[0].letter);

    // указатель на тип union
    union Hold *ptr;
    ptr=&fit;
    printf("%c",ptr->letter);
 
    // Создание union из другого union
    union Hold fit_2 = fit;
    printf("%c",fit_2.letter);
 
    return EXIT_SUCCESS;
}

```
