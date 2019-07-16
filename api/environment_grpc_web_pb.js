/**
 * @fileoverview gRPC-Web generated client stub for endpoints.terrariumai.environment
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.endpoints = {};
proto.endpoints.terrariumai = {};
proto.endpoints.terrariumai.environment = require('./environment_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.endpoints.terrariumai.environment.EnvironmentClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.endpoints.terrariumai.environment.EnvironmentPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.endpoints.terrariumai.environment.EnvironmentClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.endpoints.terrariumai.environment.EnvironmentClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.endpoints.terrariumai.environment.CreateEntityRequest,
 *   !proto.endpoints.terrariumai.environment.CreateEntityResponse>}
 */
const methodInfo_Environment_CreateEntity = new grpc.web.AbstractClientBase.MethodInfo(
  proto.endpoints.terrariumai.environment.CreateEntityResponse,
  /** @param {!proto.endpoints.terrariumai.environment.CreateEntityRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.endpoints.terrariumai.environment.CreateEntityResponse.deserializeBinary
);


/**
 * @param {!proto.endpoints.terrariumai.environment.CreateEntityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.endpoints.terrariumai.environment.CreateEntityResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.endpoints.terrariumai.environment.CreateEntityResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.endpoints.terrariumai.environment.EnvironmentClient.prototype.createEntity =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/endpoints.terrariumai.environment.Environment/CreateEntity',
      request,
      metadata,
      methodInfo_Environment_CreateEntity,
      callback);
};


/**
 * @param {!proto.endpoints.terrariumai.environment.CreateEntityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.endpoints.terrariumai.environment.CreateEntityResponse>}
 *     The XHR Node Readable Stream
 */
proto.endpoints.terrariumai.environment.EnvironmentPromiseClient.prototype.createEntity =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createEntity(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.endpoints.terrariumai.environment.GetEntityRequest,
 *   !proto.endpoints.terrariumai.environment.GetEntityResponse>}
 */
const methodInfo_Environment_GetEntity = new grpc.web.AbstractClientBase.MethodInfo(
  proto.endpoints.terrariumai.environment.GetEntityResponse,
  /** @param {!proto.endpoints.terrariumai.environment.GetEntityRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.endpoints.terrariumai.environment.GetEntityResponse.deserializeBinary
);


/**
 * @param {!proto.endpoints.terrariumai.environment.GetEntityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.endpoints.terrariumai.environment.GetEntityResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.endpoints.terrariumai.environment.GetEntityResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.endpoints.terrariumai.environment.EnvironmentClient.prototype.getEntity =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/endpoints.terrariumai.environment.Environment/GetEntity',
      request,
      metadata,
      methodInfo_Environment_GetEntity,
      callback);
};


/**
 * @param {!proto.endpoints.terrariumai.environment.GetEntityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.endpoints.terrariumai.environment.GetEntityResponse>}
 *     The XHR Node Readable Stream
 */
proto.endpoints.terrariumai.environment.EnvironmentPromiseClient.prototype.getEntity =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getEntity(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.endpoints.terrariumai.environment.DeleteEntityRequest,
 *   !proto.endpoints.terrariumai.environment.DeleteEntityResponse>}
 */
const methodInfo_Environment_DeleteEntity = new grpc.web.AbstractClientBase.MethodInfo(
  proto.endpoints.terrariumai.environment.DeleteEntityResponse,
  /** @param {!proto.endpoints.terrariumai.environment.DeleteEntityRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.endpoints.terrariumai.environment.DeleteEntityResponse.deserializeBinary
);


/**
 * @param {!proto.endpoints.terrariumai.environment.DeleteEntityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.endpoints.terrariumai.environment.DeleteEntityResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.endpoints.terrariumai.environment.DeleteEntityResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.endpoints.terrariumai.environment.EnvironmentClient.prototype.deleteEntity =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/endpoints.terrariumai.environment.Environment/DeleteEntity',
      request,
      metadata,
      methodInfo_Environment_DeleteEntity,
      callback);
};


/**
 * @param {!proto.endpoints.terrariumai.environment.DeleteEntityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.endpoints.terrariumai.environment.DeleteEntityResponse>}
 *     The XHR Node Readable Stream
 */
proto.endpoints.terrariumai.environment.EnvironmentPromiseClient.prototype.deleteEntity =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deleteEntity(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.endpoints.terrariumai.environment.ExecuteAgentActionRequest,
 *   !proto.endpoints.terrariumai.environment.ExecuteAgentActionResponse>}
 */
const methodInfo_Environment_ExecuteAgentAction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.endpoints.terrariumai.environment.ExecuteAgentActionResponse,
  /** @param {!proto.endpoints.terrariumai.environment.ExecuteAgentActionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.endpoints.terrariumai.environment.ExecuteAgentActionResponse.deserializeBinary
);


/**
 * @param {!proto.endpoints.terrariumai.environment.ExecuteAgentActionRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.endpoints.terrariumai.environment.ExecuteAgentActionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.endpoints.terrariumai.environment.ExecuteAgentActionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.endpoints.terrariumai.environment.EnvironmentClient.prototype.executeAgentAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/endpoints.terrariumai.environment.Environment/ExecuteAgentAction',
      request,
      metadata,
      methodInfo_Environment_ExecuteAgentAction,
      callback);
};


/**
 * @param {!proto.endpoints.terrariumai.environment.ExecuteAgentActionRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.endpoints.terrariumai.environment.ExecuteAgentActionResponse>}
 *     The XHR Node Readable Stream
 */
proto.endpoints.terrariumai.environment.EnvironmentPromiseClient.prototype.executeAgentAction =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.executeAgentAction(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Environment_ResetWorld = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.google.protobuf.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.endpoints.terrariumai.environment.EnvironmentClient.prototype.resetWorld =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/endpoints.terrariumai.environment.Environment/ResetWorld',
      request,
      metadata,
      methodInfo_Environment_ResetWorld,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.endpoints.terrariumai.environment.EnvironmentPromiseClient.prototype.resetWorld =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.resetWorld(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.endpoints.terrariumai.environment.GetEntitiesInRegionRequest,
 *   !proto.endpoints.terrariumai.environment.GetEntitiesInRegionResponse>}
 */
const methodInfo_Environment_GetEntitiesInRegion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.endpoints.terrariumai.environment.GetEntitiesInRegionResponse,
  /** @param {!proto.endpoints.terrariumai.environment.GetEntitiesInRegionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.endpoints.terrariumai.environment.GetEntitiesInRegionResponse.deserializeBinary
);


/**
 * @param {!proto.endpoints.terrariumai.environment.GetEntitiesInRegionRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.endpoints.terrariumai.environment.GetEntitiesInRegionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.endpoints.terrariumai.environment.GetEntitiesInRegionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.endpoints.terrariumai.environment.EnvironmentClient.prototype.getEntitiesInRegion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/endpoints.terrariumai.environment.Environment/GetEntitiesInRegion',
      request,
      metadata,
      methodInfo_Environment_GetEntitiesInRegion,
      callback);
};


/**
 * @param {!proto.endpoints.terrariumai.environment.GetEntitiesInRegionRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.endpoints.terrariumai.environment.GetEntitiesInRegionResponse>}
 *     The XHR Node Readable Stream
 */
proto.endpoints.terrariumai.environment.EnvironmentPromiseClient.prototype.getEntitiesInRegion =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getEntitiesInRegion(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.endpoints.terrariumai.environment;

