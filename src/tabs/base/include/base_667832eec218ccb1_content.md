


<pre><code class="language-rust">
use std::mem;
fn main(){

   // mem::swap Меняет местами значения в двух изменяемых местах, не деинициализируя ни одно из них.
    let mut x = 5;
    let mut y = 42;

    mem::swap(&mut x, &mut y);

    assert_eq!(42, x);
    assert_eq!(5, y);

    //------------------------------------
    let mut a_1 = A{data:"a_1".to_string()};
    let mut a_2 = A{data:"a_2".to_string()};
    mem::swap(&mut a_1, &mut a_2);
    assert_eq!(a_1.data,"a_2".to_string());
    assert_eq!(a_2.data,"a_1".to_string());

   // mem::take Если вы хотите заменить значение по умолчанию или фиктивное значение
    let mut v: Vec<i32> = vec![1, 2];

    let old_v = mem::take(&mut v);
    assert_eq!(vec![1, 2], old_v);
    assert!(v.is_empty());

    //------------------------------------
    let mut a = A{data:"data".to_string()};
    let old_a = mem::take(&mut a);
    assert_eq!("data".to_string(), old_a.data);
    assert_eq!("Hello".to_string(), a.data);

   // mem::replace Если вы хотите поменять местами переданное значение, вернув старое значение

    let mut dest: Vec<i32> = vec![1, 2];

    let src = mem::replace(&mut dest, vec![3, 4, 5]);
    assert_eq!(vec![1, 2], src);
    assert_eq!(vec![3, 4, 5], dest);
}

struct A{
    data:String
}

impl std::default::Default for A{
    fn default() -> A{
        A{data:"Hello".to_string()}
    }
}
</code></pre>
