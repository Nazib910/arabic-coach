import{test}from'node:test';import assert from'node:assert/strict';import{validImageData}from'./imageValidation';
test('image signatures, byte size and strict base64 are checked',()=>{
 const bytes=Buffer.from([137,80,78,71,13,10,26,10,0,0,0,0]);const image={mimeType:'image/png',byteSize:bytes.length,dataUrl:`data:image/png;base64,${bytes.toString('base64')}`};assert.ok(validImageData(image));
 assert.equal(validImageData({...image,byteSize:1}),false);assert.equal(validImageData({...image,dataUrl:'data:image/png;base64,invalid***'}),false);assert.equal(validImageData({...image,mimeType:'image/jpeg'}),false);
});
