


<pre><code class="language-rust">
macro_rules! test_words {
    (
        $(  // begin a repetition ($)
            // 
            // our tests will use this format:
            // 
            //    test_name : input -> expected_output
            // 
            $test_name:ident : $in:literal -> $expected:expr
        )+  // end repetition: at least 1 test is required (+)
    ) => {
        $(  // begin repetition. All code in this block will repeat
            // for every complete match found by the matcher (above).

            #[test]
            fn $test_name() {
                // run the `words` function with the provided input ($in)
                let actual = words($in);
                // make the assertion
                assert_eq!($expected, actual);
            }

        )+  // end repetition
    };
}
fn main(){
 test_words![
    ignores_period: "Hello friend."   -> vec!["Hello", "friend"]
    ignores_comma: "Goodbye, friend." -> vec!["Goodbye", "friend"]
    ignores_semicolon: "end; sort of" -> vec!["end", "sort", "of"]
    ignores_question_mark: "why?"     -> vec!["why"]
    separates_dashes: "extra-fun"     -> vec!["extra", "fun"]

    separates_by_comma_without_space:
      "Goodbye,friend." -> vec!["Goodbye", "friend"]

    apostrophe_is_one_word:
      "let's write macros" -> vec!["let's", "write", "macros"]
 ];
}
</code></pre>
