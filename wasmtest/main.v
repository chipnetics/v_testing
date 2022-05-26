// WASM COMPILE:
// apt install lld
// v -os wasm32 main.v -o main.wasm
// 
// JS COMPILE
// v -b js_browser main.v

fn main() {
    println("hello")
}

fn do_something(mydata string) {
    
    println(mydata)
  
}

