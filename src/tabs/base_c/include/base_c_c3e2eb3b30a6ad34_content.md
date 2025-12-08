

```

#define LOG(msg) \
    printf("[%s:%d] %s\n", __FILE__, __LINE__, msg)

#define ASSERT(x) \
    if (!(x)) { printf("ASSERT FAIL: %s:%d\n", __FILE__, __LINE__); while(1); }

```
