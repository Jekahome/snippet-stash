

Когда в системных функциях Unix возникают ошибки, они обычно возвращают `-1` и записывают в глобальную целочисленную переменную errno номер ошибки, сообщающий причину.

Например, вот как можно проверить наличие ошибки при обращении к системному вызову fork:
```c
#include <sys/types.h> // pid_t
#include <unistd.h> // fork
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

// Реализация функции ошибки 
void unix_error(char *msg) {
    fprintf(stderr, "%s: %s\n", msg, strerror(errno));
    exit(1);
}

pid_t Fork(void) {
    pid_t pid;
    if ((pid = fork()) < 0)
        unix_error("Fork error");
    return pid;
}

int main() {
    pid_t pid = Fork();
    if (pid == 0) {
        printf("Я — процесс-потомок!\n");
    } else {
        printf("Я — родитель, мой потомок имеет PID: %d\n", pid);
    }
    return 0;
}
```

