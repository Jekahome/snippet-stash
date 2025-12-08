

static → функция видна только в этом translation unit → не конфликтует при линковке.

```

static size_t stack_capacity(const Stack* s) {
    return s->capacity;
}

```


