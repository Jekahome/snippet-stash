

«Сдвиг вправо» (`п >> м`), где n и m - целые числа. Эта операция перемещает биты вправо и заполняет теперь пустые левые биты нулями. 
        Новое значение теперь можно интерпретировать как целое число. Этот метод используется для разделения знакового бита и мантиссы.

«И маска» (`н & м`). Эта операция используется как фильтр. Это позволяет вам выборочно выбирать, какие биты следует сохранить, регулируя m в соответствии с требованиями.

"Левый сдвиг" (`п << м`),  обычно равняется 1. Эта операция используется для созданиям значение для последующей маски AND. То есть мы будем динамически создавать фильтры, чтобы изолировать отдельные биты по мере выполнения программы.

<pre><code class="language-rust">
use std::mem;
const BIAS: i32 = 127;
const RADIX: f32 = 2.0;

fn main() {
    let n: f32 = 42.42;

    let (signbit, exponent, fraction) = deconstruct_f32(n);

    let (sign, exponent, mantissa) = decode_f32_parts(signbit, exponent, fraction);
    let reconstituted_n = f32_from_parts(sign, exponent, mantissa);

    // 42.42 -> [sign:0, exponent:32, mantissa:1.325625] -> 42.42
    println!("{} -> [sign:{}, exponent:{}, mantissa:{:?}] -> {}", 
        n, 
        signbit,
        exponent,
        mantissa, 
        reconstituted_n);
}

fn deconstruct_f32(n: f32) -> (u32, u32, u32) {
    let n_: u32 = unsafe { std::mem::transmute(n) };
    let sign = (n_ >> 31) & 1;
    
    let exponent = (n_ >> 23) & 0xff;
    
    let fraction = 0b00000000_01111111_11111111_11111111 & n_;
    (sign, exponent, fraction)
}

fn f32_from_parts(sign: f32, exponent: f32, mantissa: f32) -> f32 {
    sign * exponent * mantissa
}

fn decode_f32_parts(sign: u32, exponent: u32, fraction: u32) -> (f32, f32, f32) {
    let signed_1 = (-1.0_f32).powf(sign as f32);
    
    let exponent = (exponent as i32) - BIAS;
    let exponent = RADIX.powf(exponent as f32);
    
    let mut mantissa: f32 = 1.0;
    
    for i in 0..23_u32 {
        let one_at_bit_i = 1 << i;
        if (one_at_bit_i & fraction) != 0 {
            mantissa += 2_f32.powf((i as f32) - 23.0);
        }
    }
    (signed_1, exponent, mantissa)
}
</code></pre>
