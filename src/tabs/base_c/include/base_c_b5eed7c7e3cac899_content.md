

```

// Говорим компилятору: «Есть структура struct Nameval, и давай дадим ей короткое имя Nameval».
typedef struct Nameval Nameval; 

// На этом этапе структура ещё не определена полностью, но уже можно использовать указатели на неё.

struct Nameval {
    char *name;
    int value;
    Nameval *next; // тут можем использовать псевдоним typedef
};

```
