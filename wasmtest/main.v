// WASM COMPILE:
// apt install lld
// v -os wasm32 main.v -o main.wasm
// 
// JS COMPILE
// v -b js_browser main.v
fn main() {
  
}

fn do_something(mydata string) {

    println("Uploaded:")
    println(mydata)

   line_broke := mydata.split("\n")

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
