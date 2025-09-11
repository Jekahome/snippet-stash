


```
pub mod second{
    // Обратите внимание, что этот инвариант реализуется просто за счет невозможности вызова кода, 
    // который бы выполнял перемещение закрепленного значения. Это так, поскольку единственный способ получить 
    // доступ к этому закрепленному значению — через закрепление Pin<&mut T>> , что, в свою очередь, ограничивает наш доступ.

    use std::marker::PhantomPinned;
    use std::pin::Pin;
    use std::pin::pin;
    
    #[derive(Default)]
    pub struct AddrTracker {
        pub prev_addr: Option<usize>,
        // удаляем автоматически реализуемую `Unpin`, которая помечает этот тип как имеющий некоторые 
        // адресно-зависимое состояние. Это важно для ожидаемого закрепления 
        // гарантирует работу и более подробно обсуждается ниже.
        _pin: PhantomPinned,
    }
    
    impl AddrTracker {
        fn check_for_move(self: Pin<&mut Self>) {
            let current_addr = &*self as *const Self as usize;
            println!("current_addr={}",current_addr);
            match self.prev_addr {
                None => {
                    
                    // SAFETY: we do not move out of self
                    let self_data_mut = unsafe { self.get_unchecked_mut() };
                    
                    self_data_mut.prev_addr = Some(current_addr);
  
                },
                Some(prev_addr) => assert_eq!(prev_addr, current_addr),
            }
        }
    }
    pub fn test(){
        // 1. Создайте значение, еще не в адресно-зависимом состоянии.
        let tracker = AddrTracker::default();
       
        // 2. Закрепите Pin значение, поместив его за указателем закрепления pinning, таким образом поместив 
        // его в адресно-зависимое состояние
        let mut ptr_to_pinned_tracker: Pin<&mut AddrTracker> = pin!(tracker);
        assert_eq!(None,ptr_to_pinned_tracker.as_ref().prev_addr);
        ptr_to_pinned_tracker.as_mut().check_for_move();
        
        // Попытка получить доступ к трекеру или передать ptr_to_pinned_tracker всему, что требует 
        // изменяемый доступ к незакрепленной версии больше не будет компилироваться
        
        // 3.Теперь мы можем предположить, что значение трекера никогда не будет перемещено, поэтому 
        // здесь никогда не будет паники!
        ptr_to_pinned_tracker.as_mut().check_for_move();        
    }
}
```
