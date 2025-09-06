


<pre><code class="language-rust">
use chrono::{DateTime, Utc};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct Event {
    name: String,
    #[serde(with = "chrono::serde::ts_seconds")]
    timestamp: DateTime<Utc>,
}
fn main(){
    // JSON сериализация
    let event = Event {
        name: "Meeting".to_string(),
        timestamp: Utc::now(),
    };

    let json = serde_json::to_string(&event).unwrap();
    println!("JSON: {}", json);

    // Десериализация
    let decoded: Event = serde_json::from_str(&json).unwrap();
    println!("Decoded: {}", decoded.timestamp);
}
</code></pre>
