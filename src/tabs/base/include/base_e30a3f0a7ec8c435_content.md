

Атрибут используется для выдачи диагностического предупреждения must_use, когда значение не используется.
<pre><code class="language-rust">
#[must_use]
struct MustUse {
    // some fields
}

// Нарушает правило `unused_must_use`  
MustUse::new();
</code></pre>
