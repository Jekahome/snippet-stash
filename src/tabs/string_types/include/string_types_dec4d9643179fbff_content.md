

<pre><code class="language-rust">
use std::str::Chars;
fn foo(s:&str,n:i32) -> bool{
    let mut chars:Chars<'_> = s.chars();
    let (mut x, mut y,mut count_cmp) = (10,1,0);
    while let Some(c)=chars.next_back(){
            if y <= n {
                if (n%x)/y != c.to_digit(10).unwrap() as i32{
                    return false;
                }
                x=x*10;
                y=y*10;
                count_cmp+=1;
            }  
    }
    count_cmp == s.len() && y > n
}
fn main() {
 assert_eq!(true,foo("1",1));
 assert_eq!(false,foo("2",1));
 assert_eq!(true,foo("123",123));
} 
</code></pre>
