

Эти трейты были изобретены для решения очень специфической проблемы поиска String ключей в HashSets, HashMaps, BTreeSets и BTreeMaps с использованием &str значений.

Мы можем рассматривать `Borrow<T>` и `BorrowMut<T>` как более строгие версии `AsRef<T>`и `AsMut<T>`, где возвращаемая ссылка &T эквивалентна Eq, Hash и Ord означает Self. Это легче объяснить на примере с комментариями:

Хорошо знать об этих трейтах и ​​понимать, почему они существуют, так как это помогает демистифицировать некоторые методы в HashSet, HashMap, BTreeSet, и BTreeMap, но очень редко нам когда-нибудь понадобится применять эти трейты для любого из наших типов, потому что очень редко мы когда-нибудь понадобится создать пару типов, где один является «заимствованной» версией другого. Если у нас есть какие-то, T то &T работа будет выполнена в 99,99% случаев, и `T: Borrow<T>` она уже реализована для всех T из-за общего внедрения одеяла, поэтому нам не нужно внедрять его вручную, и нам не нужно создавать что-то U такое, что `T: Borrow<U>`

```rust
use std::borrow::Borrow;
use std::hash::Hasher;
use std::collections::hash_map::DefaultHasher;
use std::hash::Hash;

fn get_hash<T: Hash>(t: T) -> u64 {
    let mut hasher = DefaultHasher::new();
    t.hash(&mut hasher);
    hasher.finish()
}

fn asref_example<Owned, Ref>(owned1: Owned, owned2: Owned)
where
    Owned: Eq + Ord + Hash + AsRef<Ref>,
    Ref: Eq + Ord + Hash
{
    let ref1: &Ref = owned1.as_ref();
    let ref2: &Ref = owned2.as_ref();
    
    // refs aren't required to be equal if owned types are equal
    assert_eq!(owned1 == owned2, ref1 == ref2); // ❌
    
    let owned1_hash = get_hash(&owned1);
    let owned2_hash = get_hash(&owned2);
    let ref1_hash = get_hash(&ref1);
    let ref2_hash = get_hash(&ref2);
    
    // ref hashes aren't required to be equal if owned type hashes are equal
    assert_eq!(owned1_hash == owned2_hash, ref1_hash == ref2_hash); // ❌
    
    // ref comparisons aren't required to match owned type comparisons
    assert_eq!(owned1.cmp(&owned2), ref1.cmp(&ref2)); // ❌
}

fn borrow_example<Owned, Borrowed>(owned1: Owned, owned2: Owned)
where
    Owned: Eq + Ord + Hash + Borrow<Borrowed>,
    Borrowed: Eq + Ord + Hash
{
    let borrow1: &Borrowed = owned1.borrow();
    let borrow2: &Borrowed = owned2.borrow();
    
    // borrows are required to be equal if owned types are equal
    assert_eq!(owned1 == owned2, borrow1 == borrow2); // ✅
    
    let owned1_hash = get_hash(&owned1);
    let owned2_hash = get_hash(&owned2);
    let borrow1_hash = get_hash(&borrow1);
    let borrow2_hash = get_hash(&borrow2);
    
    // borrow hashes are required to be equal if owned type hashes are equal
    assert_eq!(owned1_hash == owned2_hash, borrow1_hash == borrow2_hash); // ✅
    
    // borrow comparisons are required to match owned type comparisons
    assert_eq!(owned1.cmp(&owned2), borrow1.cmp(&borrow2)); // ✅
}
fn main(){}
```
