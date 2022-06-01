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

async function my_other_lil_wasm(s)
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
    console.log("input data is " + input)
    console.log("result data is " + result)
    //document.body.textContent = `function result: ${result.join(", ")}`;

    return result
  };
  
  const my_res = await runWasmAdd3();

  return my_res
}





