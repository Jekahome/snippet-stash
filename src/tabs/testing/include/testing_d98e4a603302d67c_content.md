

При организации нескольких файлов в папке tests есть возможность создать общий файл с функциями который не должен компилироваться как отдельный крейт теста.
Для этой цели используют папку и файл mod.rs

Файл: tests/common/mod.rs:
<pre><code class="language-rust">
pub fn setup() {
    // setup code specific to your library's tests would go here
}
</code></pre>

Файл: tests/integration_test.rs:
<pre><code class="language-rust">
use adder;
mod common;
#[test]
fn it_adds_two() {
    common::setup();
    assert_eq!(4, adder::add_two(2));
}
</code></pre>
