
Выравнивание

 `^` выравнивание по центру,

 `<` выравнивание слева 

 `>` выравнивание справа

<pre><code class="language-rust">
fn main(){
  let title = "TODAY'S NEWS";
  // заполнитель - для выравнивания по центру с минимальной длиной 30 символов
  println!("{:-^30}", title);// ---------TODAY'S NEWS---------
  println!("{:-<30}", title);// TODAY'S NEWS------------------
  println!("{title:->30}",);//  ------------------TODAY'S NEWS
}
</code></pre>

