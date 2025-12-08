

```
# Без оптимизации (по умолчанию)
gcc -O0 program.c -o program

# Базовая оптимизация
gcc -O1 program.c -o program

# Полная оптимизация (рекомендуется)
gcc -O2 program.c -o program

# Агрессивная оптимизация (может увеличить размер кода)
gcc -O3 program.c -o program

# Оптимизация по размеру
gcc -Os program.c -o program

# Оптимизация для отладки (сохраняет отладочную информацию)
gcc -Og program.c -o program
```
