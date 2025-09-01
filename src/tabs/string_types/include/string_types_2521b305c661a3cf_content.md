


<pre><code class="language-rust">
fn main(){
    let word = "привет";
    let mut chars = word.chars();

    let mut string = String::from("");
    let mut v: Vec<char> = vec![];
    while let  Some(mut s) = chars.next(){
            print!("{}",s);
            s.make_ascii_uppercase();// по символу тоже возможно
            v.push(s);
            string.push(s);
    }
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let s:String = "Hello, world!".chars()
        .map(|x| match x { 
            '!' => '?', 
            'A'...'Z' => 'X', 
            'a'...'z' => 'x',
            _ => x}
        ).collect();
    println!("{}", s);// Xxxxx, xxxxx?
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let word = "привет";
    let mut char_indices = word.char_indices();

    let mut string = String::from("");
    let mut v: Vec<char> = vec![];
    while let  Some((indx,mut s)) = char_indices.next(){
        println!("indx={} s={}",indx,s);
        //indx=0 s=п
        //indx=2 s=р
        //indx=4 s=и
        //indx=6 s=в
        //indx=8 s=е
        //indx=10 s=т
        s.make_ascii_uppercase();// по символу тоже возможно
        v.push(s);
        string.push(s);
    }

    let mut v = word.chars().collect::<Vec<char>>();
    println!(" Vec = {:?}",v);//Vec = ['п', 'р', 'и', 'в', 'е', 'т']
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let word = "привет";
    let mut chars = word.chars();
    // let count = chars.count();

       // for s in &mut chars {    print!("{}", s);//  привет }
     // перемотать назад итератор перед использованием еще раз
    let mut string = String::from("");
    let mut v: Vec<char> = vec![];
    while let  Some(mut s) = chars.next(){
            print!("{}",s);
            s.make_ascii_uppercase();// по символу тоже возможно
            v.push(s);
            string.push(s);
    }
    string.make_ascii_uppercase();// тут всю строку
    println!("\nstring = {}",string);// привет
    println!(" Vec = {:?}",v); //Vec = ['п', 'р', 'и', 'в', 'е', 'т']

    let mut v = word.chars().collect::<Vec<char>>();
    println!(" Vec = {:?}",v);//Vec = ['п', 'р', 'и', 'в', 'е', 'т']
}
</code></pre>
