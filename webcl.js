var cl = module.exports = require('./build/Release/webcl.node');
//var WebGL=require('webgl');

cl.size = {};
cl.size.CHAR=cl.size_CHAR;
cl.size.SHORT=cl.size_SHORT;
cl.size.INT=cl.size_INT;
cl.size.LONG=cl.size_LONG;
cl.size.FLOAT=cl.size_FLOAT;
cl.size.DOUBLE=cl.size_DOUBLE;
cl.size.HALF=cl.size_HALF;

cl.type = {};
cl.type.CHAR      = 0;
cl.type.UCHAR     = 1;
cl.type.SHORT     = 2;
cl.type.USHORT    = 3;
cl.type.INT       = 4;
cl.type.UINT      = 5;
cl.type.LONG      = 6;
cl.type.ULONG     = 7;
cl.type.FLOAT     = 8;
cl.type.HALF      = 9;
cl.type.DOUBLE    = 10;
cl.type.QUAD      = 11;
cl.type.LONG_LONG = 12;

cl.type.VEC2      = 1<<16;
cl.type.VEC3      = 1<<17;
cl.type.VEC4      = 1<<18;
cl.type.VEC8      = 1<<19;
cl.type.VEC16     = 1<<20;

cl.type.LOCAL_MEMORY_SIZE = 0xFF;

//////////////////////////////
// WebCL object
//////////////////////////////
function checkObjectType(obj, type) {
  //console.log('checking object: '+obj+' type: '+Object.prototype.toString.call(obj)+' for type '+type);
  return Object.prototype.toString.call(obj) === '[object '+type+']';
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

var _getPlatforms = cl.getPlatforms;
cl.getPlatforms = function () {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected getPlatforms()');
  }
  return _getPlatforms();
}

var _createContext = cl.createContext;
cl.createContext = function (properties, data, callback) {
if (!((properties===null || typeof properties === 'undefined' || typeof properties === 'object') &&
    (callback===null || typeof callback === 'undefined' || typeof callback === 'function')
  )) {
  throw new TypeError('Expected createContext(optional WebCLContextProperties properties, optional any data, optional function callback)');
}
return _createContext(properties, data, callback);
}

var _waitForEvents = cl.waitForEvents;
cl.waitForEvents = function (events) {
  if (!(arguments.length === 1 && typeof events === 'object' )) {
    throw new TypeError('Expected waitForEvents(WebCLEvent[] events)');
  }
  return _waitForEvents(events);
}

var _unloadCompiler = cl.unloadCompiler;
cl.unloadCompiler = function () {
  if (!(arguments.length === 0 )) {
    throw new TypeError('Expected unloadCompiler()');
  }
  return _unloadCompiler();
}

//////////////////////////////
//WebCLCommandQueue object
//////////////////////////////
cl.WebCLCommandQueue.prototype.getInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLCommandQueue.getInfo(CLenum param_name)');
  }
  return this._getInfo(param_name);
}

cl.WebCLCommandQueue.prototype.enqueueNDRangeKernel=function (kernel, offsets, globals, locals, event_list, event) {
  if (!(arguments.length>= 4 && checkObjectType(kernel, 'WebCLKernel') &&
      typeof offsets === 'object' && typeof globals === 'object' && typeof locals === 'object' &&
      (typeof event_list === 'undefined' || typeof event_list === 'object') &&
      (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
      )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueNDRangeKernel(WebCLKernel kernel, int[3] offsets, int[3] globals, int[3] locals, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueNDRangeKernel(kernel, offsets, globals, locals, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueTask=function (kernel, event_list, event) {
  if (!(arguments.length >= 1 && checkObjectType(kernel, 'WebCLKernel') &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
    )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueTask(WebCLKernel kernel, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueTask(kernel, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueWriteBuffer=function (memory_object, blocking_write, region, event_list, event) {
  if (!(arguments.length >= 3 && 
    checkObjectType(memory_object, 'WebCLBuffer') &&
    (typeof blocking_write === 'boolean' || typeof blocking_write === 'number') &&
    typeof region === 'object' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
    )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueWriteBuffer(WebCLBuffer memory_object, boolean blocking_write, WebCLRegion region, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueWriteBuffer(memory_object, blocking_write, region, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueReadBuffer=function (memory_object, blocking_read, region, event_list, event) {
  if (!(arguments.length >= 3 && 
      checkObjectType(memory_object, 'WebCLBuffer') &&
      (typeof blocking_read === 'boolean' || typeof blocking_read === 'number') &&
      typeof region === 'object' &&
      (typeof event_list === 'undefined' || typeof event_list === 'object') &&
      (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
      )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueReadBuffer(WebCLBuffer memory_object, boolean blocking_read, WebCLRegion region, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueReadBuffer(memory_object, blocking_read, region, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueCopyBuffer=function (memory_object_src, memory_object_dst, src_offset, dst_offset, size, event_list, event) {
  if (!(arguments.length >= 5 && 
      checkObjectType(memory_object_src, 'WebCLBuffer') &&
      checkObjectType(memory_object_dst, 'WebCLBuffer') &&
      typeof src_offset === 'number' &&
      typeof dst_offset === 'number' &&
      (typeof event_list === 'undefined' || typeof event_list === 'object') &&
      (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueCopyBuffer(WebCLBuffer memory_object_src, WebCLBuffer memory_object_dst, int src_offset, int dst_offset, int size, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueCopyBuffer(memory_object_src, memory_object_dst, src_offset, dst_offset, size, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueWriteBufferRect=function (memory_object, blocking_write, bufferRegion, hostRegion, event_list, event) {
  if (!(arguments.length >= 4 && 
    checkObjectType(memory_object, 'WebCLBuffer') &&
    (typeof blocking_write === 'boolean' || typeof blocking_write === 'number') &&
    typeof bufferRegion === 'object' && typeof hostRegion === 'object' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueWriteBufferRect(WebCLBuffer memory_object, boolean blocking_write, WebCLRegion bufferRegion, WebCLRegion hostRegion, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueWriteBufferRect(memory_object, blocking_write, 
      bufferRegion, hostRegion, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueReadBufferRect=function (memory_object, blocking_write, bufferRegion, hostRegion, event_list, event) {
  if (!(arguments.length >= 4 && 
    checkObjectType(memory_object, 'WebCLBuffer') &&
    (typeof blocking_write === 'boolean' || typeof blocking_write === 'number') &&
    typeof bufferRegion === 'object' && typeof hostRegion === 'object' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueReadBufferRect(WebCLBuffer memory_object, boolean blocking_write, WebCLRegion bufferRegion, WebCLRegion hostRegion, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueReadBufferRect(memory_object, blocking_write, bufferRegion, hostRegion, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueCopyBufferRect=function (srcRegion, dstRegion, event_list, event) {
  if (!(arguments.length >= 2 && 
    typeof srcRegion === 'object' && typeof dstRegion === 'object' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueCopyBufferRect(WebCLRegion srcRegion, WebCLRegion dstRegion, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueCopyBufferRect(srcRegion, dstRegion, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueWriteImage=function (memory_object, blocking_write, srcOrigin, region, row_pitch, slice_pitch, host_ptr, event_list, event) {
  if (!(arguments.length >= 7 && 
    checkObjectType(memory_object, 'WebCLImage') &&
    typeof srcOrigin === 'object' &&
    typeof region === 'object' &&
    typeof row_pitch === 'number' &&
    typeof slice_pitch === 'number' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueWriteImage(WebCLImage memory_object, boolean blocking_write, int[3] origin, int[3] region, int row_pitch, int slice_pitch, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueWriteImage(memory_object, blocking_write, srcOrigin, region, row_pitch, slice_pitch, host_ptr, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueReadImage=function (memory_object, blocking_read, srcOrigin, regionArray, row_pitch, slice_pitch, host_ptr, event_list, event) {
  if (!(arguments.length >= 7 && 
    checkObjectType(memory_object, 'WebCLImage') &&
    typeof srcOrigin === 'object' && 
    typeof regionArray === 'object' &&
    typeof row_pitch === 'number' &&
    typeof slice_pitch === 'number' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueReadImage(WebCLImage memory_object, boolean blocking_write, WebCLRegion region, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueReadImage(memory_object, blocking_read, srcOrigin, regionArray, row_pitch, slice_pitch, host_ptr, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueCopyImage=function (memory_object_src, memory_object_dst, srcOrigin, dstOrigin, regionArray, event_list, event) {
  if (!(arguments.length >= 5 && 
      checkObjectType(memory_object_src, 'WebCLImage') &&
      checkObjectType(memory_object_dst, 'WebCLImage') &&
    typeof srcOrigin === 'object' && 
    typeof dstOrigin === 'object' && 
    typeof regionArray === 'object' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueCopyImage(WebCLImage memory_object_src, WebCLImage memory_object_dst, boolean blocking_write, WebCLRegion region, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueCopyImage(memory_object_src, memory_object_dst, srcOrigin, dstOrigin, regionArray, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueCopyImageToBuffer=function (memory_object_src, memory_object_dst, srcOrigin, regionArray, dst_offset, event_list, event) {
  if (!(arguments.length >= 5 && 
    checkObjectType(memory_object_src, 'WebCLImage') &&
    checkObjectType(memory_object_dst, 'WebCLBuffer') &&
    typeof srcOrigin === 'object' && 
    typeof regionArray === 'object' && 
    typeof dst_offset === 'number' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueCopyImageToBuffer(WebCLImage memory_object_src, WebCLBuffer memory_object_dst, uint[3] srcOrigin, uint[3] region, uint dst_offset, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueCopyImageToBuffer(memory_object_src, memory_object_dst, srcOrigin, regionArray, dst_offset, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueCopyBufferToImage=function (memory_object_src, memory_object_dst, srcOffset, dstOrigin, regionArray, event_list, event) {
  if (!(arguments.length >= 5 && 
    checkObjectType(memory_object_src, 'WebCLBuffer') &&
    checkObjectType(memory_object_dst, 'WebCLImage') &&
    typeof srcOffset === 'number' && 
    typeof dstOrigin === 'object' && 
    typeof regionArray === 'object' && 
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueCopyBufferToImage(WebCLBuffer memory_object_src, WebCLImage memory_object_dst, uint srcOffset, uint[3] dstOrigin, uint[4] region, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueCopyBufferToImage(memory_object_src, memory_object_dst, srcOffset, dstOrigin, regionArray, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueMapBuffer=function (memory_object, blocking, flags, offset, size, event_list, event) {
  if (!(arguments.length >= 5 && 
    checkObjectType(memory_object, 'WebCLBuffer') &&
    (typeof blocking === 'boolean' || typeof blocking === 'number') &&
    typeof flags === 'number' && 
    typeof offset === 'number' && 
    typeof size === 'number' && 
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueMapBuffer(WebCLBuffer memory_object, boolean blocking, CLenum flags, uint offset, uint size, WebCLEvent[] event_list, WebCLEvent event)');
  }

  return this._enqueueMapBuffer(memory_object, blocking, flags, offset, size, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueMapImage=function (memory_object, blocking, flags, origin, region, event_list, event) {
  if (!(arguments.length >= 5 && 
    checkObjectType(memory_object, 'WebCLImage') &&
    (typeof blocking === 'boolean' || typeof blocking === 'number') &&
    typeof flags === 'number' && 
    typeof origin === 'number' && 
    typeof region === 'object' && 
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueMapImage(WebCLImage memory_object, boolean blocking, CLenum flags, uint origin, WebCLRegion region, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueMapImage(memory_object, blocking, flags, origin, region, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueUnmapMemObject=function (memory_object, region, event_list, event) {
  if (!(arguments.length >= 2 && 
    (checkObjectType(memory_object, 'WebCLBuffer') || checkObjectType(memory_object, 'WebCLImage')) &&
    typeof region === 'object' && 
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueUnmapMemObject(WebCLMemoryObject memory_object, ArrayBuffer region, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueUnmapMemObject(memory_object, region, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueMarker=function (event_list, event) {
  if (!(arguments.length >= 0 &&
      (typeof event_list === 'undefined' || typeof event_list === 'object') &&
      (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
      )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueMarker(WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueMarker(event_list, event);
}

/*cl.WebCLCommandQueue.prototype.enqueueWaitForEvents=function (event_wait_list) {
  if (!(arguments.length >=0 &&       
      (typeof event_list === 'undefined' || typeof event_list === 'object') )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueWaitForEvents(WebCLEvent[] event_wait_list)');
  }
  return this._enqueueWaitForEvents(event_wait_list);
}*/

cl.WebCLCommandQueue.prototype.enqueueBarrier=function (event_list, event) {
  if (!(arguments.length >= 0 &&
      (typeof event_list === 'undefined' || typeof event_list === 'object') &&
      (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
      )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueBarrier(WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueBarrier(event_list, event);
}

cl.WebCLCommandQueue.prototype.flush=function () {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected WebCLCommandQueue.flush()');
  }
  return this._flush();
}

cl.WebCLCommandQueue.prototype.finish=function () {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected WebCLCommandQueue.finish()');
  }
  return this._finish();
}

cl.WebCLCommandQueue.prototype.enqueueAcquireGLObjects=function (mem_objects, event_list, event) {
  if (!(arguments.length >= 1 && 
      typeof mem_objects === 'object' && 
      (typeof event_list==='undefined' || typeof event_list === 'object') &&
      (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLEvent WebCLGL.enqueueAcquireGLObjects(WebCLMemoryObject[] mem_objects, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueAcquireGLObjects(mem_objects, event_list, event);
}

cl.WebCLCommandQueue.prototype.enqueueReleaseGLObjects=function (mem_objects, event_list, event) {
  if (!(arguments.length >= 1 && 
      typeof mem_objects === 'object' && 
      (typeof event_list==='undefined' || typeof event_list === 'object') &&
      (typeof event === 'undefined' || checkObjectType(event, 'WebCLEvent'))
  )) {
    throw new TypeError('Expected WebCLEvent WebCLGL.enqueueReleaseGLObjects(WebCLMemoryObject[] mem_objects, WebCLEvent[] event_list, WebCLEvent event)');
  }
  return this._enqueueReleaseGLObjects(mem_objects, event_list, event);
}

//////////////////////////////
//WebCLContext object
//////////////////////////////
cl.WebCLContext.prototype.getInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLContext.getInfo(CLenum param_name)');
  }
  return this._getInfo(param_name);
}

cl.WebCLContext.prototype.createProgram=function (sources) {
  if (!(arguments.length === 1 && typeof sources === 'string')) {
    throw new TypeError('Expected WebCLContext.createProgram(string sources)');
  }
  return this._createProgram(sources);
}

// TODO
cl.WebCLContext.prototype.createProgramWithBinaries=function (devices, binaries) {
  if (!(arguments.length === 2 && typeof devices === 'object' && typeof binaries === 'object')) {
    throw new TypeError('Expected WebCLContext.createProgramWithBinaries(WebCLDevice[] devices, Object[] binaries)');
  }
  return this._createProgramWithBinaries(devices, binaries);
}

cl.WebCLContext.prototype.createCommandQueue=function (device, properties) {
  if (!(arguments.length >=1 && checkObjectType(device, 'WebCLDevice') && 
      (properties==null || typeof properties === 'number' || typeof properties === 'object'))) {
    throw new TypeError('Expected WebCLContext.createCommandQueue(WebCLDevice device, CLenum[] properties)');
  }
  return this._createCommandQueue(device, properties);
}

cl.WebCLContext.prototype.createBuffer=function (flags, size, host_ptr) {
  if (!(arguments.length >= 2 && typeof flags === 'number' && typeof size === 'number' && 
      (typeof host_ptr === 'undefined' || typeof host_ptr === 'object') )) {
    throw new TypeError('Expected WebCLContext.createBuffer(CLenum flags, int size, optional ArrayBuffer host_ptr)');
  }
  return this._createBuffer(flags, size, host_ptr);
}

cl.WebCLContext.prototype.createImage2D=function (flags, image_format, width, height, row_pitch, host_ptr) {
  if (!(arguments.length >= 5 && typeof flags === 'number' && typeof image_format === 'object' && 
      typeof width === 'number' && typeof height === 'number' && typeof row_pitch === 'number' && 
      (typeof host_ptr === 'undefined' || typeof host_ptr === 'object'))) {
    throw new TypeError('Expected WebCLContext.createImage2D(CLenum flags, cl.WebCLImageFormat format, int width, int height, int row_pitch, optional ArrayBuffer host_ptr)');
  }
  return this._createImage2D(flags, image_format, width, height, row_pitch, host_ptr);
}

cl.WebCLContext.prototype.createImage3D=function (flags, image_format, width, height, row_pitch, host_ptr) {
  if (!(arguments.length === 8 && typeof flags === 'number' && typeof image_format === 'number' && 
      typeof width === 'number' && typeof height === 'number' && typeof depth === 'number' && 
      typeof row_pitch === 'number' && typeof slice_pitch === 'number' && typeof host_ptr === 'object')) {
    throw new TypeError('Expected WebCLContext.createImage3D(CLenum flags, cl.WebCLImageFormat format, int width, int height, int depth, int row_pitch, int slice_pitch, ArrayBuffer host_ptr)');
  }
  return this._createImage3D(flags, image_format, width, height, depth, row_pitch, slice_pitch, host_ptr);
}

cl.WebCLContext.prototype.createSampler=function (normalized_coords, addressing_mode, filter_mode) {
  if (!(arguments.length === 3 && 
      (typeof normalized_coords === 'number' || typeof normalized_coords === 'boolean') && 
      typeof addressing_mode === 'number' && 
      typeof filter_mode === 'number')) {
    throw new TypeError('Expected WebCLContext.createSampler(bool normalized_coords, CLenum addressing_mode, CLenum filter_mode)');
  }
  return this._createSampler(normalized_coords, addressing_mode, filter_mode);
}

cl.WebCLContext.prototype.createUserEvent=function () {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected WebCLContext.createUserEvent()');
  }
  return this._createUserEvent();
}

cl.WebCLContext.prototype.getSupportedImageFormats=function (flags, image_type) {
  if (!(arguments.length === 2 && typeof flags === 'number' && typeof image_type === 'number')) {
    throw new TypeError('Expected WebCLContext.getSupportedImageFormats(CLenum flags, CLenum image_type)');
  }
  return this._getSupportedImageFormats(flags, image_type);
}

cl.WebCLContext.prototype.createFromGLBuffer=function (flags, buffer) {
  if (!(arguments.length === 2 && typeof flags === 'number' && typeof buffer ==='object')) {
    throw new TypeError('Expected WebCLContext.createFromGLBuffer(CLenum flags, WebGLBuffer buffer)');
  }
  return this._createFromGLBuffer(flags, buffer ? buffer._ : 0);
}

cl.WebCLContext.prototype.createFromGLTexture2D=function (flags, texture_target, miplevel, texture) {
  if (!(arguments.length === 4 && typeof flags === 'number' && 
      typeof texture_target ==='number' &&
      typeof miplevel ==='number' &&
      typeof texture ==='object' 
    )) {
    throw new TypeError('Expected WebCLContext.createFromGLTexture2D(CLenum flags, GLenum texture_target, GLint miplevel, WebGLTexture2D texture)');
  }
  return this._createFromGLTexture2D(flags, texture_target, miplevel, texture ? texture._ : 0);
}

cl.WebCLContext.prototype.createFromGLTexture3D=function (flags, texture_target, miplevel, texture) {
  if (!(arguments.length === 4 && typeof flags === 'number' && 
      typeof texture_target ==='number' &&
      typeof miplevel ==='number' &&
      typeof texture ==='object' 
    )) {
    throw new TypeError('Expected WebCLContext.createFromGLTexture3D(CLenum flags, GLenum texture_target, GLint miplevel, WebGLTexture3D texture)');
  }
  return this._createFromGLTexture3D(flags, texture_target, miplevel, texture ? texture._ : 0);
}

//////////////////////////////
//WebCLDevice object
//////////////////////////////
cl.WebCLDevice.prototype.getInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLDevice.getInfo(CLenum param_name)');
  }
  return this._getInfo(param_name);
}

cl.WebCLDevice.prototype.getExtension=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLDevice.getExtension(CLenum param_name)');
  }
  return this._getExtension(param_name);
}

//////////////////////////////
//WebCLEvent object
//////////////////////////////
cl.WebCLEvent.prototype.getInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLEvent.getInfo(CLenum param_name)');
  }
  return this._getInfo(param_name);
}

cl.WebCLEvent.prototype.getProfilingInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLEvent.getProfilingInfo(CLenum param_name)');
  }
  return this._getProfilingInfo(param_name);
}

cl.WebCLEvent.prototype.setUserEventStatus=function (execution_status) {
  if (!(arguments.length === 1 && typeof execution_status === 'number')) {
    throw new TypeError('Expected WebCLEvent.setUserEventStatus(CLenum execution_status)');
  }
  return this._setUserEventStatus(execution_status);
}

cl.WebCLEvent.prototype.setCallback=function (execution_status, fct, args) {
  if (!(arguments.length >= 2 && typeof execution_status === 'number' &&
      typeof fct === 'function')) {
    throw new TypeError('Expected WebCLEvent.setCallback(CLenum execution_status, function callback, any args)');
  }
  return this._setCallback(execution_status, fct, args);
}

//////////////////////////////
//WebCLKernel object
//////////////////////////////
cl.WebCLKernel.prototype.getInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLKernel.getInfo(CLenum param_name)');
  }
  return this._getInfo(param_name);
}

cl.WebCLKernel.prototype.getWorkGroupInfo=function (device, param_name) {
  if (!(arguments.length === 2 && checkObjectType(device, 'WebCLDevice') && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLKernel.getWorkGroupInfo(WebCLDevice device, CLenum param_name)');
  }
  return this._getWorkGroupInfo(device, param_name);
}

cl.WebCLKernel.prototype.setArg=function (index, value, type) {
  if (!(arguments.length >= 2 && typeof index === 'number' && 
      (typeof value === 'number' || typeof value === 'object') &&
      (typeof type == 'undefined' || typeof type === 'number') )) {
    throw new TypeError('Expected WebCLKernel.setArg(int index, any value, optional WebCL.types type)');
  }
  return this._setArg(index, value, type);
}

//////////////////////////////
//WebCLMappedRegion object
//////////////////////////////

//static JS_METHOD(getBuffer);

//////////////////////////////
//WebCLMemoryObject object
//////////////////////////////

cl.WebCLMemoryObject.prototype.getInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLMemoryObject.getInfo(CLenum param_name)');
  }
  return this._getInfo(param_name);
}

cl.WebCLMemoryObject.prototype.getGLObjectInfo=function (object_type, param_name) {
  if (!(arguments.length === 1 && typeof object_type === 'number' && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLMemoryObject.getGLObjectInfo(CLenum object_type, GLenum param_name)');
  }
  return this._getGLObjectInfo(object_type, param_name);
}

//////////////////////////////
//WebCLBuffer object
//////////////////////////////

cl.WebCLBuffer.prototype.createSubBuffer=function (flags, type, region) {
  if (!(arguments.length === 3 && typeof flags === 'number' && typeof type === 'number' && typeof region === 'object')) {
    throw new TypeError('Expected WebCLMemoryObject.createSubBuffer(CLenum flags, CLenum type, WebCLRegion region)');
  }
  return this._createSubBuffer(flags, type, region);
}

//////////////////////////////
//WebCLImage object
//////////////////////////////

cl.WebCLImage.prototype.getInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLImage.getInfo(CLenum param_name)');
  }
  return this._getImageInfo(param_name);
}

cl.WebCLImage.prototype.getGLTextureInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLImage.getGLTextureInfo(CLenum param_name)');
  }
  return this._getGLTextureInfo(param_name);
}

//////////////////////////////
//WebCLPlatform object
//////////////////////////////
cl.WebCLPlatform.prototype.getInfo=function (param_name) {
if (!(arguments.length === 1 && typeof param_name === 'number')) {
  throw new TypeError('Expected WebCLPlatform.getInfo(CLenum param_name)');
}
return this._getInfo(param_name);
}

cl.WebCLPlatform.prototype.getDevices=function (device_type) {
  if (!(arguments.length === 1 && typeof device_type === 'number')) {
    throw new TypeError('Expected WebCLPlatform.getDevices(CLenum device_type)');
  }
  return this._getDevices(device_type);
}

//////////////////////////////
//WebCLProgram object
//////////////////////////////
cl.WebCLProgram.prototype.getInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLProgram.getInfo(CLenum param_name)');
  }
  return this._getInfo(param_name);
}

cl.WebCLProgram.prototype.getBuildInfo=function (device, param_name) {
  if (!(arguments.length === 2 && checkObjectType(device, 'WebCLDevice') && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLProgram.getBuildInfo(WebCLDevice device, CLenum param_name)');
  }
  return this._getBuildInfo(device, param_name);
}

// TODO add callback
cl.WebCLProgram.prototype.build=function (devices, options, data, callback) {
  if (  !(arguments.length === 1 && typeof devices === 'object') &&
        !(arguments.length >= 2 && typeof devices === 'object' && 
            (options==null || typeof options==='undefined' || typeof options === 'string')) &&
        !(typeof data === 'undefined' || typeof data === 'object') &&
        !(typeof callback === 'undefined' || callback==null || typeof callback === 'function')
        ) {
    throw new TypeError('Expected WebCLProgram.build(WebCLDevice[] devices, String options, any data, function callback)');
  }
  return this._build(devices, options, data, callback);
}

cl.WebCLProgram.prototype.createKernel=function (name) {
  if (!(arguments.length === 1 && typeof name === 'string')) {
    throw new TypeError('Expected WebCLProgram.createKernel(String name)');
  }
  return this._createKernel(name);
}

//////////////////////////////
//WebCLSampler object
//////////////////////////////
cl.WebCLSampler.prototype.getInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLSampler.getInfo(CLenum param_name)');
  }
  return this._getInfo(param_name);
}

//////////////////////////////
// extensions
//////////////////////////////
