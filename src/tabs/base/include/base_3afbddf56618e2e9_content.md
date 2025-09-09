


Реализация Fn функции с возможностью использовать разные типы

```rust
use std::thread;
use std::time::Duration;
use std::collections::HashMap;
// Примечание:Если то, что мы хотим сделать, не требует захвата значения из среды, мы можем использовать функцию, а не закрытие, где нам нужно что-то, что реализует Fn черту
 
struct Cacher<N,M>{
    calculation:Box<Fn(N)->M>,
    map:HashMap<u32, u32>
}

impl Cacher<u32,u32>{
    fn new<T:'static + Fn(u32) -> u32>(calculation: T) -> Cacher<u32,u32> {
        Cacher {
            calculation:Box::new(calculation),
            map:HashMap::new()
        }
    }
    fn value(&mut self, arg: u32) -> u32 {
        if self.map.contains_key(&arg){
            *self.map.get(&arg).unwrap()
        }else{
            let v = (self.calculation)(arg);
            self.map.insert(arg,v);
            v
        }
    }
}
fn simulated_expensive_calculation(intensity: u32) -> u32 {
    println!("calculating slowly...");
    thread::sleep(Duration::from_secs(2));
    intensity
}

fn main() {
    let intensity: u32 = 2;
    let random_number: u32 = 4;
/*
// №1 Вариант оптимизации с ф-цией
// Решает проблему первого if блока, ненужно вызывая функцию дважды.
// К сожалению, мы теперь вызываем эту функцию и ожидаем результата во всех случаях, включая внутренний if блок, который вообще не использует значение результата.
    let expensive_result = simulated_expensive_calculation(intensity);

// №2 Вариант с замыканием
// Решает проблему лишнего вызова
// Определить замыкание и сохраним его в переменной.
// Отработает вычисление только по требованию.
// Теперь дорогостоящий расчет вызывается только в одном месте, и мы выполняем этот код только там, где нам нужны результаты.
// К сожалению, мы вернули проблему первого вариант с вызовом замыкания дважды в первом if блоке
// Мы можем исправить через присвоение результата замыкание в локальную переменную, но этот метод может привести к лишнему коду
// Мы можем создать структуру, которая будет удерживать замыкание и результирующее значение вызова закрытия.
    let expensive_closure = |num:u32| {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    };
*/
// №3 Вариант со структурой удерживающей замыкание и результирующее значение вызова его
// Ленивая работа (pattern as memoization or lazy evaluation).
// Строка будет выполнять закрытие только в том случае, если нам понадобится результирующее значение, и оно будет кэшировать полученное значение
// Мы можем вызвать value метод столько раз, сколько хотим, или вообще не называть его, а дорогостоящий расчет будет выполняться максимум один раз.
    let mut lazy_evaluation_result = Cacher::new(|num| {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    });

    if intensity < 25 {
        println!(
            "Today, do {} pushups!",
            /*expensive_result*/
            /*expensive_closure(intensity)*/
            lazy_evaluation_result.value(intensity)
        );
        println!(
            "Next, do {} situps!",
            /*expensive_result*/
            /*expensive_closure(intensity)*/
            lazy_evaluation_result.value(intensity)
        );
    } else {
        if random_number == 3 {
// тут проблема при Вариант №1 так как мы неиспользуем результат этой ф-ции то зачем ее было вызывать ?
            println!("Take a break today! Remember to stay hydrated!");
        } else {
            println!(
                "Today, run for {} minutes!",
                /*expensive_result*/
                /*expensive_closure(intensity)*/
                lazy_evaluation_result.value(intensity)
            );
        }
    }
}
```
