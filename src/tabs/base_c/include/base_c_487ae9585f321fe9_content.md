

Переполнение типа 
  
Поведение системы в таких случаях обычно не определено, но в рассматриваемой си­туации переменной toobig присваивается специальное значение, которое обозначает бесконечность

```

#include <stdio.h>
#include <math.h>   // для констант NAN и INFINITY и функций isnan, isnanf, isnanl
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    float toobig = 3.4E38 * 100.0f;
    
    printf("%e\n", toobig);// inf
  
    float n = toobig - (toobig - 1);
    printf("%e\n", n);//-nan NaN (not-a-number —не число)

    return EXIT_SUCCESS;
}

```

А что можно сказать о делении очень малых чисел? - дает субнормальное значение (значения с плавающей запятой, которые утратили полную точность типа)
