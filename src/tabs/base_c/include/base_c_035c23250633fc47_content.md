

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

// Классическая двойная рекурсия (очень медленная!)
int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);  // ← двойной вызов
}

// Версия с печатью вызовов для демонстрации
int fibonacci_debug(int n, int depth) {
    for (int i = 0; i < depth; i++) printf("  ");
    printf("fib(%d)\n", n);
    
    if (n <= 1) {
        for (int i = 0; i < depth; i++) printf("  ");
        printf("return %d\n", n);
        return n;
    }
    
    int left = fibonacci_debug(n - 1, depth + 1);
    int right = fibonacci_debug(n - 2, depth + 1);
    
    for (int i = 0; i < depth; i++) printf("  ");
    printf("return %d + %d = %d\n", left, right, left + right);
    return left + right;
}
int main(void) {
    printf("=== Fibonacci с двойной рекурсией ===\n");
    
    // Простая версия
    for (int i = 0; i < 10; i++) {
        printf("fib(%d) = %d\n", i, fibonacci(i));
    }
    
    printf("\n=== Дерево вызовов для fib(4) ===\n");
    fibonacci_debug(4, 0);

    return EXIT_SUCCESS;
}

```

```

=== Fibonacci с двойной рекурсией ===
fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34

=== Дерево вызовов для fib(4) ===
fib(4)
  fib(3)
    fib(2)
      fib(1)
      return 1
      fib(0)
      return 0
    return 1 + 0 = 1
    fib(1)
    return 1
  return 1 + 1 = 2
  fib(2)
    fib(1)
    return 1
    fib(0)
    return 0
  return 1 + 0 = 1
return 2 + 1 = 3

```
