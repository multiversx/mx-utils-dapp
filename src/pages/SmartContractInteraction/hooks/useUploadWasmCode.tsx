import { useState } from 'react';
import { Code } from '@multiversx/sdk-core/out/smartcontracts/code';

const useUploadWasmCode = () => {
  const [wasmCode, setWasmCode] = useState<Code>();

  const toBuffer = (arrayBuffer: ArrayBuffer) => {
    const buffer = Buffer.alloc(arrayBuffer.byteLength);
    const view = new Uint8Array(arrayBuffer);

    for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
    }

    return buffer;
  };

  const uploadHandler = (e: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      const buffer = toBuffer(reader.result as ArrayBuffer);
      const wasmCode = Code.fromBuffer(buffer);

      setWasmCode(wasmCode);
    };

    reader.readAsArrayBuffer(e.target.files[0]);
  };

  return { wasmCode, onUpload: uploadHandler };
};

export default useUploadWasmCode;
