

**В C нет встроенных умных указателей как в Rust/C++, но можно реализовать оба подхода!**

## 1. **Unique указатель (владение с передачей)**

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

typedef struct {
    void* data;
} UniquePtr;

UniquePtr unique_create(size_t size) {
    UniquePtr ptr;
    ptr.data = malloc(size);
    return ptr;  // Владение передается
}

void unique_destroy(UniquePtr* ptr) {
    free(ptr->data);
    ptr->data = NULL;
}

// НЕТ функции копирования - только перемещение
UniquePtr unique_move(UniquePtr* source) {
    UniquePtr new_ptr = *source;
    source->data = NULL;  // Источник теряет владение
    return new_ptr;
}

int main(void) {
    UniquePtr ptr1 = unique_create(100);
    
    // Передача владения
    UniquePtr ptr2 = unique_move(&ptr1);
    
    // ptr1.data теперь NULL - безопасно
    if (ptr1.data == NULL) {
        printf("ptr1 потерял владение\n");
    }
    
    unique_destroy(&ptr2);
    return EXIT_SUCCESS;
}

```

## 2. **Shared указатель (разделяемое владение)**

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

typedef struct {
    void* data;
    int* ref_count;  // Счетчик ссылок
} SharedPtr;

SharedPtr shared_create(size_t size) {
    SharedPtr ptr;
    ptr.data = malloc(size);
    ptr.ref_count = malloc(sizeof(int));
    *ptr.ref_count = 1;  // Первая ссылка
    return ptr;
}

SharedPtr shared_copy(const SharedPtr* other) {
    SharedPtr new_ptr = *other;
    (*new_ptr.ref_count)++;  // Увеличиваем счетчик
    return new_ptr;
}

void shared_destroy(SharedPtr* ptr) {
    if (ptr->ref_count && ptr->data) {
        (*ptr->ref_count)--;
        
        if (*ptr->ref_count == 0) {
            free(ptr->data);
            free(ptr->ref_count);
            ptr->data = NULL;
            ptr->ref_count = NULL;
        }
    }
}

int main(void) {
    SharedPtr ptr1 = shared_create(100);
    SharedPtr ptr2 = shared_copy(&ptr1);  // Две ссылки
    
    printf("Ref count: %d\n", *ptr1.ref_count);  // 2
    
    shared_destroy(&ptr2);  // Уменьшаем счетчик
    printf("Ref count: %d\n", *ptr1.ref_count);  // 1
    
    shared_destroy(&ptr1);  // Освобождаем память
    return EXIT_SUCCESS;
}

```

## 3. **Комбинированное использование**

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

// Unique указатель
typedef struct {
    int* data;
} UniqueInt;

UniqueInt unique_int_create(int value) {
    UniqueInt ptr;
    ptr.data = malloc(sizeof(int));
    *ptr.data = value;
    return ptr;
}

void unique_int_destroy(UniqueInt* ptr) {
    free(ptr->data);
    ptr->data = NULL;
}

// Shared указатель  
typedef struct {
    UniqueInt* unique_data;
    int* ref_count;
} SharedUniquePtr;

SharedUniquePtr shared_unique_create(int value) {
    SharedUniquePtr ptr;
    ptr.unique_data = malloc(sizeof(UniqueInt));
    *ptr.unique_data = unique_int_create(value);
    ptr.ref_count = malloc(sizeof(int));
    *ptr.ref_count = 1;
    return ptr;
}

void shared_unique_destroy(SharedUniquePtr* ptr) {
    if (ptr->ref_count && ptr->unique_data) {
        (*ptr->ref_count)--;
        
        if (*ptr->ref_count == 0) {
            unique_int_destroy(ptr->unique_data);
            free(ptr->unique_data);
            free(ptr->ref_count);
            ptr->unique_data = NULL;
            ptr->ref_count = NULL;
        }
    }
}

int main(void) {
    // Unique указатель - эксклюзивное владение
    UniqueInt unique = unique_int_create(42);
    printf("Unique value: %d\n", *unique.data);
    
    // Shared указатель - разделяемое владение
    SharedUniquePtr shared1 = shared_unique_create(100);
    SharedUniquePtr shared2 = shared1;  // "Копирование"
    (*shared1.ref_count)++;  // Вручную увеличиваем счетчик
    
    printf("Shared value: %d, refs: %d\n", 
           *shared1.unique_data->data, *shared1.ref_count);
    
    unique_int_destroy(&unique);
    shared_unique_destroy(&shared1);
    shared_unique_destroy(&shared2);
    
    return EXIT_SUCCESS;
}

```

## 4. **С макросами для типобезопасности**

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

#define DECLARE_UNIQUE(type) \
    typedef struct { \
        type* data; \
    } Unique##type; \
    Unique##type unique_##type##_create(type value); \
    void unique_##type##_destroy(Unique##type* ptr);

#define IMPLEMENT_UNIQUE(type) \
    Unique##type unique_##type##_create(type value) { \
        Unique##type ptr; \
        ptr.data = malloc(sizeof(type)); \
        *ptr.data = value; \
        return ptr; \
    } \
    void unique_##type##_destroy(Unique##type* ptr) { \
        free(ptr->data); \
        ptr->data = NULL; \
    }

// Использование
DECLARE_UNIQUE(int)
DECLARE_UNIQUE(float)

int main(void) {
    Uniqueint unique_int = unique_int_create(42);
    Uniquefloat unique_float = unique_float_create(3.14f);
    
    unique_int_destroy(&unique_int);
    unique_float_destroy(&unique_float);
    return EXIT_SUCCESS;
}

IMPLEMENT_UNIQUE(int)
IMPLEMENT_UNIQUE(float)

```

## Ключевые отличия от Rust:

- ❌ **Нет проверки на этапе компиляции**
- ❌ **Нет borrow checker**
- ✅ **Можно иметь оба типа одновременно**  
- ✅ **Гибкая ручная управление памятью**
- ✅ **Меньшие накладные расходы**

**В C можно реализовать оба подхода, но вся ответственность за безопасность лежит на программисте!**

