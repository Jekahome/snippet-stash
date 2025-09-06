


<pre><code class="language-rust">
use chrono::{DateTime, Local, Duration, TimeDelta};
use std::collections::BinaryHeap;

struct ScheduledTask {
    execute_at: DateTime<Local>,
    task: Box<dyn FnOnce()>,
}
impl PartialOrd for ScheduledTask {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(other.execute_at.cmp(&self.execute_at)) // Для min-heap
    }
}
impl PartialEq for ScheduledTask {
    fn eq(&self, other: &Self) -> bool {
        self.execute_at == other.execute_at
    }
}
struct Scheduler {
    tasks: BinaryHeap<ScheduledTask>,
}
impl Scheduler {
    fn new() -> Self {
        Self { tasks: BinaryHeap::new() }
    }
    fn schedule<F>(&mut self, delay: Duration, task: F) where F: FnOnce() + 'static, {
        let execute_at = Local::now() + delay;
        self.tasks.push(ScheduledTask {
            execute_at,
            task: Box::new(task),
        });
    }
    fn run_pending(&mut self) {
        let now = Local::now();
        while let Some(task) = self.tasks.peek() {
            if task.execute_at <= now {
                let task = self.tasks.pop().unwrap();
                (task.task)();
            } else {
                break;
            }
        }
    }
}
</code></pre>
