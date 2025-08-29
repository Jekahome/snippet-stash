


<pre><code class="language-rust">
// Dynamic dispatch.
mod dynamic_dispatch {
    use super::*;
    mod receives {
        use super::*;
        pub fn recieve_error_by_ref(error: &dyn Error) {
            println!("Handling Error Debug: {:?}", error);
            println!("Handling Error Display: {}", error);
        }
        pub fn example_1() {
            let error_one = ErrorOne;
            recieve_error_by_ref(&error_one);
            let error_two = ErrorTwo;
            recieve_error_by_ref(&error_two);
        }
        pub fn receive_error_by_box(error: Box<dyn Error>) {
            println!("Handling Error Debug: {:?}", error);
            println!("Handling Error Display: {}", error);
        }
        pub fn example_2() {
            let error_one = ErrorOne;
            let it = Box::new(error_one);
            receive_error_by_box(it);
            let error_two = ErrorTwo;
            receive_error_by_box(Box::new(error_two));
        }
        pub fn receive_slice_of_errors(arg: &[&dyn Error]) {
            for error in arg {
                println!("Handling Error Debug: {:?}", error);
                println!("Handling Error Display: {}", error);
            }
        }
    }
    mod returns {
        use super::*;
        pub fn return_one_of_two_errors() -> Box<dyn Error> {
            if random_bool() {
                Box::new(ErrorOne)
            } else {
                Box::new(ErrorTwo)
            }
        }
        pub fn return_one_of_two_errors_with_arc() -> std::sync::Arc<dyn Error> {
            if random_bool() {
                std::sync::Arc::new(ErrorOne)
            } else {
                std::sync::Arc::new(ErrorTwo)
            }
        }
        pub fn return_slice_of_errors() -> Vec<&'static dyn Error> {
            let mut errors: Vec<&dyn Error> = vec![];
            if random_bool() {
                errors.push(&(ErrorOne));
            } else {
                errors.push(&(ErrorTwo));
            }
            errors
        }
        pub fn mut_vec_containing_different_types_of_errors(mut_vec: &mut Vec<&dyn Error>) {
            mut_vec.push(&ErrorOne);
            mut_vec.push(&ErrorTwo);
        }
    }
}
</code></pre>
