

Например, попытка обновить элемент через его владельца эквивалентна созданию эфемерной изменяемой ссылки и последующему обновлению элемента через эту ссылку. Если другая ссылка уже существует, эта воображаемая вторая изменяемая ссылка не может быть создана:
<pre><code class="language-rust">
fn main(){
 let mut item = Item { contents: 42 };
 let r = &item;
 item.contents = 0;
 // ^^^ Changing the item is roughly equivalent to:
 //   (&mut item).contents = 0;
 println!("reference to item is {:?}", r);
}
</code></pre>

---  
Наличие какой-либо активной ссылки не позволяет владельцу предмета перемещать или удаление элемента, именно потому, что это означало бы, что ссылка теперь ссылается на недействительный элемент:
<pre><code class="language-rust">
fn main(){
 let item = Item { contents: 42 };
 let r = &item;
 let new_item = item; // move
 println!("reference to item is {:?}", r);
}
</code></pre>
