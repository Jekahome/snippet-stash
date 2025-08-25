

<pre><code class="language-rust">
let x = 5;
let i = if x == 5 {55} else if x == 6 {66} else { 0 };
assert_eq!(i,55);

if x == 5 {
} else if x == 6 {
} else {
}

</code></pre>

if без else всегда возвращает () в качестве значения
Его значением является значение последнего выражения из выбранной ветви

