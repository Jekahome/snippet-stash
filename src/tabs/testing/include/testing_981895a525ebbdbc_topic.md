

Как тестировать **stdout** вывод

Прокинуть через TestImplWriter буффер  `Rc<RefCell<Vec<u8>>>`,
что дает возможно получить данные уже после move TestImplWriter в Service
