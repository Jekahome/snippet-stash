

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS
#define COLS 9
void variant_a(int (*arr)[COLS], size_t n ){
    printf("variant_a:\n");
    for (size_t i=0; i < n; i++){
        printf("Ряд %ld:    ",i);  
        for (size_t j=0; j < COLS; j++){
            if(j>=i) printf("0 "); 
            else printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}
void variant_b(int (*arr)[COLS], size_t n ){
    printf("variant_b:\n");
    for (size_t i=0; i < n; i++){
        printf("Ряд %ld:    ",i);  
        for (size_t j=0; j < COLS; j++){
            if(j<=i) printf("0 "); 
            else printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}
void variant_c(int (*arr)[COLS], size_t n ){
    printf("variant_c:\n");
    for (size_t i=0; i < n; i++){
        printf("Ряд %ld:    ",i);  
        for (size_t j=0; j < COLS; j++){
            if(j>=i && j<n-i && i<=n/2) printf("0 "); 
            else printf("%d ", arr[i][j]);
            //или так
            //if(j>=i && j<n-i) printf("0 ");
            //else printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}
void variant_d(int (*arr)[COLS], size_t n ){
    printf("variant_d:\n");
    for (size_t i=0; i < n; i++){
        printf("Ряд %ld:    ",i);  
        for (size_t j=0; j < COLS; j++){
            if(j<=i && j>=n-i-1 && i>=n/2) printf("0 ");
            else printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}
void variant_e(int (*arr)[COLS], size_t n ){
    printf("variant_e:\n");
    for (size_t i=0; i < n; i++){
        printf("Ряд %ld:    ",i);  
        for (size_t j=0; j < COLS; j++){
            if((j>=i && j<n-i && i<=n/2 )||( j<=i && j>=n-i-1 && i>=n/2)) printf("0 ");
            else printf("%d ", arr[i][j]);
            //или так
            //if((j>=i && j<n-i)||( j<=i && j>=n-i-1)) printf("0 ");
            //else printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}
void variant_f(int (*arr)[COLS], size_t n ){
    printf("variant_e:\n");
    for (size_t i=0; i < n; i++){
        printf("Ряд %ld:    ",i);  
        for (size_t j=0; j < COLS; j++){
            if(((j<n-i && i>=n/2) || (j<=i && i<=n/2)) || ((j>=i && i>=n/2) || (j>=n-i-1 && i<=n/2)) ) printf("0 ");
            else printf("%d ", arr[i][j]);
            //или так
            //if((j<=i && j<n-i) ||( j>=i && j>=n-i-1)) printf("0 ");
            //else printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}
void variant_g(int (*arr)[COLS], size_t n ){
    printf("variant_g:\n");
    for (size_t i=0; i < n; i++){
        printf("Ряд %ld:    ",i);  
        for (size_t j=0; j < COLS; j++){
            if((j<n-i && i>=n/2) || (j<=i && i<=n/2)) printf("0 ");
            else printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}
void variant_h(int (*arr)[COLS], size_t n ){
    printf("variant_h:\n");
    for (size_t i=0; i < n; i++){
        printf("Ряд %ld:    ",i);  
        for (size_t j=0; j < COLS; j++){
            if((j>=i && i>=n/2) || (j>=n-i-1 && i<=n/2)) printf("0 ");
            else printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}
void variant_i(int (*arr)[COLS], size_t n ){
    printf("variant_i:\n");
    for (size_t i=0; i < n; i++){
        printf("Ряд %ld:    ",i);  
        for (size_t j=0; j < COLS; j++){
            if(j<n-i ) printf("0 ");
            else printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}
void variant_j(int (*arr)[COLS], size_t n ){
    printf("variant_j:\n");
    for (size_t i=0; i < n; i++){
        printf("Ряд %ld:    ",i);  
        for (size_t j=0; j < COLS; j++){
            if(j>=n-i ) printf("0 ");
            else printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}
void fill_out(int (*arr)[COLS], size_t n, int fill){
    for (size_t i=0; i < n; i++){
        for (size_t j=0; j < COLS; j++){
            arr[i][j]=fill;//rand()%10-5;// от -5 до +5
        }
    }
}
int main(void) { 
    // Задача из 7 урока по С на массивы
    const size_t n=9;
    int arr[n][COLS]; 
    fill_out(arr, n, 1);
    variant_a(arr, n);
    variant_b(arr, n);
    variant_c(arr, n);
    variant_d(arr, n);
    variant_e(arr, n);
    variant_f(arr, n);
    variant_g(arr, n);
    variant_h(arr, n);
    variant_i(arr, n);
    variant_j(arr, n);
    return EXIT_SUCCESS;
}
```
