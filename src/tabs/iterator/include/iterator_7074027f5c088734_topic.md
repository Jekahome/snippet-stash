


* for_each
* for_each_with
* try_for_each
* try_for_each_with
* count
* map  - map_op к каждому элементу этого итератора, создавая новый итератор
* map_with
* cloned - Создает итератор, который клонирует все его элементы.&T -> T.
* inspect -  для отладки, чтобы увидеть, что происходит на этапах итератора.
* update - Мутация каждого элемента этого итератора перед его уступкой
* filter - Фильтрует элементы итератора
* filter_map
* flat_map
* flatten - Адаптер, который сглаживает итерируемые Items в один большой итератор
* reduce
* reduce_with
* try_reduce
* try_reduce_with
* fold
* fold_with
* try_fold
* try_fold_with
* sum
* product - Умножает все элементы в итераторе
* min
* min_by
* min_by_key
* max
* max_by
* max_by_key
* chain  - Принимает два итератора и создает новый итератор для обоих.
* find_any - Ищет  элемент по предикату и возвращает его
* find_first
* find_last
* any
* all
* while_some
* collect
* unzip - Распаковывает элементы параллельного итератора в пару  контейнеров
* partition - Разделяет элементы параллельного итератора на пару  контейнеров
* partition_map
* intersperse  -  Перемещает клоны элемента между элементами этого итератора.
* opt_len

