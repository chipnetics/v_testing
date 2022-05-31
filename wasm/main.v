// WASM COMPILE:
// apt install lld
// v -os wasm32 main.v -o main.wasm
//
// For testing: 
// chromium --allow-file-access-from-files
//
//import os
fn main() {

    //my_lines := os.read_lines("input.txt") or {panic(err)}
    //join_lines := my_lines.join_lines()
    //do_something(join_lines)
  
}

[wasm_export: 'main.wasm']
fn some_function() []int {
   
    test_string := "abcd \nefg"

	mut a_array := []int{}

	for elem in test_string {
		a_array << elem
	}

	return a_array
}

[wasm_export: 'main.wasm']
fn some_other_function() []int  {
   
    test_string := "abcd \nefg"

    mut a_array := []int{}

	for elem in test_string {
		a_array << elem
	}

    return a_array
}

[wasm_export: 'main.wasm']
fn some_pointer_function(mut a_array &int)  {
   
    test_string := "abcd \nefg"

	for idx,elem in test_string {
		a_array[idx] = elem
	}
}

[wasm_export: 'main.wasm']
fn some_other_pointer_function( input_array &int, mut res_array &int, length int)  {
   
   for i:= 0; i< length; i++{
        res_array[i] = unsafe{input_array[i]+1}
    }
}

[wasm_export: 'main.wasm']
fn do_something(mydata string) {

    println("Uploaded:")
    println(mydata)

   line_broke := mydata.split("\n")

   println("Number of Lines: $line_broke.len")

   mut data_arr := []Data{}

   for lines in line_broke
   {
       str_array := lines.split("\t")
       
       mut a_data := Data{}
       a_data.name = str_array[0]
       a_data.price = str_array[2].int()

       data_arr << a_data
   }

   for elem in data_arr {
       println("${elem.name}\t${elem.price*100}")
   }
}

struct Data
{
    mut:
        name string
        price int
}
