


## 1. Принадлежность `(x ∈ A)` И Подмножество `(A ⊆ B)`

**Принадлежность** `(x ∈ A)` - элемент `x` принадлежит множеству `A`, если `x` находится внутри набора `A`.

```rust
use std::collections::HashSet;
fn main(){
    // let allowed: HashSet<_> = ["gmail.com", "yandex.ru"].into_iter().collect();
    let allowed = HashSet::from(["gmail.com", "yandex.ru"]);
    let domain = "gmail.com";

    if allowed.contains(domain) {
        println!("(domain ∈ allowed) - элемент domain принадлежит множеству allowed");
    }
    // Почему не массивы? Потому что в массиве → дубликаты возможны и алгоритм нахождения дольше
 
}
```

**Подмножество** `A ⊆ B` - множество `A` является подмножеством `B`, если каждый элемент `A` содержится в `B`.

Т.е. все элементы `A` входят в `B`. Это проверка “достаточности”.

```rust
use std::collections::HashSet;
fn main(){
    // Пользователь пытается выполнить действие, требующее набора прав:
    let required = HashSet::from(["read", "write"]);
    let user = HashSet::from(["read", "write", "delete"]);

    if user.is_superset(&required) {
        println!("(required ⊆ user)");// множество `required` является подмножеством `user`, т.е. все требования required содержатся в наборе user
    }
}
```

## 2. Операции над множествами

**Пересечение** `(A ∩ B)` - элементы, которые есть и в `A`, и в `B`. Нахождение общего.

```rust
use std::collections::HashSet;
fn main() -> std::io::Result<()> {
    
    let a: HashSet<_> = [1, 7, 3, 1, 3, 3].into_iter().collect();
    let b: HashSet<_> = [3, 4, 7].into_iter().collect();
    
    let intersection: HashSet<_> = a.intersection(&b).cloned().collect();
    
    for x in &intersection {
        println!("{}", x); // 7, 3
    }

    Ok(())
}
```

**Объединение** `(A ∪ B)` - элементы, которые есть либо в `A`, либо в `B` (дубликатов нет).

```rust
use std::collections::HashSet;
fn main() -> std::io::Result<()> {
    
    let a: HashSet<_> = [1, 7, 3, 1, 3, 3].into_iter().collect();
    let b: HashSet<_> = [3, 4, 7].into_iter().collect();
    
    let union: HashSet<_> = a.union(&b).cloned().collect();
 
    for x in &union {
        println!("{}", x); // 7, 3, 4, 1
    }

    Ok(())
}
```

**Разность** `(A \ B)` - элементы, которые есть в `A`, но НЕ в `B`.

```rust
use std::collections::HashSet;
fn main() -> std::io::Result<()> {
    
    let a: HashSet<_> = [1, 7, 3, 1, 3, 3].into_iter().collect();
    let b: HashSet<_> = [3, 4, 7].into_iter().collect();
    
    // `(A \ B)` - элементы, которые есть в `A`, но НЕ в `B`
    let diff: HashSet<_> = a.difference(&b).cloned().collect();
 
    for x in &diff {
        println!("{}", x); // 1
    }

    // `(B \ A)` - элементы, которые есть в `B`, но НЕ в `A`
    let diff: HashSet<_> = b.difference(&a).cloned().collect();
 
    for x in &diff {
        println!("{}", x); // 4
    }

    Ok(())
}
```

**Симметрическая разность** `(A △ B)` - элементы, которые есть либо только в `A`, либо только в `B`, но не в обоих.

Это объединение минус пересечение: `(A ∪ B) \ (A ∩ B)`

Например: какие настройки изменились между конфигурациями

```rust
use std::collections::HashSet;
fn main() -> std::io::Result<()> {
    
    let user_state_1 = HashSet::from(["read", "write", "check" ]);
    let user_state_2 = HashSet::from(["read", "write", "delete"]);
    
    let sym: HashSet<_> = user_state_1.symmetric_difference(&user_state_2).cloned().collect();
 
    for x in &sym {
        println!("{}", x); // delete, check
    }
    
    // Или
    let union: HashSet<_> = user_state_1.union(&user_state_2).cloned().collect();
    let intersection: HashSet<_> = user_state_1.intersection(&user_state_2).cloned().collect();
    let sym: HashSet<_> = union.difference(&intersection).cloned().collect();
    
    for x in &sym {
        println!("{}", x); // delete, check
    }
 
    Ok(())
}
```

## 3. Декартово произведение множеств

(ключ к JOIN, графам, отношениям, БД, моделям состояний)

`A × B` - взять каждый элемент `A` и скрестить со всеми `B`

```ini
A = {1, 2}
B = {x, y}

A × B = {(1, x), (1, y), (2, x), (2, y)}
```

```rust
fn main() -> std::io::Result<()> {
    
    let A = ["1","2"];
    let B = ["x","y"];
    
    for a in &A {
        for b in &B {
            print!("({a}, {b}) ");// (1, x) (1, y) (2, x) (2, y)
        }
    }
 
    Ok(())
}
```

