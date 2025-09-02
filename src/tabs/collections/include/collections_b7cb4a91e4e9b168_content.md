


<pre><code class="language-rust">
fn main(){
//  Occupied(OccupiedEntry<'a, K, V>) существующая запись
// key() remove_entry() get_mut() get() insert() remove() into_mut()
let mut map: HashMap<&str, u32> = HashMap::new();
  map.entry("poneyland").or_insert_with(Default::default);

  if let Entry::Occupied(mut object_OccupiedEntry) = map.entry("poneyland"){

// OccupiedEntry.key()
      println!("Ключ {} занят",object_OccupiedEntry.key());

// OccupiedEntry.remove_entry() удаляет ключ с карты
      //object_OccupiedEntry.remove_entry();

 // OccupiedEntry.get() возвращает изменяемую ссылку на значение
      *object_OccupiedEntry.get_mut()+=10;

// OccupiedEntry.get() возвращает ссылку на значение
     println!("object_OccupiedEntry:{:?}",object_OccupiedEntry.get());

// OccupiedEntry.insert(value) Устанавливает значение записи и возвращает старое значение записи.
      let value = object_OccupiedEntry.insert(12);
      println!("value:{:?}",value);// value:10

// OccupiedEntry.remove() удаляет значение и возвращает его
      let value = object_OccupiedEntry.remove();
      println!("value:{:?}",value);// value:12
  }
  
  //OccupiedEntry.into_mut() преобразует в изменяемую ссылку на значение
  if let Entry::Occupied(object_OccupiedEntry) = map.entry("poneyland"){
      *object_OccupiedEntry.into_mut()+=10;
  }
}
</code></pre>
