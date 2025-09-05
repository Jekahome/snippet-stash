

Исполнители несут ответственность за повторное вызов poll задачи до Ready ее возвращения
Например, CurrentThread исполнитель блокирует текущий поток и перебирает все нерешенные задачи, вызывая опрос на них.
ThreadPool распределяет задачи по пулу потоков. Это также исполнитель по умолчанию, используемый средой выполнения  runtime
<pre><code class="language-rust">
extern crate futures;
extern crate rand;
extern crate tokio;
use rand::{thread_rng, Rng};
use std::collections::VecDeque;

// Исполнитель
pub struct SpinExecutor {
    tasks: VecDeque<Box<Future<Item = String, Error = () >>>,
}
impl SpinExecutor {
    pub fn spawn<T>(&mut self, task: T)
    where T: Future<Item = String, Error = ()> + 'static{
        self.tasks.push_back(Box::new(task));
    }
    pub fn run(&mut self) {
        while let Some(mut task) = self.tasks.pop_front() {
             match task.poll().unwrap()  {
                Async::Ready(_) => {}
                Async::NotReady => { self.tasks.push_back(task);}
            }
        /*
            match  task.poll(){
                Ok(value) => {
                    match value {
                        Async::Ready(_) => {}
                       Async::NotReady => { self.tasks.push_back(task);}
                   }
               },
               Err(e) =>{ eprintln!(""Error {:?}"",e); }
           }
        */
    }
    // Исполнитель вращается в цикле занятости и пытается опросить все задания, даже если задача снова вернет NotReady.
    //В идеале для исполнителя может быть какой-то способ узнать, когда изменяется состояние «готовности» задачи, то есть когда вызов опроса вернется в режим готовности.
    }
}

// Улучшенный исполнитель
pub struct SpinExecutorNew {
    ready_tasks: VecDeque<Box<Future<Item = String, Error = ()>>>,// для готовых задач на опрос
    not_ready_tasks:VecDeque<Box<Future<Item = String, Error = ()>>>// для не готовых задач, вернувшие состояние Async::NotReady
}

impl SpinExecutorNew {
    pub fn spawn<T>(&mut self, task: T)
    where T: Future<Item = String, Error = ()> + 'static{
        self.ready_tasks.push_back(Box::new(task));
    }
    pub fn run(&mut self) {
        // Исполнитель вращается в цикле занятости и пытается опросить все задания, даже если задача снова вернет NotReady.
        //В идеале для исполнителя может быть какой-то способ узнать, когда изменяется состояние «готовности» задачи, то есть когда вызов опроса вернется в режим готовности.
        loop {
            while let Some(mut task) = self.ready_tasks.pop_front() {
                match task.poll().unwrap() {
                    Async::Ready(_) => {}
                    Async::NotReady => {
                        self.not_ready_tasks.push_back(task);
                    }
                }
            }
            if self.not_ready_tasks.is_empty() {
                return;
            }
            println!(""готовых задач нет, ждем немного"");
            // Положите поток спать, пока не будет работы
            self.sleep_until_tasks_are_ready();
            // После паузы перебросим задачи на проверку
            if self.ready_tasks.is_empty() {
                while let Some(mut task) = self.not_ready_tasks.pop_front() {
                    self.ready_tasks.push_back(task);
                }
            }
        }
    }
    fn sleep_until_tasks_are_ready(&mut self){
        std::thread::sleep(std::time::Duration::from_millis(10));
    }
}
</code></pre>
