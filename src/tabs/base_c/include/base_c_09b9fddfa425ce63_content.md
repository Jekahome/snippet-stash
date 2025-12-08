

Перенаправление ошибок:

```

./program > output.log       # stdout в файл, а ошибки на экран
./program 2> errors.log      # stderr (ошибки) в файл, а обычный вывод stdout на экран  
./program > output.log 2>&1  # stdout и stderr в один файл

```
