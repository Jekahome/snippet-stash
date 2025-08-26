


<pre><code class="language-rust">
#[derive(Debug)]
struct A{
    pos:Option<i32>
}

impl A{
    fn get_shared(&mut self)->Option<i32>{ // просто сработает Copy, отдаем по значению
        self.pos
    }
    fn get_muted(&mut self)->&mut Option<i32>{// возвращаем изменяемую ссылку
        &mut self.pos
    }
    fn set_pos(&mut self){
        if let Some(ref mut pos) = self.get_shared(){
            *pos = 2; // ❌  тут локальные данные 
        }
        assert_eq!(Some(1),self.pos);// ничего не поменялось, мы просто изменили данные локальные данные но self не поменялся
        if let Some(ref mut pos) = self.get_muted(){
            *pos = 2;
        }
        assert_eq!(Some(2),self.pos); // да изменили состояние
    }
}

fn main() {
    let mut a = A{pos:Some(1)};
    a.set_pos();
}
</code></pre>
