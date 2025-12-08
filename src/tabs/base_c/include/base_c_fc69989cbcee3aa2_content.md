

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

typedef struct {
    int id;
    char name[50];
} Employee;

int main(void){
    Employee emps[3];
    emps[0].id=0;
    snprintf(emps[0].name, sizeof( emps[0].name), "%s", "John");
    emps[1].id=1;
    snprintf(emps[1].name, sizeof( emps[1].name), "%s", "Vins");
    emps[2].id=2;
    snprintf(emps[2].name, sizeof( emps[2].name), "%s", "Tom");

    Employee *ptr = &emps[2]; // так берется указатель, в отличии от массива, имя структуры не есть указатель 
    printf("name: %s",ptr->name);
 
    return EXIT_SUCCESS;
}

```
