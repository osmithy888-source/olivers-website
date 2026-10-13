globalThis.__nitro_main__ = import.meta.url;
import consola from "file:///dev-server/node_modules/consola/dist/index.mjs";
import * as h3 from "file:///dev-server/node_modules/h3/dist/_entries/node.mjs";
import { H3Core, HTTPError, defineHandler } from "file:///dev-server/node_modules/h3/dist/_entries/node.mjs";
import { HookableCore } from "file:///dev-server/node_modules/hookable/dist/index.mjs";
import { decodePath, joinURL, withLeadingSlash, withoutTrailingSlash } from "file:///dev-server/node_modules/nitro/dist/node_modules/ufo/dist/index.mjs";
import { FastResponse } from "file:///dev-server/node_modules/srvx/dist/adapters/node.mjs";
import "file:///dev-server/node_modules/ocache/dist/index.mjs";
import "file:///dev-server/node_modules/unstorage/dist/index.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/example-barber-DB1ZyVpS.jpg": {
		"type": "image/jpeg",
		"etag": "\"160b3-OLgwFW0zzWS4meggY3ud/w+9Xus\"",
		"mtime": "2026-10-12T18:19:01.301Z",
		"size": 90291,
		"path": "../public/assets/example-barber-DB1ZyVpS.jpg"
	},
	"/assets/example-landscaper-CbkMlM2e.jpg": {
		"type": "image/jpeg",
		"etag": "\"21e44-tG0rGUd7E5e3tSnfxQ+LgZR2iIM\"",
		"mtime": "2026-10-12T18:19:01.301Z",
		"size": 138820,
		"path": "../public/assets/example-landscaper-CbkMlM2e.jpg"
	},
	"/assets/example-cafe-BFtQDJs-.jpg": {
		"type": "image/jpeg",
		"etag": "\"16286-s/8euffUXtAek8xPSj28KtKHUmA\"",
		"mtime": "2026-10-12T18:19:01.301Z",
		"size": 90758,
		"path": "../public/assets/example-cafe-BFtQDJs-.jpg"
	},
	"/assets/styles-lNmPgZ9m.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1244c-BzYDzXeNu1d+VxUHT3m+O35j9NY\"",
		"mtime": "2026-10-12T18:19:01.301Z",
		"size": 74828,
		"path": "../public/assets/styles-lNmPgZ9m.css"
	},
	"/assets/routes-ApYDxcXG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29db-eknVcXI4HROWKSqdJvCY1dKRvTI\"",
		"mtime": "2026-10-12T18:19:01.301Z",
		"size": 10715,
		"path": "../public/assets/routes-ApYDxcXG.js"
	},
	"/assets/example-plumber-CNr_5dX_.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a765-bkTx/sQxE8DKkDKouP0sZDcUybU\"",
		"mtime": "2026-10-12T18:19:01.301Z",
		"size": 108389,
		"path": "../public/assets/example-plumber-CNr_5dX_.jpg"
	},
	"/assets/index-qHC9epgn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"530d0-4vZ4+VE8hCndg/jNh0FFV9dLnDo\"",
		"mtime": "2026-10-12T18:19:01.301Z",
		"size": 340176,
		"path": "../public/assets/index-qHC9epgn.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
const globalMiddleware = [h3.toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
const errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
const errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~middleware"].push(...globalMiddleware);
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
const APP_ID = "prerender";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
//#endregion
//#region node_modules/nitro/dist/presets/_nitro/runtime/nitro-prerenderer.mjs
const nitroApp = useNitroApp();
const nitroHooks = useNitroHooks();
var nitro_prerenderer_default = {
	fetch: nitroApp.fetch,
	close: () => nitroHooks.callHook("close")
};
nitroHooks.hook("error", (error, context) => {
	if (!error.unhandled && error.status >= 500 && context.event?.req?.headers instanceof Headers && context.event.req.headers.get("x-nitro-prerender")) consola.error(`[prerender error]`, `[${context.event.req.method}]`, `[${context.event.req.url}]`, error);
});
//#endregion
export { nitro_prerenderer_default as default };
