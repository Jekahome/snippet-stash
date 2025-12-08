

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE, exit

// Универсальная VTable для Animal ----------
typedef struct AnimalVTable {
    void (*speak)(void* self);
    void (*destroy)(void* self);
} AnimalVTable;

// Базовый "класс" Animal -------------------
typedef struct Animal {
    const AnimalVTable* vtable;
} Animal;

// Универсальный API: работает с Animal*, но вызывает методы конкретного типа
void Animal_speak(Animal* a) {
    a->vtable->speak(a);
}

void Animal_destroy(Animal* a) {
    a->vtable->destroy(a);
    free(a);
}

//Подкласс Dog ------------------------------
typedef struct {
    Animal base;
    const char* name;
} Dog;

void Dog_speak(void* self) {
    Dog* d = (Dog*)self;
    printf("%s says: Woof!\n", d->name);
}

void Dog_destroy(void* self) {
    // для примера — тут могли бы быть ресурсы
    Dog* d = (Dog*)self;
    printf("Dog_destroy %s\n", d->name);
}

AnimalVTable Dog_vtable = {
    .speak = Dog_speak,
    .destroy = Dog_destroy
};

Dog* Dog_new(const char* name) {
    Dog* d = malloc(sizeof(Dog));
    d->base.vtable = &Dog_vtable;
    d->name = name;
    return d;
}

// Подкласс Cat ----------------------------
typedef struct {
    Animal base;
    int age;
} Cat;

void Cat_speak(void* self) {
    Cat* c = (Cat*)self;
    printf("Cat age %d says: Meow!\n", c->age);
}

void Cat_destroy(void* self) {
    // для примера — тут могли бы быть ресурсы
    Cat* c = (Cat*)self;
    printf("Dog_destroy %d\n", c->age);    
}

AnimalVTable Cat_vtable = {
    .speak = Cat_speak,
    .destroy = Cat_destroy
};

Cat* Cat_new(int age) {
    Cat* c = malloc(sizeof(Cat));
    c->base.vtable = &Cat_vtable;
    c->age = age;
    return c;
}

int main(void){
    Animal* a1 = (Animal*)Dog_new("Rex");
    Animal* a2 = (Animal*)Cat_new(3);

    Animal_speak(a1); // Rex says: Woof!
    Animal_speak(a2); // Cat age 3 says: Meow!

    Animal_destroy(a1);
    Animal_destroy(a2);

    return EXIT_SUCCESS;
}    

```
