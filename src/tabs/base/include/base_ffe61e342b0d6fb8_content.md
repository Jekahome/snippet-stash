


<pre><code class="language-rust">
// Для функций, которые необходимо взять набор объектов, срезы обычно являются хорошим выбором:

fn work_on_bytes(slice: &[u8]) {}

// Поскольку Vec<T> и массивы [T; N] реализовать Deref<Target=[T]> , их можно легко принудить к фрагменту:

let vec = Vec::new();
work_on_bytes(&vec);

let arr = [0; 10];
work_on_bytes(&arr);

let slice = &[1,2,3];
work_on_bytes(slice); // Note lack of &, since it doesn't need coercing

// Однако вместо того, чтобы явно требовать срез, можно сделать функцию для принятия любого типа, который может использоваться как срез:

fn work_on_bytes<T: AsRef<[u8]>>(input: T) {
    let slice = input.as_ref();
}
// В этом примере функция work_on_bytes примет любой тип T который реализует as_ref() , который возвращает ссылку на [u8] .

work_on_bytes(vec);
work_on_bytes(arr);
work_on_bytes(slice);
work_on_bytes("strings work too!");
</code></pre>
