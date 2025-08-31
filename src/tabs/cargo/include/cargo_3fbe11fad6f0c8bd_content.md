

```
# Версия компилятра
rustc --version

# компиляция завершение процесса программы при panic! (нужна OC abort)
rustc --cfg 'panic="abort"' src/main.rs

# запуск
./main

# или компиляция и запуск 
rustc src/parse_sound.rs && ./parse_sound
```
