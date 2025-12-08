

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

typedef struct Node Node;

struct Node {
    int data;
    struct Node *next;
};

void add_node(struct Node **head, int value) {
    struct Node *new_node = malloc(sizeof(struct Node));
    new_node->data = value;
    new_node->next = *head;  // Используем двойной указатель
    *head = new_node;
}

int main(void) {
    struct Node *list = NULL;
    
    add_node(&list, 10);  // Передаем адрес указателя head
    add_node(&list, 20);
    add_node(&list, 30);
    
    // Обход списка
    struct Node *current = list;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\n");
    
    return EXIT_SUCCESS;
}

```
