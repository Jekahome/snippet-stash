

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

typedef struct {
    int id;
    char name[50];
    double price;
} Product;

int main(void) {
    // Запись структур в бинарный файл
    Product products[] = {
        {1, "Товар A", 19.99},
        {2, "Товар B", 29.99},
        {3, "Товар C", 39.99}
    };
    
    FILE *file = fopen("products.bin", "wb");
    if (!file) return EXIT_FAILURE;
    
    // Запись массива структур
    size_t count = sizeof(products) / sizeof(products[0]);
    fwrite(products, sizeof(Product), count, file);
    fclose(file);
    
    // Чтение структур из бинарного файла
    file = fopen("products.bin", "rb");
    if (!file) return EXIT_FAILURE;
    
    Product read_products[3];
    fread(read_products, sizeof(Product), 3, file);
    
    for (int i = 0; i < 3; i++) {
        printf("ID: %d, Name: %s, Price: %.2f\n", 
               read_products[i].id, read_products[i].name, read_products[i].price);
    }
    
    fclose(file);
    return EXIT_SUCCESS;
}
```
