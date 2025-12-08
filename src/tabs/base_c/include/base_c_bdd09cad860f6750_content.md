

Проверка корректности BST (все узлы левого поддерева меньше родителя и его правого поддерева)

```

Реализация: 
* вариант через проверку inorder
* вариант через проверку диапазона (Min/Max bounds)


**Min/Max bounds**

        7
       / \
      5   9

Каждый узел должен быть в правильном диапазоне. 
Родитель должен быть больше левого дочернего элемента, и меньше чем правый.

1. Проверка корня

root = 7
check: (-∞ ; +∞)
7 > -∞  OK
7 < +∞  OK

2. Проверка левого поддерева (Левый ребёнок всегда должен быть меньше корня.)

left = 5
check: (-∞ ; 7)
5 > -∞ OK
5 < 7  OK

3. Проверяем правое поддерево (Правый ребёнок должен быть больше корня)

right = 9
check: (7 ; +∞)
9 > 7  OK
9 < +∞ OK

```

```

static bool _bst_is_valid(const Node* node, int min, int max) {
    if (!node) return true;

    if (node->data <= min || node->data >= max)
        return false;

    return _bst_is_valid(node->left,  min, node->data) &&
           _bst_is_valid(node->right, node->data, max);
}

bool bst_is_valid(const Tree* t) {
    return _bst_is_valid(t->head, INT_MIN, INT_MAX);
}

```
