

```
#include <time.h>
#include <stdio.h>

int sum_1(int n){
    int c = 0;
    for(int i =0; i<n; i++){
        c = i + 1 - 5 + 4 + 1;
    }
    return c;
}
int sum_2(int n){
    int c = 0;
    for(int i =0; i<n; i++){
        c = i * 3 + 8;
    }
    return c;
}
int sum_3(int n){
    int c = 0;
    for(int i =0; i<n; i++){
        c = i + 100 - 50 - 50;
    }
    return c;
}
int main(void) { 
    int r_1 = sum_1(100);
    int r_2 = sum_2(100000);
    int r_3 = sum_3(10000000);
    printf("%d %d %d",r_1,r_2,r_3);
    return 0;
}
// gcc -std=c99 -pg clock.c -o my_program.out
// ./my_program.out
// gprof my_program.out gmon.out > analysis.txt
// cat analysis.txt
/*
Flat profile:

Each sample counts as 0.01 seconds.
  %   cumulative   self              self     total           
 time   seconds   seconds    calls  ms/call  ms/call  name    
100.00      0.03     0.03        1    30.00    30.00  sum_3
  0.00      0.03     0.00        1     0.00     0.00  sum_1
  0.00      0.03     0.00        1     0.00     0.00  sum_2

  ...
*/
```
