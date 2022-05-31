export const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
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
 runWasmAdd();


 const runWasmAdd2 = async () => {
      
    const wasmModule = await wasmBrowserInstantiate("./main.wasm");

    const { main__some_pointer_function, memory } = wasmModule.instance.exports

    const result = new Int32Array(memory.buffer, 0, 20)
  
    main__some_pointer_function(result)
    
    console.log(result)
    document.body.textContent = `function result: ${result.join(", ")}`;
  };
 runWasmAdd2();


