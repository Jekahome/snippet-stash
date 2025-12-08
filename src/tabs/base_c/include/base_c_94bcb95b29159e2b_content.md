

```

// embedded_polymorphism.c
// Никакой динамической аллокации → детерминированность и предсказуемость.
#include <stdio.h>
#include <string.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

/* ====== VTable (интерфейс) ====== */
typedef struct AnimalVTable {
    void (*speak)(void* self);
    void (*tick)(void* self); // демонстрация нескольких методов
} AnimalVTable;

/* ====== Базовый "класс" ====== */
typedef struct {
    const AnimalVTable* vtable;
} Animal;

/* Утилиты для вызова методов полиморфно */
static inline void Animal_speak(Animal* a) {
    a->vtable->speak(a);
}
static inline void Animal_tick(Animal* a) {
    a->vtable->tick(a);
}

/* ====== Класс Dog (без malloc) ====== */
typedef struct {
    Animal base;       // обязательно в начале
    const char* name;
} Dog;

static void Dog_speak(void* self) {
    Dog* d = (Dog*)self;
    printf("%s: Woof!\n", d->name);
}
static void Dog_tick(void* self) {
    (void)self;
    /* пример: ничего не делаем, но реализация есть */
}

/* единственный vtable для Dog */
static const AnimalVTable Dog_vtable = {
    .speak = Dog_speak,
    .tick  = Dog_tick
};

/* init — не аллоцирует, а инициализирует память, выделенную вызывающим */
static inline void Dog_init(Dog* d, const char* name) {
    d->base.vtable = &Dog_vtable;
    d->name = name;
}

/* ====== Класс Cat (без malloc) ====== */
typedef struct {
    Animal base;
    int age;
} Cat;

static void Cat_speak(void* self) {
    Cat* c = (Cat*)self;
    printf("Cat(age=%d): Meow!\n", c->age);
}
static void Cat_tick(void* self) {
    Cat* c = (Cat*)self;
    /* демонстрация — увеличиваем возраст на "тик" */
    c->age += 1;
}

/* vtable для Cat */
static const AnimalVTable Cat_vtable = {
    .speak = Cat_speak,
    .tick  = Cat_tick
};

static inline void Cat_init(Cat* c, int age) {
    c->base.vtable = &Cat_vtable;
    c->age = age;
}

/* ====== Пример: статический пул (фабрика без malloc) ====== */
#define POOL_DOGS 2
#define POOL_CATS 2

static Dog dogs_pool[POOL_DOGS];
static int dogs_used[POOL_DOGS];

static Dog* dog_pool_alloc(const char* name) {
    for (int i = 0; i < POOL_DOGS; ++i) {
        if (!dogs_used[i]) {
            dogs_used[i] = 1;
            Dog_init(&dogs_pool[i], name);
            return &dogs_pool[i];
        }
    }
    return NULL; // нет свободных
}

static void dog_pool_free(Dog* d) {
    int idx = (int)(d - dogs_pool);
    if (0 <= idx && idx < POOL_DOGS) dogs_used[idx] = 0;
}

/* ====== main — демонстрация использования ====== */
int main(void) {
    /* 1) Локальные объекты (на стеке) */
    Dog stack_dog;
    Dog_init(&stack_dog, "Rex");

    Cat stack_cat;
    Cat_init(&stack_cat, 3);

    Animal* zoo1[] = {
        (Animal*)&stack_dog,
        (Animal*)&stack_cat
    };

    printf("=== Stack objects ===\n");
    for (size_t i = 0; i < sizeof(zoo1)/sizeof(zoo1[0]); ++i) {
        Animal_speak(zoo1[i]);
        Animal_tick(zoo1[i]);
    }
    /* tick увеличил возраст кота */
    Animal_speak(zoo1[1]); // покажет возраст 4

    /* 2) Статический пул (без malloc) */
    printf("\n=== Pool objects ===\n");
    Dog* pd1 = dog_pool_alloc("Fido");
    Dog* pd2 = dog_pool_alloc("Buddy");
    Dog* pd3 = dog_pool_alloc("Overflow"); // NULL, пул небольшой

    Animal* zoo2[3];
    zoo2[0] = (Animal*)pd1;
    zoo2[1] = (Animal*)pd2;
    zoo2[2] = (Animal*)pd3; // может быть NULL

    for (int i = 0; i < 3; ++i) {
        if (zoo2[i]) {
            Animal_speak(zoo2[i]);
        } else {
            printf("zoo2[%d] = NULL (no object)\n", i);
        }
    }

    /* освобождение в пуле */
    if (pd1) dog_pool_free(pd1);
    if (pd2) dog_pool_free(pd2);

    /* 3) Полиморфизм в массиве разных типов */
    printf("\n=== Mixed zoo (stack + pool) ===\n");
    Animal* mixed[4];
    mixed[0] = (Animal*)&stack_dog;
    mixed[1] = (Animal*)&stack_cat;
    mixed[2] = (Animal*)dog_pool_alloc("Spike");
    mixed[3] = (Animal*)&stack_cat; // reuse

    for (int i = 0; i < 4; ++i) {
        if (mixed[i]) Animal_speak(mixed[i]);
    }

    /* если в пуле были объекты — явно "освобождаем" */
    if (mixed[2]) dog_pool_free((Dog*)mixed[2]);

    return EXIT_SUCCESS;
}

```
