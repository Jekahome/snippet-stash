

```

// test.с  
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} DynArray;

void init_array(DynArray *arr) {
    arr->data = NULL;
    arr->size = 0;
    arr->capacity = 0;
}

void push_back(DynArray *arr, int value) {
    if (arr->size >= arr->capacity) {
        size_t new_capacity = arr->capacity ? arr->capacity * 2 : 2;
        int *new_data = realloc(arr->data, new_capacity * sizeof(int));
        if (!new_data) {
            perror("realloc failed");
            exit(EXIT_FAILURE);
        }
        arr->data = new_data;
        arr->capacity = new_capacity;
    }
    arr->data[arr->size++] = value;
}

void free_array(DynArray *arr) {
    free(arr->data);
    arr->data = NULL;
    arr->size = arr->capacity = 0;
}

int main(void) {
    DynArray arr;
    init_array(&arr);

    for (int i = 0; i < 10; i++) {
        push_back(&arr, i * 10);
        printf("Добавлено %d (size=%zu, capacity=%zu)\n",
               arr.data[arr.size - 1], arr.size, arr.capacity);
    }

    printf("\nВсе элементы:\n");
    for (size_t i = 0; i < arr.size; i++) {
        printf("%d ", arr.data[i]);
    }
    printf("\n");

    free_array(&arr);
    return EXIT_SUCCESS;
}
```
 
