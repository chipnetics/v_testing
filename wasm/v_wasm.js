const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
    let response = undefined;
  
    if (!importObject) {
      importObject = {
        env: {
          abort: () => console.log("Abort!")
        }
      };
    }
  
    // Check if the browser supports streaming instantiation
    if (WebAssembly.instantiateStreaming) {
      // Fetch the module, and instantiate it as it is downloading
      response = await WebAssembly.instantiateStreaming(
        fetch(wasmModuleUrl),
        importObject
      );
    } else {
      // Fallback to using fetch to download the entire module
      // And then instantiate the module
      const fetchAndInstantiateTask = async () => {
        const wasmArrayBuffer = await fetch(wasmModuleUrl).then(response =>
          response.arrayBuffer()
        );
        return WebAssembly.instantiate(wasmArrayBuffer, importObject);
      };
      response = await fetchAndInstantiateTask();
    }
  
    return response;
  };

  const runWasmAdd = async () => {
      
    const wasmModule = await wasmBrowserInstantiate("./main.wasm");
    const funcResult = new Int32Array(wasmModule.instance.exports.main__some_function());
  
    console.log(funcResult[0])

    document.body.textContent = `function result: ${funcResult[0]}`;
  };
 //runWasmAdd();

function my_lil_wasm(s)
{
 const runWasmAdd2 = async () => {
      
    const wasmModule = await wasmBrowserInstantiate("./main.wasm");

    const length = s.length

    const { main__some_pointer_function, memory } = wasmModule.instance.exports

    const result = new Int32Array(memory.buffer, 0, 20)
  
    main__some_pointer_function(result)
    
    console.log(s)
    console.log(length)
    console.log(result)
    //document.body.textContent = `function result: ${result.join(", ")}`;
  };
  
  runWasmAdd2();
}

function my_other_lil_wasm(s)
{
 const runWasmAdd3 = async () => {
      
    const wasmModule = await wasmBrowserInstantiate("./main.wasm");
    const { main__some_other_pointer_function, memory } = wasmModule.instance.exports

    const length = s.length
    let offset = 0 

    var enc = new TextEncoder(); // always utf-8
    const input = new Int32Array(memory.buffer, offset, length)
    input.set(enc.encode(s))
    //input.set([97, 98, 3, 4, 5])

    offset += length * Int32Array.BYTES_PER_ELEMENT
    console.log("Offset is " + offset)
    const result = new Int32Array(memory.buffer, offset, length)
  
    main__some_other_pointer_function(input.byteOffset,result.byteOffset,length)
    
    console.log(s)
    console.log(Array.from(s))
    console.log("uploaded data length is " + length)
    console.log(input)
    console.log("result data is " + result)
    //document.body.textContent = `function result: ${result.join(", ")}`;
  };
  
  runWasmAdd3();
}



