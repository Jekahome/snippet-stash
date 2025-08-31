


<pre><code class="language-rust">
use std::fmt::Write as fmt_Write;
use std::io::Write;
macro_rules! write_html {
    ($w:expr, ) => (());// распознаватель 1

    ($w:expr, $e:tt) => (write!($w, "{}", $e));// распознаватель 2

    ($w:expr, $tag:ident [ $($inner:tt)* ] $($rest:tt)* ) => {{
        write!($w, "\n<{}>", stringify!($tag));
        write_html!($w, $($inner)*); // рекурсивно вложенные [...] обработать
        write!($w, "</{}>\n", stringify!($tag));
        write_html!($w, $($rest)*);// следующий элемент после [...]
    }};
}

fn main(){
  let mut buf = String::new();
  //write_html!(&mut buf,"Hello");// распознаватель 2
  write_html!(&mut buf,
        html[
            head[title["Macros guide"]]
            body[h1["Macros are the best!"]]
        ] www[http["url"]]);
  println!("{buf}");
}
</code></pre>
