

```
use chrono::{DateTime, Local, Duration, TimeDelta};

struct TimeInterval {
    start: DateTime<Local>,
    end: DateTime<Local>,
}

impl TimeInterval {
    fn new(start: DateTime<Local>, end: DateTime<Local>) -> Self {
        Self { start, end }
    }
    
    fn duration(&self) -> Duration {
        self.end - self.start
    }
    
    fn contains(&self, point: DateTime<Local>) -> bool {
        point >= self.start && point <= self.end
    }
    
    fn overlap(&self, other: &TimeInterval) -> bool {
        self.start <= other.end && self.end >= other.start
    }
}
```
