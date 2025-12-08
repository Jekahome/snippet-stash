

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE, exit

typedef struct {
    void (*speak)(void);
} Animal;

void dog_speak() { printf("Woof!\n"); }
void cat_speak() { printf("Meow!\n"); }

int main(void){
 
    Animal dog = { dog_speak };
    Animal cat = { cat_speak };

    dog.speak();  // Woof!
    cat.speak();  // Meow!

    // Выбор поведения во время выполнения
    cat.speak = dog_speak;
    cat.speak();

    return EXIT_SUCCESS;
}

```
