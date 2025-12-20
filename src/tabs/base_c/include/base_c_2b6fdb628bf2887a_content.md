

Способ 1. Прямая компиляция всех файлов

```
gcc -c main.c

gcc -c utils.c

gcc -o my_program main.o utils.o

```

Или сразу одной командой:
```
$ gcc -o my_program.out main.c utils.c
```

Запускаем
```
$  ./my_program.out
```
