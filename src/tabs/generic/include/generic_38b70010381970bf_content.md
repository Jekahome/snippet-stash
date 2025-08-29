


<pre><code class="language-rust">
pub fn interpolation_search(x: usize, arr:&[usize]) -> Option<usize> {
    if arr.len() == 0 {
        return None;
    }
    if arr[0] == x{
       return Some(0); 
    }  
    let mut low = 0usize;
    let mut high = arr.len() - 1;
    let mut pos = 0usize; 
  
    while  low <= high && x >= arr[low] && x <= arr[high] {
        pos = low + (((high-low) / (arr[high]-arr[low]))*(x - arr[low]))  ;
         
        if arr[pos]==x {
            return Some(pos);
        }else if arr[pos]<x {
            low=pos+1;
        }else {
            high=low-1;
        }
    }
    None
}
</code></pre>

---

 
<details>
<summary>Пример для обобщения</summary>
<pre><code class="language-rust">
use core::fmt::Debug;
use core::ops::Div;
use core::ops::Mul;
use core::ops::Sub;
 
pub fn interpolation_search<T,R>(x: T, arr:&[T]) -> Option<R> 
    where T: Clone + Copy + PartialOrd + Mul + Div + Sub + TryInto<usize> + Debug
,<T as Div>::Output: PartialOrd<T>
,<T as Mul>::Output: PartialOrd<T>
,<T as Sub>::Output: PartialOrd<T>,  usize: From<<T as Sub>::Output>,
R:TryInto<usize> + std::convert::From<usize>
{
        if arr.len() == 0 {
            return None;
        }
        if arr[0] == x{
           return Some(0usize.try_into().unwrap()); 
        }  
        let mut low = 0usize;
        let mut high = arr.len() - 1;
        let mut pos = 0usize; 
      
        while  low <= high && x >= arr[low] && x <= arr[high] {
            let t1:usize = (arr[high]-arr[low]).try_into().unwrap();
            let t2:usize = (x - arr[low]).try_into().unwrap();
            pos = low + (((high-low) / t1 )*( t2 ));
             
            if arr[pos]==x {
                return Some(pos.try_into().unwrap());
            }else if arr[pos]<x {
                low=pos+1;
            }else {
                high=low-1;
            }
        }
        None
    }

fn main() { 
    let mut arr:Vec<i32> = vec![1,2,4,5,6,7,8,90/*,150,151,152,153,154,155,156,157,158,159,160,161*/];
    //arr.sort();
    //println!("{:?}",arr);
    let search_value = arr[0];
    if let Some(index) = interpolation_search::<i32,usize>(search_value,&arr){
        println!("result: index={} value={}",index,arr[index]);
    }else{
        println!("notfound");
    }
}

</code></pre>

</details>
