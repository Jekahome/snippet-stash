

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

typedef struct {
    int id;
    char name[50];
    double salary;
} Employee;

Employee *create_employee(void) {
    Employee *emp = malloc(sizeof(*emp));
    if (emp == NULL) {
        return NULL;
    }
    
    // Инициализация полей
    emp->id = 0;
    emp->name[0] = '\0';
    emp->salary = 0.0;

    // или так
    *emp = (Employee){0}; // полностью обнуляем структуру
    
    return emp;
}
int main(void){
    Employee *emp = create_employee();

    // Хорошая практика — проверка выхода из диапазона при копировании строк
    snprintf(emp->name, sizeof(emp->name), "%s", "John");

    // не забыть освободить память
    free(emp);
    return EXIT_SUCCESS;
}

```

**Массивы структур с инициализацией**

```

size_t team_size = 5;
Employee *team = malloc(team_size * sizeof(*team));

if (team != NULL) {
    for (size_t i = 0; i < team_size; i++) {
        // team[i] = (Employee){0}; // удобно: и id, и name, и salary установить в 0, а для id потом отдельно
        team[i].id = (int)(i + 1);
        team[i].name[0] = '\0';
        team[i].salary = 0.0;
    }

// Хорошая практика — проверка выхода из диапазона при копировании строк
snprintf(team[i].name, sizeof(team[i].name), "%s", "John");
}
free(team);

```
