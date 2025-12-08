

**qsort**

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, qsort, bsearch

int cmp_int(const void *a, const void *b) {
    int x = *(const int*)a;
    int y = *(const int*)b;
    return (x > y) - (x < y);
}

int main(void) {
    int arr[] = {5, 1, 9, 3, 2};
    size_t n = sizeof(arr) / sizeof(arr[0]);

    qsort(arr, n, sizeof(int), cmp_int);

    for (size_t i = 0; i < n; i++)
        printf("%d ", arr[i]);

    return EXIT_SUCCESS;
}

```

---

**bsearch**

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, qsort, bsearch

int cmp_int(const void *a, const void *b) {
    int x = *(const int*)a;
    int y = *(const int*)b;
    return (x > y) - (x < y);
}

int main(void) {
    int arr[] = {1, 2, 3, 5, 9};
    size_t n = sizeof(arr) / sizeof(arr[0]);

    int key = 3;
    int *found = bsearch(&key, arr, n, sizeof(int), cmp_int);

    if (found) {
        printf("Found %d at index %ld\n", key, found - arr);
    } else {
        printf("%d not found\n", key);
    }

    return EXIT_SUCCESS;
}

```
