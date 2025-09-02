

Определен тип `RefWithFlag<'a,T>`, в котором хранятся значения типа &'a T и bool, упакованные в кортеж (&'a T,bool) , и тем не менее он занимает всего **одно машинное слово, а не два**!
<pre><code class="language-rust">
mod ref_with_flag {
    use std::marker::PhantomData;
    use std::mem::align_of;
    /// `&T` и `bool`, упакованные в одно слово.
    /// Тип `T` должен быть выровнен хотя бы на границу двух байтов.
    ///
    /// Если вы относитесь к числу программистов, которые и хотели бы
    /// заимствовать младший бит указателя, да не знали как, то теперь можете
    /// сделать это безопасно!
     /// ("Но так совсем не интересно...")
    pub struct RefWithFlag<'a, T: 'a> {
         ptr_and_bit: usize,
         behaves_like: PhantomData<&'a T> // не занимает места
    }
    
    impl<'a, T: 'a> RefWithFlag<'a, T> {
        pub fn new(ptr: &'a T, flag: bool) -> RefWithFlag<T> {
            assert!(align_of::<T>() % 2 == 0);
            RefWithFlag {
                ptr_and_bit: ptr as *const T as usize | flag as usize,
                behaves_like: PhantomData
            }
        }
        pub fn get_ref(&self) -> &'a T {
            unsafe {
                let ptr = (self.ptr_and_bit & !1) as *const T;
                &*ptr
            }
        }
        pub fn get_flag(&self) -> bool {
                self.ptr_and_bit & 1 != 0
        }
    }
}

use ref_with_flag::RefWithFlag;
fn main(){
    let vec = vec![10, 20, 30];
    let flagged = RefWithFlag::new(&vec, true);
    assert_eq!(flagged.get_ref()[1], 20);
    assert_eq!(flagged.get_flag(), true);
}
</code></pre>
