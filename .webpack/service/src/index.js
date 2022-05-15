/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/environment.ts":
/*!*******************************!*\
  !*** ./config/environment.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    swBaseUrl: process.env.SW_BASE_URL,
};


/***/ }),

/***/ "./src/graphql/swapi/index.ts":
/*!************************************!*\
  !*** ./src/graphql/swapi/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StarWarAPI = exports.swapiTypeDefs = exports.swapiResolvers = void 0;
const resolvers_1 = __importDefault(__webpack_require__(/*! ./resolvers */ "./src/graphql/swapi/resolvers.ts"));
exports.swapiResolvers = resolvers_1.default;
const typeDef_1 = __importDefault(__webpack_require__(/*! ./typeDef */ "./src/graphql/swapi/typeDef.ts"));
exports.swapiTypeDefs = typeDef_1.default;
const startwar_api_1 = __importDefault(__webpack_require__(/*! ./startwar-api */ "./src/graphql/swapi/startwar-api.ts"));
exports.StarWarAPI = startwar_api_1.default;


/***/ }),

/***/ "./src/graphql/swapi/resolvers.ts":
/*!****************************************!*\
  !*** ./src/graphql/swapi/resolvers.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const resolvers = {
    Query: {
        people: (_, { offset }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            let page = offset;
            if (offset < 1) {
                page = 1;
            }
            try {
                const result = yield dataSources.starwarAPI.people(page);
                let next = null;
                let prev = null;
                const resultNext = result === null || result === void 0 ? void 0 : result.next;
                const resultPrev = result === null || result === void 0 ? void 0 : result.previous;
                if (resultNext) {
                    const splitedNext = resultNext === null || resultNext === void 0 ? void 0 : resultNext.split("=");
                    next = splitedNext[splitedNext.length - 1];
                }
                if (resultPrev) {
                    const splitedPrev = resultPrev === null || resultPrev === void 0 ? void 0 : resultPrev.split("=");
                    prev = splitedPrev[splitedPrev.length - 1];
                }
                return {
                    peoples: result === null || result === void 0 ? void 0 : result.results,
                    count: result === null || result === void 0 ? void 0 : result.count,
                    next,
                    prev,
                };
            }
            catch (error) {
                throw new Error("Internal server error");
            }
        }),
        search: (_, { search }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield dataSources.starwarAPI.search(search);
                return result === null || result === void 0 ? void 0 : result.results;
            }
            catch (error) {
                throw new Error("Internal server error");
            }
        }),
    },
};
exports["default"] = resolvers;


/***/ }),

/***/ "./src/graphql/swapi/startwar-api.ts":
/*!*******************************************!*\
  !*** ./src/graphql/swapi/startwar-api.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const apollo_datasource_rest_1 = __webpack_require__(/*! apollo-datasource-rest */ "apollo-datasource-rest");
const environment_1 = __webpack_require__(/*! ../../../config/environment */ "./config/environment.ts");
class StarWarAPI extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = environment_1.environment.swBaseUrl;
    }
    search(searchValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.get('/', {
                search: searchValue,
            });
            return data;
        });
    }
    people(offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.get('/', {
                page: offset,
            });
            return data;
        });
    }
}
exports["default"] = StarWarAPI;


/***/ }),

/***/ "./src/graphql/swapi/typeDef.ts":
/*!**************************************!*\
  !*** ./src/graphql/swapi/typeDef.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const typeDefs = (0, apollo_server_lambda_1.gql) `
  type PeopleItem {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
  }

  type People {
    peoples: [PeopleItem]
    count: Int
    next: Int
    prev: Int
  }
  
  type Query {
    people(offset: Int): People
    search(search: String!): [PeopleItem]
  }
`;
exports["default"] = typeDefs;


/***/ }),

/***/ "apollo-datasource-rest":
/*!*****************************************!*\
  !*** external "apollo-datasource-rest" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("apollo-datasource-rest");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("apollo-server-lambda");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const swapi_1 = __webpack_require__(/*! ./graphql/swapi */ "./src/graphql/swapi/index.ts");
const server = new apollo_server_lambda_1.ApolloServer({
    typeDefs: swapi_1.swapiTypeDefs,
    resolvers: swapi_1.swapiResolvers,
    dataSources: () => {
        return {
            starwarAPI: new swapi_1.StarWarAPI()
        };
    },
});
exports.graphqlHandler = server.createHandler();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFJQTtBQUhBO0FBR0E7QUFGQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7QUN4QkE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7QUFFQTs7Ozs7Ozs7Ozs7QUN4QkE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGFyLXdhci8uL2NvbmZpZy9lbnZpcm9ubWVudC50cyIsIndlYnBhY2s6Ly9zdGFyLXdhci8uL3NyYy9ncmFwaHFsL3N3YXBpL2luZGV4LnRzIiwid2VicGFjazovL3N0YXItd2FyLy4vc3JjL2dyYXBocWwvc3dhcGkvcmVzb2x2ZXJzLnRzIiwid2VicGFjazovL3N0YXItd2FyLy4vc3JjL2dyYXBocWwvc3dhcGkvc3RhcnR3YXItYXBpLnRzIiwid2VicGFjazovL3N0YXItd2FyLy4vc3JjL2dyYXBocWwvc3dhcGkvdHlwZURlZi50cyIsIndlYnBhY2s6Ly9zdGFyLXdhci9leHRlcm5hbCBjb21tb25qcyBcImFwb2xsby1kYXRhc291cmNlLXJlc3RcIiIsIndlYnBhY2s6Ly9zdGFyLXdhci9leHRlcm5hbCBjb21tb25qcyBcImFwb2xsby1zZXJ2ZXItbGFtYmRhXCIiLCJ3ZWJwYWNrOi8vc3Rhci13YXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3Rhci13YXIvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsidHlwZSBFbnZpcm9ubWVudCA9IHtcbiAgICBzd0Jhc2VVcmw6IHN0cmluZztcbiAgfTtcbiAgXG4gIGV4cG9ydCBjb25zdCBlbnZpcm9ubWVudDogRW52aXJvbm1lbnQgPSB7XG4gICAgc3dCYXNlVXJsOiBwcm9jZXNzLmVudi5TV19CQVNFX1VSTCBhcyBzdHJpbmcsXG4gIH07IiwiaW1wb3J0IHN3YXBpUmVzb2x2ZXJzIGZyb20gXCIuL3Jlc29sdmVyc1wiO1xuaW1wb3J0IHN3YXBpVHlwZURlZnMgZnJvbSBcIi4vdHlwZURlZlwiO1xuaW1wb3J0IFN0YXJXYXJBUEkgZnJvbSBcIi4vc3RhcnR3YXItYXBpXCI7XG5cbmV4cG9ydCB7c3dhcGlSZXNvbHZlcnMsIHN3YXBpVHlwZURlZnMsIFN0YXJXYXJBUEl9OyIsImltcG9ydCB7IFBlb3BsZVJlc3BvbnNlLCBQZW9wbGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuY29uc3QgcmVzb2x2ZXJzID0ge1xuICBRdWVyeToge1xuICAgIHBlb3BsZTogYXN5bmMgKF8sIHsgb2Zmc2V0IH0sIHsgZGF0YVNvdXJjZXMgfSk6IFByb21pc2U8UGVvcGxlUmVzcG9uc2U+ID0+IHtcbiAgICAgIGxldCBwYWdlID0gb2Zmc2V0O1xuXG4gICAgICAvLyBvZmZzZXQgMCB2YWx1ZSBjYXVzZWQgZXJyb3JcbiAgICAgIGlmIChvZmZzZXQgPCAxKSB7XG4gICAgICAgIHBhZ2UgPSAxO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYXRhU291cmNlcy5zdGFyd2FyQVBJLnBlb3BsZShwYWdlKTtcbiAgICAgICAgbGV0IG5leHQgPSBudWxsO1xuICAgICAgICBsZXQgcHJldiA9IG51bGw7XG4gICAgICAgIGNvbnN0IHJlc3VsdE5leHQgPSByZXN1bHQ/Lm5leHQ7XG4gICAgICAgIGNvbnN0IHJlc3VsdFByZXYgPSByZXN1bHQ/LnByZXZpb3VzO1xuXG4gICAgICAgIGlmIChyZXN1bHROZXh0KSB7XG4gICAgICAgICAgY29uc3Qgc3BsaXRlZE5leHQgPSByZXN1bHROZXh0Py5zcGxpdChcIj1cIik7XG4gICAgICAgICAgbmV4dCA9IHNwbGl0ZWROZXh0W3NwbGl0ZWROZXh0Lmxlbmd0aCAtIDFdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdFByZXYpIHtcbiAgICAgICAgICBjb25zdCBzcGxpdGVkUHJldiA9IHJlc3VsdFByZXY/LnNwbGl0KFwiPVwiKTtcbiAgICAgICAgICBwcmV2ID0gc3BsaXRlZFByZXZbc3BsaXRlZFByZXYubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHBlb3BsZXM6IHJlc3VsdD8ucmVzdWx0cyxcbiAgICAgICAgICBjb3VudDogcmVzdWx0Py5jb3VudCxcbiAgICAgICAgICBuZXh0LFxuICAgICAgICAgIHByZXYsXG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZWFyY2g6IGFzeW5jIChfLCB7IHNlYXJjaCB9LCB7IGRhdGFTb3VyY2VzIH0pOiBQcm9taXNlPFBlb3BsZVtdPiA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYXRhU291cmNlcy5zdGFyd2FyQVBJLnNlYXJjaChzZWFyY2gpO1xuICAgICAgICByZXR1cm4gcmVzdWx0Py5yZXN1bHRzO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXNvbHZlcnM7XG4iLCJpbXBvcnQgIHsgUkVTVERhdGFTb3VyY2UgfSBmcm9tICdhcG9sbG8tZGF0YXNvdXJjZS1yZXN0JztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvbmZpZy9lbnZpcm9ubWVudFwiO1xuXG5jbGFzcyBTdGFyV2FyQVBJIGV4dGVuZHMgUkVTVERhdGFTb3VyY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuYmFzZVVSTCA9IGVudmlyb25tZW50LnN3QmFzZVVybDtcbiAgICB9XG4gIFxuICAgIGFzeW5jIHNlYXJjaChzZWFyY2hWYWx1ZTogc3RyaW5nKSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5nZXQoJy8nLCB7XG4gICAgICAgIHNlYXJjaDogc2VhcmNoVmFsdWUsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgXG4gICAgYXN5bmMgcGVvcGxlKG9mZnNldDogbnVtYmVyKSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5nZXQoJy8nLCB7XG4gICAgICAgIHBhZ2U6IG9mZnNldCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGRlZmF1bHQgU3RhcldhckFQSTtcblxuICAiLCJpbXBvcnQgeyBncWwgfSBmcm9tIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIjtcblxuY29uc3QgdHlwZURlZnMgPSBncWxgXG4gIHR5cGUgUGVvcGxlSXRlbSB7XG4gICAgbmFtZTogU3RyaW5nXG4gICAgaGVpZ2h0OiBTdHJpbmdcbiAgICBtYXNzOiBTdHJpbmdcbiAgICBnZW5kZXI6IFN0cmluZ1xuICAgIGhvbWV3b3JsZDogU3RyaW5nXG4gIH1cblxuICB0eXBlIFBlb3BsZSB7XG4gICAgcGVvcGxlczogW1Blb3BsZUl0ZW1dXG4gICAgY291bnQ6IEludFxuICAgIG5leHQ6IEludFxuICAgIHByZXY6IEludFxuICB9XG4gIFxuICB0eXBlIFF1ZXJ5IHtcbiAgICBwZW9wbGUob2Zmc2V0OiBJbnQpOiBQZW9wbGVcbiAgICBzZWFyY2goc2VhcmNoOiBTdHJpbmchKTogW1Blb3BsZUl0ZW1dXG4gIH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVEZWZzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLWRhdGFzb3VyY2UtcmVzdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWxhbWJkYVwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgQXBvbGxvU2VydmVyLCBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWxhbWJkYSc7XG5pbXBvcnQge1xuICBzd2FwaVJlc29sdmVycyxcbiAgc3dhcGlUeXBlRGVmcyxcbiAgU3RhcldhckFQSSxcbn0gZnJvbSAnLi9ncmFwaHFsL3N3YXBpJ1xuXG5cbmNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xuICB0eXBlRGVmczogc3dhcGlUeXBlRGVmcyxcbiAgcmVzb2x2ZXJzOiBzd2FwaVJlc29sdmVycyxcbiAgZGF0YVNvdXJjZXM6ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgIHN0YXJ3YXJBUEk6IG5ldyBTdGFyV2FyQVBJKCkgYXMgYW55XG4gICAgfVxuICB9LFxufSk7XG5cbmV4cG9ydHMuZ3JhcGhxbEhhbmRsZXIgPSBzZXJ2ZXIuY3JlYXRlSGFuZGxlcigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==