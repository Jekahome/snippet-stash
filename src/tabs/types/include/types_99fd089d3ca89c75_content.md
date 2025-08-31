

Trait Objects это ссылка на некоторый элемент, который реализует определенный признак. Он построен из простого указателя на элемент вместе с внутренним указателем на тип `vtable`, что дает размер 16 байт (на 64-битной платформе)
Виртуальная таблица для реализации типа трейта содержит указатели функций для каждой реализации метода, что позволяет выполнять динамическую диспетчеризацию во время выполнения 
<pre><code class="language-rust">
trait Calculate {
    fn add(&self, l: u64, r: u64) -> u64;
    fn mul(&self, l: u64, r: u64) -> u64;
    fn check(&self, l: u64) -> u64;
}

struct Modulo(pub u64);

impl Calculate for Modulo {
    fn add(&self, l: u64, r: u64) -> u64 {
        (l + r) % self.0
    }
    fn mul(&self, l: u64, r: u64) -> u64 {
        (l * r) % self.0
    }
    fn check(&self, l: u64) -> u64 {
        l
    }
}
impl Drop for Modulo {
    fn drop(&mut self) {
        println!("Dropping Modulo with value: {}", self.0);
    }
}
fn main() {
    let mod3 = Modulo(3);
    let tobj: &dyn Calculate = &mod3;
    unsafe {
        // Преобразуем объект типа trait в сырые указатели на данные и vtable
        let (data_ptr, vtable_ptr): (*const Modulo, *const usize) = std::mem::transmute(tobj);
        println!("Data pointer: {:p}", data_ptr);
        println!("VTable pointer: {:p}", vtable_ptr);

        // Преобразуем vtable_ptr в указатель на массив указателей функций
        let vtable_ptr = vtable_ptr as *const *const ();

        // Структура vtable зависит от компилятора и платформы, но обычно она включает следующие элементы:
        // Указатель на type_id или type_info: Этот указатель используется для хранения информации о типе
        // Указатель на деструктор
        // Указатели на методы trait

        println!("VTable contents for &dyn Calculate:");
        for i in 0..20 {
            let func_ptr = *vtable_ptr.offset(i as isize);
            println!("vtable[{}]: {:p}", i, func_ptr);
        }

        // Получаем указатели на функции add и mul из vtable
        // Обычно у vtable сначала идет информация о типе, затем — указатель на деструктор, а потом — указатели на функции.
        // Порядок методов в vtable совпадает с порядком их объявления в trait. 
        // Получаем указатель на деструктор из vtable
        let drop_fn = *vtable_ptr.offset(0);// в нашем случае указатель на ф-цию Drop на 0 позиции
        let add_fn = *vtable_ptr.offset(3);// указатель на ф-цию add
        let mul_fn = *vtable_ptr.offset(4);// указатель на ф-цию mul
        let check_fn = *vtable_ptr.offset(5);// указатель на ф-цию check

        println!("Destructor pointer: {:p}", drop_fn);// 0x558577c77990
        println!("Add function pointer: {:p}", add_fn);// 0x558577c77d00  Разница 0x370 (880 в десятичной системе)
        println!("Mul function pointer: {:p}", mul_fn);// 0x558577c77d80 Разница 0x80 (128 в десятичной системе). выровнены с шагом 128 байт
        println!("Check function pointer: {:p}", check_fn);// 0x558577c77e00 Разница 0x80 (128 в десятичной системе). выровнены с шагом 128 байт

        // Преобразуем указатели в типы функций
        let add_fn: fn(&Modulo, u64, u64) -> u64 = std::mem::transmute(add_fn);
        let mul_fn: fn(&Modulo, u64, u64) -> u64 = std::mem::transmute(mul_fn);
        let check_fn: fn(&Modulo, u64) -> u64 = std::mem::transmute(check_fn);

        // Вызываем функции с использованием преобразованных указателей
        let add_result = add_fn(&*data_ptr, 2, 3);
        let mul_result = mul_fn(&*data_ptr, 2, 5);
        let check_result = check_fn(&*data_ptr, 11);

        println!("Result of add: {}", add_result);
        assert_eq!(add_result, 2);
        println!("Result of mul: {}", mul_result);
        assert_eq!(mul_result, 1);
        println!("Result of check: {}", check_result);
        assert_eq!(check_result, 11);

        let drop_fn: fn(*const Modulo) = std::mem::transmute(drop_fn); // Преобразуем указатель в тип функции деструктора
        drop_fn(data_ptr);// Вызов деструктора вручную
    }
}
</code></pre>
