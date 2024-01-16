var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// .wrangler/tmp/bundle-PhepEA/checked-fetch.js
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-PhepEA/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// node_modules/.pnpm/wrangler@3.22.4/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/.pnpm/wrangler@3.22.4/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/.pnpm/cookie@0.6.0/node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/.pnpm/cookie@0.6.0/node_modules/cookie/index.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    exports.parse = parse2;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var dec = opt.decode || decode;
      var index = 0;
      while (index < str.length) {
        var eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key = str.slice(index, eqIdx).trim();
        if (void 0 === obj[key]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/warnings.js
var require_warnings = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/warnings.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var alreadyWarned = {};
    function warnOnce(condition, message) {
      if (!condition && !alreadyWarned[message]) {
        alreadyWarned[message] = true;
        console.warn(message);
      }
    }
    exports.warnOnce = warnOnce;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/cookies.js
var require_cookies = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/cookies.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var cookie = require_cookie();
    var warnings = require_warnings();
    var createCookieFactory = ({
      sign,
      unsign
    }) => (name, cookieOptions = {}) => {
      let {
        secrets = [],
        ...options
      } = {
        path: "/",
        sameSite: "lax",
        ...cookieOptions
      };
      warnOnceAboutExpiresCookie(name, options.expires);
      return {
        get name() {
          return name;
        },
        get isSigned() {
          return secrets.length > 0;
        },
        get expires() {
          return typeof options.maxAge !== "undefined" ? new Date(Date.now() + options.maxAge * 1e3) : options.expires;
        },
        async parse(cookieHeader, parseOptions) {
          if (!cookieHeader)
            return null;
          let cookies = cookie.parse(cookieHeader, {
            ...options,
            ...parseOptions
          });
          return name in cookies ? cookies[name] === "" ? "" : await decodeCookieValue(unsign, cookies[name], secrets) : null;
        },
        async serialize(value, serializeOptions) {
          return cookie.serialize(name, value === "" ? "" : await encodeCookieValue(sign, value, secrets), {
            ...options,
            ...serializeOptions
          });
        }
      };
    };
    var isCookie = (object) => {
      return object != null && typeof object.name === "string" && typeof object.isSigned === "boolean" && typeof object.parse === "function" && typeof object.serialize === "function";
    };
    async function encodeCookieValue(sign, value, secrets) {
      let encoded = encodeData(value);
      if (secrets.length > 0) {
        encoded = await sign(encoded, secrets[0]);
      }
      return encoded;
    }
    async function decodeCookieValue(unsign, value, secrets) {
      if (secrets.length > 0) {
        for (let secret of secrets) {
          let unsignedValue = await unsign(value, secret);
          if (unsignedValue !== false) {
            return decodeData(unsignedValue);
          }
        }
        return null;
      }
      return decodeData(value);
    }
    function encodeData(value) {
      return btoa(myUnescape(encodeURIComponent(JSON.stringify(value))));
    }
    function decodeData(value) {
      try {
        return JSON.parse(decodeURIComponent(myEscape(atob(value))));
      } catch (error) {
        return {};
      }
    }
    function myEscape(value) {
      let str = value.toString();
      let result = "";
      let index = 0;
      let chr, code;
      while (index < str.length) {
        chr = str.charAt(index++);
        if (/[\w*+\-./@]/.exec(chr)) {
          result += chr;
        } else {
          code = chr.charCodeAt(0);
          if (code < 256) {
            result += "%" + hex(code, 2);
          } else {
            result += "%u" + hex(code, 4).toUpperCase();
          }
        }
      }
      return result;
    }
    function hex(code, length) {
      let result = code.toString(16);
      while (result.length < length)
        result = "0" + result;
      return result;
    }
    function myUnescape(value) {
      let str = value.toString();
      let result = "";
      let index = 0;
      let chr, part;
      while (index < str.length) {
        chr = str.charAt(index++);
        if (chr === "%") {
          if (str.charAt(index) === "u") {
            part = str.slice(index + 1, index + 5);
            if (/^[\da-f]{4}$/i.exec(part)) {
              result += String.fromCharCode(parseInt(part, 16));
              index += 5;
              continue;
            }
          } else {
            part = str.slice(index, index + 2);
            if (/^[\da-f]{2}$/i.exec(part)) {
              result += String.fromCharCode(parseInt(part, 16));
              index += 2;
              continue;
            }
          }
        }
        result += chr;
      }
      return result;
    }
    function warnOnceAboutExpiresCookie(name, expires) {
      warnings.warnOnce(!expires, `The "${name}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`);
    }
    exports.createCookieFactory = createCookieFactory;
    exports.isCookie = isCookie;
  }
});

// node_modules/.pnpm/@web3-storage+multipart-parser@1.0.0/node_modules/@web3-storage/multipart-parser/esm/src/utils.js
function stringToArray(s) {
  const utf8 = unescape(encodeURIComponent(s));
  return Uint8Array.from(utf8, (_, i) => utf8.charCodeAt(i));
}
function arrayToString(a) {
  const utf8 = String.fromCharCode.apply(null, a);
  return decodeURIComponent(escape(utf8));
}
function mergeArrays(...arrays) {
  const out = new Uint8Array(arrays.reduce((total, arr) => total + arr.length, 0));
  let offset = 0;
  for (const arr of arrays) {
    out.set(arr, offset);
    offset += arr.length;
  }
  return out;
}
function arraysEqual(a, b2) {
  if (a.length !== b2.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b2[i]) {
      return false;
    }
  }
  return true;
}
var init_utils = __esm({
  "node_modules/.pnpm/@web3-storage+multipart-parser@1.0.0/node_modules/@web3-storage/multipart-parser/esm/src/utils.js"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// node_modules/.pnpm/@web3-storage+multipart-parser@1.0.0/node_modules/@web3-storage/multipart-parser/esm/src/search.js
function coerce(a) {
  if (a instanceof Uint8Array) {
    return (index) => a[index];
  }
  return a;
}
function jsmemcmp(buf1, pos1, buf2, pos2, len) {
  const fn1 = coerce(buf1);
  const fn2 = coerce(buf2);
  for (let i = 0; i < len; ++i) {
    if (fn1(pos1 + i) !== fn2(pos2 + i)) {
      return false;
    }
  }
  return true;
}
function createOccurenceTable(s) {
  const table = new Array(256).fill(s.length);
  if (s.length > 1) {
    for (let i = 0; i < s.length - 1; i++) {
      table[s[i]] = s.length - 1 - i;
    }
  }
  return table;
}
var MATCH, StreamSearch, ReadableStreamSearch, EOQ, QueueableStreamSearch;
var init_search = __esm({
  "node_modules/.pnpm/@web3-storage+multipart-parser@1.0.0/node_modules/@web3-storage/multipart-parser/esm/src/search.js"() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_utils();
    MATCH = Symbol("Match");
    StreamSearch = class {
      constructor(needle) {
        this._lookbehind = new Uint8Array();
        if (typeof needle === "string") {
          this._needle = needle = stringToArray(needle);
        } else {
          this._needle = needle;
        }
        this._lastChar = needle[needle.length - 1];
        this._occ = createOccurenceTable(needle);
      }
      feed(chunk) {
        let pos = 0;
        let tokens;
        const allTokens = [];
        while (pos !== chunk.length) {
          ;
          [pos, ...tokens] = this._feed(chunk, pos);
          allTokens.push(...tokens);
        }
        return allTokens;
      }
      end() {
        const tail = this._lookbehind;
        this._lookbehind = new Uint8Array();
        return tail;
      }
      _feed(data, bufPos) {
        const tokens = [];
        let pos = -this._lookbehind.length;
        if (pos < 0) {
          while (pos < 0 && pos <= data.length - this._needle.length) {
            const ch = this._charAt(data, pos + this._needle.length - 1);
            if (ch === this._lastChar && this._memcmp(data, pos, this._needle.length - 1)) {
              if (pos > -this._lookbehind.length) {
                tokens.push(this._lookbehind.slice(0, this._lookbehind.length + pos));
              }
              tokens.push(MATCH);
              this._lookbehind = new Uint8Array();
              return [
                pos + this._needle.length,
                ...tokens
              ];
            } else {
              pos += this._occ[ch];
            }
          }
          if (pos < 0) {
            while (pos < 0 && !this._memcmp(data, pos, data.length - pos)) {
              pos++;
            }
          }
          if (pos >= 0) {
            tokens.push(this._lookbehind);
            this._lookbehind = new Uint8Array();
          } else {
            const bytesToCutOff = this._lookbehind.length + pos;
            if (bytesToCutOff > 0) {
              tokens.push(this._lookbehind.slice(0, bytesToCutOff));
              this._lookbehind = this._lookbehind.slice(bytesToCutOff);
            }
            this._lookbehind = Uint8Array.from(new Array(this._lookbehind.length + data.length), (_, i) => this._charAt(data, i - this._lookbehind.length));
            return [
              data.length,
              ...tokens
            ];
          }
        }
        pos += bufPos;
        while (pos <= data.length - this._needle.length) {
          const ch = data[pos + this._needle.length - 1];
          if (ch === this._lastChar && data[pos] === this._needle[0] && jsmemcmp(this._needle, 0, data, pos, this._needle.length - 1)) {
            if (pos > bufPos) {
              tokens.push(data.slice(bufPos, pos));
            }
            tokens.push(MATCH);
            return [
              pos + this._needle.length,
              ...tokens
            ];
          } else {
            pos += this._occ[ch];
          }
        }
        if (pos < data.length) {
          while (pos < data.length && (data[pos] !== this._needle[0] || !jsmemcmp(data, pos, this._needle, 0, data.length - pos))) {
            ++pos;
          }
          if (pos < data.length) {
            this._lookbehind = data.slice(pos);
          }
        }
        if (pos > 0) {
          tokens.push(data.slice(bufPos, pos < data.length ? pos : data.length));
        }
        return [
          data.length,
          ...tokens
        ];
      }
      _charAt(data, pos) {
        if (pos < 0) {
          return this._lookbehind[this._lookbehind.length + pos];
        }
        return data[pos];
      }
      _memcmp(data, pos, len) {
        return jsmemcmp(this._charAt.bind(this, data), pos, this._needle, 0, len);
      }
    };
    ReadableStreamSearch = class {
      constructor(needle, _readableStream) {
        this._readableStream = _readableStream;
        this._search = new StreamSearch(needle);
      }
      async *[Symbol.asyncIterator]() {
        const reader = this._readableStream.getReader();
        try {
          while (true) {
            const result = await reader.read();
            if (result.done) {
              break;
            }
            yield* this._search.feed(result.value);
          }
          const tail = this._search.end();
          if (tail.length) {
            yield tail;
          }
        } finally {
          reader.releaseLock();
        }
      }
    };
    EOQ = Symbol("End of Queue");
    QueueableStreamSearch = class {
      constructor(needle) {
        this._chunksQueue = [];
        this._closed = false;
        this._search = new StreamSearch(needle);
      }
      push(...chunks) {
        if (this._closed) {
          throw new Error("cannot call push after close");
        }
        this._chunksQueue.push(...chunks);
        if (this._notify) {
          this._notify();
        }
      }
      close() {
        if (this._closed) {
          throw new Error("close was already called");
        }
        this._closed = true;
        this._chunksQueue.push(EOQ);
        if (this._notify) {
          this._notify();
        }
      }
      async *[Symbol.asyncIterator]() {
        while (true) {
          let chunk;
          while (!(chunk = this._chunksQueue.shift())) {
            await new Promise((resolve) => this._notify = resolve);
            this._notify = void 0;
          }
          if (chunk === EOQ) {
            break;
          }
          yield* this._search.feed(chunk);
        }
        const tail = this._search.end();
        if (tail.length) {
          yield tail;
        }
      }
    };
  }
});

// node_modules/.pnpm/@web3-storage+multipart-parser@1.0.0/node_modules/@web3-storage/multipart-parser/esm/src/index.js
var src_exports = {};
__export(src_exports, {
  iterateMultipart: () => iterateMultipart,
  streamMultipart: () => streamMultipart
});
function parseContentDisposition(header) {
  const parts = header.split(";").map((part) => part.trim());
  if (parts.shift() !== "form-data") {
    throw new Error('malformed content-disposition header: missing "form-data" in `' + JSON.stringify(parts) + "`");
  }
  const out = {};
  for (const part of parts) {
    const kv = part.split("=", 2);
    if (kv.length !== 2) {
      throw new Error("malformed content-disposition header: key-value pair not found - " + part + " in `" + header + "`");
    }
    const [name, value] = kv;
    if (value[0] === '"' && value[value.length - 1] === '"') {
      out[name] = value.slice(1, -1).replace(/\\"/g, '"');
    } else if (value[0] !== '"' && value[value.length - 1] !== '"') {
      out[name] = value;
    } else if (value[0] === '"' && value[value.length - 1] !== '"' || value[0] !== '"' && value[value.length - 1] === '"') {
      throw new Error("malformed content-disposition header: mismatched quotations in `" + header + "`");
    }
  }
  if (!out.name) {
    throw new Error("malformed content-disposition header: missing field name in `" + header + "`");
  }
  return out;
}
function parsePartHeaders(lines) {
  const entries = [];
  let disposition = false;
  let line;
  while (typeof (line = lines.shift()) !== "undefined") {
    const colon = line.indexOf(":");
    if (colon === -1) {
      throw new Error("malformed multipart-form header: missing colon");
    }
    const header = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();
    switch (header) {
      case "content-disposition":
        disposition = true;
        entries.push(...Object.entries(parseContentDisposition(value)));
        break;
      case "content-type":
        entries.push([
          "contentType",
          value
        ]);
    }
  }
  if (!disposition) {
    throw new Error("malformed multipart-form header: missing content-disposition");
  }
  return Object.fromEntries(entries);
}
async function readHeaderLines(it, needle) {
  let firstChunk = true;
  let lastTokenWasMatch = false;
  const headerLines = [[]];
  const crlfSearch = new StreamSearch(CRLF);
  for (; ; ) {
    const result = await it.next();
    if (result.done) {
      throw new Error("malformed multipart-form data: unexpected end of stream");
    }
    if (firstChunk && result.value !== MATCH && arraysEqual(result.value.slice(0, 2), dash)) {
      return [
        void 0,
        new Uint8Array()
      ];
    }
    let chunk;
    if (result.value !== MATCH) {
      chunk = result.value;
    } else if (!lastTokenWasMatch) {
      chunk = needle;
    } else {
      throw new Error("malformed multipart-form data: unexpected boundary");
    }
    if (!chunk.length) {
      continue;
    }
    if (firstChunk) {
      firstChunk = false;
    }
    const tokens = crlfSearch.feed(chunk);
    for (const [i, token] of tokens.entries()) {
      const isMatch = token === MATCH;
      if (!isMatch && !token.length) {
        continue;
      }
      if (lastTokenWasMatch && isMatch) {
        tokens.push(crlfSearch.end());
        return [
          headerLines.filter((chunks) => chunks.length).map(mergeArrays2).map(arrayToString),
          mergeArrays(...tokens.slice(i + 1).map((token2) => token2 === MATCH ? CRLF : token2))
        ];
      }
      if (lastTokenWasMatch = isMatch) {
        headerLines.push([]);
      } else {
        headerLines[headerLines.length - 1].push(token);
      }
    }
  }
}
async function* streamMultipart(body, boundary) {
  const needle = mergeArrays(dash, stringToArray(boundary));
  const it = new ReadableStreamSearch(needle, body)[Symbol.asyncIterator]();
  for (; ; ) {
    const result = await it.next();
    if (result.done) {
      return;
    }
    if (result.value === MATCH) {
      break;
    }
  }
  const crlfSearch = new StreamSearch(CRLF);
  for (; ; ) {
    let feedChunk = function(chunk) {
      const chunks = [];
      for (const token of crlfSearch.feed(chunk)) {
        if (trailingCRLF) {
          chunks.push(CRLF);
        }
        if (!(trailingCRLF = token === MATCH)) {
          chunks.push(token);
        }
      }
      return mergeArrays(...chunks);
    };
    const [headerLines, tail] = await readHeaderLines(it, needle);
    if (!headerLines) {
      return;
    }
    async function nextToken() {
      const result = await it.next();
      if (result.done) {
        throw new Error("malformed multipart-form data: unexpected end of stream");
      }
      return result;
    }
    let trailingCRLF = false;
    let done = false;
    async function nextChunk() {
      const result = await nextToken();
      let chunk;
      if (result.value !== MATCH) {
        chunk = result.value;
      } else if (!trailingCRLF) {
        chunk = CRLF;
      } else {
        done = true;
        return { value: crlfSearch.end() };
      }
      return { value: feedChunk(chunk) };
    }
    const bufferedChunks = [{ value: feedChunk(tail) }];
    yield {
      ...parsePartHeaders(headerLines),
      data: {
        [Symbol.asyncIterator]() {
          return this;
        },
        async next() {
          for (; ; ) {
            const result = bufferedChunks.shift();
            if (!result) {
              break;
            }
            if (result.value.length > 0) {
              return result;
            }
          }
          for (; ; ) {
            if (done) {
              return {
                done,
                value: void 0
              };
            }
            const result = await nextChunk();
            if (result.value.length > 0) {
              return result;
            }
          }
        }
      }
    };
    while (!done) {
      bufferedChunks.push(await nextChunk());
    }
  }
}
async function* iterateMultipart(body, boundary) {
  for await (const part of streamMultipart(body, boundary)) {
    const chunks = [];
    for await (const chunk of part.data) {
      chunks.push(chunk);
    }
    yield {
      ...part,
      data: mergeArrays(...chunks)
    };
  }
}
var mergeArrays2, dash, CRLF;
var init_src = __esm({
  "node_modules/.pnpm/@web3-storage+multipart-parser@1.0.0/node_modules/@web3-storage/multipart-parser/esm/src/index.js"() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_search();
    init_utils();
    mergeArrays2 = Function.prototype.apply.bind(mergeArrays, void 0);
    dash = stringToArray("--");
    CRLF = stringToArray("\r\n");
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/formData.js
var require_formData = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/formData.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var multipartParser = (init_src(), __toCommonJS(src_exports));
    function composeUploadHandlers(...handlers) {
      return async (part) => {
        for (let handler of handlers) {
          let value = await handler(part);
          if (typeof value !== "undefined" && value !== null) {
            return value;
          }
        }
        return void 0;
      };
    }
    async function parseMultipartFormData(request, uploadHandler) {
      let contentType = request.headers.get("Content-Type") || "";
      let [type, boundary] = contentType.split(/\s*;\s*boundary=/);
      if (!request.body || !boundary || type !== "multipart/form-data") {
        throw new TypeError("Could not parse content as FormData.");
      }
      let formData = new FormData();
      let parts = multipartParser.streamMultipart(request.body, boundary);
      for await (let part of parts) {
        if (part.done)
          break;
        if (typeof part.filename === "string") {
          part.filename = part.filename.split(/[/\\]/).pop();
        }
        let value = await uploadHandler(part);
        if (typeof value !== "undefined" && value !== null) {
          formData.append(part.name, value);
        }
      }
      return formData;
    }
    exports.composeUploadHandlers = composeUploadHandlers;
    exports.parseMultipartFormData = parseMultipartFormData;
  }
});

// node_modules/.pnpm/@remix-run+router@1.14.2/node_modules/@remix-run/router/dist/router.cjs.js
var require_router_cjs = __commonJS({
  "node_modules/.pnpm/@remix-run+router@1.14.2/node_modules/@remix-run/router/dist/router.cjs.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    function _extends() {
      _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    var Action = /* @__PURE__ */ function(Action2) {
      Action2["Pop"] = "POP";
      Action2["Push"] = "PUSH";
      Action2["Replace"] = "REPLACE";
      return Action2;
    }({});
    var PopStateEventType = "popstate";
    function createMemoryHistory(options) {
      if (options === void 0) {
        options = {};
      }
      let {
        initialEntries = ["/"],
        initialIndex,
        v5Compat = false
      } = options;
      let entries;
      entries = initialEntries.map((entry, index2) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index2 === 0 ? "default" : void 0));
      let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
      let action = Action.Pop;
      let listener = null;
      function clampIndex(n) {
        return Math.min(Math.max(n, 0), entries.length - 1);
      }
      function getCurrentLocation() {
        return entries[index];
      }
      function createMemoryLocation(to, state, key) {
        if (state === void 0) {
          state = null;
        }
        let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
        warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
        return location;
      }
      function createHref(to) {
        return typeof to === "string" ? to : createPath(to);
      }
      let history = {
        get index() {
          return index;
        },
        get action() {
          return action;
        },
        get location() {
          return getCurrentLocation();
        },
        createHref,
        createURL(to) {
          return new URL(createHref(to), "http://localhost");
        },
        encodeLocation(to) {
          let path = typeof to === "string" ? parsePath(to) : to;
          return {
            pathname: path.pathname || "",
            search: path.search || "",
            hash: path.hash || ""
          };
        },
        push(to, state) {
          action = Action.Push;
          let nextLocation = createMemoryLocation(to, state);
          index += 1;
          entries.splice(index, entries.length, nextLocation);
          if (v5Compat && listener) {
            listener({
              action,
              location: nextLocation,
              delta: 1
            });
          }
        },
        replace(to, state) {
          action = Action.Replace;
          let nextLocation = createMemoryLocation(to, state);
          entries[index] = nextLocation;
          if (v5Compat && listener) {
            listener({
              action,
              location: nextLocation,
              delta: 0
            });
          }
        },
        go(delta) {
          action = Action.Pop;
          let nextIndex = clampIndex(index + delta);
          let nextLocation = entries[nextIndex];
          index = nextIndex;
          if (listener) {
            listener({
              action,
              location: nextLocation,
              delta
            });
          }
        },
        listen(fn) {
          listener = fn;
          return () => {
            listener = null;
          };
        }
      };
      return history;
    }
    function createBrowserHistory(options) {
      if (options === void 0) {
        options = {};
      }
      function createBrowserLocation(window2, globalHistory) {
        let {
          pathname,
          search,
          hash
        } = window2.location;
        return createLocation(
          "",
          {
            pathname,
            search,
            hash
          },
          // state defaults to `null` because `window.history.state` does
          globalHistory.state && globalHistory.state.usr || null,
          globalHistory.state && globalHistory.state.key || "default"
        );
      }
      function createBrowserHref(window2, to) {
        return typeof to === "string" ? to : createPath(to);
      }
      return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
    }
    function createHashHistory(options) {
      if (options === void 0) {
        options = {};
      }
      function createHashLocation(window2, globalHistory) {
        let {
          pathname = "/",
          search = "",
          hash = ""
        } = parsePath(window2.location.hash.substr(1));
        if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
          pathname = "/" + pathname;
        }
        return createLocation(
          "",
          {
            pathname,
            search,
            hash
          },
          // state defaults to `null` because `window.history.state` does
          globalHistory.state && globalHistory.state.usr || null,
          globalHistory.state && globalHistory.state.key || "default"
        );
      }
      function createHashHref(window2, to) {
        let base = window2.document.querySelector("base");
        let href = "";
        if (base && base.getAttribute("href")) {
          let url = window2.location.href;
          let hashIndex = url.indexOf("#");
          href = hashIndex === -1 ? url : url.slice(0, hashIndex);
        }
        return href + "#" + (typeof to === "string" ? to : createPath(to));
      }
      function validateHashLocation(location, to) {
        warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
      }
      return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
    }
    function invariant(value, message) {
      if (value === false || value === null || typeof value === "undefined") {
        throw new Error(message);
      }
    }
    function warning(cond, message) {
      if (!cond) {
        if (typeof console !== "undefined")
          console.warn(message);
        try {
          throw new Error(message);
        } catch (e) {
        }
      }
    }
    function createKey() {
      return Math.random().toString(36).substr(2, 8);
    }
    function getHistoryState(location, index) {
      return {
        usr: location.state,
        key: location.key,
        idx: index
      };
    }
    function createLocation(current, to, state, key) {
      if (state === void 0) {
        state = null;
      }
      let location = _extends({
        pathname: typeof current === "string" ? current : current.pathname,
        search: "",
        hash: ""
      }, typeof to === "string" ? parsePath(to) : to, {
        state,
        // TODO: This could be cleaned up.  push/replace should probably just take
        // full Locations now and avoid the need to run through this flow at all
        // But that's a pretty big refactor to the current test suite so going to
        // keep as is for the time being and just let any incoming keys take precedence
        key: to && to.key || key || createKey()
      });
      return location;
    }
    function createPath(_ref) {
      let {
        pathname = "/",
        search = "",
        hash = ""
      } = _ref;
      if (search && search !== "?")
        pathname += search.charAt(0) === "?" ? search : "?" + search;
      if (hash && hash !== "#")
        pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
      return pathname;
    }
    function parsePath(path) {
      let parsedPath = {};
      if (path) {
        let hashIndex = path.indexOf("#");
        if (hashIndex >= 0) {
          parsedPath.hash = path.substr(hashIndex);
          path = path.substr(0, hashIndex);
        }
        let searchIndex = path.indexOf("?");
        if (searchIndex >= 0) {
          parsedPath.search = path.substr(searchIndex);
          path = path.substr(0, searchIndex);
        }
        if (path) {
          parsedPath.pathname = path;
        }
      }
      return parsedPath;
    }
    function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
      if (options === void 0) {
        options = {};
      }
      let {
        window: window2 = document.defaultView,
        v5Compat = false
      } = options;
      let globalHistory = window2.history;
      let action = Action.Pop;
      let listener = null;
      let index = getIndex();
      if (index == null) {
        index = 0;
        globalHistory.replaceState(_extends({}, globalHistory.state, {
          idx: index
        }), "");
      }
      function getIndex() {
        let state = globalHistory.state || {
          idx: null
        };
        return state.idx;
      }
      function handlePop() {
        action = Action.Pop;
        let nextIndex = getIndex();
        let delta = nextIndex == null ? null : nextIndex - index;
        index = nextIndex;
        if (listener) {
          listener({
            action,
            location: history.location,
            delta
          });
        }
      }
      function push(to, state) {
        action = Action.Push;
        let location = createLocation(history.location, to, state);
        if (validateLocation)
          validateLocation(location, to);
        index = getIndex() + 1;
        let historyState = getHistoryState(location, index);
        let url = history.createHref(location);
        try {
          globalHistory.pushState(historyState, "", url);
        } catch (error) {
          if (error instanceof DOMException && error.name === "DataCloneError") {
            throw error;
          }
          window2.location.assign(url);
        }
        if (v5Compat && listener) {
          listener({
            action,
            location: history.location,
            delta: 1
          });
        }
      }
      function replace(to, state) {
        action = Action.Replace;
        let location = createLocation(history.location, to, state);
        if (validateLocation)
          validateLocation(location, to);
        index = getIndex();
        let historyState = getHistoryState(location, index);
        let url = history.createHref(location);
        globalHistory.replaceState(historyState, "", url);
        if (v5Compat && listener) {
          listener({
            action,
            location: history.location,
            delta: 0
          });
        }
      }
      function createURL(to) {
        let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
        let href = typeof to === "string" ? to : createPath(to);
        invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
        return new URL(href, base);
      }
      let history = {
        get action() {
          return action;
        },
        get location() {
          return getLocation(window2, globalHistory);
        },
        listen(fn) {
          if (listener) {
            throw new Error("A history only accepts one active listener");
          }
          window2.addEventListener(PopStateEventType, handlePop);
          listener = fn;
          return () => {
            window2.removeEventListener(PopStateEventType, handlePop);
            listener = null;
          };
        },
        createHref(to) {
          return createHref(window2, to);
        },
        createURL,
        encodeLocation(to) {
          let url = createURL(to);
          return {
            pathname: url.pathname,
            search: url.search,
            hash: url.hash
          };
        },
        push,
        replace,
        go(n) {
          return globalHistory.go(n);
        }
      };
      return history;
    }
    var ResultType = /* @__PURE__ */ function(ResultType2) {
      ResultType2["data"] = "data";
      ResultType2["deferred"] = "deferred";
      ResultType2["redirect"] = "redirect";
      ResultType2["error"] = "error";
      return ResultType2;
    }({});
    var immutableRouteKeys = /* @__PURE__ */ new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
    function isIndexRoute(route) {
      return route.index === true;
    }
    function convertRoutesToDataRoutes(routes, mapRouteProperties, parentPath, manifest2) {
      if (parentPath === void 0) {
        parentPath = [];
      }
      if (manifest2 === void 0) {
        manifest2 = {};
      }
      return routes.map((route, index) => {
        let treePath = [...parentPath, index];
        let id = typeof route.id === "string" ? route.id : treePath.join("-");
        invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
        invariant(!manifest2[id], 'Found a route id collision on id "' + id + `".  Route id's must be globally unique within Data Router usages`);
        if (isIndexRoute(route)) {
          let indexRoute = _extends({}, route, mapRouteProperties(route), {
            id
          });
          manifest2[id] = indexRoute;
          return indexRoute;
        } else {
          let pathOrLayoutRoute = _extends({}, route, mapRouteProperties(route), {
            id,
            children: void 0
          });
          manifest2[id] = pathOrLayoutRoute;
          if (route.children) {
            pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties, treePath, manifest2);
          }
          return pathOrLayoutRoute;
        }
      });
    }
    function matchRoutes(routes, locationArg, basename) {
      if (basename === void 0) {
        basename = "/";
      }
      let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
      let pathname = stripBasename(location.pathname || "/", basename);
      if (pathname == null) {
        return null;
      }
      let branches = flattenRoutes(routes);
      rankRouteBranches(branches);
      let matches = null;
      for (let i = 0; matches == null && i < branches.length; ++i) {
        matches = matchRouteBranch(
          branches[i],
          // Incoming pathnames are generally encoded from either window.location
          // or from router.navigate, but we want to match against the unencoded
          // paths in the route definitions.  Memory router locations won't be
          // encoded here but there also shouldn't be anything to decode so this
          // should be a safe operation.  This avoids needing matchRoutes to be
          // history-aware.
          safelyDecodeURI(pathname)
        );
      }
      return matches;
    }
    function convertRouteMatchToUiMatch(match, loaderData) {
      let {
        route,
        pathname,
        params
      } = match;
      return {
        id: route.id,
        pathname,
        params,
        data: loaderData[route.id],
        handle: route.handle
      };
    }
    function flattenRoutes(routes, branches, parentsMeta, parentPath) {
      if (branches === void 0) {
        branches = [];
      }
      if (parentsMeta === void 0) {
        parentsMeta = [];
      }
      if (parentPath === void 0) {
        parentPath = "";
      }
      let flattenRoute = (route, index, relativePath) => {
        let meta = {
          relativePath: relativePath === void 0 ? route.path || "" : relativePath,
          caseSensitive: route.caseSensitive === true,
          childrenIndex: index,
          route
        };
        if (meta.relativePath.startsWith("/")) {
          invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
          meta.relativePath = meta.relativePath.slice(parentPath.length);
        }
        let path = joinPaths([parentPath, meta.relativePath]);
        let routesMeta = parentsMeta.concat(meta);
        if (route.children && route.children.length > 0) {
          invariant(
            // Our types know better, but runtime JS may not!
            // @ts-expect-error
            route.index !== true,
            "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
          );
          flattenRoutes(route.children, branches, routesMeta, path);
        }
        if (route.path == null && !route.index) {
          return;
        }
        branches.push({
          path,
          score: computeScore(path, route.index),
          routesMeta
        });
      };
      routes.forEach((route, index) => {
        var _route$path;
        if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
          flattenRoute(route, index);
        } else {
          for (let exploded of explodeOptionalSegments(route.path)) {
            flattenRoute(route, index, exploded);
          }
        }
      });
      return branches;
    }
    function explodeOptionalSegments(path) {
      let segments = path.split("/");
      if (segments.length === 0)
        return [];
      let [first, ...rest] = segments;
      let isOptional = first.endsWith("?");
      let required = first.replace(/\?$/, "");
      if (rest.length === 0) {
        return isOptional ? [required, ""] : [required];
      }
      let restExploded = explodeOptionalSegments(rest.join("/"));
      let result = [];
      result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
      if (isOptional) {
        result.push(...restExploded);
      }
      return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
    }
    function rankRouteBranches(branches) {
      branches.sort((a, b2) => a.score !== b2.score ? b2.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b2.routesMeta.map((meta) => meta.childrenIndex)));
    }
    var paramRe = /^:[\w-]+$/;
    var dynamicSegmentValue = 3;
    var indexRouteValue = 2;
    var emptySegmentValue = 1;
    var staticSegmentValue = 10;
    var splatPenalty = -2;
    var isSplat = (s) => s === "*";
    function computeScore(path, index) {
      let segments = path.split("/");
      let initialScore = segments.length;
      if (segments.some(isSplat)) {
        initialScore += splatPenalty;
      }
      if (index) {
        initialScore += indexRouteValue;
      }
      return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
    }
    function compareIndexes(a, b2) {
      let siblings = a.length === b2.length && a.slice(0, -1).every((n, i) => n === b2[i]);
      return siblings ? (
        // If two routes are siblings, we should try to match the earlier sibling
        // first. This allows people to have fine-grained control over the matching
        // behavior by simply putting routes with identical paths in the order they
        // want them tried.
        a[a.length - 1] - b2[b2.length - 1]
      ) : (
        // Otherwise, it doesn't really make sense to rank non-siblings by index,
        // so they sort equally.
        0
      );
    }
    function matchRouteBranch(branch, pathname) {
      let {
        routesMeta
      } = branch;
      let matchedParams = {};
      let matchedPathname = "/";
      let matches = [];
      for (let i = 0; i < routesMeta.length; ++i) {
        let meta = routesMeta[i];
        let end = i === routesMeta.length - 1;
        let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
        let match = matchPath({
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end
        }, remainingPathname);
        if (!match)
          return null;
        Object.assign(matchedParams, match.params);
        let route = meta.route;
        matches.push({
          // TODO: Can this as be avoided?
          params: matchedParams,
          pathname: joinPaths([matchedPathname, match.pathname]),
          pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
          route
        });
        if (match.pathnameBase !== "/") {
          matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
        }
      }
      return matches;
    }
    function generatePath(originalPath, params) {
      if (params === void 0) {
        params = {};
      }
      let path = originalPath;
      if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
        warning(false, 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
        path = path.replace(/\*$/, "/*");
      }
      const prefix = path.startsWith("/") ? "/" : "";
      const stringify = (p) => p == null ? "" : typeof p === "string" ? p : String(p);
      const segments = path.split(/\/+/).map((segment, index, array) => {
        const isLastSegment = index === array.length - 1;
        if (isLastSegment && segment === "*") {
          const star = "*";
          return stringify(params[star]);
        }
        const keyMatch = segment.match(/^:([\w-]+)(\??)$/);
        if (keyMatch) {
          const [, key, optional] = keyMatch;
          let param = params[key];
          invariant(optional === "?" || param != null, 'Missing ":' + key + '" param');
          return stringify(param);
        }
        return segment.replace(/\?$/g, "");
      }).filter((segment) => !!segment);
      return prefix + segments.join("/");
    }
    function matchPath(pattern, pathname) {
      if (typeof pattern === "string") {
        pattern = {
          path: pattern,
          caseSensitive: false,
          end: true
        };
      }
      let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
      let match = pathname.match(matcher);
      if (!match)
        return null;
      let matchedPathname = match[0];
      let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
      let captureGroups = match.slice(1);
      let params = compiledParams.reduce((memo, _ref, index) => {
        let {
          paramName,
          isOptional
        } = _ref;
        if (paramName === "*") {
          let splatValue = captureGroups[index] || "";
          pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
        }
        const value = captureGroups[index];
        if (isOptional && !value) {
          memo[paramName] = void 0;
        } else {
          memo[paramName] = safelyDecodeURIComponent(value || "", paramName);
        }
        return memo;
      }, {});
      return {
        params,
        pathname: matchedPathname,
        pathnameBase,
        pattern
      };
    }
    function compilePath(path, caseSensitive, end) {
      if (caseSensitive === void 0) {
        caseSensitive = false;
      }
      if (end === void 0) {
        end = true;
      }
      warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
      let params = [];
      let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
        params.push({
          paramName,
          isOptional: isOptional != null
        });
        return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
      });
      if (path.endsWith("*")) {
        params.push({
          paramName: "*"
        });
        regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
      } else if (end) {
        regexpSource += "\\/*$";
      } else if (path !== "" && path !== "/") {
        regexpSource += "(?:(?=\\/|$))";
      } else
        ;
      let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
      return [matcher, params];
    }
    function safelyDecodeURI(value) {
      try {
        return decodeURI(value);
      } catch (error) {
        warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
        return value;
      }
    }
    function safelyDecodeURIComponent(value, paramName) {
      try {
        return decodeURIComponent(value);
      } catch (error) {
        warning(false, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ")."));
        return value;
      }
    }
    function stripBasename(pathname, basename) {
      if (basename === "/")
        return pathname;
      if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
        return null;
      }
      let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
      let nextChar = pathname.charAt(startIndex);
      if (nextChar && nextChar !== "/") {
        return null;
      }
      return pathname.slice(startIndex) || "/";
    }
    function resolvePath(to, fromPathname) {
      if (fromPathname === void 0) {
        fromPathname = "/";
      }
      let {
        pathname: toPathname,
        search = "",
        hash = ""
      } = typeof to === "string" ? parsePath(to) : to;
      let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
      return {
        pathname,
        search: normalizeSearch(search),
        hash: normalizeHash(hash)
      };
    }
    function resolvePathname(relativePath, fromPathname) {
      let segments = fromPathname.replace(/\/+$/, "").split("/");
      let relativeSegments = relativePath.split("/");
      relativeSegments.forEach((segment) => {
        if (segment === "..") {
          if (segments.length > 1)
            segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });
      return segments.length > 1 ? segments.join("/") : "/";
    }
    function getInvalidPathError(char, field, dest, path) {
      return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
    }
    function getPathContributingMatches(matches) {
      return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
    }
    function getResolveToMatches(matches, v7_relativeSplatPath) {
      let pathMatches = getPathContributingMatches(matches);
      if (v7_relativeSplatPath) {
        return pathMatches.map((match, idx) => idx === matches.length - 1 ? match.pathname : match.pathnameBase);
      }
      return pathMatches.map((match) => match.pathnameBase);
    }
    function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
      if (isPathRelative === void 0) {
        isPathRelative = false;
      }
      let to;
      if (typeof toArg === "string") {
        to = parsePath(toArg);
      } else {
        to = _extends({}, toArg);
        invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
        invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
        invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
      }
      let isEmptyPath = toArg === "" || to.pathname === "";
      let toPathname = isEmptyPath ? "/" : to.pathname;
      let from;
      if (toPathname == null) {
        from = locationPathname;
      } else {
        let routePathnameIndex = routePathnames.length - 1;
        if (!isPathRelative && toPathname.startsWith("..")) {
          let toSegments = toPathname.split("/");
          while (toSegments[0] === "..") {
            toSegments.shift();
            routePathnameIndex -= 1;
          }
          to.pathname = toSegments.join("/");
        }
        from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
      }
      let path = resolvePath(to, from);
      let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
      let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
      if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
        path.pathname += "/";
      }
      return path;
    }
    function getToPathname(to) {
      return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
    }
    var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
    var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
    var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
    var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
    var json = function json2(data, init) {
      if (init === void 0) {
        init = {};
      }
      let responseInit = typeof init === "number" ? {
        status: init
      } : init;
      let headers = new Headers(responseInit.headers);
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json; charset=utf-8");
      }
      return new Response(JSON.stringify(data), _extends({}, responseInit, {
        headers
      }));
    };
    var AbortedDeferredError = class extends Error {
    };
    var DeferredData = class {
      constructor(data, responseInit) {
        this.pendingKeysSet = /* @__PURE__ */ new Set();
        this.subscribers = /* @__PURE__ */ new Set();
        this.deferredKeys = [];
        invariant(data && typeof data === "object" && !Array.isArray(data), "defer() only accepts plain objects");
        let reject;
        this.abortPromise = new Promise((_, r) => reject = r);
        this.controller = new AbortController();
        let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
        this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort);
        this.controller.signal.addEventListener("abort", onAbort);
        this.data = Object.entries(data).reduce((acc, _ref2) => {
          let [key, value] = _ref2;
          return Object.assign(acc, {
            [key]: this.trackPromise(key, value)
          });
        }, {});
        if (this.done) {
          this.unlistenAbortSignal();
        }
        this.init = responseInit;
      }
      trackPromise(key, value) {
        if (!(value instanceof Promise)) {
          return value;
        }
        this.deferredKeys.push(key);
        this.pendingKeysSet.add(key);
        let promise = Promise.race([value, this.abortPromise]).then((data) => this.onSettle(promise, key, void 0, data), (error) => this.onSettle(promise, key, error));
        promise.catch(() => {
        });
        Object.defineProperty(promise, "_tracked", {
          get: () => true
        });
        return promise;
      }
      onSettle(promise, key, error, data) {
        if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
          this.unlistenAbortSignal();
          Object.defineProperty(promise, "_error", {
            get: () => error
          });
          return Promise.reject(error);
        }
        this.pendingKeysSet.delete(key);
        if (this.done) {
          this.unlistenAbortSignal();
        }
        if (error === void 0 && data === void 0) {
          let undefinedError = new Error('Deferred data for key "' + key + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
          Object.defineProperty(promise, "_error", {
            get: () => undefinedError
          });
          this.emit(false, key);
          return Promise.reject(undefinedError);
        }
        if (data === void 0) {
          Object.defineProperty(promise, "_error", {
            get: () => error
          });
          this.emit(false, key);
          return Promise.reject(error);
        }
        Object.defineProperty(promise, "_data", {
          get: () => data
        });
        this.emit(false, key);
        return data;
      }
      emit(aborted, settledKey) {
        this.subscribers.forEach((subscriber) => subscriber(aborted, settledKey));
      }
      subscribe(fn) {
        this.subscribers.add(fn);
        return () => this.subscribers.delete(fn);
      }
      cancel() {
        this.controller.abort();
        this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k));
        this.emit(true);
      }
      async resolveData(signal) {
        let aborted = false;
        if (!this.done) {
          let onAbort = () => this.cancel();
          signal.addEventListener("abort", onAbort);
          aborted = await new Promise((resolve) => {
            this.subscribe((aborted2) => {
              signal.removeEventListener("abort", onAbort);
              if (aborted2 || this.done) {
                resolve(aborted2);
              }
            });
          });
        }
        return aborted;
      }
      get done() {
        return this.pendingKeysSet.size === 0;
      }
      get unwrappedData() {
        invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
        return Object.entries(this.data).reduce((acc, _ref3) => {
          let [key, value] = _ref3;
          return Object.assign(acc, {
            [key]: unwrapTrackedPromise(value)
          });
        }, {});
      }
      get pendingKeys() {
        return Array.from(this.pendingKeysSet);
      }
    };
    function isTrackedPromise(value) {
      return value instanceof Promise && value._tracked === true;
    }
    function unwrapTrackedPromise(value) {
      if (!isTrackedPromise(value)) {
        return value;
      }
      if (value._error) {
        throw value._error;
      }
      return value._data;
    }
    var defer = function defer2(data, init) {
      if (init === void 0) {
        init = {};
      }
      let responseInit = typeof init === "number" ? {
        status: init
      } : init;
      return new DeferredData(data, responseInit);
    };
    var redirect = function redirect2(url, init) {
      if (init === void 0) {
        init = 302;
      }
      let responseInit = init;
      if (typeof responseInit === "number") {
        responseInit = {
          status: responseInit
        };
      } else if (typeof responseInit.status === "undefined") {
        responseInit.status = 302;
      }
      let headers = new Headers(responseInit.headers);
      headers.set("Location", url);
      return new Response(null, _extends({}, responseInit, {
        headers
      }));
    };
    var redirectDocument = (url, init) => {
      let response = redirect(url, init);
      response.headers.set("X-Remix-Reload-Document", "true");
      return response;
    };
    var ErrorResponseImpl = class {
      constructor(status, statusText, data, internal) {
        if (internal === void 0) {
          internal = false;
        }
        this.status = status;
        this.statusText = statusText || "";
        this.internal = internal;
        if (data instanceof Error) {
          this.data = data.toString();
          this.error = data;
        } else {
          this.data = data;
        }
      }
    };
    function isRouteErrorResponse(error) {
      return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
    }
    var validMutationMethodsArr = ["post", "put", "patch", "delete"];
    var validMutationMethods = new Set(validMutationMethodsArr);
    var validRequestMethodsArr = ["get", ...validMutationMethodsArr];
    var validRequestMethods = new Set(validRequestMethodsArr);
    var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    var redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
    var IDLE_NAVIGATION = {
      state: "idle",
      location: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    var IDLE_FETCHER = {
      state: "idle",
      data: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    var IDLE_BLOCKER = {
      state: "unblocked",
      proceed: void 0,
      reset: void 0,
      location: void 0
    };
    var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
    var defaultMapRouteProperties = (route) => ({
      hasErrorBoundary: Boolean(route.hasErrorBoundary)
    });
    var TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
    function createRouter(init) {
      const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
      const isBrowser = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
      const isServer = !isBrowser;
      invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
      let mapRouteProperties;
      if (init.mapRouteProperties) {
        mapRouteProperties = init.mapRouteProperties;
      } else if (init.detectErrorBoundary) {
        let detectErrorBoundary = init.detectErrorBoundary;
        mapRouteProperties = (route) => ({
          hasErrorBoundary: detectErrorBoundary(route)
        });
      } else {
        mapRouteProperties = defaultMapRouteProperties;
      }
      let manifest2 = {};
      let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties, void 0, manifest2);
      let inFlightDataRoutes;
      let basename = init.basename || "/";
      let future = _extends({
        v7_fetcherPersist: false,
        v7_normalizeFormMethod: false,
        v7_partialHydration: false,
        v7_prependBasename: false,
        v7_relativeSplatPath: false
      }, init.future);
      let unlistenHistory = null;
      let subscribers = /* @__PURE__ */ new Set();
      let savedScrollPositions = null;
      let getScrollRestorationKey = null;
      let getScrollPosition = null;
      let initialScrollRestored = init.hydrationData != null;
      let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
      let initialErrors = null;
      if (initialMatches == null) {
        let error = getInternalRouterError(404, {
          pathname: init.history.location.pathname
        });
        let {
          matches,
          route
        } = getShortCircuitMatches(dataRoutes);
        initialMatches = matches;
        initialErrors = {
          [route.id]: error
        };
      }
      let initialized;
      let hasLazyRoutes = initialMatches.some((m) => m.route.lazy);
      let hasLoaders = initialMatches.some((m) => m.route.loader);
      if (hasLazyRoutes) {
        initialized = false;
      } else if (!hasLoaders) {
        initialized = true;
      } else if (future.v7_partialHydration) {
        let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
        let errors = init.hydrationData ? init.hydrationData.errors : null;
        initialized = initialMatches.every((m) => m.route.loader && m.route.loader.hydrate !== true && (loaderData && loaderData[m.route.id] !== void 0 || errors && errors[m.route.id] !== void 0));
      } else {
        initialized = init.hydrationData != null;
      }
      let router;
      let state = {
        historyAction: init.history.action,
        location: init.history.location,
        matches: initialMatches,
        initialized,
        navigation: IDLE_NAVIGATION,
        // Don't restore on initial updateState() if we were SSR'd
        restoreScrollPosition: init.hydrationData != null ? false : null,
        preventScrollReset: false,
        revalidation: "idle",
        loaderData: init.hydrationData && init.hydrationData.loaderData || {},
        actionData: init.hydrationData && init.hydrationData.actionData || null,
        errors: init.hydrationData && init.hydrationData.errors || initialErrors,
        fetchers: /* @__PURE__ */ new Map(),
        blockers: /* @__PURE__ */ new Map()
      };
      let pendingAction = Action.Pop;
      let pendingPreventScrollReset = false;
      let pendingNavigationController;
      let pendingViewTransitionEnabled = false;
      let appliedViewTransitions = /* @__PURE__ */ new Map();
      let removePageHideEventListener = null;
      let isUninterruptedRevalidation = false;
      let isRevalidationRequired = false;
      let cancelledDeferredRoutes = [];
      let cancelledFetcherLoads = [];
      let fetchControllers = /* @__PURE__ */ new Map();
      let incrementingLoadId = 0;
      let pendingNavigationLoadId = -1;
      let fetchReloadIds = /* @__PURE__ */ new Map();
      let fetchRedirectIds = /* @__PURE__ */ new Set();
      let fetchLoadMatches = /* @__PURE__ */ new Map();
      let activeFetchers = /* @__PURE__ */ new Map();
      let deletedFetchers = /* @__PURE__ */ new Set();
      let activeDeferreds = /* @__PURE__ */ new Map();
      let blockerFunctions = /* @__PURE__ */ new Map();
      let ignoreNextHistoryUpdate = false;
      function initialize() {
        unlistenHistory = init.history.listen((_ref) => {
          let {
            action: historyAction,
            location,
            delta
          } = _ref;
          if (ignoreNextHistoryUpdate) {
            ignoreNextHistoryUpdate = false;
            return;
          }
          warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
          let blockerKey = shouldBlockNavigation({
            currentLocation: state.location,
            nextLocation: location,
            historyAction
          });
          if (blockerKey && delta != null) {
            ignoreNextHistoryUpdate = true;
            init.history.go(delta * -1);
            updateBlocker(blockerKey, {
              state: "blocked",
              location,
              proceed() {
                updateBlocker(blockerKey, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location
                });
                init.history.go(delta);
              },
              reset() {
                let blockers = new Map(state.blockers);
                blockers.set(blockerKey, IDLE_BLOCKER);
                updateState({
                  blockers
                });
              }
            });
            return;
          }
          return startNavigation(historyAction, location);
        });
        if (isBrowser) {
          restoreAppliedTransitions(routerWindow, appliedViewTransitions);
          let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
          routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
          removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
        }
        if (!state.initialized) {
          startNavigation(Action.Pop, state.location, {
            initialHydration: true
          });
        }
        return router;
      }
      function dispose() {
        if (unlistenHistory) {
          unlistenHistory();
        }
        if (removePageHideEventListener) {
          removePageHideEventListener();
        }
        subscribers.clear();
        pendingNavigationController && pendingNavigationController.abort();
        state.fetchers.forEach((_, key) => deleteFetcher(key));
        state.blockers.forEach((_, key) => deleteBlocker(key));
      }
      function subscribe(fn) {
        subscribers.add(fn);
        return () => subscribers.delete(fn);
      }
      function updateState(newState, opts) {
        if (opts === void 0) {
          opts = {};
        }
        state = _extends({}, state, newState);
        let completedFetchers = [];
        let deletedFetchersKeys = [];
        if (future.v7_fetcherPersist) {
          state.fetchers.forEach((fetcher, key) => {
            if (fetcher.state === "idle") {
              if (deletedFetchers.has(key)) {
                deletedFetchersKeys.push(key);
              } else {
                completedFetchers.push(key);
              }
            }
          });
        }
        [...subscribers].forEach((subscriber) => subscriber(state, {
          deletedFetchers: deletedFetchersKeys,
          unstable_viewTransitionOpts: opts.viewTransitionOpts,
          unstable_flushSync: opts.flushSync === true
        }));
        if (future.v7_fetcherPersist) {
          completedFetchers.forEach((key) => state.fetchers.delete(key));
          deletedFetchersKeys.forEach((key) => deleteFetcher(key));
        }
      }
      function completeNavigation(location, newState, _temp) {
        var _location$state, _location$state2;
        let {
          flushSync
        } = _temp === void 0 ? {} : _temp;
        let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
        let actionData;
        if (newState.actionData) {
          if (Object.keys(newState.actionData).length > 0) {
            actionData = newState.actionData;
          } else {
            actionData = null;
          }
        } else if (isActionReload) {
          actionData = state.actionData;
        } else {
          actionData = null;
        }
        let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
        let blockers = state.blockers;
        if (blockers.size > 0) {
          blockers = new Map(blockers);
          blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
        }
        let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
        if (inFlightDataRoutes) {
          dataRoutes = inFlightDataRoutes;
          inFlightDataRoutes = void 0;
        }
        if (isUninterruptedRevalidation)
          ;
        else if (pendingAction === Action.Pop)
          ;
        else if (pendingAction === Action.Push) {
          init.history.push(location, location.state);
        } else if (pendingAction === Action.Replace) {
          init.history.replace(location, location.state);
        }
        let viewTransitionOpts;
        if (pendingAction === Action.Pop) {
          let priorPaths = appliedViewTransitions.get(state.location.pathname);
          if (priorPaths && priorPaths.has(location.pathname)) {
            viewTransitionOpts = {
              currentLocation: state.location,
              nextLocation: location
            };
          } else if (appliedViewTransitions.has(location.pathname)) {
            viewTransitionOpts = {
              currentLocation: location,
              nextLocation: state.location
            };
          }
        } else if (pendingViewTransitionEnabled) {
          let toPaths = appliedViewTransitions.get(state.location.pathname);
          if (toPaths) {
            toPaths.add(location.pathname);
          } else {
            toPaths = /* @__PURE__ */ new Set([location.pathname]);
            appliedViewTransitions.set(state.location.pathname, toPaths);
          }
          viewTransitionOpts = {
            currentLocation: state.location,
            nextLocation: location
          };
        }
        updateState(_extends({}, newState, {
          // matches, errors, fetchers go through as-is
          actionData,
          loaderData,
          historyAction: pendingAction,
          location,
          initialized: true,
          navigation: IDLE_NAVIGATION,
          revalidation: "idle",
          restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
          preventScrollReset,
          blockers
        }), {
          viewTransitionOpts,
          flushSync: flushSync === true
        });
        pendingAction = Action.Pop;
        pendingPreventScrollReset = false;
        pendingViewTransitionEnabled = false;
        isUninterruptedRevalidation = false;
        isRevalidationRequired = false;
        cancelledDeferredRoutes = [];
        cancelledFetcherLoads = [];
      }
      async function navigate(to, opts) {
        if (typeof to === "number") {
          init.history.go(to);
          return;
        }
        let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, future.v7_relativeSplatPath, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
        let {
          path,
          submission,
          error
        } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
        let currentLocation = state.location;
        let nextLocation = createLocation(state.location, path, opts && opts.state);
        nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
        let userReplace = opts && opts.replace != null ? opts.replace : void 0;
        let historyAction = Action.Push;
        if (userReplace === true) {
          historyAction = Action.Replace;
        } else if (userReplace === false)
          ;
        else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
          historyAction = Action.Replace;
        }
        let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
        let flushSync = (opts && opts.unstable_flushSync) === true;
        let blockerKey = shouldBlockNavigation({
          currentLocation,
          nextLocation,
          historyAction
        });
        if (blockerKey) {
          updateBlocker(blockerKey, {
            state: "blocked",
            location: nextLocation,
            proceed() {
              updateBlocker(blockerKey, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: nextLocation
              });
              navigate(to, opts);
            },
            reset() {
              let blockers = new Map(state.blockers);
              blockers.set(blockerKey, IDLE_BLOCKER);
              updateState({
                blockers
              });
            }
          });
          return;
        }
        return await startNavigation(historyAction, nextLocation, {
          submission,
          // Send through the formData serialization error if we have one so we can
          // render at the right error boundary after we match routes
          pendingError: error,
          preventScrollReset,
          replace: opts && opts.replace,
          enableViewTransition: opts && opts.unstable_viewTransition,
          flushSync
        });
      }
      function revalidate() {
        interruptActiveLoads();
        updateState({
          revalidation: "loading"
        });
        if (state.navigation.state === "submitting") {
          return;
        }
        if (state.navigation.state === "idle") {
          startNavigation(state.historyAction, state.location, {
            startUninterruptedRevalidation: true
          });
          return;
        }
        startNavigation(pendingAction || state.historyAction, state.navigation.location, {
          overrideNavigation: state.navigation
        });
      }
      async function startNavigation(historyAction, location, opts) {
        pendingNavigationController && pendingNavigationController.abort();
        pendingNavigationController = null;
        pendingAction = historyAction;
        isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
        saveScrollPosition(state.location, state.matches);
        pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
        pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
        let routesToUse = inFlightDataRoutes || dataRoutes;
        let loadingNavigation = opts && opts.overrideNavigation;
        let matches = matchRoutes(routesToUse, location, basename);
        let flushSync = (opts && opts.flushSync) === true;
        if (!matches) {
          let error = getInternalRouterError(404, {
            pathname: location.pathname
          });
          let {
            matches: notFoundMatches,
            route
          } = getShortCircuitMatches(routesToUse);
          cancelActiveDeferreds();
          completeNavigation(location, {
            matches: notFoundMatches,
            loaderData: {},
            errors: {
              [route.id]: error
            }
          }, {
            flushSync
          });
          return;
        }
        if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
          completeNavigation(location, {
            matches
          }, {
            flushSync
          });
          return;
        }
        pendingNavigationController = new AbortController();
        let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
        let pendingActionData;
        let pendingError;
        if (opts && opts.pendingError) {
          pendingError = {
            [findNearestBoundary(matches).route.id]: opts.pendingError
          };
        } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
          let actionOutput = await handleAction(request, location, opts.submission, matches, {
            replace: opts.replace,
            flushSync
          });
          if (actionOutput.shortCircuited) {
            return;
          }
          pendingActionData = actionOutput.pendingActionData;
          pendingError = actionOutput.pendingActionError;
          loadingNavigation = getLoadingNavigation(location, opts.submission);
          flushSync = false;
          request = new Request(request.url, {
            signal: request.signal
          });
        }
        let {
          shortCircuited,
          loaderData,
          errors
        } = await handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && opts.initialHydration === true, flushSync, pendingActionData, pendingError);
        if (shortCircuited) {
          return;
        }
        pendingNavigationController = null;
        completeNavigation(location, _extends({
          matches
        }, pendingActionData ? {
          actionData: pendingActionData
        } : {}, {
          loaderData,
          errors
        }));
      }
      async function handleAction(request, location, submission, matches, opts) {
        if (opts === void 0) {
          opts = {};
        }
        interruptActiveLoads();
        let navigation = getSubmittingNavigation(location, submission);
        updateState({
          navigation
        }, {
          flushSync: opts.flushSync === true
        });
        let result;
        let actionMatch = getTargetMatch(matches, location);
        if (!actionMatch.route.action && !actionMatch.route.lazy) {
          result = {
            type: ResultType.error,
            error: getInternalRouterError(405, {
              method: request.method,
              pathname: location.pathname,
              routeId: actionMatch.route.id
            })
          };
        } else {
          result = await callLoaderOrAction("action", request, actionMatch, matches, manifest2, mapRouteProperties, basename, future.v7_relativeSplatPath);
          if (request.signal.aborted) {
            return {
              shortCircuited: true
            };
          }
        }
        if (isRedirectResult(result)) {
          let replace;
          if (opts && opts.replace != null) {
            replace = opts.replace;
          } else {
            replace = result.location === state.location.pathname + state.location.search;
          }
          await startRedirectNavigation(state, result, {
            submission,
            replace
          });
          return {
            shortCircuited: true
          };
        }
        if (isErrorResult(result)) {
          let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
          if ((opts && opts.replace) !== true) {
            pendingAction = Action.Push;
          }
          return {
            // Send back an empty object we can use to clear out any prior actionData
            pendingActionData: {},
            pendingActionError: {
              [boundaryMatch.route.id]: result.error
            }
          };
        }
        if (isDeferredResult(result)) {
          throw getInternalRouterError(400, {
            type: "defer-action"
          });
        }
        return {
          pendingActionData: {
            [actionMatch.route.id]: result.data
          }
        };
      }
      async function handleLoaders(request, location, matches, overrideNavigation, submission, fetcherSubmission, replace, initialHydration, flushSync, pendingActionData, pendingError) {
        let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
        let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
        let routesToUse = inFlightDataRoutes || dataRoutes;
        let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, future.v7_partialHydration && initialHydration === true, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionData, pendingError);
        cancelActiveDeferreds((routeId) => !(matches && matches.some((m) => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m) => m.route.id === routeId));
        pendingNavigationLoadId = ++incrementingLoadId;
        if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
          let updatedFetchers2 = markFetchRedirectsDone();
          completeNavigation(location, _extends({
            matches,
            loaderData: {},
            // Commit pending error if we're short circuiting
            errors: pendingError || null
          }, pendingActionData ? {
            actionData: pendingActionData
          } : {}, updatedFetchers2 ? {
            fetchers: new Map(state.fetchers)
          } : {}), {
            flushSync
          });
          return {
            shortCircuited: true
          };
        }
        if (!isUninterruptedRevalidation && (!future.v7_partialHydration || !initialHydration)) {
          revalidatingFetchers.forEach((rf) => {
            let fetcher = state.fetchers.get(rf.key);
            let revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
            state.fetchers.set(rf.key, revalidatingFetcher);
          });
          let actionData = pendingActionData || state.actionData;
          updateState(_extends({
            navigation: loadingNavigation
          }, actionData ? Object.keys(actionData).length === 0 ? {
            actionData: null
          } : {
            actionData
          } : {}, revalidatingFetchers.length > 0 ? {
            fetchers: new Map(state.fetchers)
          } : {}), {
            flushSync
          });
        }
        revalidatingFetchers.forEach((rf) => {
          if (fetchControllers.has(rf.key)) {
            abortFetcher(rf.key);
          }
          if (rf.controller) {
            fetchControllers.set(rf.key, rf.controller);
          }
        });
        let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
        if (pendingNavigationController) {
          pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
        }
        let {
          results,
          loaderResults,
          fetcherResults
        } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
        if (request.signal.aborted) {
          return {
            shortCircuited: true
          };
        }
        if (pendingNavigationController) {
          pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
        }
        revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
        let redirect2 = findRedirect(results);
        if (redirect2) {
          if (redirect2.idx >= matchesToLoad.length) {
            let fetcherKey = revalidatingFetchers[redirect2.idx - matchesToLoad.length].key;
            fetchRedirectIds.add(fetcherKey);
          }
          await startRedirectNavigation(state, redirect2.result, {
            replace
          });
          return {
            shortCircuited: true
          };
        }
        let {
          loaderData,
          errors
        } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds);
        activeDeferreds.forEach((deferredData, routeId) => {
          deferredData.subscribe((aborted) => {
            if (aborted || deferredData.done) {
              activeDeferreds.delete(routeId);
            }
          });
        });
        let updatedFetchers = markFetchRedirectsDone();
        let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
        let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
        return _extends({
          loaderData,
          errors
        }, shouldUpdateFetchers ? {
          fetchers: new Map(state.fetchers)
        } : {});
      }
      function fetch2(key, routeId, href, opts) {
        if (isServer) {
          throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
        }
        if (fetchControllers.has(key))
          abortFetcher(key);
        let flushSync = (opts && opts.unstable_flushSync) === true;
        let routesToUse = inFlightDataRoutes || dataRoutes;
        let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, future.v7_relativeSplatPath, routeId, opts == null ? void 0 : opts.relative);
        let matches = matchRoutes(routesToUse, normalizedPath, basename);
        if (!matches) {
          setFetcherError(key, routeId, getInternalRouterError(404, {
            pathname: normalizedPath
          }), {
            flushSync
          });
          return;
        }
        let {
          path,
          submission,
          error
        } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
        if (error) {
          setFetcherError(key, routeId, error, {
            flushSync
          });
          return;
        }
        let match = getTargetMatch(matches, path);
        pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
        if (submission && isMutationMethod(submission.formMethod)) {
          handleFetcherAction(key, routeId, path, match, matches, flushSync, submission);
          return;
        }
        fetchLoadMatches.set(key, {
          routeId,
          path
        });
        handleFetcherLoader(key, routeId, path, match, matches, flushSync, submission);
      }
      async function handleFetcherAction(key, routeId, path, match, requestMatches, flushSync, submission) {
        interruptActiveLoads();
        fetchLoadMatches.delete(key);
        if (!match.route.action && !match.route.lazy) {
          let error = getInternalRouterError(405, {
            method: submission.formMethod,
            pathname: path,
            routeId
          });
          setFetcherError(key, routeId, error, {
            flushSync
          });
          return;
        }
        let existingFetcher = state.fetchers.get(key);
        updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
          flushSync
        });
        let abortController = new AbortController();
        let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
        fetchControllers.set(key, abortController);
        let originatingLoadId = incrementingLoadId;
        let actionResult = await callLoaderOrAction("action", fetchRequest, match, requestMatches, manifest2, mapRouteProperties, basename, future.v7_relativeSplatPath);
        if (fetchRequest.signal.aborted) {
          if (fetchControllers.get(key) === abortController) {
            fetchControllers.delete(key);
          }
          return;
        }
        if (future.v7_fetcherPersist && deletedFetchers.has(key)) {
          if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
            updateFetcherState(key, getDoneFetcher(void 0));
            return;
          }
        } else {
          if (isRedirectResult(actionResult)) {
            fetchControllers.delete(key);
            if (pendingNavigationLoadId > originatingLoadId) {
              updateFetcherState(key, getDoneFetcher(void 0));
              return;
            } else {
              fetchRedirectIds.add(key);
              updateFetcherState(key, getLoadingFetcher(submission));
              return startRedirectNavigation(state, actionResult, {
                fetcherSubmission: submission
              });
            }
          }
          if (isErrorResult(actionResult)) {
            setFetcherError(key, routeId, actionResult.error);
            return;
          }
        }
        if (isDeferredResult(actionResult)) {
          throw getInternalRouterError(400, {
            type: "defer-action"
          });
        }
        let nextLocation = state.navigation.location || state.location;
        let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
        let routesToUse = inFlightDataRoutes || dataRoutes;
        let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
        invariant(matches, "Didn't find any matches after fetcher action");
        let loadId = ++incrementingLoadId;
        fetchReloadIds.set(key, loadId);
        let loadFetcher = getLoadingFetcher(submission, actionResult.data);
        state.fetchers.set(key, loadFetcher);
        let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(
          init.history,
          state,
          matches,
          submission,
          nextLocation,
          false,
          isRevalidationRequired,
          cancelledDeferredRoutes,
          cancelledFetcherLoads,
          deletedFetchers,
          fetchLoadMatches,
          fetchRedirectIds,
          routesToUse,
          basename,
          {
            [match.route.id]: actionResult.data
          },
          void 0
          // No need to send through errors since we short circuit above
        );
        revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
          let staleKey = rf.key;
          let existingFetcher2 = state.fetchers.get(staleKey);
          let revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher2 ? existingFetcher2.data : void 0);
          state.fetchers.set(staleKey, revalidatingFetcher);
          if (fetchControllers.has(staleKey)) {
            abortFetcher(staleKey);
          }
          if (rf.controller) {
            fetchControllers.set(staleKey, rf.controller);
          }
        });
        updateState({
          fetchers: new Map(state.fetchers)
        });
        let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
        abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
        let {
          results,
          loaderResults,
          fetcherResults
        } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
        if (abortController.signal.aborted) {
          return;
        }
        abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
        fetchReloadIds.delete(key);
        fetchControllers.delete(key);
        revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
        let redirect2 = findRedirect(results);
        if (redirect2) {
          if (redirect2.idx >= matchesToLoad.length) {
            let fetcherKey = revalidatingFetchers[redirect2.idx - matchesToLoad.length].key;
            fetchRedirectIds.add(fetcherKey);
          }
          return startRedirectNavigation(state, redirect2.result);
        }
        let {
          loaderData,
          errors
        } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
        if (state.fetchers.has(key)) {
          let doneFetcher = getDoneFetcher(actionResult.data);
          state.fetchers.set(key, doneFetcher);
        }
        abortStaleFetchLoads(loadId);
        if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
          invariant(pendingAction, "Expected pending action");
          pendingNavigationController && pendingNavigationController.abort();
          completeNavigation(state.navigation.location, {
            matches,
            loaderData,
            errors,
            fetchers: new Map(state.fetchers)
          });
        } else {
          updateState({
            errors,
            loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
            fetchers: new Map(state.fetchers)
          });
          isRevalidationRequired = false;
        }
      }
      async function handleFetcherLoader(key, routeId, path, match, matches, flushSync, submission) {
        let existingFetcher = state.fetchers.get(key);
        updateFetcherState(key, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0), {
          flushSync
        });
        let abortController = new AbortController();
        let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
        fetchControllers.set(key, abortController);
        let originatingLoadId = incrementingLoadId;
        let result = await callLoaderOrAction("loader", fetchRequest, match, matches, manifest2, mapRouteProperties, basename, future.v7_relativeSplatPath);
        if (isDeferredResult(result)) {
          result = await resolveDeferredData(result, fetchRequest.signal, true) || result;
        }
        if (fetchControllers.get(key) === abortController) {
          fetchControllers.delete(key);
        }
        if (fetchRequest.signal.aborted) {
          return;
        }
        if (deletedFetchers.has(key)) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        }
        if (isRedirectResult(result)) {
          if (pendingNavigationLoadId > originatingLoadId) {
            updateFetcherState(key, getDoneFetcher(void 0));
            return;
          } else {
            fetchRedirectIds.add(key);
            await startRedirectNavigation(state, result);
            return;
          }
        }
        if (isErrorResult(result)) {
          setFetcherError(key, routeId, result.error);
          return;
        }
        invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
        updateFetcherState(key, getDoneFetcher(result.data));
      }
      async function startRedirectNavigation(state2, redirect2, _temp2) {
        let {
          submission,
          fetcherSubmission,
          replace
        } = _temp2 === void 0 ? {} : _temp2;
        if (redirect2.revalidate) {
          isRevalidationRequired = true;
        }
        let redirectLocation = createLocation(state2.location, redirect2.location, {
          _isRedirect: true
        });
        invariant(redirectLocation, "Expected a location on the redirect navigation");
        if (isBrowser) {
          let isDocumentReload = false;
          if (redirect2.reloadDocument) {
            isDocumentReload = true;
          } else if (ABSOLUTE_URL_REGEX.test(redirect2.location)) {
            const url = init.history.createURL(redirect2.location);
            isDocumentReload = // Hard reload if it's an absolute URL to a new origin
            url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
            stripBasename(url.pathname, basename) == null;
          }
          if (isDocumentReload) {
            if (replace) {
              routerWindow.location.replace(redirect2.location);
            } else {
              routerWindow.location.assign(redirect2.location);
            }
            return;
          }
        }
        pendingNavigationController = null;
        let redirectHistoryAction = replace === true ? Action.Replace : Action.Push;
        let {
          formMethod,
          formAction,
          formEncType
        } = state2.navigation;
        if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
          submission = getSubmissionFromNavigation(state2.navigation);
        }
        let activeSubmission = submission || fetcherSubmission;
        if (redirectPreserveMethodStatusCodes.has(redirect2.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
          await startNavigation(redirectHistoryAction, redirectLocation, {
            submission: _extends({}, activeSubmission, {
              formAction: redirect2.location
            }),
            // Preserve this flag across redirects
            preventScrollReset: pendingPreventScrollReset
          });
        } else {
          let overrideNavigation = getLoadingNavigation(redirectLocation, submission);
          await startNavigation(redirectHistoryAction, redirectLocation, {
            overrideNavigation,
            // Send fetcher submissions through for shouldRevalidate
            fetcherSubmission,
            // Preserve this flag across redirects
            preventScrollReset: pendingPreventScrollReset
          });
        }
      }
      async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
        let results = await Promise.all([...matchesToLoad.map((match) => callLoaderOrAction("loader", request, match, matches, manifest2, mapRouteProperties, basename, future.v7_relativeSplatPath)), ...fetchersToLoad.map((f) => {
          if (f.matches && f.match && f.controller) {
            return callLoaderOrAction("loader", createClientSideRequest(init.history, f.path, f.controller.signal), f.match, f.matches, manifest2, mapRouteProperties, basename, future.v7_relativeSplatPath);
          } else {
            let error = {
              type: ResultType.error,
              error: getInternalRouterError(404, {
                pathname: f.path
              })
            };
            return error;
          }
        })]);
        let loaderResults = results.slice(0, matchesToLoad.length);
        let fetcherResults = results.slice(matchesToLoad.length);
        await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, loaderResults.map(() => request.signal), false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map((f) => f.match), fetcherResults, fetchersToLoad.map((f) => f.controller ? f.controller.signal : null), true)]);
        return {
          results,
          loaderResults,
          fetcherResults
        };
      }
      function interruptActiveLoads() {
        isRevalidationRequired = true;
        cancelledDeferredRoutes.push(...cancelActiveDeferreds());
        fetchLoadMatches.forEach((_, key) => {
          if (fetchControllers.has(key)) {
            cancelledFetcherLoads.push(key);
            abortFetcher(key);
          }
        });
      }
      function updateFetcherState(key, fetcher, opts) {
        if (opts === void 0) {
          opts = {};
        }
        state.fetchers.set(key, fetcher);
        updateState({
          fetchers: new Map(state.fetchers)
        }, {
          flushSync: (opts && opts.flushSync) === true
        });
      }
      function setFetcherError(key, routeId, error, opts) {
        if (opts === void 0) {
          opts = {};
        }
        let boundaryMatch = findNearestBoundary(state.matches, routeId);
        deleteFetcher(key);
        updateState({
          errors: {
            [boundaryMatch.route.id]: error
          },
          fetchers: new Map(state.fetchers)
        }, {
          flushSync: (opts && opts.flushSync) === true
        });
      }
      function getFetcher(key) {
        if (future.v7_fetcherPersist) {
          activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
          if (deletedFetchers.has(key)) {
            deletedFetchers.delete(key);
          }
        }
        return state.fetchers.get(key) || IDLE_FETCHER;
      }
      function deleteFetcher(key) {
        let fetcher = state.fetchers.get(key);
        if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
          abortFetcher(key);
        }
        fetchLoadMatches.delete(key);
        fetchReloadIds.delete(key);
        fetchRedirectIds.delete(key);
        deletedFetchers.delete(key);
        state.fetchers.delete(key);
      }
      function deleteFetcherAndUpdateState(key) {
        if (future.v7_fetcherPersist) {
          let count = (activeFetchers.get(key) || 0) - 1;
          if (count <= 0) {
            activeFetchers.delete(key);
            deletedFetchers.add(key);
          } else {
            activeFetchers.set(key, count);
          }
        } else {
          deleteFetcher(key);
        }
        updateState({
          fetchers: new Map(state.fetchers)
        });
      }
      function abortFetcher(key) {
        let controller = fetchControllers.get(key);
        invariant(controller, "Expected fetch controller: " + key);
        controller.abort();
        fetchControllers.delete(key);
      }
      function markFetchersDone(keys) {
        for (let key of keys) {
          let fetcher = getFetcher(key);
          let doneFetcher = getDoneFetcher(fetcher.data);
          state.fetchers.set(key, doneFetcher);
        }
      }
      function markFetchRedirectsDone() {
        let doneKeys = [];
        let updatedFetchers = false;
        for (let key of fetchRedirectIds) {
          let fetcher = state.fetchers.get(key);
          invariant(fetcher, "Expected fetcher: " + key);
          if (fetcher.state === "loading") {
            fetchRedirectIds.delete(key);
            doneKeys.push(key);
            updatedFetchers = true;
          }
        }
        markFetchersDone(doneKeys);
        return updatedFetchers;
      }
      function abortStaleFetchLoads(landedId) {
        let yeetedKeys = [];
        for (let [key, id] of fetchReloadIds) {
          if (id < landedId) {
            let fetcher = state.fetchers.get(key);
            invariant(fetcher, "Expected fetcher: " + key);
            if (fetcher.state === "loading") {
              abortFetcher(key);
              fetchReloadIds.delete(key);
              yeetedKeys.push(key);
            }
          }
        }
        markFetchersDone(yeetedKeys);
        return yeetedKeys.length > 0;
      }
      function getBlocker(key, fn) {
        let blocker = state.blockers.get(key) || IDLE_BLOCKER;
        if (blockerFunctions.get(key) !== fn) {
          blockerFunctions.set(key, fn);
        }
        return blocker;
      }
      function deleteBlocker(key) {
        state.blockers.delete(key);
        blockerFunctions.delete(key);
      }
      function updateBlocker(key, newBlocker) {
        let blocker = state.blockers.get(key) || IDLE_BLOCKER;
        invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
        let blockers = new Map(state.blockers);
        blockers.set(key, newBlocker);
        updateState({
          blockers
        });
      }
      function shouldBlockNavigation(_ref2) {
        let {
          currentLocation,
          nextLocation,
          historyAction
        } = _ref2;
        if (blockerFunctions.size === 0) {
          return;
        }
        if (blockerFunctions.size > 1) {
          warning(false, "A router only supports one blocker at a time");
        }
        let entries = Array.from(blockerFunctions.entries());
        let [blockerKey, blockerFunction] = entries[entries.length - 1];
        let blocker = state.blockers.get(blockerKey);
        if (blocker && blocker.state === "proceeding") {
          return;
        }
        if (blockerFunction({
          currentLocation,
          nextLocation,
          historyAction
        })) {
          return blockerKey;
        }
      }
      function cancelActiveDeferreds(predicate) {
        let cancelledRouteIds = [];
        activeDeferreds.forEach((dfd, routeId) => {
          if (!predicate || predicate(routeId)) {
            dfd.cancel();
            cancelledRouteIds.push(routeId);
            activeDeferreds.delete(routeId);
          }
        });
        return cancelledRouteIds;
      }
      function enableScrollRestoration(positions, getPosition, getKey) {
        savedScrollPositions = positions;
        getScrollPosition = getPosition;
        getScrollRestorationKey = getKey || null;
        if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
          initialScrollRestored = true;
          let y = getSavedScrollPosition(state.location, state.matches);
          if (y != null) {
            updateState({
              restoreScrollPosition: y
            });
          }
        }
        return () => {
          savedScrollPositions = null;
          getScrollPosition = null;
          getScrollRestorationKey = null;
        };
      }
      function getScrollKey(location, matches) {
        if (getScrollRestorationKey) {
          let key = getScrollRestorationKey(location, matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData)));
          return key || location.key;
        }
        return location.key;
      }
      function saveScrollPosition(location, matches) {
        if (savedScrollPositions && getScrollPosition) {
          let key = getScrollKey(location, matches);
          savedScrollPositions[key] = getScrollPosition();
        }
      }
      function getSavedScrollPosition(location, matches) {
        if (savedScrollPositions) {
          let key = getScrollKey(location, matches);
          let y = savedScrollPositions[key];
          if (typeof y === "number") {
            return y;
          }
        }
        return null;
      }
      function _internalSetRoutes(newRoutes) {
        manifest2 = {};
        inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties, void 0, manifest2);
      }
      router = {
        get basename() {
          return basename;
        },
        get future() {
          return future;
        },
        get state() {
          return state;
        },
        get routes() {
          return dataRoutes;
        },
        get window() {
          return routerWindow;
        },
        initialize,
        subscribe,
        enableScrollRestoration,
        navigate,
        fetch: fetch2,
        revalidate,
        // Passthrough to history-aware createHref used by useHref so we get proper
        // hash-aware URLs in DOM paths
        createHref: (to) => init.history.createHref(to),
        encodeLocation: (to) => init.history.encodeLocation(to),
        getFetcher,
        deleteFetcher: deleteFetcherAndUpdateState,
        dispose,
        getBlocker,
        deleteBlocker,
        _internalFetchControllers: fetchControllers,
        _internalActiveDeferreds: activeDeferreds,
        // TODO: Remove setRoutes, it's temporary to avoid dealing with
        // updating the tree while validating the update algorithm.
        _internalSetRoutes
      };
      return router;
    }
    var UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
    function createStaticHandler(routes, opts) {
      invariant(routes.length > 0, "You must provide a non-empty routes array to createStaticHandler");
      let manifest2 = {};
      let basename = (opts ? opts.basename : null) || "/";
      let mapRouteProperties;
      if (opts != null && opts.mapRouteProperties) {
        mapRouteProperties = opts.mapRouteProperties;
      } else if (opts != null && opts.detectErrorBoundary) {
        let detectErrorBoundary = opts.detectErrorBoundary;
        mapRouteProperties = (route) => ({
          hasErrorBoundary: detectErrorBoundary(route)
        });
      } else {
        mapRouteProperties = defaultMapRouteProperties;
      }
      let future = _extends({
        v7_relativeSplatPath: false
      }, opts ? opts.future : null);
      let dataRoutes = convertRoutesToDataRoutes(routes, mapRouteProperties, void 0, manifest2);
      async function query(request, _temp3) {
        let {
          requestContext
        } = _temp3 === void 0 ? {} : _temp3;
        let url = new URL(request.url);
        let method = request.method;
        let location = createLocation("", createPath(url), null, "default");
        let matches = matchRoutes(dataRoutes, location, basename);
        if (!isValidMethod(method) && method !== "HEAD") {
          let error = getInternalRouterError(405, {
            method
          });
          let {
            matches: methodNotAllowedMatches,
            route
          } = getShortCircuitMatches(dataRoutes);
          return {
            basename,
            location,
            matches: methodNotAllowedMatches,
            loaderData: {},
            actionData: null,
            errors: {
              [route.id]: error
            },
            statusCode: error.status,
            loaderHeaders: {},
            actionHeaders: {},
            activeDeferreds: null
          };
        } else if (!matches) {
          let error = getInternalRouterError(404, {
            pathname: location.pathname
          });
          let {
            matches: notFoundMatches,
            route
          } = getShortCircuitMatches(dataRoutes);
          return {
            basename,
            location,
            matches: notFoundMatches,
            loaderData: {},
            actionData: null,
            errors: {
              [route.id]: error
            },
            statusCode: error.status,
            loaderHeaders: {},
            actionHeaders: {},
            activeDeferreds: null
          };
        }
        let result = await queryImpl(request, location, matches, requestContext);
        if (isResponse(result)) {
          return result;
        }
        return _extends({
          location,
          basename
        }, result);
      }
      async function queryRoute(request, _temp4) {
        let {
          routeId,
          requestContext
        } = _temp4 === void 0 ? {} : _temp4;
        let url = new URL(request.url);
        let method = request.method;
        let location = createLocation("", createPath(url), null, "default");
        let matches = matchRoutes(dataRoutes, location, basename);
        if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
          throw getInternalRouterError(405, {
            method
          });
        } else if (!matches) {
          throw getInternalRouterError(404, {
            pathname: location.pathname
          });
        }
        let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
        if (routeId && !match) {
          throw getInternalRouterError(403, {
            pathname: location.pathname,
            routeId
          });
        } else if (!match) {
          throw getInternalRouterError(404, {
            pathname: location.pathname
          });
        }
        let result = await queryImpl(request, location, matches, requestContext, match);
        if (isResponse(result)) {
          return result;
        }
        let error = result.errors ? Object.values(result.errors)[0] : void 0;
        if (error !== void 0) {
          throw error;
        }
        if (result.actionData) {
          return Object.values(result.actionData)[0];
        }
        if (result.loaderData) {
          var _result$activeDeferre;
          let data = Object.values(result.loaderData)[0];
          if ((_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id]) {
            data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id];
          }
          return data;
        }
        return void 0;
      }
      async function queryImpl(request, location, matches, requestContext, routeMatch) {
        invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
        try {
          if (isMutationMethod(request.method.toLowerCase())) {
            let result2 = await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, routeMatch != null);
            return result2;
          }
          let result = await loadRouteData(request, matches, requestContext, routeMatch);
          return isResponse(result) ? result : _extends({}, result, {
            actionData: null,
            actionHeaders: {}
          });
        } catch (e) {
          if (isQueryRouteResponse(e)) {
            if (e.type === ResultType.error) {
              throw e.response;
            }
            return e.response;
          }
          if (isRedirectResponse(e)) {
            return e;
          }
          throw e;
        }
      }
      async function submit(request, matches, actionMatch, requestContext, isRouteRequest) {
        let result;
        if (!actionMatch.route.action && !actionMatch.route.lazy) {
          let error = getInternalRouterError(405, {
            method: request.method,
            pathname: new URL(request.url).pathname,
            routeId: actionMatch.route.id
          });
          if (isRouteRequest) {
            throw error;
          }
          result = {
            type: ResultType.error,
            error
          };
        } else {
          result = await callLoaderOrAction("action", request, actionMatch, matches, manifest2, mapRouteProperties, basename, future.v7_relativeSplatPath, {
            isStaticRequest: true,
            isRouteRequest,
            requestContext
          });
          if (request.signal.aborted) {
            let method = isRouteRequest ? "queryRoute" : "query";
            throw new Error(method + "() call aborted: " + request.method + " " + request.url);
          }
        }
        if (isRedirectResult(result)) {
          throw new Response(null, {
            status: result.status,
            headers: {
              Location: result.location
            }
          });
        }
        if (isDeferredResult(result)) {
          let error = getInternalRouterError(400, {
            type: "defer-action"
          });
          if (isRouteRequest) {
            throw error;
          }
          result = {
            type: ResultType.error,
            error
          };
        }
        if (isRouteRequest) {
          if (isErrorResult(result)) {
            throw result.error;
          }
          return {
            matches: [actionMatch],
            loaderData: {},
            actionData: {
              [actionMatch.route.id]: result.data
            },
            errors: null,
            // Note: statusCode + headers are unused here since queryRoute will
            // return the raw Response or value
            statusCode: 200,
            loaderHeaders: {},
            actionHeaders: {},
            activeDeferreds: null
          };
        }
        if (isErrorResult(result)) {
          let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
          let context2 = await loadRouteData(request, matches, requestContext, void 0, {
            [boundaryMatch.route.id]: result.error
          });
          return _extends({}, context2, {
            statusCode: isRouteErrorResponse(result.error) ? result.error.status : 500,
            actionData: null,
            actionHeaders: _extends({}, result.headers ? {
              [actionMatch.route.id]: result.headers
            } : {})
          });
        }
        let loaderRequest = new Request(request.url, {
          headers: request.headers,
          redirect: request.redirect,
          signal: request.signal
        });
        let context = await loadRouteData(loaderRequest, matches, requestContext);
        return _extends({}, context, result.statusCode ? {
          statusCode: result.statusCode
        } : {}, {
          actionData: {
            [actionMatch.route.id]: result.data
          },
          actionHeaders: _extends({}, result.headers ? {
            [actionMatch.route.id]: result.headers
          } : {})
        });
      }
      async function loadRouteData(request, matches, requestContext, routeMatch, pendingActionError) {
        let isRouteRequest = routeMatch != null;
        if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy)) {
          throw getInternalRouterError(400, {
            method: request.method,
            pathname: new URL(request.url).pathname,
            routeId: routeMatch == null ? void 0 : routeMatch.route.id
          });
        }
        let requestMatches = routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0]);
        let matchesToLoad = requestMatches.filter((m) => m.route.loader || m.route.lazy);
        if (matchesToLoad.length === 0) {
          return {
            matches,
            // Add a null for all matched routes for proper revalidation on the client
            loaderData: matches.reduce((acc, m) => Object.assign(acc, {
              [m.route.id]: null
            }), {}),
            errors: pendingActionError || null,
            statusCode: 200,
            loaderHeaders: {},
            activeDeferreds: null
          };
        }
        let results = await Promise.all([...matchesToLoad.map((match) => callLoaderOrAction("loader", request, match, matches, manifest2, mapRouteProperties, basename, future.v7_relativeSplatPath, {
          isStaticRequest: true,
          isRouteRequest,
          requestContext
        }))]);
        if (request.signal.aborted) {
          let method = isRouteRequest ? "queryRoute" : "query";
          throw new Error(method + "() call aborted: " + request.method + " " + request.url);
        }
        let activeDeferreds = /* @__PURE__ */ new Map();
        let context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError, activeDeferreds);
        let executedLoaders = new Set(matchesToLoad.map((match) => match.route.id));
        matches.forEach((match) => {
          if (!executedLoaders.has(match.route.id)) {
            context.loaderData[match.route.id] = null;
          }
        });
        return _extends({}, context, {
          matches,
          activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
        });
      }
      return {
        dataRoutes,
        query,
        queryRoute
      };
    }
    function getStaticContextFromError(routes, context, error) {
      let newContext = _extends({}, context, {
        statusCode: 500,
        errors: {
          [context._deepestRenderedBoundaryId || routes[0].id]: error
        }
      });
      return newContext;
    }
    function isSubmissionNavigation(opts) {
      return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
    }
    function normalizeTo(location, matches, basename, prependBasename, to, v7_relativeSplatPath, fromRouteId, relative) {
      let contextualMatches;
      let activeRouteMatch;
      if (fromRouteId) {
        contextualMatches = [];
        for (let match of matches) {
          contextualMatches.push(match);
          if (match.route.id === fromRouteId) {
            activeRouteMatch = match;
            break;
          }
        }
      } else {
        contextualMatches = matches;
        activeRouteMatch = matches[matches.length - 1];
      }
      let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches, v7_relativeSplatPath), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
      if (to == null) {
        path.search = location.search;
        path.hash = location.hash;
      }
      if ((to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path.search)) {
        path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
      }
      if (prependBasename && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      return createPath(path);
    }
    function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
      if (!opts || !isSubmissionNavigation(opts)) {
        return {
          path
        };
      }
      if (opts.formMethod && !isValidMethod(opts.formMethod)) {
        return {
          path,
          error: getInternalRouterError(405, {
            method: opts.formMethod
          })
        };
      }
      let getInvalidBodyError = () => ({
        path,
        error: getInternalRouterError(400, {
          type: "invalid-body"
        })
      });
      let rawFormMethod = opts.formMethod || "get";
      let formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase();
      let formAction = stripHashFromPath(path);
      if (opts.body !== void 0) {
        if (opts.formEncType === "text/plain") {
          if (!isMutationMethod(formMethod)) {
            return getInvalidBodyError();
          }
          let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
            // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
            Array.from(opts.body.entries()).reduce((acc, _ref3) => {
              let [name, value] = _ref3;
              return "" + acc + name + "=" + value + "\n";
            }, "")
          ) : String(opts.body);
          return {
            path,
            submission: {
              formMethod,
              formAction,
              formEncType: opts.formEncType,
              formData: void 0,
              json: void 0,
              text
            }
          };
        } else if (opts.formEncType === "application/json") {
          if (!isMutationMethod(formMethod)) {
            return getInvalidBodyError();
          }
          try {
            let json2 = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
            return {
              path,
              submission: {
                formMethod,
                formAction,
                formEncType: opts.formEncType,
                formData: void 0,
                json: json2,
                text: void 0
              }
            };
          } catch (e) {
            return getInvalidBodyError();
          }
        }
      }
      invariant(typeof FormData === "function", "FormData is not available in this environment");
      let searchParams;
      let formData;
      if (opts.formData) {
        searchParams = convertFormDataToSearchParams(opts.formData);
        formData = opts.formData;
      } else if (opts.body instanceof FormData) {
        searchParams = convertFormDataToSearchParams(opts.body);
        formData = opts.body;
      } else if (opts.body instanceof URLSearchParams) {
        searchParams = opts.body;
        formData = convertSearchParamsToFormData(searchParams);
      } else if (opts.body == null) {
        searchParams = new URLSearchParams();
        formData = new FormData();
      } else {
        try {
          searchParams = new URLSearchParams(opts.body);
          formData = convertSearchParamsToFormData(searchParams);
        } catch (e) {
          return getInvalidBodyError();
        }
      }
      let submission = {
        formMethod,
        formAction,
        formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
        formData,
        json: void 0,
        text: void 0
      };
      if (isMutationMethod(submission.formMethod)) {
        return {
          path,
          submission
        };
      }
      let parsedPath = parsePath(path);
      if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
        searchParams.append("index", "");
      }
      parsedPath.search = "?" + searchParams;
      return {
        path: createPath(parsedPath),
        submission
      };
    }
    function getLoaderMatchesUntilBoundary(matches, boundaryId) {
      let boundaryMatches = matches;
      if (boundaryId) {
        let index = matches.findIndex((m) => m.route.id === boundaryId);
        if (index >= 0) {
          boundaryMatches = matches.slice(0, index);
        }
      }
      return boundaryMatches;
    }
    function getMatchesToLoad(history, state, matches, submission, location, isInitialLoad, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionData, pendingError) {
      let actionResult = pendingError ? Object.values(pendingError)[0] : pendingActionData ? Object.values(pendingActionData)[0] : void 0;
      let currentUrl = history.createURL(state.location);
      let nextUrl = history.createURL(location);
      let boundaryId = pendingError ? Object.keys(pendingError)[0] : void 0;
      let boundaryMatches = getLoaderMatchesUntilBoundary(matches, boundaryId);
      let navigationMatches = boundaryMatches.filter((match, index) => {
        let {
          route
        } = match;
        if (route.lazy) {
          return true;
        }
        if (route.loader == null) {
          return false;
        }
        if (isInitialLoad) {
          if (route.loader.hydrate) {
            return true;
          }
          return state.loaderData[route.id] === void 0 && // Don't re-run if the loader ran and threw an error
          (!state.errors || state.errors[route.id] === void 0);
        }
        if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some((id) => id === match.route.id)) {
          return true;
        }
        let currentRouteMatch = state.matches[index];
        let nextRouteMatch = match;
        return shouldRevalidateLoader(match, _extends({
          currentUrl,
          currentParams: currentRouteMatch.params,
          nextUrl,
          nextParams: nextRouteMatch.params
        }, submission, {
          actionResult,
          defaultShouldRevalidate: (
            // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
            isRevalidationRequired || // Clicked the same link, resubmitted a GET form
            currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
            currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
          )
        }));
      });
      let revalidatingFetchers = [];
      fetchLoadMatches.forEach((f, key) => {
        if (isInitialLoad || !matches.some((m) => m.route.id === f.routeId) || deletedFetchers.has(key)) {
          return;
        }
        let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
        if (!fetcherMatches) {
          revalidatingFetchers.push({
            key,
            routeId: f.routeId,
            path: f.path,
            matches: null,
            match: null,
            controller: null
          });
          return;
        }
        let fetcher = state.fetchers.get(key);
        let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
        let shouldRevalidate = false;
        if (fetchRedirectIds.has(key)) {
          shouldRevalidate = false;
        } else if (cancelledFetcherLoads.includes(key)) {
          shouldRevalidate = true;
        } else if (fetcher && fetcher.state !== "idle" && fetcher.data === void 0) {
          shouldRevalidate = isRevalidationRequired;
        } else {
          shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
            currentUrl,
            currentParams: state.matches[state.matches.length - 1].params,
            nextUrl,
            nextParams: matches[matches.length - 1].params
          }, submission, {
            actionResult,
            defaultShouldRevalidate: isRevalidationRequired
          }));
        }
        if (shouldRevalidate) {
          revalidatingFetchers.push({
            key,
            routeId: f.routeId,
            path: f.path,
            matches: fetcherMatches,
            match: fetcherMatch,
            controller: new AbortController()
          });
        }
      });
      return [navigationMatches, revalidatingFetchers];
    }
    function isNewLoader(currentLoaderData, currentMatch, match) {
      let isNew = (
        // [a] -> [a, b]
        !currentMatch || // [a, b] -> [a, c]
        match.route.id !== currentMatch.route.id
      );
      let isMissingData = currentLoaderData[match.route.id] === void 0;
      return isNew || isMissingData;
    }
    function isNewRouteInstance(currentMatch, match) {
      let currentPath = currentMatch.route.path;
      return (
        // param change for this match, /users/123 -> /users/456
        currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
        // e.g. /files/images/avatar.jpg -> files/finances.xls
        currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
      );
    }
    function shouldRevalidateLoader(loaderMatch, arg) {
      if (loaderMatch.route.shouldRevalidate) {
        let routeChoice = loaderMatch.route.shouldRevalidate(arg);
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return arg.defaultShouldRevalidate;
    }
    async function loadLazyRouteModule(route, mapRouteProperties, manifest2) {
      if (!route.lazy) {
        return;
      }
      let lazyRoute = await route.lazy();
      if (!route.lazy) {
        return;
      }
      let routeToUpdate = manifest2[route.id];
      invariant(routeToUpdate, "No route found in manifest");
      let routeUpdates = {};
      for (let lazyRouteProperty in lazyRoute) {
        let staticRouteValue = routeToUpdate[lazyRouteProperty];
        let isPropertyStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        lazyRouteProperty !== "hasErrorBoundary";
        warning(!isPropertyStaticallyDefined, 'Route "' + routeToUpdate.id + '" has a static property "' + lazyRouteProperty + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + lazyRouteProperty + '" will be ignored.'));
        if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
          routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
        }
      }
      Object.assign(routeToUpdate, routeUpdates);
      Object.assign(routeToUpdate, _extends({}, mapRouteProperties(routeToUpdate), {
        lazy: void 0
      }));
    }
    async function callLoaderOrAction(type, request, match, matches, manifest2, mapRouteProperties, basename, v7_relativeSplatPath, opts) {
      if (opts === void 0) {
        opts = {};
      }
      let resultType;
      let result;
      let onReject;
      let runHandler = (handler) => {
        let reject;
        let abortPromise = new Promise((_, r) => reject = r);
        onReject = () => reject();
        request.signal.addEventListener("abort", onReject);
        return Promise.race([handler({
          request,
          params: match.params,
          context: opts.requestContext
        }), abortPromise]);
      };
      try {
        let handler = match.route[type];
        if (match.route.lazy) {
          if (handler) {
            let handlerError;
            let values = await Promise.all([
              // If the handler throws, don't let it immediately bubble out,
              // since we need to let the lazy() execution finish so we know if this
              // route has a boundary that can handle the error
              runHandler(handler).catch((e) => {
                handlerError = e;
              }),
              loadLazyRouteModule(match.route, mapRouteProperties, manifest2)
            ]);
            if (handlerError) {
              throw handlerError;
            }
            result = values[0];
          } else {
            await loadLazyRouteModule(match.route, mapRouteProperties, manifest2);
            handler = match.route[type];
            if (handler) {
              result = await runHandler(handler);
            } else if (type === "action") {
              let url = new URL(request.url);
              let pathname = url.pathname + url.search;
              throw getInternalRouterError(405, {
                method: request.method,
                pathname,
                routeId: match.route.id
              });
            } else {
              return {
                type: ResultType.data,
                data: void 0
              };
            }
          }
        } else if (!handler) {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(404, {
            pathname
          });
        } else {
          result = await runHandler(handler);
        }
        invariant(result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
      } catch (e) {
        resultType = ResultType.error;
        result = e;
      } finally {
        if (onReject) {
          request.signal.removeEventListener("abort", onReject);
        }
      }
      if (isResponse(result)) {
        let status = result.status;
        if (redirectStatusCodes.has(status)) {
          let location = result.headers.get("Location");
          invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
          if (!ABSOLUTE_URL_REGEX.test(location)) {
            location = normalizeTo(new URL(request.url), matches.slice(0, matches.indexOf(match) + 1), basename, true, location, v7_relativeSplatPath);
          } else if (!opts.isStaticRequest) {
            let currentUrl = new URL(request.url);
            let url = location.startsWith("//") ? new URL(currentUrl.protocol + location) : new URL(location);
            let isSameBasename = stripBasename(url.pathname, basename) != null;
            if (url.origin === currentUrl.origin && isSameBasename) {
              location = url.pathname + url.search + url.hash;
            }
          }
          if (opts.isStaticRequest) {
            result.headers.set("Location", location);
            throw result;
          }
          return {
            type: ResultType.redirect,
            status,
            location,
            revalidate: result.headers.get("X-Remix-Revalidate") !== null,
            reloadDocument: result.headers.get("X-Remix-Reload-Document") !== null
          };
        }
        if (opts.isRouteRequest) {
          let queryRouteResponse = {
            type: resultType === ResultType.error ? ResultType.error : ResultType.data,
            response: result
          };
          throw queryRouteResponse;
        }
        let data;
        try {
          let contentType = result.headers.get("Content-Type");
          if (contentType && /\bapplication\/json\b/.test(contentType)) {
            if (result.body == null) {
              data = null;
            } else {
              data = await result.json();
            }
          } else {
            data = await result.text();
          }
        } catch (e) {
          return {
            type: ResultType.error,
            error: e
          };
        }
        if (resultType === ResultType.error) {
          return {
            type: resultType,
            error: new ErrorResponseImpl(status, result.statusText, data),
            headers: result.headers
          };
        }
        return {
          type: ResultType.data,
          data,
          statusCode: result.status,
          headers: result.headers
        };
      }
      if (resultType === ResultType.error) {
        return {
          type: resultType,
          error: result
        };
      }
      if (isDeferredData(result)) {
        var _result$init, _result$init2;
        return {
          type: ResultType.deferred,
          deferredData: result,
          statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
          headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
        };
      }
      return {
        type: ResultType.data,
        data: result
      };
    }
    function createClientSideRequest(history, location, signal, submission) {
      let url = history.createURL(stripHashFromPath(location)).toString();
      let init = {
        signal
      };
      if (submission && isMutationMethod(submission.formMethod)) {
        let {
          formMethod,
          formEncType
        } = submission;
        init.method = formMethod.toUpperCase();
        if (formEncType === "application/json") {
          init.headers = new Headers({
            "Content-Type": formEncType
          });
          init.body = JSON.stringify(submission.json);
        } else if (formEncType === "text/plain") {
          init.body = submission.text;
        } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
          init.body = convertFormDataToSearchParams(submission.formData);
        } else {
          init.body = submission.formData;
        }
      }
      return new Request(url, init);
    }
    function convertFormDataToSearchParams(formData) {
      let searchParams = new URLSearchParams();
      for (let [key, value] of formData.entries()) {
        searchParams.append(key, typeof value === "string" ? value : value.name);
      }
      return searchParams;
    }
    function convertSearchParamsToFormData(searchParams) {
      let formData = new FormData();
      for (let [key, value] of searchParams.entries()) {
        formData.append(key, value);
      }
      return formData;
    }
    function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
      let loaderData = {};
      let errors = null;
      let statusCode;
      let foundError = false;
      let loaderHeaders = {};
      results.forEach((result, index) => {
        let id = matchesToLoad[index].route.id;
        invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
        if (isErrorResult(result)) {
          let boundaryMatch = findNearestBoundary(matches, id);
          let error = result.error;
          if (pendingError) {
            error = Object.values(pendingError)[0];
            pendingError = void 0;
          }
          errors = errors || {};
          if (errors[boundaryMatch.route.id] == null) {
            errors[boundaryMatch.route.id] = error;
          }
          loaderData[id] = void 0;
          if (!foundError) {
            foundError = true;
            statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
          }
          if (result.headers) {
            loaderHeaders[id] = result.headers;
          }
        } else {
          if (isDeferredResult(result)) {
            activeDeferreds.set(id, result.deferredData);
            loaderData[id] = result.deferredData.data;
          } else {
            loaderData[id] = result.data;
          }
          if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
            statusCode = result.statusCode;
          }
          if (result.headers) {
            loaderHeaders[id] = result.headers;
          }
        }
      });
      if (pendingError) {
        errors = pendingError;
        loaderData[Object.keys(pendingError)[0]] = void 0;
      }
      return {
        loaderData,
        errors,
        statusCode: statusCode || 200,
        loaderHeaders
      };
    }
    function processLoaderData(state, matches, matchesToLoad, results, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds) {
      let {
        loaderData,
        errors
      } = processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds);
      for (let index = 0; index < revalidatingFetchers.length; index++) {
        let {
          key,
          match,
          controller
        } = revalidatingFetchers[index];
        invariant(fetcherResults !== void 0 && fetcherResults[index] !== void 0, "Did not find corresponding fetcher result");
        let result = fetcherResults[index];
        if (controller && controller.signal.aborted) {
          continue;
        } else if (isErrorResult(result)) {
          let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
          if (!(errors && errors[boundaryMatch.route.id])) {
            errors = _extends({}, errors, {
              [boundaryMatch.route.id]: result.error
            });
          }
          state.fetchers.delete(key);
        } else if (isRedirectResult(result)) {
          invariant(false, "Unhandled fetcher revalidation redirect");
        } else if (isDeferredResult(result)) {
          invariant(false, "Unhandled fetcher deferred data");
        } else {
          let doneFetcher = getDoneFetcher(result.data);
          state.fetchers.set(key, doneFetcher);
        }
      }
      return {
        loaderData,
        errors
      };
    }
    function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
      let mergedLoaderData = _extends({}, newLoaderData);
      for (let match of matches) {
        let id = match.route.id;
        if (newLoaderData.hasOwnProperty(id)) {
          if (newLoaderData[id] !== void 0) {
            mergedLoaderData[id] = newLoaderData[id];
          }
        } else if (loaderData[id] !== void 0 && match.route.loader) {
          mergedLoaderData[id] = loaderData[id];
        }
        if (errors && errors.hasOwnProperty(id)) {
          break;
        }
      }
      return mergedLoaderData;
    }
    function findNearestBoundary(matches, routeId) {
      let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches];
      return eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
    }
    function getShortCircuitMatches(routes) {
      let route = routes.length === 1 ? routes[0] : routes.find((r) => r.index || !r.path || r.path === "/") || {
        id: "__shim-error-route__"
      };
      return {
        matches: [{
          params: {},
          pathname: "",
          pathnameBase: "",
          route
        }],
        route
      };
    }
    function getInternalRouterError(status, _temp5) {
      let {
        pathname,
        routeId,
        method,
        type
      } = _temp5 === void 0 ? {} : _temp5;
      let statusText = "Unknown Server Error";
      let errorMessage = "Unknown @remix-run/router error";
      if (status === 400) {
        statusText = "Bad Request";
        if (method && pathname && routeId) {
          errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request.";
        } else if (type === "defer-action") {
          errorMessage = "defer() is not supported in actions";
        } else if (type === "invalid-body") {
          errorMessage = "Unable to encode submission body";
        }
      } else if (status === 403) {
        statusText = "Forbidden";
        errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"';
      } else if (status === 404) {
        statusText = "Not Found";
        errorMessage = 'No route matches URL "' + pathname + '"';
      } else if (status === 405) {
        statusText = "Method Not Allowed";
        if (method && pathname && routeId) {
          errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request.";
        } else if (method) {
          errorMessage = 'Invalid request method "' + method.toUpperCase() + '"';
        }
      }
      return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
    }
    function findRedirect(results) {
      for (let i = results.length - 1; i >= 0; i--) {
        let result = results[i];
        if (isRedirectResult(result)) {
          return {
            result,
            idx: i
          };
        }
      }
    }
    function stripHashFromPath(path) {
      let parsedPath = typeof path === "string" ? parsePath(path) : path;
      return createPath(_extends({}, parsedPath, {
        hash: ""
      }));
    }
    function isHashChangeOnly(a, b2) {
      if (a.pathname !== b2.pathname || a.search !== b2.search) {
        return false;
      }
      if (a.hash === "") {
        return b2.hash !== "";
      } else if (a.hash === b2.hash) {
        return true;
      } else if (b2.hash !== "") {
        return true;
      }
      return false;
    }
    function isDeferredResult(result) {
      return result.type === ResultType.deferred;
    }
    function isErrorResult(result) {
      return result.type === ResultType.error;
    }
    function isRedirectResult(result) {
      return (result && result.type) === ResultType.redirect;
    }
    function isDeferredData(value) {
      let deferred = value;
      return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
    }
    function isResponse(value) {
      return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
    }
    function isRedirectResponse(result) {
      if (!isResponse(result)) {
        return false;
      }
      let status = result.status;
      let location = result.headers.get("Location");
      return status >= 300 && status <= 399 && location != null;
    }
    function isQueryRouteResponse(obj) {
      return obj && isResponse(obj.response) && (obj.type === ResultType.data || obj.type === ResultType.error);
    }
    function isValidMethod(method) {
      return validRequestMethods.has(method.toLowerCase());
    }
    function isMutationMethod(method) {
      return validMutationMethods.has(method.toLowerCase());
    }
    async function resolveDeferredResults(currentMatches, matchesToLoad, results, signals, isFetcher, currentLoaderData) {
      for (let index = 0; index < results.length; index++) {
        let result = results[index];
        let match = matchesToLoad[index];
        if (!match) {
          continue;
        }
        let currentMatch = currentMatches.find((m) => m.route.id === match.route.id);
        let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== void 0;
        if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
          let signal = signals[index];
          invariant(signal, "Expected an AbortSignal for revalidating fetcher deferred result");
          await resolveDeferredData(result, signal, isFetcher).then((result2) => {
            if (result2) {
              results[index] = result2 || results[index];
            }
          });
        }
      }
    }
    async function resolveDeferredData(result, signal, unwrap) {
      if (unwrap === void 0) {
        unwrap = false;
      }
      let aborted = await result.deferredData.resolveData(signal);
      if (aborted) {
        return;
      }
      if (unwrap) {
        try {
          return {
            type: ResultType.data,
            data: result.deferredData.unwrappedData
          };
        } catch (e) {
          return {
            type: ResultType.error,
            error: e
          };
        }
      }
      return {
        type: ResultType.data,
        data: result.deferredData.data
      };
    }
    function hasNakedIndexQuery(search) {
      return new URLSearchParams(search).getAll("index").some((v) => v === "");
    }
    function getTargetMatch(matches, location) {
      let search = typeof location === "string" ? parsePath(location).search : location.search;
      if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
        return matches[matches.length - 1];
      }
      let pathMatches = getPathContributingMatches(matches);
      return pathMatches[pathMatches.length - 1];
    }
    function getSubmissionFromNavigation(navigation) {
      let {
        formMethod,
        formAction,
        formEncType,
        text,
        formData,
        json: json2
      } = navigation;
      if (!formMethod || !formAction || !formEncType) {
        return;
      }
      if (text != null) {
        return {
          formMethod,
          formAction,
          formEncType,
          formData: void 0,
          json: void 0,
          text
        };
      } else if (formData != null) {
        return {
          formMethod,
          formAction,
          formEncType,
          formData,
          json: void 0,
          text: void 0
        };
      } else if (json2 !== void 0) {
        return {
          formMethod,
          formAction,
          formEncType,
          formData: void 0,
          json: json2,
          text: void 0
        };
      }
    }
    function getLoadingNavigation(location, submission) {
      if (submission) {
        let navigation = {
          state: "loading",
          location,
          formMethod: submission.formMethod,
          formAction: submission.formAction,
          formEncType: submission.formEncType,
          formData: submission.formData,
          json: submission.json,
          text: submission.text
        };
        return navigation;
      } else {
        let navigation = {
          state: "loading",
          location,
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
          json: void 0,
          text: void 0
        };
        return navigation;
      }
    }
    function getSubmittingNavigation(location, submission) {
      let navigation = {
        state: "submitting",
        location,
        formMethod: submission.formMethod,
        formAction: submission.formAction,
        formEncType: submission.formEncType,
        formData: submission.formData,
        json: submission.json,
        text: submission.text
      };
      return navigation;
    }
    function getLoadingFetcher(submission, data) {
      if (submission) {
        let fetcher = {
          state: "loading",
          formMethod: submission.formMethod,
          formAction: submission.formAction,
          formEncType: submission.formEncType,
          formData: submission.formData,
          json: submission.json,
          text: submission.text,
          data
        };
        return fetcher;
      } else {
        let fetcher = {
          state: "loading",
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
          json: void 0,
          text: void 0,
          data
        };
        return fetcher;
      }
    }
    function getSubmittingFetcher(submission, existingFetcher) {
      let fetcher = {
        state: "submitting",
        formMethod: submission.formMethod,
        formAction: submission.formAction,
        formEncType: submission.formEncType,
        formData: submission.formData,
        json: submission.json,
        text: submission.text,
        data: existingFetcher ? existingFetcher.data : void 0
      };
      return fetcher;
    }
    function getDoneFetcher(data) {
      let fetcher = {
        state: "idle",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data
      };
      return fetcher;
    }
    function restoreAppliedTransitions(_window, transitions) {
      try {
        let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
        if (sessionPositions) {
          let json2 = JSON.parse(sessionPositions);
          for (let [k, v] of Object.entries(json2 || {})) {
            if (v && Array.isArray(v)) {
              transitions.set(k, new Set(v || []));
            }
          }
        }
      } catch (e) {
      }
    }
    function persistAppliedTransitions(_window, transitions) {
      if (transitions.size > 0) {
        let json2 = {};
        for (let [k, v] of transitions) {
          json2[k] = [...v];
        }
        try {
          _window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json2));
        } catch (error) {
          warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
        }
      }
    }
    exports.AbortedDeferredError = AbortedDeferredError;
    exports.Action = Action;
    exports.IDLE_BLOCKER = IDLE_BLOCKER;
    exports.IDLE_FETCHER = IDLE_FETCHER;
    exports.IDLE_NAVIGATION = IDLE_NAVIGATION;
    exports.UNSAFE_DEFERRED_SYMBOL = UNSAFE_DEFERRED_SYMBOL;
    exports.UNSAFE_DeferredData = DeferredData;
    exports.UNSAFE_ErrorResponseImpl = ErrorResponseImpl;
    exports.UNSAFE_convertRouteMatchToUiMatch = convertRouteMatchToUiMatch;
    exports.UNSAFE_convertRoutesToDataRoutes = convertRoutesToDataRoutes;
    exports.UNSAFE_getResolveToMatches = getResolveToMatches;
    exports.UNSAFE_invariant = invariant;
    exports.UNSAFE_warning = warning;
    exports.createBrowserHistory = createBrowserHistory;
    exports.createHashHistory = createHashHistory;
    exports.createMemoryHistory = createMemoryHistory;
    exports.createPath = createPath;
    exports.createRouter = createRouter;
    exports.createStaticHandler = createStaticHandler;
    exports.defer = defer;
    exports.generatePath = generatePath;
    exports.getStaticContextFromError = getStaticContextFromError;
    exports.getToPathname = getToPathname;
    exports.isDeferredData = isDeferredData;
    exports.isRouteErrorResponse = isRouteErrorResponse;
    exports.joinPaths = joinPaths;
    exports.json = json;
    exports.matchPath = matchPath;
    exports.matchRoutes = matchRoutes;
    exports.normalizePathname = normalizePathname;
    exports.parsePath = parsePath;
    exports.redirect = redirect;
    exports.redirectDocument = redirectDocument;
    exports.resolvePath = resolvePath;
    exports.resolveTo = resolveTo;
    exports.stripBasename = stripBasename;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/mode.js
var require_mode = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/mode.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var ServerMode = /* @__PURE__ */ function(ServerMode2) {
      ServerMode2["Development"] = "development";
      ServerMode2["Production"] = "production";
      ServerMode2["Test"] = "test";
      return ServerMode2;
    }({});
    function isServerMode(value) {
      return value === ServerMode.Development || value === ServerMode.Production || value === ServerMode.Test;
    }
    exports.ServerMode = ServerMode;
    exports.isServerMode = isServerMode;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/errors.js
var require_errors = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/errors.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var router = require_router_cjs();
    var mode = require_mode();
    function sanitizeError(error, serverMode) {
      if (error instanceof Error && serverMode !== mode.ServerMode.Development) {
        let sanitized = new Error("Unexpected Server Error");
        sanitized.stack = void 0;
        return sanitized;
      }
      return error;
    }
    function sanitizeErrors(errors, serverMode) {
      return Object.entries(errors).reduce((acc, [routeId, error]) => {
        return Object.assign(acc, {
          [routeId]: sanitizeError(error, serverMode)
        });
      }, {});
    }
    function serializeError(error, serverMode) {
      let sanitized = sanitizeError(error, serverMode);
      return {
        message: sanitized.message,
        stack: sanitized.stack
      };
    }
    function serializeErrors(errors, serverMode) {
      if (!errors)
        return null;
      let entries = Object.entries(errors);
      let serialized = {};
      for (let [key, val] of entries) {
        if (router.isRouteErrorResponse(val)) {
          serialized[key] = {
            ...val,
            __type: "RouteErrorResponse"
          };
        } else if (val instanceof Error) {
          let sanitized = sanitizeError(val, serverMode);
          serialized[key] = {
            message: sanitized.message,
            stack: sanitized.stack,
            __type: "Error",
            // If this is a subclass (i.e., ReferenceError), send up the type so we
            // can re-create the same type during hydration.  This will only apply
            // in dev mode since all production errors are sanitized to normal
            // Error instances
            ...sanitized.name !== "Error" ? {
              __subType: sanitized.name
            } : {}
          };
        } else {
          serialized[key] = val;
        }
      }
      return serialized;
    }
    exports.sanitizeError = sanitizeError;
    exports.sanitizeErrors = sanitizeErrors;
    exports.serializeError = serializeError;
    exports.serializeErrors = serializeErrors;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/responses.js
var require_responses = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/responses.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var router = require_router_cjs();
    var errors = require_errors();
    var json = (data, init = {}) => {
      return router.json(data, init);
    };
    var defer = (data, init = {}) => {
      return router.defer(data, init);
    };
    var redirect = (url, init = 302) => {
      return router.redirect(url, init);
    };
    var redirectDocument = (url, init = 302) => {
      return router.redirectDocument(url, init);
    };
    function isDeferredData(value) {
      let deferred = value;
      return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
    }
    function isResponse(value) {
      return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
    }
    var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    function isRedirectStatusCode(statusCode) {
      return redirectStatusCodes.has(statusCode);
    }
    function isRedirectResponse(response) {
      return isRedirectStatusCode(response.status);
    }
    function isTrackedPromise(value) {
      return value != null && typeof value.then === "function" && value._tracked === true;
    }
    var DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
    function createDeferredReadableStream(deferredData, signal, serverMode) {
      let encoder = new TextEncoder();
      let stream = new ReadableStream({
        async start(controller) {
          let criticalData = {};
          let preresolvedKeys = [];
          for (let [key, value] of Object.entries(deferredData.data)) {
            if (isTrackedPromise(value)) {
              criticalData[key] = `${DEFERRED_VALUE_PLACEHOLDER_PREFIX}${key}`;
              if (typeof value._data !== "undefined" || typeof value._error !== "undefined") {
                preresolvedKeys.push(key);
              }
            } else {
              criticalData[key] = value;
            }
          }
          controller.enqueue(encoder.encode(JSON.stringify(criticalData) + "\n\n"));
          for (let preresolvedKey of preresolvedKeys) {
            enqueueTrackedPromise(controller, encoder, preresolvedKey, deferredData.data[preresolvedKey], serverMode);
          }
          let unsubscribe = deferredData.subscribe((aborted, settledKey) => {
            if (settledKey) {
              enqueueTrackedPromise(controller, encoder, settledKey, deferredData.data[settledKey], serverMode);
            }
          });
          await deferredData.resolveData(signal);
          unsubscribe();
          controller.close();
        }
      });
      return stream;
    }
    function enqueueTrackedPromise(controller, encoder, settledKey, promise, serverMode) {
      if ("_error" in promise) {
        controller.enqueue(encoder.encode("error:" + JSON.stringify({
          [settledKey]: promise._error instanceof Error ? errors.serializeError(promise._error, serverMode) : promise._error
        }) + "\n\n"));
      } else {
        controller.enqueue(encoder.encode("data:" + JSON.stringify({
          [settledKey]: promise._data ?? null
        }) + "\n\n"));
      }
    }
    exports.createDeferredReadableStream = createDeferredReadableStream;
    exports.defer = defer;
    exports.isDeferredData = isDeferredData;
    exports.isRedirectResponse = isRedirectResponse;
    exports.isRedirectStatusCode = isRedirectStatusCode;
    exports.isResponse = isResponse;
    exports.json = json;
    exports.redirect = redirect;
    exports.redirectDocument = redirectDocument;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/entry.js
var require_entry = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/entry.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    function createEntryRouteModules(manifest2) {
      return Object.keys(manifest2).reduce((memo, routeId) => {
        memo[routeId] = manifest2[routeId].module;
        return memo;
      }, {});
    }
    exports.createEntryRouteModules = createEntryRouteModules;
  }
});

// node_modules/.pnpm/set-cookie-parser@2.6.0/node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/.pnpm/set-cookie-parser@2.6.0/node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module2) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key === "expires") {
          cookie.expires = new Date(value2);
        } else if (key === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key === "secure") {
          cookie.secure = true;
        } else if (key === "httponly") {
          cookie.httpOnly = true;
        } else if (key === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse2(input, options) {
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!input) {
        if (!options.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key) {
            return key.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!options.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString(str, options);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString(str, options);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module2.exports = parse2;
    module2.exports.parse = parse2;
    module2.exports.parseString = parseString;
    module2.exports.splitCookiesString = splitCookiesString;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/headers.js
var require_headers = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/headers.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var setCookieParser = require_set_cookie();
    function getDocumentHeadersRR(build, context) {
      let boundaryIdx = context.errors ? context.matches.findIndex((m) => context.errors[m.route.id]) : -1;
      let matches = boundaryIdx >= 0 ? context.matches.slice(0, boundaryIdx + 1) : context.matches;
      let errorHeaders;
      if (boundaryIdx >= 0) {
        let {
          actionHeaders,
          actionData,
          loaderHeaders,
          loaderData
        } = context;
        context.matches.slice(boundaryIdx).some((match) => {
          let id = match.route.id;
          if (actionHeaders[id] && (!actionData || actionData[id] === void 0)) {
            errorHeaders = actionHeaders[id];
          } else if (loaderHeaders[id] && loaderData[id] === void 0) {
            errorHeaders = loaderHeaders[id];
          }
          return errorHeaders != null;
        });
      }
      return matches.reduce((parentHeaders, match, idx) => {
        let {
          id
        } = match.route;
        let routeModule = build.routes[id].module;
        let loaderHeaders = context.loaderHeaders[id] || new Headers();
        let actionHeaders = context.actionHeaders[id] || new Headers();
        let includeErrorHeaders = errorHeaders != void 0 && idx === matches.length - 1;
        let includeErrorCookies = includeErrorHeaders && errorHeaders !== loaderHeaders && errorHeaders !== actionHeaders;
        if (routeModule.headers == null) {
          let headers2 = new Headers(parentHeaders);
          if (includeErrorCookies) {
            prependCookies(errorHeaders, headers2);
          }
          prependCookies(actionHeaders, headers2);
          prependCookies(loaderHeaders, headers2);
          return headers2;
        }
        let headers = new Headers(routeModule.headers ? typeof routeModule.headers === "function" ? routeModule.headers({
          loaderHeaders,
          parentHeaders,
          actionHeaders,
          errorHeaders: includeErrorHeaders ? errorHeaders : void 0
        }) : routeModule.headers : void 0);
        if (includeErrorCookies) {
          prependCookies(errorHeaders, headers);
        }
        prependCookies(actionHeaders, headers);
        prependCookies(loaderHeaders, headers);
        prependCookies(parentHeaders, headers);
        return headers;
      }, new Headers());
    }
    function prependCookies(parentHeaders, childHeaders) {
      let parentSetCookieString = parentHeaders.get("Set-Cookie");
      if (parentSetCookieString) {
        let cookies = setCookieParser.splitCookiesString(parentSetCookieString);
        cookies.forEach((cookie) => {
          childHeaders.append("Set-Cookie", cookie);
        });
      }
    }
    exports.getDocumentHeadersRR = getDocumentHeadersRR;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/invariant.js
var require_invariant = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/invariant.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    function invariant(value, message) {
      if (value === false || value === null || typeof value === "undefined") {
        console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new");
        throw new Error(message);
      }
    }
    exports["default"] = invariant;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/routeMatching.js
var require_routeMatching = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/routeMatching.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var router = require_router_cjs();
    function matchServerRoutes(routes, pathname) {
      let matches = router.matchRoutes(routes, pathname);
      if (!matches)
        return null;
      return matches.map((match) => ({
        params: match.params,
        pathname: match.pathname,
        route: match.route
      }));
    }
    exports.matchServerRoutes = matchServerRoutes;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/data.js
var require_data = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/data.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var responses = require_responses();
    async function callRouteActionRR({
      loadContext,
      action,
      params,
      request,
      routeId
    }) {
      let result = await action({
        request: stripDataParam(stripIndexParam(request)),
        context: loadContext,
        params
      });
      if (result === void 0) {
        throw new Error(`You defined an action for route "${routeId}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);
      }
      return responses.isResponse(result) ? result : responses.json(result);
    }
    async function callRouteLoaderRR({
      loadContext,
      loader,
      params,
      request,
      routeId
    }) {
      let result = await loader({
        request: stripDataParam(stripIndexParam(request)),
        context: loadContext,
        params
      });
      if (result === void 0) {
        throw new Error(`You defined a loader for route "${routeId}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);
      }
      if (responses.isDeferredData(result)) {
        if (result.init && responses.isRedirectStatusCode(result.init.status || 200)) {
          return responses.redirect(new Headers(result.init.headers).get("Location"), result.init);
        }
        return result;
      }
      return responses.isResponse(result) ? result : responses.json(result);
    }
    function stripIndexParam(request) {
      let url = new URL(request.url);
      let indexValues = url.searchParams.getAll("index");
      url.searchParams.delete("index");
      let indexValuesToKeep = [];
      for (let indexValue of indexValues) {
        if (indexValue) {
          indexValuesToKeep.push(indexValue);
        }
      }
      for (let toKeep of indexValuesToKeep) {
        url.searchParams.append("index", toKeep);
      }
      let init = {
        method: request.method,
        body: request.body,
        headers: request.headers,
        signal: request.signal
      };
      if (init.body) {
        init.duplex = "half";
      }
      return new Request(url.href, init);
    }
    function stripDataParam(request) {
      let url = new URL(request.url);
      url.searchParams.delete("_data");
      let init = {
        method: request.method,
        body: request.body,
        headers: request.headers,
        signal: request.signal
      };
      if (init.body) {
        init.duplex = "half";
      }
      return new Request(url.href, init);
    }
    exports.callRouteActionRR = callRouteActionRR;
    exports.callRouteLoaderRR = callRouteLoaderRR;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/routes.js
var require_routes = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/routes.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var data = require_data();
    function groupRoutesByParentId(manifest2) {
      let routes = {};
      Object.values(manifest2).forEach((route) => {
        let parentId = route.parentId || "";
        if (!routes[parentId]) {
          routes[parentId] = [];
        }
        routes[parentId].push(route);
      });
      return routes;
    }
    function createRoutes(manifest2, parentId = "", routesByParentId = groupRoutesByParentId(manifest2)) {
      return (routesByParentId[parentId] || []).map((route) => ({
        ...route,
        children: createRoutes(manifest2, route.id, routesByParentId)
      }));
    }
    function createStaticHandlerDataRoutes(manifest2, future, parentId = "", routesByParentId = groupRoutesByParentId(manifest2)) {
      return (routesByParentId[parentId] || []).map((route) => {
        let commonRoute = {
          // Always include root due to default boundaries
          hasErrorBoundary: route.id === "root" || route.module.ErrorBoundary != null,
          id: route.id,
          path: route.path,
          loader: route.module.loader ? (
            // Need to use RR's version here to permit the optional context even
            // though we know it'll always be provided in remix
            (args) => data.callRouteLoaderRR({
              request: args.request,
              params: args.params,
              loadContext: args.context,
              loader: route.module.loader,
              routeId: route.id
            })
          ) : void 0,
          action: route.module.action ? (args) => data.callRouteActionRR({
            request: args.request,
            params: args.params,
            loadContext: args.context,
            action: route.module.action,
            routeId: route.id
          }) : void 0,
          handle: route.module.handle
        };
        return route.index ? {
          index: true,
          ...commonRoute
        } : {
          caseSensitive: route.caseSensitive,
          children: createStaticHandlerDataRoutes(manifest2, future, route.id, routesByParentId),
          ...commonRoute
        };
      });
    }
    exports.createRoutes = createRoutes;
    exports.createStaticHandlerDataRoutes = createStaticHandlerDataRoutes;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/markup.js
var require_markup = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/markup.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var ESCAPE_LOOKUP = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
    function escapeHtml(html) {
      return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
    }
    exports.escapeHtml = escapeHtml;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/serverHandoff.js
var require_serverHandoff = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/serverHandoff.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var markup = require_markup();
    function createServerHandoffString(serverHandoff) {
      return markup.escapeHtml(JSON.stringify(serverHandoff));
    }
    exports.createServerHandoffString = createServerHandoffString;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/dev.js
var require_dev = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/dev.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    async function broadcastDevReady(build, origin) {
      origin ??= process.env.REMIX_DEV_ORIGIN;
      if (!origin)
        throw Error("Dev server origin not set");
      let url = new URL(origin);
      url.pathname = "ping";
      let response = await fetch(url.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          buildHash: build.assets.version
        })
      }).catch((error) => {
        console.error(`Could not reach Remix dev server at ${url}`);
        throw error;
      });
      if (!response.ok) {
        console.error(`Could not reach Remix dev server at ${url} (${response.status})`);
        throw Error(await response.text());
      }
    }
    function logDevReady(build) {
      console.log(`[REMIX DEV] ${build.assets.version} ready`);
    }
    var globalDevServerHooksKey = "__remix_devServerHooks";
    function setDevServerHooks(devServerHooks) {
      globalThis[globalDevServerHooksKey] = devServerHooks;
    }
    function getDevServerHooks() {
      return globalThis[globalDevServerHooksKey];
    }
    exports.broadcastDevReady = broadcastDevReady;
    exports.getDevServerHooks = getDevServerHooks;
    exports.logDevReady = logDevReady;
    exports.setDevServerHooks = setDevServerHooks;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/server.js
var require_server = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/server.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var router = require_router_cjs();
    var entry = require_entry();
    var errors = require_errors();
    var headers = require_headers();
    var invariant = require_invariant();
    var mode = require_mode();
    var routeMatching = require_routeMatching();
    var routes = require_routes();
    var responses = require_responses();
    var serverHandoff = require_serverHandoff();
    var dev = require_dev();
    function derive(build, mode$1) {
      var _build$future;
      let routes$1 = routes.createRoutes(build.routes);
      let dataRoutes = routes.createStaticHandlerDataRoutes(build.routes, build.future);
      let serverMode = mode.isServerMode(mode$1) ? mode$1 : mode.ServerMode.Production;
      let staticHandler = router.createStaticHandler(dataRoutes, {
        future: {
          v7_relativeSplatPath: (_build$future = build.future) === null || _build$future === void 0 ? void 0 : _build$future.v3_relativeSplatPath
        }
      });
      let errorHandler2 = build.entry.module.handleError || ((error, {
        request
      }) => {
        if (serverMode !== mode.ServerMode.Test && !request.signal.aborted) {
          console.error(
            // @ts-expect-error This is "private" from users but intended for internal use
            router.isRouteErrorResponse(error) && error.error ? error.error : error
          );
        }
      });
      return {
        routes: routes$1,
        dataRoutes,
        serverMode,
        staticHandler,
        errorHandler: errorHandler2
      };
    }
    var createRequestHandler2 = (build, mode$1) => {
      let _build;
      let routes2;
      let serverMode;
      let staticHandler;
      let errorHandler2;
      return async function requestHandler(request, loadContext = {}) {
        _build = typeof build === "function" ? await build() : build;
        if (typeof build === "function") {
          let derived = derive(_build, mode$1);
          routes2 = derived.routes;
          serverMode = derived.serverMode;
          staticHandler = derived.staticHandler;
          errorHandler2 = derived.errorHandler;
        } else if (!routes2 || !serverMode || !staticHandler || !errorHandler2) {
          let derived = derive(_build, mode$1);
          routes2 = derived.routes;
          serverMode = derived.serverMode;
          staticHandler = derived.staticHandler;
          errorHandler2 = derived.errorHandler;
        }
        let url = new URL(request.url);
        let matches = routeMatching.matchServerRoutes(routes2, url.pathname);
        let handleError = (error) => {
          if (mode$1 === mode.ServerMode.Development) {
            var _getDevServerHooks, _getDevServerHooks$pr;
            (_getDevServerHooks = dev.getDevServerHooks()) === null || _getDevServerHooks === void 0 ? void 0 : (_getDevServerHooks$pr = _getDevServerHooks.processRequestError) === null || _getDevServerHooks$pr === void 0 ? void 0 : _getDevServerHooks$pr.call(_getDevServerHooks, error);
          }
          errorHandler2(error, {
            context: loadContext,
            params: matches && matches.length > 0 ? matches[0].params : {},
            request
          });
        };
        let response;
        if (url.searchParams.has("_data")) {
          let routeId = url.searchParams.get("_data");
          response = await handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError);
          if (_build.entry.module.handleDataRequest) {
            var _matches$find;
            response = await _build.entry.module.handleDataRequest(response, {
              context: loadContext,
              params: (matches === null || matches === void 0 ? void 0 : (_matches$find = matches.find((m) => m.route.id == routeId)) === null || _matches$find === void 0 ? void 0 : _matches$find.params) || {},
              request
            });
          }
        } else if (matches && matches[matches.length - 1].route.module.default == null && matches[matches.length - 1].route.module.ErrorBoundary == null) {
          response = await handleResourceRequestRR(serverMode, staticHandler, matches.slice(-1)[0].route.id, request, loadContext, handleError);
        } else {
          var _getDevServerHooks2, _getDevServerHooks2$g;
          let criticalCss = mode$1 === mode.ServerMode.Development ? await ((_getDevServerHooks2 = dev.getDevServerHooks()) === null || _getDevServerHooks2 === void 0 ? void 0 : (_getDevServerHooks2$g = _getDevServerHooks2.getCriticalCss) === null || _getDevServerHooks2$g === void 0 ? void 0 : _getDevServerHooks2$g.call(_getDevServerHooks2, _build, url.pathname)) : void 0;
          response = await handleDocumentRequestRR(serverMode, _build, staticHandler, request, loadContext, handleError, criticalCss);
        }
        if (request.method === "HEAD") {
          return new Response(null, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText
          });
        }
        return response;
      };
    };
    async function handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError) {
      try {
        let response = await staticHandler.queryRoute(request, {
          routeId,
          requestContext: loadContext
        });
        if (responses.isRedirectResponse(response)) {
          let headers2 = new Headers(response.headers);
          headers2.set("X-Remix-Redirect", headers2.get("Location"));
          headers2.set("X-Remix-Status", response.status);
          headers2.delete("Location");
          if (response.headers.get("Set-Cookie") !== null) {
            headers2.set("X-Remix-Revalidate", "yes");
          }
          return new Response(null, {
            status: 204,
            headers: headers2
          });
        }
        if (router.UNSAFE_DEFERRED_SYMBOL in response) {
          let deferredData = response[router.UNSAFE_DEFERRED_SYMBOL];
          let body = responses.createDeferredReadableStream(deferredData, request.signal, serverMode);
          let init = deferredData.init || {};
          let headers2 = new Headers(init.headers);
          headers2.set("Content-Type", "text/remix-deferred");
          headers2.set("X-Remix-Response", "yes");
          init.headers = headers2;
          return new Response(body, init);
        }
        response.headers.set("X-Remix-Response", "yes");
        return response;
      } catch (error) {
        if (responses.isResponse(error)) {
          error.headers.set("X-Remix-Catch", "yes");
          return error;
        }
        if (router.isRouteErrorResponse(error)) {
          if (error) {
            handleError(error);
          }
          return errorResponseToJson(error, serverMode);
        }
        let errorInstance = error instanceof Error ? error : new Error("Unexpected Server Error");
        handleError(errorInstance);
        return router.json(errors.serializeError(errorInstance, serverMode), {
          status: 500,
          headers: {
            "X-Remix-Error": "yes"
          }
        });
      }
    }
    async function handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext, handleError, criticalCss) {
      let context;
      try {
        context = await staticHandler.query(request, {
          requestContext: loadContext
        });
      } catch (error) {
        handleError(error);
        return new Response(null, {
          status: 500
        });
      }
      if (responses.isResponse(context)) {
        return context;
      }
      if (context.errors) {
        Object.values(context.errors).forEach((err) => {
          if (!router.isRouteErrorResponse(err) || err.error) {
            handleError(err);
          }
        });
        context.errors = errors.sanitizeErrors(context.errors, serverMode);
      }
      let headers$1 = headers.getDocumentHeadersRR(build, context);
      let entryContext = {
        manifest: build.assets,
        routeModules: entry.createEntryRouteModules(build.routes),
        staticHandlerContext: context,
        criticalCss,
        serverHandoffString: serverHandoff.createServerHandoffString({
          url: context.location.pathname,
          criticalCss,
          state: {
            loaderData: context.loaderData,
            actionData: context.actionData,
            errors: errors.serializeErrors(context.errors, serverMode)
          },
          future: build.future,
          isSpaMode: build.isSpaMode
        }),
        future: build.future,
        isSpaMode: build.isSpaMode,
        serializeError: (err) => errors.serializeError(err, serverMode)
      };
      let handleDocumentRequestFunction = build.entry.module.default;
      try {
        return await handleDocumentRequestFunction(request, context.statusCode, headers$1, entryContext, loadContext);
      } catch (error) {
        handleError(error);
        context = router.getStaticContextFromError(staticHandler.dataRoutes, context, error);
        if (context.errors) {
          context.errors = errors.sanitizeErrors(context.errors, serverMode);
        }
        entryContext = {
          ...entryContext,
          staticHandlerContext: context,
          serverHandoffString: serverHandoff.createServerHandoffString({
            url: context.location.pathname,
            state: {
              loaderData: context.loaderData,
              actionData: context.actionData,
              errors: errors.serializeErrors(context.errors, serverMode)
            },
            future: build.future,
            isSpaMode: build.isSpaMode
          })
        };
        try {
          return await handleDocumentRequestFunction(request, context.statusCode, headers$1, entryContext, loadContext);
        } catch (error2) {
          handleError(error2);
          return returnLastResortErrorResponse(error2, serverMode);
        }
      }
    }
    async function handleResourceRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError) {
      try {
        let response = await staticHandler.queryRoute(request, {
          routeId,
          requestContext: loadContext
        });
        invariant["default"](responses.isResponse(response), "Expected a Response to be returned from queryRoute");
        return response;
      } catch (error) {
        if (responses.isResponse(error)) {
          error.headers.set("X-Remix-Catch", "yes");
          return error;
        }
        if (router.isRouteErrorResponse(error)) {
          if (error) {
            handleError(error);
          }
          return errorResponseToJson(error, serverMode);
        }
        handleError(error);
        return returnLastResortErrorResponse(error, serverMode);
      }
    }
    function errorResponseToJson(errorResponse, serverMode) {
      return router.json(errors.serializeError(
        // @ts-expect-error This is "private" from users but intended for internal use
        errorResponse.error || new Error("Unexpected Server Error"),
        serverMode
      ), {
        status: errorResponse.status,
        statusText: errorResponse.statusText,
        headers: {
          "X-Remix-Error": "yes"
        }
      });
    }
    function returnLastResortErrorResponse(error, serverMode) {
      let message = "Unexpected Server Error";
      if (serverMode !== mode.ServerMode.Production) {
        message += `

${String(error)}`;
      }
      return new Response(message, {
        status: 500,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    }
    exports.createRequestHandler = createRequestHandler2;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/sessions.js
var require_sessions = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/sessions.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var cookies = require_cookies();
    var warnings = require_warnings();
    function flash(name) {
      return `__flash_${name}__`;
    }
    var createSession = (initialData = {}, id = "") => {
      let map = new Map(Object.entries(initialData));
      return {
        get id() {
          return id;
        },
        get data() {
          return Object.fromEntries(map);
        },
        has(name) {
          return map.has(name) || map.has(flash(name));
        },
        get(name) {
          if (map.has(name))
            return map.get(name);
          let flashName = flash(name);
          if (map.has(flashName)) {
            let value = map.get(flashName);
            map.delete(flashName);
            return value;
          }
          return void 0;
        },
        set(name, value) {
          map.set(name, value);
        },
        flash(name, value) {
          map.set(flash(name), value);
        },
        unset(name) {
          map.delete(name);
        }
      };
    };
    var isSession = (object) => {
      return object != null && typeof object.id === "string" && typeof object.data !== "undefined" && typeof object.has === "function" && typeof object.get === "function" && typeof object.set === "function" && typeof object.flash === "function" && typeof object.unset === "function";
    };
    var createSessionStorageFactory = (createCookie) => ({
      cookie: cookieArg,
      createData,
      readData,
      updateData,
      deleteData
    }) => {
      let cookie = cookies.isCookie(cookieArg) ? cookieArg : createCookie((cookieArg === null || cookieArg === void 0 ? void 0 : cookieArg.name) || "__session", cookieArg);
      warnOnceAboutSigningSessionCookie(cookie);
      return {
        async getSession(cookieHeader, options) {
          let id = cookieHeader && await cookie.parse(cookieHeader, options);
          let data = id && await readData(id);
          return createSession(data || {}, id || "");
        },
        async commitSession(session, options) {
          let {
            id,
            data
          } = session;
          let expires = (options === null || options === void 0 ? void 0 : options.maxAge) != null ? new Date(Date.now() + options.maxAge * 1e3) : (options === null || options === void 0 ? void 0 : options.expires) != null ? options.expires : cookie.expires;
          if (id) {
            await updateData(id, data, expires);
          } else {
            id = await createData(data, expires);
          }
          return cookie.serialize(id, options);
        },
        async destroySession(session, options) {
          await deleteData(session.id);
          return cookie.serialize("", {
            ...options,
            maxAge: void 0,
            expires: /* @__PURE__ */ new Date(0)
          });
        }
      };
    };
    function warnOnceAboutSigningSessionCookie(cookie) {
      warnings.warnOnce(cookie.isSigned, `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/utils/cookies#signing-cookies for more information.`);
    }
    exports.createSession = createSession;
    exports.createSessionStorageFactory = createSessionStorageFactory;
    exports.isSession = isSession;
    exports.warnOnceAboutSigningSessionCookie = warnOnceAboutSigningSessionCookie;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/sessions/cookieStorage.js
var require_cookieStorage = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/sessions/cookieStorage.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var cookies = require_cookies();
    var sessions = require_sessions();
    var createCookieSessionStorageFactory = (createCookie) => ({
      cookie: cookieArg
    } = {}) => {
      let cookie = cookies.isCookie(cookieArg) ? cookieArg : createCookie((cookieArg === null || cookieArg === void 0 ? void 0 : cookieArg.name) || "__session", cookieArg);
      sessions.warnOnceAboutSigningSessionCookie(cookie);
      return {
        async getSession(cookieHeader, options) {
          return sessions.createSession(cookieHeader && await cookie.parse(cookieHeader, options) || {});
        },
        async commitSession(session, options) {
          let serializedCookie = await cookie.serialize(session.data, options);
          if (serializedCookie.length > 4096) {
            throw new Error("Cookie length will exceed browser maximum. Length: " + serializedCookie.length);
          }
          return serializedCookie;
        },
        async destroySession(_session, options) {
          return cookie.serialize("", {
            ...options,
            maxAge: void 0,
            expires: /* @__PURE__ */ new Date(0)
          });
        }
      };
    };
    exports.createCookieSessionStorageFactory = createCookieSessionStorageFactory;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/sessions/memoryStorage.js
var require_memoryStorage = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/sessions/memoryStorage.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var createMemorySessionStorageFactory = (createSessionStorage) => ({
      cookie
    } = {}) => {
      let map = /* @__PURE__ */ new Map();
      return createSessionStorage({
        cookie,
        async createData(data, expires) {
          let id = Math.random().toString(36).substring(2, 10);
          map.set(id, {
            data,
            expires
          });
          return id;
        },
        async readData(id) {
          if (map.has(id)) {
            let {
              data,
              expires
            } = map.get(id);
            if (!expires || expires > /* @__PURE__ */ new Date()) {
              return data;
            }
            if (expires)
              map.delete(id);
          }
          return null;
        },
        async updateData(id, data, expires) {
          map.set(id, {
            data,
            expires
          });
        },
        async deleteData(id) {
          map.delete(id);
        }
      });
    };
    exports.createMemorySessionStorageFactory = createMemorySessionStorageFactory;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/upload/errors.js
var require_errors2 = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/upload/errors.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var MaxPartSizeExceededError = class extends Error {
      constructor(field, maxBytes) {
        super(`Field "${field}" exceeded upload size of ${maxBytes} bytes.`);
        this.field = field;
        this.maxBytes = maxBytes;
      }
    };
    exports.MaxPartSizeExceededError = MaxPartSizeExceededError;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/upload/memoryUploadHandler.js
var require_memoryUploadHandler = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/upload/memoryUploadHandler.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var errors = require_errors2();
    function createMemoryUploadHandler({
      filter,
      maxPartSize = 3e6
    } = {}) {
      return async ({
        filename,
        contentType,
        name,
        data
      }) => {
        if (filter && !await filter({
          filename,
          contentType,
          name
        })) {
          return void 0;
        }
        let size = 0;
        let chunks = [];
        for await (let chunk of data) {
          size += chunk.byteLength;
          if (size > maxPartSize) {
            throw new errors.MaxPartSizeExceededError(name, maxPartSize);
          }
          chunks.push(chunk);
        }
        if (typeof filename === "string") {
          return new File(chunks, filename, {
            type: contentType
          });
        }
        return await new Blob(chunks, {
          type: contentType
        }).text();
      };
    }
    exports.createMemoryUploadHandler = createMemoryUploadHandler;
  }
});

// node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@remix-run+server-runtime@2.5.0_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/index.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var cookies = require_cookies();
    var formData = require_formData();
    var responses = require_responses();
    var server = require_server();
    var sessions = require_sessions();
    var cookieStorage = require_cookieStorage();
    var memoryStorage = require_memoryStorage();
    var memoryUploadHandler = require_memoryUploadHandler();
    var errors = require_errors2();
    var dev = require_dev();
    exports.createCookieFactory = cookies.createCookieFactory;
    exports.isCookie = cookies.isCookie;
    exports.unstable_composeUploadHandlers = formData.composeUploadHandlers;
    exports.unstable_parseMultipartFormData = formData.parseMultipartFormData;
    exports.defer = responses.defer;
    exports.json = responses.json;
    exports.redirect = responses.redirect;
    exports.redirectDocument = responses.redirectDocument;
    exports.createRequestHandler = server.createRequestHandler;
    exports.createSession = sessions.createSession;
    exports.createSessionStorageFactory = sessions.createSessionStorageFactory;
    exports.isSession = sessions.isSession;
    exports.createCookieSessionStorageFactory = cookieStorage.createCookieSessionStorageFactory;
    exports.createMemorySessionStorageFactory = memoryStorage.createMemorySessionStorageFactory;
    exports.unstable_createMemoryUploadHandler = memoryUploadHandler.createMemoryUploadHandler;
    exports.MaxPartSizeExceededError = errors.MaxPartSizeExceededError;
    exports.broadcastDevReady = dev.broadcastDevReady;
    exports.logDevReady = dev.logDevReady;
    exports.unstable_setDevServerHooks = dev.setDevServerHooks;
  }
});

// node_modules/.pnpm/@remix-run+cloudflare@2.5.0_@cloudflare+workers-types@4.20231218.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/crypto.js
var require_crypto = __commonJS({
  "node_modules/.pnpm/@remix-run+cloudflare@2.5.0_@cloudflare+workers-types@4.20231218.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/crypto.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var encoder = new TextEncoder();
    var sign = async (value, secret) => {
      let key = await createKey(secret, ["sign"]);
      let data = encoder.encode(value);
      let signature = await crypto.subtle.sign("HMAC", key, data);
      let hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=+$/, "");
      return value + "." + hash;
    };
    var unsign = async (signed, secret) => {
      let index = signed.lastIndexOf(".");
      let value = signed.slice(0, index);
      let hash = signed.slice(index + 1);
      let key = await createKey(secret, ["verify"]);
      let data = encoder.encode(value);
      let signature = byteStringToUint8Array(atob(hash));
      let valid = await crypto.subtle.verify("HMAC", key, signature, data);
      return valid ? value : false;
    };
    async function createKey(secret, usages) {
      let key = await crypto.subtle.importKey("raw", encoder.encode(secret), {
        name: "HMAC",
        hash: "SHA-256"
      }, false, usages);
      return key;
    }
    function byteStringToUint8Array(byteString) {
      let array = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        array[i] = byteString.charCodeAt(i);
      }
      return array;
    }
    exports.sign = sign;
    exports.unsign = unsign;
  }
});

// node_modules/.pnpm/@remix-run+cloudflare@2.5.0_@cloudflare+workers-types@4.20231218.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/implementations.js
var require_implementations = __commonJS({
  "node_modules/.pnpm/@remix-run+cloudflare@2.5.0_@cloudflare+workers-types@4.20231218.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/implementations.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var serverRuntime = require_dist();
    var crypto2 = require_crypto();
    var createCookie = serverRuntime.createCookieFactory({
      sign: crypto2.sign,
      unsign: crypto2.unsign
    });
    var createCookieSessionStorage = serverRuntime.createCookieSessionStorageFactory(createCookie);
    var createSessionStorage = serverRuntime.createSessionStorageFactory(createCookie);
    var createMemorySessionStorage = serverRuntime.createMemorySessionStorageFactory(createSessionStorage);
    exports.createCookie = createCookie;
    exports.createCookieSessionStorage = createCookieSessionStorage;
    exports.createMemorySessionStorage = createMemorySessionStorage;
    exports.createSessionStorage = createSessionStorage;
  }
});

// node_modules/.pnpm/@remix-run+cloudflare@2.5.0_@cloudflare+workers-types@4.20231218.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/sessions/workersKVStorage.js
var require_workersKVStorage = __commonJS({
  "node_modules/.pnpm/@remix-run+cloudflare@2.5.0_@cloudflare+workers-types@4.20231218.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/sessions/workersKVStorage.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var implementations = require_implementations();
    function createWorkersKVSessionStorage({
      cookie,
      kv
    }) {
      return implementations.createSessionStorage({
        cookie,
        async createData(data, expires) {
          while (true) {
            let randomBytes = new Uint8Array(8);
            crypto.getRandomValues(randomBytes);
            let id = [...randomBytes].map((x) => x.toString(16).padStart(2, "0")).join("");
            if (await kv.get(id, "json")) {
              continue;
            }
            await kv.put(id, JSON.stringify(data), {
              expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0
            });
            return id;
          }
        },
        async readData(id) {
          let session = await kv.get(id);
          if (!session) {
            return null;
          }
          return JSON.parse(session);
        },
        async updateData(id, data, expires) {
          await kv.put(id, JSON.stringify(data), {
            expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0
          });
        },
        async deleteData(id) {
          await kv.delete(id);
        }
      });
    }
    exports.createWorkersKVSessionStorage = createWorkersKVSessionStorage;
  }
});

// node_modules/.pnpm/@remix-run+cloudflare@2.5.0_@cloudflare+workers-types@4.20231218.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/.pnpm/@remix-run+cloudflare@2.5.0_@cloudflare+workers-types@4.20231218.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/index.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var workersKVStorage = require_workersKVStorage();
    var implementations = require_implementations();
    var serverRuntime = require_dist();
    exports.createWorkersKVSessionStorage = workersKVStorage.createWorkersKVSessionStorage;
    exports.createCookie = implementations.createCookie;
    exports.createCookieSessionStorage = implementations.createCookieSessionStorage;
    exports.createMemorySessionStorage = implementations.createMemorySessionStorage;
    exports.createSessionStorage = implementations.createSessionStorage;
    Object.defineProperty(exports, "MaxPartSizeExceededError", {
      enumerable: true,
      get: function() {
        return serverRuntime.MaxPartSizeExceededError;
      }
    });
    Object.defineProperty(exports, "broadcastDevReady", {
      enumerable: true,
      get: function() {
        return serverRuntime.broadcastDevReady;
      }
    });
    Object.defineProperty(exports, "createRequestHandler", {
      enumerable: true,
      get: function() {
        return serverRuntime.createRequestHandler;
      }
    });
    Object.defineProperty(exports, "createSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "defer", {
      enumerable: true,
      get: function() {
        return serverRuntime.defer;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: true,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "logDevReady", {
      enumerable: true,
      get: function() {
        return serverRuntime.logDevReady;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: true,
      get: function() {
        return serverRuntime.redirect;
      }
    });
    Object.defineProperty(exports, "redirectDocument", {
      enumerable: true,
      get: function() {
        return serverRuntime.redirectDocument;
      }
    });
    Object.defineProperty(exports, "unstable_composeUploadHandlers", {
      enumerable: true,
      get: function() {
        return serverRuntime.unstable_composeUploadHandlers;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: true,
      get: function() {
        return serverRuntime.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: true,
      get: function() {
        return serverRuntime.unstable_parseMultipartFormData;
      }
    });
  }
});

// .wrangler/tmp/bundle-PhepEA/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/wrangler@3.22.4/node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// .wrangler/tmp/bundle-PhepEA/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();

// server.workers.ts
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/hono.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/hono-base.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/compose.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/context.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/utils/cookie.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/utils/url.js
init_checked_fetch();
init_modules_watch_stub();
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (path) => {
  const groups = [];
  for (let i = 0; ; ) {
    let replaced = false;
    path = path.replace(/\{[^}]+\}/g, (m) => {
      const mark = `@\\${i}`;
      groups[i] = [mark, m];
      i++;
      replaced = true;
      return mark;
    });
    if (!replaced) {
      break;
    }
  }
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].indexOf(mark) !== -1) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    if (!patternCache[label]) {
      if (match[2]) {
        patternCache[label] = [label, match[1], new RegExp("^" + match[2] + "$")];
      } else {
        patternCache[label] = [label, match[1], true];
      }
    }
    return patternCache[label];
  }
  return null;
};
var getPath = (request) => {
  const match = request.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return match ? match[1] : "";
};
var getQueryStrings = (url) => {
  const queryIndex = url.indexOf("?", 8);
  return queryIndex === -1 ? "" : "?" + url.slice(queryIndex + 1);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result[result.length - 1] === "/" ? result.slice(0, -1) : result;
};
var mergePath = (...paths) => {
  let p = "";
  let endsWithSlash = false;
  for (let path of paths) {
    if (p[p.length - 1] === "/") {
      p = p.slice(0, -1);
      endsWithSlash = true;
    }
    if (path[0] !== "/") {
      path = `/${path}`;
    }
    if (path === "/" && endsWithSlash) {
      p = `${p}/`;
    } else if (path !== "/") {
      p = `${p}${path}`;
    }
    if (path === "/" && p === "") {
      p = "/";
    }
  }
  return p;
};
var checkOptionalParameter = (path) => {
  if (!path.match(/\:.+\?$/))
    return null;
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return /%/.test(value) ? decodeURIComponent_(value) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ?? (encoded = /[%+]/.test(url));
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ?? (results[name] = value);
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/utils/cookie.js
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var parse = (cookie, name) => {
  const pairs = cookie.trim().split(";");
  return pairs.reduce((parsedCookie, pairStr) => {
    pairStr = pairStr.trim();
    const valueStartPos = pairStr.indexOf("=");
    if (valueStartPos === -1)
      return parsedCookie;
    const cookieName = pairStr.substring(0, valueStartPos).trim();
    if (name && name !== cookieName || !validCookieNameRegEx.test(cookieName))
      return parsedCookie;
    let cookieValue = pairStr.substring(valueStartPos + 1).trim();
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"'))
      cookieValue = cookieValue.slice(1, -1);
    if (validCookieValueRegEx.test(cookieValue))
      parsedCookie[cookieName] = decodeURIComponent_(cookieValue);
    return parsedCookie;
  }, {});
};
var _serialize = (name, value, opt = {}) => {
  let cookie = `${name}=${value}`;
  if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
    cookie += `; Max-Age=${Math.floor(opt.maxAge)}`;
  }
  if (opt.domain) {
    cookie += `; Domain=${opt.domain}`;
  }
  if (opt.path) {
    cookie += `; Path=${opt.path}`;
  }
  if (opt.expires) {
    cookie += `; Expires=${opt.expires.toUTCString()}`;
  }
  if (opt.httpOnly) {
    cookie += "; HttpOnly";
  }
  if (opt.secure) {
    cookie += "; Secure";
  }
  if (opt.sameSite) {
    cookie += `; SameSite=${opt.sameSite}`;
  }
  if (opt.partitioned) {
    cookie += "; Partitioned";
  }
  return cookie;
};
var serialize = (name, value, opt = {}) => {
  value = encodeURIComponent(value);
  return _serialize(name, value, opt);
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/utils/html.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/helper/html/index.js
init_checked_fetch();
init_modules_watch_stub();
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/utils/stream.js
init_checked_fetch();
init_modules_watch_stub();
var StreamingApi = class {
  constructor(writable, _readable) {
    this.abortSubscribers = [];
    this.writable = writable;
    this.writer = writable.getWriter();
    this.encoder = new TextEncoder();
    const reader = _readable.getReader();
    this.responseReadable = new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      },
      cancel: () => {
        this.abortSubscribers.forEach((subscriber) => subscriber());
      }
    });
  }
  async write(input) {
    try {
      if (typeof input === "string") {
        input = this.encoder.encode(input);
      }
      await this.writer.write(input);
    } catch (e) {
    }
    return this;
  }
  async writeln(input) {
    await this.write(input + "\n");
    return this;
  }
  sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
  async close() {
    try {
      await this.writer.close();
    } catch (e) {
    }
  }
  async pipe(body) {
    this.writer.releaseLock();
    await body.pipeTo(this.writable, { preventClose: true });
    this.writer = this.writable.getWriter();
  }
  async onAbort(listener) {
    this.abortSubscribers.push(listener);
  }
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/context.js
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var _status;
var _executionCtx;
var _headers;
var _preparedHeaders;
var _res;
var _isFresh;
var Context = class {
  constructor(req, options) {
    this.env = {};
    this._var = {};
    this.finalized = false;
    this.error = void 0;
    __privateAdd(this, _status, 200);
    __privateAdd(this, _executionCtx, void 0);
    __privateAdd(this, _headers, void 0);
    __privateAdd(this, _preparedHeaders, void 0);
    __privateAdd(this, _res, void 0);
    __privateAdd(this, _isFresh, true);
    this.renderer = (content) => this.html(content);
    this.notFoundHandler = () => new Response();
    this.render = (...args) => this.renderer(...args);
    this.setRenderer = (renderer) => {
      this.renderer = renderer;
    };
    this.header = (name, value, options2) => {
      if (value === void 0) {
        if (__privateGet(this, _headers)) {
          __privateGet(this, _headers).delete(name);
        } else if (__privateGet(this, _preparedHeaders)) {
          delete __privateGet(this, _preparedHeaders)[name.toLocaleLowerCase()];
        }
        if (this.finalized) {
          this.res.headers.delete(name);
        }
        return;
      }
      if (options2?.append) {
        if (!__privateGet(this, _headers)) {
          __privateSet(this, _isFresh, false);
          __privateSet(this, _headers, new Headers(__privateGet(this, _preparedHeaders)));
          __privateSet(this, _preparedHeaders, {});
        }
        __privateGet(this, _headers).append(name, value);
      } else {
        if (__privateGet(this, _headers)) {
          __privateGet(this, _headers).set(name, value);
        } else {
          __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
          __privateGet(this, _preparedHeaders)[name.toLowerCase()] = value;
        }
      }
      if (this.finalized) {
        if (options2?.append) {
          this.res.headers.append(name, value);
        } else {
          this.res.headers.set(name, value);
        }
      }
    };
    this.status = (status) => {
      __privateSet(this, _isFresh, false);
      __privateSet(this, _status, status);
    };
    this.set = (key, value) => {
      this._var ?? (this._var = {});
      this._var[key] = value;
    };
    this.get = (key) => {
      return this._var ? this._var[key] : void 0;
    };
    this.newResponse = (data, arg, headers) => {
      if (__privateGet(this, _isFresh) && !headers && !arg && __privateGet(this, _status) === 200) {
        return new Response(data, {
          headers: __privateGet(this, _preparedHeaders)
        });
      }
      if (arg && typeof arg !== "number") {
        this.res = new Response(data, arg);
      }
      const status = typeof arg === "number" ? arg : arg ? arg.status : __privateGet(this, _status);
      __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
      __privateGet(this, _headers) ?? __privateSet(this, _headers, new Headers());
      for (const [k, v] of Object.entries(__privateGet(this, _preparedHeaders))) {
        __privateGet(this, _headers).set(k, v);
      }
      if (__privateGet(this, _res)) {
        __privateGet(this, _res).headers.forEach((v, k) => {
          __privateGet(this, _headers)?.set(k, v);
        });
        for (const [k, v] of Object.entries(__privateGet(this, _preparedHeaders))) {
          __privateGet(this, _headers).set(k, v);
        }
      }
      headers ?? (headers = {});
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          __privateGet(this, _headers).set(k, v);
        } else {
          __privateGet(this, _headers).delete(k);
          for (const v2 of v) {
            __privateGet(this, _headers).append(k, v2);
          }
        }
      }
      return new Response(data, {
        status,
        headers: __privateGet(this, _headers)
      });
    };
    this.body = (data, arg, headers) => {
      return typeof arg === "number" ? this.newResponse(data, arg, headers) : this.newResponse(data, arg);
    };
    this.text = (text, arg, headers) => {
      if (!__privateGet(this, _preparedHeaders)) {
        if (__privateGet(this, _isFresh) && !headers && !arg) {
          return new Response(text);
        }
        __privateSet(this, _preparedHeaders, {});
      }
      __privateGet(this, _preparedHeaders)["content-type"] = TEXT_PLAIN;
      return typeof arg === "number" ? this.newResponse(text, arg, headers) : this.newResponse(text, arg);
    };
    this.json = (object, arg, headers) => {
      const body = JSON.stringify(object);
      __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
      __privateGet(this, _preparedHeaders)["content-type"] = "application/json; charset=UTF-8";
      return typeof arg === "number" ? this.newResponse(body, arg, headers) : this.newResponse(body, arg);
    };
    this.jsonT = (object, arg, headers) => {
      return this.json(object, arg, headers);
    };
    this.html = (html, arg, headers) => {
      __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
      __privateGet(this, _preparedHeaders)["content-type"] = "text/html; charset=UTF-8";
      if (typeof html === "object") {
        if (!(html instanceof Promise)) {
          html = html.toString();
        }
        if (html instanceof Promise) {
          return html.then((html2) => resolveCallback(html2, HtmlEscapedCallbackPhase.Stringify, false, {})).then((html2) => {
            return typeof arg === "number" ? this.newResponse(html2, arg, headers) : this.newResponse(html2, arg);
          });
        }
      }
      return typeof arg === "number" ? this.newResponse(html, arg, headers) : this.newResponse(html, arg);
    };
    this.redirect = (location, status = 302) => {
      __privateGet(this, _headers) ?? __privateSet(this, _headers, new Headers());
      __privateGet(this, _headers).set("Location", location);
      return this.newResponse(null, status);
    };
    this.streamText = (cb, arg, headers) => {
      headers ?? (headers = {});
      this.header("content-type", TEXT_PLAIN);
      this.header("x-content-type-options", "nosniff");
      this.header("transfer-encoding", "chunked");
      return this.stream(cb, arg, headers);
    };
    this.stream = (cb, arg, headers) => {
      const { readable, writable } = new TransformStream();
      const stream = new StreamingApi(writable, readable);
      cb(stream).finally(() => stream.close());
      return typeof arg === "number" ? this.newResponse(stream.responseReadable, arg, headers) : this.newResponse(stream.responseReadable, arg);
    };
    this.cookie = (name, value, opt) => {
      const cookie = serialize(name, value, opt);
      this.header("set-cookie", cookie, { append: true });
    };
    this.notFound = () => {
      return this.notFoundHandler(this);
    };
    this.req = req;
    if (options) {
      __privateSet(this, _executionCtx, options.executionCtx);
      this.env = options.env;
      if (options.notFoundHandler) {
        this.notFoundHandler = options.notFoundHandler;
      }
    }
  }
  get event() {
    if (__privateGet(this, _executionCtx) && "respondWith" in __privateGet(this, _executionCtx)) {
      return __privateGet(this, _executionCtx);
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (__privateGet(this, _executionCtx)) {
      return __privateGet(this, _executionCtx);
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    __privateSet(this, _isFresh, false);
    return __privateGet(this, _res) || __privateSet(this, _res, new Response("404 Not Found", { status: 404 }));
  }
  set res(_res2) {
    __privateSet(this, _isFresh, false);
    if (__privateGet(this, _res) && _res2) {
      __privateGet(this, _res).headers.delete("content-type");
      for (const [k, v] of __privateGet(this, _res).headers.entries()) {
        if (k === "set-cookie") {
          const cookies = __privateGet(this, _res).headers.getSetCookie();
          _res2.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res2.headers.append("set-cookie", cookie);
          }
        } else {
          _res2.headers.set(k, v);
        }
      }
    }
    __privateSet(this, _res, _res2);
    this.finalized = true;
  }
  get var() {
    return { ...this._var };
  }
  get runtime() {
    const global = globalThis;
    if (global?.Deno !== void 0) {
      return "deno";
    }
    if (global?.Bun !== void 0) {
      return "bun";
    }
    if (typeof global?.WebSocketPair === "function") {
      return "workerd";
    }
    if (typeof global?.EdgeRuntime === "string") {
      return "edge-light";
    }
    if (global?.fastly !== void 0) {
      return "fastly";
    }
    if (global?.__lagon__ !== void 0) {
      return "lagon";
    }
    if (global?.process?.release?.name === "node") {
      return "node";
    }
    return "other";
  }
};
_status = /* @__PURE__ */ new WeakMap();
_executionCtx = /* @__PURE__ */ new WeakMap();
_headers = /* @__PURE__ */ new WeakMap();
_preparedHeaders = /* @__PURE__ */ new WeakMap();
_res = /* @__PURE__ */ new WeakMap();
_isFresh = /* @__PURE__ */ new WeakMap();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        if (context instanceof Context) {
          context.req.routeIndex = i;
        }
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (!handler) {
        if (context instanceof Context && context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      } else {
        try {
          res = await handler(context, () => {
            return dispatch(i + 1);
          });
        } catch (err) {
          if (err instanceof Error && context instanceof Context && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/http-exception.js
init_checked_fetch();
init_modules_watch_stub();
var HTTPException = class extends Error {
  constructor(status = 500, options) {
    super(options?.message);
    this.res = options?.res;
    this.status = status;
  }
  getResponse() {
    if (this.res) {
      return this.res;
    }
    return new Response(this.message, {
      status: this.status
    });
  }
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/request.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/utils/body.js
init_checked_fetch();
init_modules_watch_stub();
var isArrayField = (value) => {
  return Array.isArray(value);
};
var parseBody = async (request, options = {
  all: false
}) => {
  let body = {};
  const contentType = request.headers.get("Content-Type");
  if (contentType && (contentType.startsWith("multipart/form-data") || contentType.startsWith("application/x-www-form-urlencoded"))) {
    const formData = await request.formData();
    if (formData) {
      const form = {};
      formData.forEach((value, key) => {
        const shouldParseAllValues = options.all || key.slice(-2) === "[]";
        if (!shouldParseAllValues) {
          form[key] = value;
          return;
        }
        if (form[key] && isArrayField(form[key])) {
          ;
          form[key].push(value);
          return;
        }
        if (form[key]) {
          form[key] = [form[key], value];
          return;
        }
        form[key] = value;
      });
      body = form;
    }
  }
  return body;
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/request.js
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _validatedData;
var _matchResult;
var HonoRequest = class {
  constructor(request, path = "/", matchResult = [[]]) {
    __privateAdd2(this, _validatedData, void 0);
    __privateAdd2(this, _matchResult, void 0);
    this.routeIndex = 0;
    this.bodyCache = {};
    this.cachedBody = (key) => {
      const { bodyCache, raw: raw2 } = this;
      const cachedBody = bodyCache[key];
      if (cachedBody)
        return cachedBody;
      if (bodyCache.arrayBuffer) {
        return (async () => {
          return await new Response(bodyCache.arrayBuffer)[key]();
        })();
      }
      return bodyCache[key] = raw2[key]();
    };
    this.raw = request;
    this.path = path;
    __privateSet2(this, _matchResult, matchResult);
    __privateSet2(this, _validatedData, {});
  }
  param(key) {
    if (key) {
      const param = __privateGet2(this, _matchResult)[1] ? __privateGet2(this, _matchResult)[1][__privateGet2(this, _matchResult)[0][this.routeIndex][1][key]] : __privateGet2(this, _matchResult)[0][this.routeIndex][1][key];
      return param ? /\%/.test(param) ? decodeURIComponent_(param) : param : void 0;
    } else {
      const decoded = {};
      const keys = Object.keys(__privateGet2(this, _matchResult)[0][this.routeIndex][1]);
      for (let i = 0, len = keys.length; i < len; i++) {
        const key2 = keys[i];
        const value = __privateGet2(this, _matchResult)[1] ? __privateGet2(this, _matchResult)[1][__privateGet2(this, _matchResult)[0][this.routeIndex][1][key2]] : __privateGet2(this, _matchResult)[0][this.routeIndex][1][key2];
        if (value && typeof value === "string") {
          decoded[key2] = /\%/.test(value) ? decodeURIComponent_(value) : value;
        }
      }
      return decoded;
    }
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name)
      return this.raw.headers.get(name.toLowerCase()) ?? void 0;
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  cookie(key) {
    const cookie = this.raw.headers.get("Cookie");
    if (!cookie)
      return;
    const obj = parse(cookie);
    if (key) {
      const value = obj[key];
      return value;
    } else {
      return obj;
    }
  }
  async parseBody(options) {
    if (this.bodyCache.parsedBody)
      return this.bodyCache.parsedBody;
    const parsedBody = await parseBody(this, options);
    this.bodyCache.parsedBody = parsedBody;
    return parsedBody;
  }
  json() {
    return this.cachedBody("json");
  }
  text() {
    return this.cachedBody("text");
  }
  arrayBuffer() {
    return this.cachedBody("arrayBuffer");
  }
  blob() {
    return this.cachedBody("blob");
  }
  formData() {
    return this.cachedBody("formData");
  }
  addValidatedData(target, data) {
    __privateGet2(this, _validatedData)[target] = data;
  }
  valid(target) {
    return __privateGet2(this, _validatedData)[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return __privateGet2(this, _matchResult)[0].map(([[, route]]) => route);
  }
  get routePath() {
    return __privateGet2(this, _matchResult)[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
  get headers() {
    return this.raw.headers;
  }
  get body() {
    return this.raw.body;
  }
  get bodyUsed() {
    return this.raw.bodyUsed;
  }
  get integrity() {
    return this.raw.integrity;
  }
  get keepalive() {
    return this.raw.keepalive;
  }
  get referrer() {
    return this.raw.referrer;
  }
  get signal() {
    return this.raw.signal;
  }
};
_validatedData = /* @__PURE__ */ new WeakMap();
_matchResult = /* @__PURE__ */ new WeakMap();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/router.js
init_checked_fetch();
init_modules_watch_stub();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/hono-base.js
var __accessCheck3 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet3 = (obj, member, getter) => {
  __accessCheck3(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd3 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet3 = (obj, member, value, setter) => {
  __accessCheck3(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var COMPOSED_HANDLER = Symbol("composedHandler");
function defineDynamicClass() {
  return class {
  };
}
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  console.error(err);
  const message = "Internal Server Error";
  return c.text(message, 500);
};
var _path;
var _Hono = class extends defineDynamicClass() {
  constructor(options = {}) {
    super();
    this._basePath = "/";
    __privateAdd3(this, _path, "/");
    this.routes = [];
    this.notFoundHandler = notFoundHandler;
    this.errorHandler = errorHandler;
    this.onError = (handler) => {
      this.errorHandler = handler;
      return this;
    };
    this.notFound = (handler) => {
      this.notFoundHandler = handler;
      return this;
    };
    this.head = () => {
      console.warn("`app.head()` is no longer used. `app.get()` implicitly handles the HEAD method.");
      return this;
    };
    this.handleEvent = (event) => {
      return this.dispatch(event.request, event, void 0, event.request.method);
    };
    this.fetch = (request, Env, executionCtx) => {
      return this.dispatch(request, executionCtx, Env, request.method);
    };
    this.request = (input, requestInit, Env, executionCtx) => {
      if (input instanceof Request) {
        if (requestInit !== void 0) {
          input = new Request(input, requestInit);
        }
        return this.fetch(input, Env, executionCtx);
      }
      input = input.toString();
      const path = /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`;
      const req = new Request(path, requestInit);
      return this.fetch(req, Env, executionCtx);
    };
    this.fire = () => {
      addEventListener("fetch", (event) => {
        event.respondWith(this.dispatch(event.request, event, void 0, event.request.method));
      });
    };
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.map((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          __privateSet3(this, _path, args1);
        } else {
          this.addRoute(method, __privateGet3(this, _path), args1);
        }
        args.map((handler) => {
          if (typeof handler !== "string") {
            this.addRoute(method, __privateGet3(this, _path), handler);
          }
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      if (!method)
        return this;
      __privateSet3(this, _path, path);
      for (const m of [method].flat()) {
        handlers.map((handler) => {
          this.addRoute(m.toUpperCase(), __privateGet3(this, _path), handler);
        });
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        __privateSet3(this, _path, arg1);
      } else {
        handlers.unshift(arg1);
      }
      handlers.map((handler) => {
        this.addRoute(METHOD_NAME_ALL, __privateGet3(this, _path), handler);
      });
      return this;
    };
    const strict = options.strict ?? true;
    delete options.strict;
    Object.assign(this, options);
    this.getPath = strict ? options.getPath ?? getPath : getPathNoStrict;
  }
  clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.routes = this.routes;
    return clone;
  }
  route(path, app2) {
    const subApp = this.basePath(path);
    if (!app2) {
      return subApp;
    }
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  showRoutes() {
    const length = 8;
    this.routes.map((route) => {
      console.log(
        `\x1B[32m${route.method}\x1B[0m ${" ".repeat(length - route.method.length)} ${route.path}`
      );
    });
  }
  mount(path, applicationHandler, optionHandler) {
    const mergedPath = mergePath(this._basePath, path);
    const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
    const handler = async (c, next) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      const options = optionHandler ? optionHandler(c) : [c.env, executionContext];
      const optionsArray = Array.isArray(options) ? options : [options];
      const queryStrings = getQueryStrings(c.req.url);
      const res = await applicationHandler(
        new Request(
          new URL((c.req.path.slice(pathPrefixLength) || "/") + queryStrings, c.req.url),
          c.req.raw
        ),
        ...optionsArray
      );
      if (res)
        return res;
      await next();
    };
    this.addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  get routerName() {
    this.matchRoute("GET", "/");
    return this.router.name;
  }
  addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  matchRoute(method, path) {
    return this.router.match(method, path);
  }
  handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.matchRoute(method, path);
    const c = new Context(new HonoRequest(request, path, matchResult), {
      env: env2,
      executionCtx,
      notFoundHandler: this.notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
        });
        if (!res) {
          return this.notFoundHandler(c);
        }
      } catch (err) {
        return this.handleError(err, c);
      }
      if (res instanceof Response)
        return res;
      return (async () => {
        let awaited;
        try {
          awaited = await res;
          if (!awaited) {
            return this.notFoundHandler(c);
          }
        } catch (err) {
          return this.handleError(err, c);
        }
        return awaited;
      })();
    }
    const composed = compose(matchResult[0], this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. You may forget returning Response object or `await next()`"
          );
        }
        return context.res;
      } catch (err) {
        return this.handleError(err, c);
      }
    })();
  }
};
var Hono = _Hono;
_path = /* @__PURE__ */ new WeakMap();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/router/reg-exp-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/router/reg-exp-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/router/reg-exp-router/node.js
init_checked_fetch();
init_modules_watch_stub();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
function compareKey(a, b2) {
  if (a.length === 1) {
    return b2.length === 1 ? a < b2 ? -1 : 1 : -1;
  }
  if (b2.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b2 === ONLY_WILDCARD_REG_EXP_STR || b2 === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b2 === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b2.length ? a < b2 ? -1 : 1 : b2.length - a.length;
}
var Node = class {
  constructor() {
    this.children = {};
  }
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.children[regexpStr];
      if (!node) {
        if (Object.keys(this.children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.children[regexpStr] = new Node();
        if (name !== "") {
          node.varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.varIndex]);
      }
    } else {
      node = this.children[token];
      if (!node) {
        if (Object.keys(this.children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.children[token] = new Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.children[k];
      return (typeof c.varIndex === "number" ? `(${k})@${c.varIndex}` : k) + c.buildRegExpStr();
    });
    if (typeof this.index === "number") {
      strList.unshift(`#${this.index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/router/reg-exp-router/trie.js
init_checked_fetch();
init_modules_watch_stub();
var Trie = class {
  constructor() {
    this.context = { varIndex: 0 };
    this.root = new Node();
  }
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.root.insert(tokens, index, paramAssoc, this.context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (typeof handlerIndex !== "undefined") {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (typeof paramIndex !== "undefined") {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/router/reg-exp-router/router.js
var methodNames = [METHOD_NAME_ALL, ...METHODS].map((method) => method.toUpperCase());
var emptyParam = [];
var nullMatcher = [/^$/, [], {}];
var wildcardRegExpCache = {};
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ?? (wildcardRegExpCache[path] = new RegExp(
    path === "*" ? "" : `^${path.replace(/\/\*/, "(?:|/.*)")}$`
  ));
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = {};
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = {};
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, {}]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = {};
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b2) => b2.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  constructor() {
    this.name = "RegExpRouter";
    this.middleware = { [METHOD_NAME_ALL]: {} };
    this.routes = { [METHOD_NAME_ALL]: {} };
  }
  add(method, path, handler) {
    var _a;
    const { middleware, routes } = this;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (methodNames.indexOf(method) === -1)
      methodNames.push(method);
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = {};
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          var _a2;
          (_a2 = middleware[m])[path] || (_a2[path] = findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || []);
        });
      } else {
        (_a = middleware[method])[path] || (_a[path] = findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || []);
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        var _a2;
        if (method === METHOD_NAME_ALL || method === m) {
          (_a2 = routes[m])[path2] || (_a2[path2] = [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ]);
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match(method, path) {
    clearWildcardRegExpCache();
    const matchers = this.buildAllMatchers();
    this.match = (method2, path2) => {
      const matcher = matchers[method2];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match = path2.match(matcher[0]);
      if (!match) {
        return [[], emptyParam];
      }
      const index = match.indexOf("", 1);
      return [matcher[1][index], match];
    };
    return this.match(method, path);
  }
  buildAllMatchers() {
    const matchers = {};
    methodNames.forEach((method) => {
      matchers[method] = this.buildMatcher(method) || matchers[METHOD_NAME_ALL];
    });
    this.middleware = this.routes = void 0;
    return matchers;
  }
  buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.middleware, this.routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute || (hasOwnRoute = true);
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/router/smart-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/router/smart-router/router.js
init_checked_fetch();
init_modules_watch_stub();
var SmartRouter = class {
  constructor(init) {
    this.name = "SmartRouter";
    this.routers = [];
    this.routes = [];
    Object.assign(this, init);
  }
  add(method, path, handler) {
    if (!this.routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.routes) {
      throw new Error("Fatal error");
    }
    const { routers, routes } = this;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        routes.forEach((args) => {
          router.add(...args);
        });
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.routers = [router];
      this.routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.routes || this.routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.routers[0];
  }
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/router/trie-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/router/trie-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/router/trie-router/node.js
init_checked_fetch();
init_modules_watch_stub();
var Node2 = class {
  constructor(method, handler, children) {
    this.order = 0;
    this.params = {};
    this.children = children || {};
    this.methods = [];
    this.name = "";
    if (method && handler) {
      const m = {};
      m[method] = { handler, possibleKeys: [], score: 0, name: this.name };
      this.methods = [m];
    }
    this.patterns = [];
  }
  insert(method, path, handler) {
    this.name = `${method} ${path}`;
    this.order = ++this.order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    const parentPatterns = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      if (Object.keys(curNode.children).includes(p)) {
        parentPatterns.push(...curNode.patterns);
        curNode = curNode.children[p];
        const pattern2 = getPattern(p);
        if (pattern2)
          possibleKeys.push(pattern2[1]);
        continue;
      }
      curNode.children[p] = new Node2();
      const pattern = getPattern(p);
      if (pattern) {
        curNode.patterns.push(pattern);
        parentPatterns.push(...curNode.patterns);
        possibleKeys.push(pattern[1]);
      }
      parentPatterns.push(...curNode.patterns);
      curNode = curNode.children[p];
    }
    if (!curNode.methods.length) {
      curNode.methods = [];
    }
    const m = {};
    const handlerSet = {
      handler,
      possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
      name: this.name,
      score: this.order
    };
    m[method] = handlerSet;
    curNode.methods.push(m);
    return curNode;
  }
  gHSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.methods.length; i < len; i++) {
      const m = node.methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = {};
        handlerSet.possibleKeys.forEach((key) => {
          const processed = processedSet[handlerSet.name];
          handlerSet.params[key] = params[key] && !processed ? params[key] : nodeParams[key] ?? params[key];
          processedSet[handlerSet.name] = true;
        });
        handlerSets.push(handlerSet);
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.params = {};
    const params = {};
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.children[part];
        if (nextNode) {
          nextNode.params = node.params;
          if (isLast === true) {
            if (nextNode.children["*"]) {
              handlerSets.push(...this.gHSets(nextNode.children["*"], method, node.params, {}));
            }
            handlerSets.push(...this.gHSets(nextNode, method, node.params, {}));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.patterns.length; k < len3; k++) {
          const pattern = node.patterns[k];
          if (pattern === "*") {
            const astNode = node.children["*"];
            if (astNode) {
              handlerSets.push(...this.gHSets(astNode, method, node.params, {}));
              tempNodes.push(astNode);
            }
            continue;
          }
          if (part === "")
            continue;
          const [key, name, matcher] = pattern;
          const child = node.children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp && matcher.test(restPathString)) {
            params[name] = restPathString;
            handlerSets.push(...this.gHSets(child, method, node.params, params));
            continue;
          }
          if (matcher === true || matcher instanceof RegExp && matcher.test(part)) {
            if (typeof key === "string") {
              params[name] = part;
              if (isLast === true) {
                handlerSets.push(...this.gHSets(child, method, params, node.params));
                if (child.children["*"]) {
                  handlerSets.push(...this.gHSets(child.children["*"], method, node.params, params));
                }
              } else {
                child.params = { ...params };
                tempNodes.push(child);
              }
            }
          }
        }
      }
      curNodes = tempNodes;
    }
    const results = handlerSets.sort((a, b2) => {
      return a.score - b2.score;
    });
    return [results.map(({ handler, params: params2 }) => [handler, params2])];
  }
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  constructor() {
    this.name = "TrieRouter";
    this.node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (const p of results) {
        this.node.insert(method, p, handler);
      }
      return;
    }
    this.node.insert(method, path, handler);
  }
  match(method, path) {
    return this.node.search(method, path);
  }
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/adapter/cloudflare-workers/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/adapter/cloudflare-workers/serve-static-module.js
init_checked_fetch();
init_modules_watch_stub();
import manifest from "__STATIC_CONTENT_MANIFEST";

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/adapter/cloudflare-workers/serve-static.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/utils/filepath.js
init_checked_fetch();
init_modules_watch_stub();
var getFilePath = (options) => {
  let filename = options.filename;
  if (/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(filename))
    return;
  let root = options.root || "";
  const defaultDocument = options.defaultDocument || "index.html";
  if (filename.endsWith("/")) {
    filename = filename.concat(defaultDocument);
  } else if (!filename.match(/\.[a-zA-Z0-9]+$/)) {
    filename = filename.concat("/" + defaultDocument);
  }
  filename = filename.replace(/^\.?[\/\\]/, "");
  filename = filename.replace(/\\/, "/");
  root = root.replace(/\/$/, "");
  let path = root ? root + "/" + filename : filename;
  path = path.replace(/^\.?\//, "");
  return path;
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/utils/mime.js
init_checked_fetch();
init_modules_watch_stub();
var getMimeType = (filename) => {
  const regexp = /\.([a-zA-Z0-9]+?)$/;
  const match = filename.match(regexp);
  if (!match)
    return;
  let mimeType = mimes[match[1]];
  if (mimeType && mimeType.startsWith("text") || mimeType === "application/json") {
    mimeType += "; charset=utf-8";
  }
  return mimeType;
};
var mimes = {
  aac: "audio/aac",
  abw: "application/x-abiword",
  arc: "application/x-freearc",
  avi: "video/x-msvideo",
  avif: "image/avif",
  av1: "video/av1",
  azw: "application/vnd.amazon.ebook",
  bin: "application/octet-stream",
  bmp: "image/bmp",
  bz: "application/x-bzip",
  bz2: "application/x-bzip2",
  csh: "application/x-csh",
  css: "text/css",
  csv: "text/csv",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  eot: "application/vnd.ms-fontobject",
  epub: "application/epub+zip",
  gif: "image/gif",
  gz: "application/gzip",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  ics: "text/calendar",
  jar: "application/java-archive",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  jsonld: "application/ld+json",
  map: "application/json",
  mid: "audio/x-midi",
  midi: "audio/x-midi",
  mjs: "text/javascript",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  mpeg: "video/mpeg",
  mpkg: "application/vnd.apple.installer+xml",
  odp: "application/vnd.oasis.opendocument.presentation",
  ods: "application/vnd.oasis.opendocument.spreadsheet",
  odt: "application/vnd.oasis.opendocument.text",
  oga: "audio/ogg",
  ogv: "video/ogg",
  ogx: "application/ogg",
  opus: "audio/opus",
  otf: "font/otf",
  pdf: "application/pdf",
  php: "application/php",
  png: "image/png",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  rtf: "application/rtf",
  sh: "application/x-sh",
  svg: "image/svg+xml",
  swf: "application/x-shockwave-flash",
  tar: "application/x-tar",
  tif: "image/tiff",
  tiff: "image/tiff",
  ts: "video/mp2t",
  ttf: "font/ttf",
  txt: "text/plain",
  vsd: "application/vnd.visio",
  wasm: "application/wasm",
  webm: "video/webm",
  weba: "audio/webm",
  webp: "image/webp",
  woff: "font/woff",
  woff2: "font/woff2",
  xhtml: "application/xhtml+xml",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xml: "application/xml",
  xul: "application/vnd.mozilla.xul+xml",
  zip: "application/zip",
  "3gp": "video/3gpp",
  "3g2": "video/3gpp2",
  "7z": "application/x-7z-compressed",
  gltf: "model/gltf+json",
  glb: "model/gltf-binary"
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/adapter/cloudflare-workers/utils.js
init_checked_fetch();
init_modules_watch_stub();
var getContentFromKVAsset = async (path, options) => {
  let ASSET_MANIFEST = {};
  if (options && options.manifest) {
    if (typeof options.manifest === "string") {
      ASSET_MANIFEST = JSON.parse(options.manifest);
    } else {
      ASSET_MANIFEST = options.manifest;
    }
  } else {
    if (typeof __STATIC_CONTENT_MANIFEST === "string") {
      ASSET_MANIFEST = JSON.parse(__STATIC_CONTENT_MANIFEST);
    } else {
      ASSET_MANIFEST = __STATIC_CONTENT_MANIFEST;
    }
  }
  let ASSET_NAMESPACE;
  if (options && options.namespace) {
    ASSET_NAMESPACE = options.namespace;
  } else {
    ASSET_NAMESPACE = __STATIC_CONTENT;
  }
  const key = ASSET_MANIFEST[path] || path;
  if (!key) {
    return null;
  }
  const content = await ASSET_NAMESPACE.get(key, { type: "arrayBuffer" });
  if (!content) {
    return null;
  }
  return content;
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/adapter/cloudflare-workers/serve-static.js
var DEFAULT_DOCUMENT = "index.html";
var serveStatic = (options = { root: "" }) => {
  return async (c, next) => {
    if (c.finalized) {
      await next();
      return;
    }
    const url = new URL(c.req.url);
    const filename = options.path ?? decodeURI(url.pathname);
    const path = getFilePath({
      filename: options.rewriteRequestPath ? options.rewriteRequestPath(filename) : filename,
      root: options.root,
      defaultDocument: DEFAULT_DOCUMENT
    });
    if (!path)
      return await next();
    const content = await getContentFromKVAsset(path, {
      manifest: options.manifest,
      namespace: options.namespace ? options.namespace : c.env ? c.env.__STATIC_CONTENT : void 0
    });
    if (content) {
      const mimeType = getMimeType(path);
      if (mimeType) {
        c.header("Content-Type", mimeType);
      }
      return c.body(content);
    }
    await options.onNotFound?.(path, c);
    await next();
    return;
  };
};

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/adapter/cloudflare-workers/serve-static-module.js
var module = (options = { root: "" }) => {
  options.manifest ?? (options.manifest = manifest);
  return serveStatic(options);
};

// server.ts
init_checked_fetch();
init_modules_watch_stub();

// node_modules/.pnpm/hono@3.12.5/node_modules/hono/dist/helper/adapter/index.js
init_checked_fetch();
init_modules_watch_stub();
var env = (c, runtime) => {
  const global = globalThis;
  const globalEnv = global?.process?.env;
  runtime ?? (runtime = getRuntimeKey());
  const runtimeEnvHandlers = {
    bun: () => globalEnv,
    node: () => globalEnv,
    "edge-light": () => globalEnv,
    lagon: () => globalEnv,
    deno: () => {
      return Deno.env.toObject();
    },
    workerd: () => c.env,
    fastly: () => ({}),
    other: () => ({})
  };
  return runtimeEnvHandlers[runtime]();
};
var getRuntimeKey = () => {
  const global = globalThis;
  if (global?.Deno !== void 0)
    return "deno";
  if (global?.Bun !== void 0)
    return "bun";
  if (typeof global?.WebSocketPair === "function")
    return "workerd";
  if (typeof global?.EdgeRuntime === "string")
    return "edge-light";
  if (global?.fastly !== void 0)
    return "fastly";
  if (global?.__lagon__ !== void 0)
    return "lagon";
  if (global?.process?.release?.name === "node")
    return "node";
  return "other";
};

// server.ts
var import_cloudflare = __toESM(require_dist2(), 1);

// build/index.js
var build_exports = {};
__export(build_exports, {
  assets: () => W_,
  assetsBuildDirectory: () => _P,
  entry: () => bP,
  future: () => NP,
  mode: () => CP,
  publicPath: () => PP,
  routes: () => LP
});
init_checked_fetch();
init_modules_watch_stub();
var C1 = Object.create;
var Qi = Object.defineProperty;
var _1 = Object.getOwnPropertyDescriptor;
var N1 = Object.getOwnPropertyNames;
var P1 = Object.getPrototypeOf;
var b1 = Object.prototype.hasOwnProperty;
var Uu = (e, t) => () => (e && (t = e(e = 0)), t);
var Ot = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var xo = (e, t) => {
  for (var r in t)
    Qi(e, r, { get: t[r], enumerable: true });
};
var Wp = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of N1(t))
      !b1.call(e, o) && o !== r && Qi(e, o, { get: () => t[o], enumerable: !(n = _1(t, o)) || n.enumerable });
  return e;
};
var Ee = (e, t, r) => (r = e != null ? C1(P1(e)) : {}, Wp(t || !e || !e.__esModule ? Qi(r, "default", { value: e, enumerable: true }) : r, e));
var ju = (e) => Wp(Qi({}, "__esModule", { value: true }), e);
var rh = Ot((J) => {
  "use strict";
  var yl = Symbol.for("react.element"), L1 = Symbol.for("react.portal"), T1 = Symbol.for("react.fragment"), D1 = Symbol.for("react.strict_mode"), F1 = Symbol.for("react.profiler"), M1 = Symbol.for("react.provider"), O1 = Symbol.for("react.context"), z1 = Symbol.for("react.forward_ref"), I1 = Symbol.for("react.suspense"), A1 = Symbol.for("react.memo"), U1 = Symbol.for("react.lazy"), Kp = Symbol.iterator;
  function j1(e) {
    return e === null || typeof e != "object" ? null : (e = Kp && e[Kp] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Gp = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Jp = Object.assign, Xp = {};
  function Eo(e, t, r) {
    this.props = e, this.context = t, this.refs = Xp, this.updater = r || Gp;
  }
  Eo.prototype.isReactComponent = {};
  Eo.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState");
  };
  Eo.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  function Zp() {
  }
  Zp.prototype = Eo.prototype;
  function Vu(e, t, r) {
    this.props = e, this.context = t, this.refs = Xp, this.updater = r || Gp;
  }
  var Hu = Vu.prototype = new Zp();
  Hu.constructor = Vu;
  Jp(Hu, Eo.prototype);
  Hu.isPureReactComponent = true;
  var Qp = Array.isArray, qp = Object.prototype.hasOwnProperty, $u = { current: null }, eh = { key: true, ref: true, __self: true, __source: true };
  function th(e, t, r) {
    var n, o = {}, l = null, i = null;
    if (t != null)
      for (n in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (l = "" + t.key), t)
        qp.call(t, n) && !eh.hasOwnProperty(n) && (o[n] = t[n]);
    var a = arguments.length - 2;
    if (a === 1)
      o.children = r;
    else if (1 < a) {
      for (var s = Array(a), u = 0; u < a; u++)
        s[u] = arguments[u + 2];
      o.children = s;
    }
    if (e && e.defaultProps)
      for (n in a = e.defaultProps, a)
        o[n] === void 0 && (o[n] = a[n]);
    return { $$typeof: yl, type: e, key: l, ref: i, props: o, _owner: $u.current };
  }
  function B1(e, t) {
    return { $$typeof: yl, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
  }
  function Wu(e) {
    return typeof e == "object" && e !== null && e.$$typeof === yl;
  }
  function V1(e) {
    var t = { "=": "=0", ":": "=2" };
    return "$" + e.replace(/[=:]/g, function(r) {
      return t[r];
    });
  }
  var Yp = /\/+/g;
  function Bu(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? V1("" + e.key) : t.toString(36);
  }
  function Gi(e, t, r, n, o) {
    var l = typeof e;
    (l === "undefined" || l === "boolean") && (e = null);
    var i = false;
    if (e === null)
      i = true;
    else
      switch (l) {
        case "string":
        case "number":
          i = true;
          break;
        case "object":
          switch (e.$$typeof) {
            case yl:
            case L1:
              i = true;
          }
      }
    if (i)
      return i = e, o = o(i), e = n === "" ? "." + Bu(i, 0) : n, Qp(o) ? (r = "", e != null && (r = e.replace(Yp, "$&/") + "/"), Gi(o, t, r, "", function(u) {
        return u;
      })) : o != null && (Wu(o) && (o = B1(o, r + (!o.key || i && i.key === o.key ? "" : ("" + o.key).replace(Yp, "$&/") + "/") + e)), t.push(o)), 1;
    if (i = 0, n = n === "" ? "." : n + ":", Qp(e))
      for (var a = 0; a < e.length; a++) {
        l = e[a];
        var s = n + Bu(l, a);
        i += Gi(l, t, r, s, o);
      }
    else if (s = j1(e), typeof s == "function")
      for (e = s.call(e), a = 0; !(l = e.next()).done; )
        l = l.value, s = n + Bu(l, a++), i += Gi(l, t, r, s, o);
    else if (l === "object")
      throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return i;
  }
  function Yi(e, t, r) {
    if (e == null)
      return e;
    var n = [], o = 0;
    return Gi(e, n, "", "", function(l) {
      return t.call(r, l, o++);
    }), n;
  }
  function H1(e) {
    if (e._status === -1) {
      var t = e._result;
      t = t(), t.then(function(r) {
        (e._status === 0 || e._status === -1) && (e._status = 1, e._result = r);
      }, function(r) {
        (e._status === 0 || e._status === -1) && (e._status = 2, e._result = r);
      }), e._status === -1 && (e._status = 0, e._result = t);
    }
    if (e._status === 1)
      return e._result.default;
    throw e._result;
  }
  var nt = { current: null }, Ji = { transition: null }, $1 = { ReactCurrentDispatcher: nt, ReactCurrentBatchConfig: Ji, ReactCurrentOwner: $u };
  J.Children = { map: Yi, forEach: function(e, t, r) {
    Yi(e, function() {
      t.apply(this, arguments);
    }, r);
  }, count: function(e) {
    var t = 0;
    return Yi(e, function() {
      t++;
    }), t;
  }, toArray: function(e) {
    return Yi(e, function(t) {
      return t;
    }) || [];
  }, only: function(e) {
    if (!Wu(e))
      throw Error("React.Children.only expected to receive a single React element child.");
    return e;
  } };
  J.Component = Eo;
  J.Fragment = T1;
  J.Profiler = F1;
  J.PureComponent = Vu;
  J.StrictMode = D1;
  J.Suspense = I1;
  J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $1;
  J.cloneElement = function(e, t, r) {
    if (e == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var n = Jp({}, e.props), o = e.key, l = e.ref, i = e._owner;
    if (t != null) {
      if (t.ref !== void 0 && (l = t.ref, i = $u.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps)
        var a = e.type.defaultProps;
      for (s in t)
        qp.call(t, s) && !eh.hasOwnProperty(s) && (n[s] = t[s] === void 0 && a !== void 0 ? a[s] : t[s]);
    }
    var s = arguments.length - 2;
    if (s === 1)
      n.children = r;
    else if (1 < s) {
      a = Array(s);
      for (var u = 0; u < s; u++)
        a[u] = arguments[u + 2];
      n.children = a;
    }
    return { $$typeof: yl, type: e.type, key: o, ref: l, props: n, _owner: i };
  };
  J.createContext = function(e) {
    return e = { $$typeof: O1, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: M1, _context: e }, e.Consumer = e;
  };
  J.createElement = th;
  J.createFactory = function(e) {
    var t = th.bind(null, e);
    return t.type = e, t;
  };
  J.createRef = function() {
    return { current: null };
  };
  J.forwardRef = function(e) {
    return { $$typeof: z1, render: e };
  };
  J.isValidElement = Wu;
  J.lazy = function(e) {
    return { $$typeof: U1, _payload: { _status: -1, _result: e }, _init: H1 };
  };
  J.memo = function(e, t) {
    return { $$typeof: A1, type: e, compare: t === void 0 ? null : t };
  };
  J.startTransition = function(e) {
    var t = Ji.transition;
    Ji.transition = {};
    try {
      e();
    } finally {
      Ji.transition = t;
    }
  };
  J.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  };
  J.useCallback = function(e, t) {
    return nt.current.useCallback(e, t);
  };
  J.useContext = function(e) {
    return nt.current.useContext(e);
  };
  J.useDebugValue = function() {
  };
  J.useDeferredValue = function(e) {
    return nt.current.useDeferredValue(e);
  };
  J.useEffect = function(e, t) {
    return nt.current.useEffect(e, t);
  };
  J.useId = function() {
    return nt.current.useId();
  };
  J.useImperativeHandle = function(e, t, r) {
    return nt.current.useImperativeHandle(e, t, r);
  };
  J.useInsertionEffect = function(e, t) {
    return nt.current.useInsertionEffect(e, t);
  };
  J.useLayoutEffect = function(e, t) {
    return nt.current.useLayoutEffect(e, t);
  };
  J.useMemo = function(e, t) {
    return nt.current.useMemo(e, t);
  };
  J.useReducer = function(e, t, r) {
    return nt.current.useReducer(e, t, r);
  };
  J.useRef = function(e) {
    return nt.current.useRef(e);
  };
  J.useState = function(e) {
    return nt.current.useState(e);
  };
  J.useSyncExternalStore = function(e, t, r) {
    return nt.current.useSyncExternalStore(e, t, r);
  };
  J.useTransition = function() {
    return nt.current.useTransition();
  };
  J.version = "18.2.0";
});
var je = Ot((Y_, nh) => {
  "use strict";
  nh.exports = rh();
});
var ph = Ot((ae) => {
  "use strict";
  function Gu(e, t) {
    var r = e.length;
    e.push(t);
    e:
      for (; 0 < r; ) {
        var n = r - 1 >>> 1, o = e[n];
        if (0 < Xi(o, t))
          e[n] = t, e[r] = o, r = n;
        else
          break e;
      }
  }
  function Xt(e) {
    return e.length === 0 ? null : e[0];
  }
  function qi(e) {
    if (e.length === 0)
      return null;
    var t = e[0], r = e.pop();
    if (r !== t) {
      e[0] = r;
      e:
        for (var n = 0, o = e.length, l = o >>> 1; n < l; ) {
          var i = 2 * (n + 1) - 1, a = e[i], s = i + 1, u = e[s];
          if (0 > Xi(a, r))
            s < o && 0 > Xi(u, a) ? (e[n] = u, e[s] = r, n = s) : (e[n] = a, e[i] = r, n = i);
          else if (s < o && 0 > Xi(u, r))
            e[n] = u, e[s] = r, n = s;
          else
            break e;
        }
    }
    return t;
  }
  function Xi(e, t) {
    var r = e.sortIndex - t.sortIndex;
    return r !== 0 ? r : e.id - t.id;
  }
  typeof performance == "object" && typeof performance.now == "function" ? (oh = performance, ae.unstable_now = function() {
    return oh.now();
  }) : (Ku = Date, lh = Ku.now(), ae.unstable_now = function() {
    return Ku.now() - lh;
  });
  var oh, Ku, lh, ur = [], Yr = [], W1 = 1, zt = null, Ye = 3, ea = false, Vn = false, Sl = false, sh = typeof setTimeout == "function" ? setTimeout : null, uh = typeof clearTimeout == "function" ? clearTimeout : null, ih = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function Ju(e) {
    for (var t = Xt(Yr); t !== null; ) {
      if (t.callback === null)
        qi(Yr);
      else if (t.startTime <= e)
        qi(Yr), t.sortIndex = t.expirationTime, Gu(ur, t);
      else
        break;
      t = Xt(Yr);
    }
  }
  function Xu(e) {
    if (Sl = false, Ju(e), !Vn)
      if (Xt(ur) !== null)
        Vn = true, qu(Zu);
      else {
        var t = Xt(Yr);
        t !== null && ec(Xu, t.startTime - e);
      }
  }
  function Zu(e, t) {
    Vn = false, Sl && (Sl = false, uh(xl), xl = -1), ea = true;
    var r = Ye;
    try {
      for (Ju(t), zt = Xt(ur); zt !== null && (!(zt.expirationTime > t) || e && !fh()); ) {
        var n = zt.callback;
        if (typeof n == "function") {
          zt.callback = null, Ye = zt.priorityLevel;
          var o = n(zt.expirationTime <= t);
          t = ae.unstable_now(), typeof o == "function" ? zt.callback = o : zt === Xt(ur) && qi(ur), Ju(t);
        } else
          qi(ur);
        zt = Xt(ur);
      }
      if (zt !== null)
        var l = true;
      else {
        var i = Xt(Yr);
        i !== null && ec(Xu, i.startTime - t), l = false;
      }
      return l;
    } finally {
      zt = null, Ye = r, ea = false;
    }
  }
  var ta = false, Zi = null, xl = -1, ch = 5, dh = -1;
  function fh() {
    return !(ae.unstable_now() - dh < ch);
  }
  function Qu() {
    if (Zi !== null) {
      var e = ae.unstable_now();
      dh = e;
      var t = true;
      try {
        t = Zi(true, e);
      } finally {
        t ? wl() : (ta = false, Zi = null);
      }
    } else
      ta = false;
  }
  var wl;
  typeof ih == "function" ? wl = function() {
    ih(Qu);
  } : typeof MessageChannel < "u" ? (Yu = new MessageChannel(), ah = Yu.port2, Yu.port1.onmessage = Qu, wl = function() {
    ah.postMessage(null);
  }) : wl = function() {
    sh(Qu, 0);
  };
  var Yu, ah;
  function qu(e) {
    Zi = e, ta || (ta = true, wl());
  }
  function ec(e, t) {
    xl = sh(function() {
      e(ae.unstable_now());
    }, t);
  }
  ae.unstable_IdlePriority = 5;
  ae.unstable_ImmediatePriority = 1;
  ae.unstable_LowPriority = 4;
  ae.unstable_NormalPriority = 3;
  ae.unstable_Profiling = null;
  ae.unstable_UserBlockingPriority = 2;
  ae.unstable_cancelCallback = function(e) {
    e.callback = null;
  };
  ae.unstable_continueExecution = function() {
    Vn || ea || (Vn = true, qu(Zu));
  };
  ae.unstable_forceFrameRate = function(e) {
    0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ch = 0 < e ? Math.floor(1e3 / e) : 5;
  };
  ae.unstable_getCurrentPriorityLevel = function() {
    return Ye;
  };
  ae.unstable_getFirstCallbackNode = function() {
    return Xt(ur);
  };
  ae.unstable_next = function(e) {
    switch (Ye) {
      case 1:
      case 2:
      case 3:
        var t = 3;
        break;
      default:
        t = Ye;
    }
    var r = Ye;
    Ye = t;
    try {
      return e();
    } finally {
      Ye = r;
    }
  };
  ae.unstable_pauseExecution = function() {
  };
  ae.unstable_requestPaint = function() {
  };
  ae.unstable_runWithPriority = function(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        e = 3;
    }
    var r = Ye;
    Ye = e;
    try {
      return t();
    } finally {
      Ye = r;
    }
  };
  ae.unstable_scheduleCallback = function(e, t, r) {
    var n = ae.unstable_now();
    switch (typeof r == "object" && r !== null ? (r = r.delay, r = typeof r == "number" && 0 < r ? n + r : n) : r = n, e) {
      case 1:
        var o = -1;
        break;
      case 2:
        o = 250;
        break;
      case 5:
        o = 1073741823;
        break;
      case 4:
        o = 1e4;
        break;
      default:
        o = 5e3;
    }
    return o = r + o, e = { id: W1++, callback: t, priorityLevel: e, startTime: r, expirationTime: o, sortIndex: -1 }, r > n ? (e.sortIndex = r, Gu(Yr, e), Xt(ur) === null && e === Xt(Yr) && (Sl ? (uh(xl), xl = -1) : Sl = true, ec(Xu, r - n))) : (e.sortIndex = o, Gu(ur, e), Vn || ea || (Vn = true, qu(Zu))), e;
  };
  ae.unstable_shouldYield = fh;
  ae.unstable_wrapCallback = function(e) {
    var t = Ye;
    return function() {
      var r = Ye;
      Ye = t;
      try {
        return e.apply(this, arguments);
      } finally {
        Ye = r;
      }
    };
  };
});
var mh = Ot((J_, hh) => {
  "use strict";
  hh.exports = ph();
});
var xg = Ot((Ct) => {
  "use strict";
  var Em = je(), Rt = mh();
  function L(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++)
      t += "&args[]=" + encodeURIComponent(arguments[r]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var Rm = /* @__PURE__ */ new Set(), Hl = {};
  function to(e, t) {
    Ho(e, t), Ho(e + "Capture", t);
  }
  function Ho(e, t) {
    for (Hl[e] = t, e = 0; e < t.length; e++)
      Rm.add(t[e]);
  }
  var Lr = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Rc = Object.prototype.hasOwnProperty, K1 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, vh = {}, gh = {};
  function Q1(e) {
    return Rc.call(gh, e) ? true : Rc.call(vh, e) ? false : K1.test(e) ? gh[e] = true : (vh[e] = true, false);
  }
  function Y1(e, t, r, n) {
    if (r !== null && r.type === 0)
      return false;
    switch (typeof t) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        return n ? false : r !== null ? !r.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return false;
    }
  }
  function G1(e, t, r, n) {
    if (t === null || typeof t > "u" || Y1(e, t, r, n))
      return true;
    if (n)
      return false;
    if (r !== null)
      switch (r.type) {
        case 3:
          return !t;
        case 4:
          return t === false;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return false;
  }
  function it(e, t, r, n, o, l, i) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = n, this.attributeNamespace = o, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = l, this.removeEmptyString = i;
  }
  var He = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    He[e] = new it(e, 0, false, e, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    He[t] = new it(t, 1, false, e[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    He[e] = new it(e, 2, false, e.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    He[e] = new it(e, 2, false, e, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    He[e] = new it(e, 3, false, e.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    He[e] = new it(e, 3, true, e, null, false, false);
  });
  ["capture", "download"].forEach(function(e) {
    He[e] = new it(e, 4, false, e, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(e) {
    He[e] = new it(e, 6, false, e, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(e) {
    He[e] = new it(e, 5, false, e.toLowerCase(), null, false, false);
  });
  var md = /[\-:]([a-z])/g;
  function vd(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(md, vd);
    He[t] = new it(t, 1, false, e, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(md, vd);
    He[t] = new it(t, 1, false, e, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(md, vd);
    He[t] = new it(t, 1, false, e, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(e) {
    He[e] = new it(e, 1, false, e.toLowerCase(), null, false, false);
  });
  He.xlinkHref = new it("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(e) {
    He[e] = new it(e, 1, false, e.toLowerCase(), null, true, true);
  });
  function gd(e, t, r, n) {
    var o = He.hasOwnProperty(t) ? He[t] : null;
    (o !== null ? o.type !== 0 : n || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (G1(t, r, o, n) && (r = null), n || o === null ? Q1(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : o.mustUseProperty ? e[o.propertyName] = r === null ? o.type === 3 ? false : "" : r : (t = o.attributeName, n = o.attributeNamespace, r === null ? e.removeAttribute(t) : (o = o.type, r = o === 3 || o === 4 && r === true ? "" : "" + r, n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r))));
  }
  var Mr = Em.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ra = Symbol.for("react.element"), Co = Symbol.for("react.portal"), _o = Symbol.for("react.fragment"), yd = Symbol.for("react.strict_mode"), kc = Symbol.for("react.profiler"), km = Symbol.for("react.provider"), Cm = Symbol.for("react.context"), wd = Symbol.for("react.forward_ref"), Cc = Symbol.for("react.suspense"), _c = Symbol.for("react.suspense_list"), Sd = Symbol.for("react.memo"), Jr = Symbol.for("react.lazy");
  Symbol.for("react.scope");
  Symbol.for("react.debug_trace_mode");
  var _m = Symbol.for("react.offscreen");
  Symbol.for("react.legacy_hidden");
  Symbol.for("react.cache");
  Symbol.for("react.tracing_marker");
  var yh = Symbol.iterator;
  function El(e) {
    return e === null || typeof e != "object" ? null : (e = yh && e[yh] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Se = Object.assign, tc;
  function Ll(e) {
    if (tc === void 0)
      try {
        throw Error();
      } catch (r) {
        var t = r.stack.trim().match(/\n( *(at )?)/);
        tc = t && t[1] || "";
      }
    return `
` + tc + e;
  }
  var rc = false;
  function nc(e, t) {
    if (!e || rc)
      return "";
    rc = true;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (t = function() {
          throw Error();
        }, Object.defineProperty(t.prototype, "props", { set: function() {
          throw Error();
        } }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(t, []);
          } catch (u) {
            var n = u;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (u) {
            n = u;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (u) {
          n = u;
        }
        e();
      }
    } catch (u) {
      if (u && n && typeof u.stack == "string") {
        for (var o = u.stack.split(`
`), l = n.stack.split(`
`), i = o.length - 1, a = l.length - 1; 1 <= i && 0 <= a && o[i] !== l[a]; )
          a--;
        for (; 1 <= i && 0 <= a; i--, a--)
          if (o[i] !== l[a]) {
            if (i !== 1 || a !== 1)
              do
                if (i--, a--, 0 > a || o[i] !== l[a]) {
                  var s = `
` + o[i].replace(" at new ", " at ");
                  return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
                }
              while (1 <= i && 0 <= a);
            break;
          }
      }
    } finally {
      rc = false, Error.prepareStackTrace = r;
    }
    return (e = e ? e.displayName || e.name : "") ? Ll(e) : "";
  }
  function J1(e) {
    switch (e.tag) {
      case 5:
        return Ll(e.type);
      case 16:
        return Ll("Lazy");
      case 13:
        return Ll("Suspense");
      case 19:
        return Ll("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = nc(e.type, false), e;
      case 11:
        return e = nc(e.type.render, false), e;
      case 1:
        return e = nc(e.type, true), e;
      default:
        return "";
    }
  }
  function Nc(e) {
    if (e == null)
      return null;
    if (typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case _o:
        return "Fragment";
      case Co:
        return "Portal";
      case kc:
        return "Profiler";
      case yd:
        return "StrictMode";
      case Cc:
        return "Suspense";
      case _c:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Cm:
          return (e.displayName || "Context") + ".Consumer";
        case km:
          return (e._context.displayName || "Context") + ".Provider";
        case wd:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Sd:
          return t = e.displayName || null, t !== null ? t : Nc(e.type) || "Memo";
        case Jr:
          t = e._payload, e = e._init;
          try {
            return Nc(e(t));
          } catch {
          }
      }
    return null;
  }
  function X1(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Nc(t);
      case 8:
        return t === yd ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function")
          return t.displayName || t.name || null;
        if (typeof t == "string")
          return t;
    }
    return null;
  }
  function dn(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Nm(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Z1(e) {
    var t = Nm(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), n = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
      var o = r.get, l = r.set;
      return Object.defineProperty(e, t, { configurable: true, get: function() {
        return o.call(this);
      }, set: function(i) {
        n = "" + i, l.call(this, i);
      } }), Object.defineProperty(e, t, { enumerable: r.enumerable }), { getValue: function() {
        return n;
      }, setValue: function(i) {
        n = "" + i;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function na(e) {
    e._valueTracker || (e._valueTracker = Z1(e));
  }
  function Pm(e) {
    if (!e)
      return false;
    var t = e._valueTracker;
    if (!t)
      return true;
    var r = t.getValue(), n = "";
    return e && (n = Nm(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== r ? (t.setValue(e), true) : false;
  }
  function Ta(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Pc(e, t) {
    var r = t.checked;
    return Se({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: r ?? e._wrapperState.initialChecked });
  }
  function wh(e, t) {
    var r = t.defaultValue == null ? "" : t.defaultValue, n = t.checked != null ? t.checked : t.defaultChecked;
    r = dn(t.value != null ? t.value : r), e._wrapperState = { initialChecked: n, initialValue: r, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function bm(e, t) {
    t = t.checked, t != null && gd(e, "checked", t, false);
  }
  function bc(e, t) {
    bm(e, t);
    var r = dn(t.value), n = t.type;
    if (r != null)
      n === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
    else if (n === "submit" || n === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Lc(e, t.type, r) : t.hasOwnProperty("defaultValue") && Lc(e, t.type, dn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Sh(e, t, r) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var n = t.type;
      if (!(n !== "submit" && n !== "reset" || t.value !== void 0 && t.value !== null))
        return;
      t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
  }
  function Lc(e, t, r) {
    (t !== "number" || Ta(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
  }
  var Tl = Array.isArray;
  function Io(e, t, r, n) {
    if (e = e.options, t) {
      t = {};
      for (var o = 0; o < r.length; o++)
        t["$" + r[o]] = true;
      for (r = 0; r < e.length; r++)
        o = t.hasOwnProperty("$" + e[r].value), e[r].selected !== o && (e[r].selected = o), o && n && (e[r].defaultSelected = true);
    } else {
      for (r = "" + dn(r), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === r) {
          e[o].selected = true, n && (e[o].defaultSelected = true);
          return;
        }
        t !== null || e[o].disabled || (t = e[o]);
      }
      t !== null && (t.selected = true);
    }
  }
  function Tc(e, t) {
    if (t.dangerouslySetInnerHTML != null)
      throw Error(L(91));
    return Se({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function xh(e, t) {
    var r = t.value;
    if (r == null) {
      if (r = t.children, t = t.defaultValue, r != null) {
        if (t != null)
          throw Error(L(92));
        if (Tl(r)) {
          if (1 < r.length)
            throw Error(L(93));
          r = r[0];
        }
        t = r;
      }
      t == null && (t = ""), r = t;
    }
    e._wrapperState = { initialValue: dn(r) };
  }
  function Lm(e, t) {
    var r = dn(t.value), n = dn(t.defaultValue);
    r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), n != null && (e.defaultValue = "" + n);
  }
  function Eh(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Tm(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Dc(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Tm(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var oa, Dm = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, n, o) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, r, n, o);
      });
    } : e;
  }(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (oa = oa || document.createElement("div"), oa.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = oa.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; t.firstChild; )
        e.appendChild(t.firstChild);
    }
  });
  function $l(e, t) {
    if (t) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ml = { animationIterationCount: true, aspectRatio: true, borderImageOutset: true, borderImageSlice: true, borderImageWidth: true, boxFlex: true, boxFlexGroup: true, boxOrdinalGroup: true, columnCount: true, columns: true, flex: true, flexGrow: true, flexPositive: true, flexShrink: true, flexNegative: true, flexOrder: true, gridArea: true, gridRow: true, gridRowEnd: true, gridRowSpan: true, gridRowStart: true, gridColumn: true, gridColumnEnd: true, gridColumnSpan: true, gridColumnStart: true, fontWeight: true, lineClamp: true, lineHeight: true, opacity: true, order: true, orphans: true, tabSize: true, widows: true, zIndex: true, zoom: true, fillOpacity: true, floodOpacity: true, stopOpacity: true, strokeDasharray: true, strokeDashoffset: true, strokeMiterlimit: true, strokeOpacity: true, strokeWidth: true }, q1 = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ml).forEach(function(e) {
    q1.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Ml[t] = Ml[e];
    });
  });
  function Fm(e, t, r) {
    return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || Ml.hasOwnProperty(e) && Ml[e] ? ("" + t).trim() : t + "px";
  }
  function Mm(e, t) {
    e = e.style;
    for (var r in t)
      if (t.hasOwnProperty(r)) {
        var n = r.indexOf("--") === 0, o = Fm(r, t[r], n);
        r === "float" && (r = "cssFloat"), n ? e.setProperty(r, o) : e[r] = o;
      }
  }
  var eS = Se({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function Fc(e, t) {
    if (t) {
      if (eS[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(L(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw Error(L(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
          throw Error(L(61));
      }
      if (t.style != null && typeof t.style != "object")
        throw Error(L(62));
    }
  }
  function Mc(e, t) {
    if (e.indexOf("-") === -1)
      return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var Oc = null;
  function xd(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var zc = null, Ao = null, Uo = null;
  function Rh(e) {
    if (e = si(e)) {
      if (typeof zc != "function")
        throw Error(L(280));
      var t = e.stateNode;
      t && (t = ls(t), zc(e.stateNode, e.type, t));
    }
  }
  function Om(e) {
    Ao ? Uo ? Uo.push(e) : Uo = [e] : Ao = e;
  }
  function zm() {
    if (Ao) {
      var e = Ao, t = Uo;
      if (Uo = Ao = null, Rh(e), t)
        for (e = 0; e < t.length; e++)
          Rh(t[e]);
    }
  }
  function Im(e, t) {
    return e(t);
  }
  function Am() {
  }
  var oc = false;
  function Um(e, t, r) {
    if (oc)
      return e(t, r);
    oc = true;
    try {
      return Im(e, t, r);
    } finally {
      oc = false, (Ao !== null || Uo !== null) && (Am(), zm());
    }
  }
  function Wl(e, t) {
    var r = e.stateNode;
    if (r === null)
      return null;
    var n = ls(r);
    if (n === null)
      return null;
    r = n[t];
    e:
      switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (n = !n.disabled) || (e = e.type, n = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !n;
          break e;
        default:
          e = false;
      }
    if (e)
      return null;
    if (r && typeof r != "function")
      throw Error(L(231, t, typeof r));
    return r;
  }
  var Ic = false;
  if (Lr)
    try {
      Ro = {}, Object.defineProperty(Ro, "passive", { get: function() {
        Ic = true;
      } }), window.addEventListener("test", Ro, Ro), window.removeEventListener("test", Ro, Ro);
    } catch {
      Ic = false;
    }
  var Ro;
  function tS(e, t, r, n, o, l, i, a, s) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(r, u);
    } catch (c) {
      this.onError(c);
    }
  }
  var Ol = false, Da = null, Fa = false, Ac = null, rS = { onError: function(e) {
    Ol = true, Da = e;
  } };
  function nS(e, t, r, n, o, l, i, a, s) {
    Ol = false, Da = null, tS.apply(rS, arguments);
  }
  function oS(e, t, r, n, o, l, i, a, s) {
    if (nS.apply(this, arguments), Ol) {
      if (Ol) {
        var u = Da;
        Ol = false, Da = null;
      } else
        throw Error(L(198));
      Fa || (Fa = true, Ac = u);
    }
  }
  function ro(e) {
    var t = e, r = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      e = t;
      do
        t = e, t.flags & 4098 && (r = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? r : null;
  }
  function jm(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
        return t.dehydrated;
    }
    return null;
  }
  function kh(e) {
    if (ro(e) !== e)
      throw Error(L(188));
  }
  function lS(e) {
    var t = e.alternate;
    if (!t) {
      if (t = ro(e), t === null)
        throw Error(L(188));
      return t !== e ? null : e;
    }
    for (var r = e, n = t; ; ) {
      var o = r.return;
      if (o === null)
        break;
      var l = o.alternate;
      if (l === null) {
        if (n = o.return, n !== null) {
          r = n;
          continue;
        }
        break;
      }
      if (o.child === l.child) {
        for (l = o.child; l; ) {
          if (l === r)
            return kh(o), e;
          if (l === n)
            return kh(o), t;
          l = l.sibling;
        }
        throw Error(L(188));
      }
      if (r.return !== n.return)
        r = o, n = l;
      else {
        for (var i = false, a = o.child; a; ) {
          if (a === r) {
            i = true, r = o, n = l;
            break;
          }
          if (a === n) {
            i = true, n = o, r = l;
            break;
          }
          a = a.sibling;
        }
        if (!i) {
          for (a = l.child; a; ) {
            if (a === r) {
              i = true, r = l, n = o;
              break;
            }
            if (a === n) {
              i = true, n = l, r = o;
              break;
            }
            a = a.sibling;
          }
          if (!i)
            throw Error(L(189));
        }
      }
      if (r.alternate !== n)
        throw Error(L(190));
    }
    if (r.tag !== 3)
      throw Error(L(188));
    return r.stateNode.current === r ? e : t;
  }
  function Bm(e) {
    return e = lS(e), e !== null ? Vm(e) : null;
  }
  function Vm(e) {
    if (e.tag === 5 || e.tag === 6)
      return e;
    for (e = e.child; e !== null; ) {
      var t = Vm(e);
      if (t !== null)
        return t;
      e = e.sibling;
    }
    return null;
  }
  var Hm = Rt.unstable_scheduleCallback, Ch = Rt.unstable_cancelCallback, iS = Rt.unstable_shouldYield, aS = Rt.unstable_requestPaint, ke = Rt.unstable_now, sS = Rt.unstable_getCurrentPriorityLevel, Ed = Rt.unstable_ImmediatePriority, $m = Rt.unstable_UserBlockingPriority, Ma = Rt.unstable_NormalPriority, uS = Rt.unstable_LowPriority, Wm = Rt.unstable_IdlePriority, ts = null, pr = null;
  function cS(e) {
    if (pr && typeof pr.onCommitFiberRoot == "function")
      try {
        pr.onCommitFiberRoot(ts, e, void 0, (e.current.flags & 128) === 128);
      } catch {
      }
  }
  var rr = Math.clz32 ? Math.clz32 : pS, dS = Math.log, fS = Math.LN2;
  function pS(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (dS(e) / fS | 0) | 0;
  }
  var la = 64, ia = 4194304;
  function Dl(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Oa(e, t) {
    var r = e.pendingLanes;
    if (r === 0)
      return 0;
    var n = 0, o = e.suspendedLanes, l = e.pingedLanes, i = r & 268435455;
    if (i !== 0) {
      var a = i & ~o;
      a !== 0 ? n = Dl(a) : (l &= i, l !== 0 && (n = Dl(l)));
    } else
      i = r & ~o, i !== 0 ? n = Dl(i) : l !== 0 && (n = Dl(l));
    if (n === 0)
      return 0;
    if (t !== 0 && t !== n && !(t & o) && (o = n & -n, l = t & -t, o >= l || o === 16 && (l & 4194240) !== 0))
      return t;
    if (n & 4 && (n |= r & 16), t = e.entangledLanes, t !== 0)
      for (e = e.entanglements, t &= n; 0 < t; )
        r = 31 - rr(t), o = 1 << r, n |= e[r], t &= ~o;
    return n;
  }
  function hS(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function mS(e, t) {
    for (var r = e.suspendedLanes, n = e.pingedLanes, o = e.expirationTimes, l = e.pendingLanes; 0 < l; ) {
      var i = 31 - rr(l), a = 1 << i, s = o[i];
      s === -1 ? (!(a & r) || a & n) && (o[i] = hS(a, t)) : s <= t && (e.expiredLanes |= a), l &= ~a;
    }
  }
  function Uc(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Km() {
    var e = la;
    return la <<= 1, !(la & 4194240) && (la = 64), e;
  }
  function lc(e) {
    for (var t = [], r = 0; 31 > r; r++)
      t.push(e);
    return t;
  }
  function ii(e, t, r) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - rr(t), e[t] = r;
  }
  function vS(e, t) {
    var r = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var n = e.eventTimes;
    for (e = e.expirationTimes; 0 < r; ) {
      var o = 31 - rr(r), l = 1 << o;
      t[o] = 0, n[o] = -1, e[o] = -1, r &= ~l;
    }
  }
  function Rd(e, t) {
    var r = e.entangledLanes |= t;
    for (e = e.entanglements; r; ) {
      var n = 31 - rr(r), o = 1 << n;
      o & t | e[n] & t && (e[n] |= t), r &= ~o;
    }
  }
  var re = 0;
  function Qm(e) {
    return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Ym, kd, Gm, Jm, Xm, jc = false, aa = [], rn = null, nn = null, on = null, Kl = /* @__PURE__ */ new Map(), Ql = /* @__PURE__ */ new Map(), Zr = [], gS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function _h(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        rn = null;
        break;
      case "dragenter":
      case "dragleave":
        nn = null;
        break;
      case "mouseover":
      case "mouseout":
        on = null;
        break;
      case "pointerover":
      case "pointerout":
        Kl.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ql.delete(t.pointerId);
    }
  }
  function Rl(e, t, r, n, o, l) {
    return e === null || e.nativeEvent !== l ? (e = { blockedOn: t, domEventName: r, eventSystemFlags: n, nativeEvent: l, targetContainers: [o] }, t !== null && (t = si(t), t !== null && kd(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
  }
  function yS(e, t, r, n, o) {
    switch (t) {
      case "focusin":
        return rn = Rl(rn, e, t, r, n, o), true;
      case "dragenter":
        return nn = Rl(nn, e, t, r, n, o), true;
      case "mouseover":
        return on = Rl(on, e, t, r, n, o), true;
      case "pointerover":
        var l = o.pointerId;
        return Kl.set(l, Rl(Kl.get(l) || null, e, t, r, n, o)), true;
      case "gotpointercapture":
        return l = o.pointerId, Ql.set(l, Rl(Ql.get(l) || null, e, t, r, n, o)), true;
    }
    return false;
  }
  function Zm(e) {
    var t = Wn(e.target);
    if (t !== null) {
      var r = ro(t);
      if (r !== null) {
        if (t = r.tag, t === 13) {
          if (t = jm(r), t !== null) {
            e.blockedOn = t, Xm(e.priority, function() {
              Gm(r);
            });
            return;
          }
        } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function xa(e) {
    if (e.blockedOn !== null)
      return false;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var r = Bc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var n = new r.constructor(r.type, r);
        Oc = n, r.target.dispatchEvent(n), Oc = null;
      } else
        return t = si(r), t !== null && kd(t), e.blockedOn = r, false;
      t.shift();
    }
    return true;
  }
  function Nh(e, t, r) {
    xa(e) && r.delete(t);
  }
  function wS() {
    jc = false, rn !== null && xa(rn) && (rn = null), nn !== null && xa(nn) && (nn = null), on !== null && xa(on) && (on = null), Kl.forEach(Nh), Ql.forEach(Nh);
  }
  function kl(e, t) {
    e.blockedOn === t && (e.blockedOn = null, jc || (jc = true, Rt.unstable_scheduleCallback(Rt.unstable_NormalPriority, wS)));
  }
  function Yl(e) {
    function t(o) {
      return kl(o, e);
    }
    if (0 < aa.length) {
      kl(aa[0], e);
      for (var r = 1; r < aa.length; r++) {
        var n = aa[r];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    for (rn !== null && kl(rn, e), nn !== null && kl(nn, e), on !== null && kl(on, e), Kl.forEach(t), Ql.forEach(t), r = 0; r < Zr.length; r++)
      n = Zr[r], n.blockedOn === e && (n.blockedOn = null);
    for (; 0 < Zr.length && (r = Zr[0], r.blockedOn === null); )
      Zm(r), r.blockedOn === null && Zr.shift();
  }
  var jo = Mr.ReactCurrentBatchConfig, za = true;
  function SS(e, t, r, n) {
    var o = re, l = jo.transition;
    jo.transition = null;
    try {
      re = 1, Cd(e, t, r, n);
    } finally {
      re = o, jo.transition = l;
    }
  }
  function xS(e, t, r, n) {
    var o = re, l = jo.transition;
    jo.transition = null;
    try {
      re = 4, Cd(e, t, r, n);
    } finally {
      re = o, jo.transition = l;
    }
  }
  function Cd(e, t, r, n) {
    if (za) {
      var o = Bc(e, t, r, n);
      if (o === null)
        fc(e, t, n, Ia, r), _h(e, n);
      else if (yS(o, e, t, r, n))
        n.stopPropagation();
      else if (_h(e, n), t & 4 && -1 < gS.indexOf(e)) {
        for (; o !== null; ) {
          var l = si(o);
          if (l !== null && Ym(l), l = Bc(e, t, r, n), l === null && fc(e, t, n, Ia, r), l === o)
            break;
          o = l;
        }
        o !== null && n.stopPropagation();
      } else
        fc(e, t, n, null, r);
    }
  }
  var Ia = null;
  function Bc(e, t, r, n) {
    if (Ia = null, e = xd(n), e = Wn(e), e !== null)
      if (t = ro(e), t === null)
        e = null;
      else if (r = t.tag, r === 13) {
        if (e = jm(t), e !== null)
          return e;
        e = null;
      } else if (r === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else
        t !== e && (e = null);
    return Ia = e, null;
  }
  function qm(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (sS()) {
          case Ed:
            return 1;
          case $m:
            return 4;
          case Ma:
          case uS:
            return 16;
          case Wm:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var en = null, _d = null, Ea = null;
  function ev() {
    if (Ea)
      return Ea;
    var e, t = _d, r = t.length, n, o = "value" in en ? en.value : en.textContent, l = o.length;
    for (e = 0; e < r && t[e] === o[e]; e++)
      ;
    var i = r - e;
    for (n = 1; n <= i && t[r - n] === o[l - n]; n++)
      ;
    return Ea = o.slice(e, 1 < n ? 1 - n : void 0);
  }
  function Ra(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function sa() {
    return true;
  }
  function Ph() {
    return false;
  }
  function kt(e) {
    function t(r, n, o, l, i) {
      this._reactName = r, this._targetInst = o, this.type = n, this.nativeEvent = l, this.target = i, this.currentTarget = null;
      for (var a in e)
        e.hasOwnProperty(a) && (r = e[a], this[a] = r ? r(l) : l[a]);
      return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === false) ? sa : Ph, this.isPropagationStopped = Ph, this;
    }
    return Se(t.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var r = this.nativeEvent;
      r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = false), this.isDefaultPrevented = sa);
    }, stopPropagation: function() {
      var r = this.nativeEvent;
      r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = true), this.isPropagationStopped = sa);
    }, persist: function() {
    }, isPersistent: sa }), t;
  }
  var Jo = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Nd = kt(Jo), ai = Se({}, Jo, { view: 0, detail: 0 }), ES = kt(ai), ic, ac, Cl, rs = Se({}, ai, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Pd, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Cl && (Cl && e.type === "mousemove" ? (ic = e.screenX - Cl.screenX, ac = e.screenY - Cl.screenY) : ac = ic = 0, Cl = e), ic);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : ac;
  } }), bh = kt(rs), RS = Se({}, rs, { dataTransfer: 0 }), kS = kt(RS), CS = Se({}, ai, { relatedTarget: 0 }), sc = kt(CS), _S = Se({}, Jo, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), NS = kt(_S), PS = Se({}, Jo, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), bS = kt(PS), LS = Se({}, Jo, { data: 0 }), Lh = kt(LS), TS = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, DS = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, FS = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function MS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = FS[e]) ? !!t[e] : false;
  }
  function Pd() {
    return MS;
  }
  var OS = Se({}, ai, { key: function(e) {
    if (e.key) {
      var t = TS[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    return e.type === "keypress" ? (e = Ra(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? DS[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Pd, charCode: function(e) {
    return e.type === "keypress" ? Ra(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Ra(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), zS = kt(OS), IS = Se({}, rs, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Th = kt(IS), AS = Se({}, ai, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Pd }), US = kt(AS), jS = Se({}, Jo, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), BS = kt(jS), VS = Se({}, rs, { deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  }, deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), HS = kt(VS), $S = [9, 13, 27, 32], bd = Lr && "CompositionEvent" in window, zl = null;
  Lr && "documentMode" in document && (zl = document.documentMode);
  var WS = Lr && "TextEvent" in window && !zl, tv = Lr && (!bd || zl && 8 < zl && 11 >= zl), Dh = String.fromCharCode(32), Fh = false;
  function rv(e, t) {
    switch (e) {
      case "keyup":
        return $S.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function nv(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var No = false;
  function KS(e, t) {
    switch (e) {
      case "compositionend":
        return nv(t);
      case "keypress":
        return t.which !== 32 ? null : (Fh = true, Dh);
      case "textInput":
        return e = t.data, e === Dh && Fh ? null : e;
      default:
        return null;
    }
  }
  function QS(e, t) {
    if (No)
      return e === "compositionend" || !bd && rv(e, t) ? (e = ev(), Ea = _d = en = null, No = false, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return tv && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var YS = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function Mh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!YS[e.type] : t === "textarea";
  }
  function ov(e, t, r, n) {
    Om(n), t = Aa(t, "onChange"), 0 < t.length && (r = new Nd("onChange", "change", null, r, n), e.push({ event: r, listeners: t }));
  }
  var Il = null, Gl = null;
  function GS(e) {
    mv(e, 0);
  }
  function ns(e) {
    var t = Lo(e);
    if (Pm(t))
      return e;
  }
  function JS(e, t) {
    if (e === "change")
      return t;
  }
  var lv = false;
  Lr && (Lr ? (ca = "oninput" in document, ca || (uc = document.createElement("div"), uc.setAttribute("oninput", "return;"), ca = typeof uc.oninput == "function"), ua = ca) : ua = false, lv = ua && (!document.documentMode || 9 < document.documentMode));
  var ua, ca, uc;
  function Oh() {
    Il && (Il.detachEvent("onpropertychange", iv), Gl = Il = null);
  }
  function iv(e) {
    if (e.propertyName === "value" && ns(Gl)) {
      var t = [];
      ov(t, Gl, e, xd(e)), Um(GS, t);
    }
  }
  function XS(e, t, r) {
    e === "focusin" ? (Oh(), Il = t, Gl = r, Il.attachEvent("onpropertychange", iv)) : e === "focusout" && Oh();
  }
  function ZS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ns(Gl);
  }
  function qS(e, t) {
    if (e === "click")
      return ns(t);
  }
  function ex(e, t) {
    if (e === "input" || e === "change")
      return ns(t);
  }
  function tx(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var or = typeof Object.is == "function" ? Object.is : tx;
  function Jl(e, t) {
    if (or(e, t))
      return true;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return false;
    var r = Object.keys(e), n = Object.keys(t);
    if (r.length !== n.length)
      return false;
    for (n = 0; n < r.length; n++) {
      var o = r[n];
      if (!Rc.call(t, o) || !or(e[o], t[o]))
        return false;
    }
    return true;
  }
  function zh(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function Ih(e, t) {
    var r = zh(e);
    e = 0;
    for (var n; r; ) {
      if (r.nodeType === 3) {
        if (n = e + r.textContent.length, e <= t && n >= t)
          return { node: r, offset: t - e };
        e = n;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = zh(r);
    }
  }
  function av(e, t) {
    return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? av(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
  }
  function sv() {
    for (var e = window, t = Ta(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof t.contentWindow.location.href == "string";
      } catch {
        r = false;
      }
      if (r)
        e = t.contentWindow;
      else
        break;
      t = Ta(e.document);
    }
    return t;
  }
  function Ld(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function rx(e) {
    var t = sv(), r = e.focusedElem, n = e.selectionRange;
    if (t !== r && r && r.ownerDocument && av(r.ownerDocument.documentElement, r)) {
      if (n !== null && Ld(r)) {
        if (t = n.start, e = n.end, e === void 0 && (e = t), "selectionStart" in r)
          r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
        else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var o = r.textContent.length, l = Math.min(n.start, o);
          n = n.end === void 0 ? l : Math.min(n.end, o), !e.extend && l > n && (o = n, n = l, l = o), o = Ih(r, l);
          var i = Ih(r, n);
          o && i && (e.rangeCount !== 1 || e.anchorNode !== o.node || e.anchorOffset !== o.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(), t.setStart(o.node, o.offset), e.removeAllRanges(), l > n ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
        }
      }
      for (t = [], e = r; e = e.parentNode; )
        e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++)
        e = t[r], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var nx = Lr && "documentMode" in document && 11 >= document.documentMode, Po = null, Vc = null, Al = null, Hc = false;
  function Ah(e, t, r) {
    var n = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    Hc || Po == null || Po !== Ta(n) || (n = Po, "selectionStart" in n && Ld(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = { anchorNode: n.anchorNode, anchorOffset: n.anchorOffset, focusNode: n.focusNode, focusOffset: n.focusOffset }), Al && Jl(Al, n) || (Al = n, n = Aa(Vc, "onSelect"), 0 < n.length && (t = new Nd("onSelect", "select", null, t, r), e.push({ event: t, listeners: n }), t.target = Po)));
  }
  function da(e, t) {
    var r = {};
    return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
  }
  var bo = { animationend: da("Animation", "AnimationEnd"), animationiteration: da("Animation", "AnimationIteration"), animationstart: da("Animation", "AnimationStart"), transitionend: da("Transition", "TransitionEnd") }, cc = {}, uv = {};
  Lr && (uv = document.createElement("div").style, "AnimationEvent" in window || (delete bo.animationend.animation, delete bo.animationiteration.animation, delete bo.animationstart.animation), "TransitionEvent" in window || delete bo.transitionend.transition);
  function os(e) {
    if (cc[e])
      return cc[e];
    if (!bo[e])
      return e;
    var t = bo[e], r;
    for (r in t)
      if (t.hasOwnProperty(r) && r in uv)
        return cc[e] = t[r];
    return e;
  }
  var cv = os("animationend"), dv = os("animationiteration"), fv = os("animationstart"), pv = os("transitionend"), hv = /* @__PURE__ */ new Map(), Uh = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function pn(e, t) {
    hv.set(e, t), to(t, [e]);
  }
  for (fa = 0; fa < Uh.length; fa++)
    pa = Uh[fa], jh = pa.toLowerCase(), Bh = pa[0].toUpperCase() + pa.slice(1), pn(jh, "on" + Bh);
  var pa, jh, Bh, fa;
  pn(cv, "onAnimationEnd");
  pn(dv, "onAnimationIteration");
  pn(fv, "onAnimationStart");
  pn("dblclick", "onDoubleClick");
  pn("focusin", "onFocus");
  pn("focusout", "onBlur");
  pn(pv, "onTransitionEnd");
  Ho("onMouseEnter", ["mouseout", "mouseover"]);
  Ho("onMouseLeave", ["mouseout", "mouseover"]);
  Ho("onPointerEnter", ["pointerout", "pointerover"]);
  Ho("onPointerLeave", ["pointerout", "pointerover"]);
  to("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  to("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  to("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  to("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  to("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  to("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Fl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ox = new Set("cancel close invalid load scroll toggle".split(" ").concat(Fl));
  function Vh(e, t, r) {
    var n = e.type || "unknown-event";
    e.currentTarget = r, oS(n, t, void 0, e), e.currentTarget = null;
  }
  function mv(e, t) {
    t = (t & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var n = e[r], o = n.event;
      n = n.listeners;
      e: {
        var l = void 0;
        if (t)
          for (var i = n.length - 1; 0 <= i; i--) {
            var a = n[i], s = a.instance, u = a.currentTarget;
            if (a = a.listener, s !== l && o.isPropagationStopped())
              break e;
            Vh(o, a, u), l = s;
          }
        else
          for (i = 0; i < n.length; i++) {
            if (a = n[i], s = a.instance, u = a.currentTarget, a = a.listener, s !== l && o.isPropagationStopped())
              break e;
            Vh(o, a, u), l = s;
          }
      }
    }
    if (Fa)
      throw e = Ac, Fa = false, Ac = null, e;
  }
  function de(e, t) {
    var r = t[Yc];
    r === void 0 && (r = t[Yc] = /* @__PURE__ */ new Set());
    var n = e + "__bubble";
    r.has(n) || (vv(t, e, 2, false), r.add(n));
  }
  function dc(e, t, r) {
    var n = 0;
    t && (n |= 4), vv(r, e, n, t);
  }
  var ha = "_reactListening" + Math.random().toString(36).slice(2);
  function Xl(e) {
    if (!e[ha]) {
      e[ha] = true, Rm.forEach(function(r) {
        r !== "selectionchange" && (ox.has(r) || dc(r, false, e), dc(r, true, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ha] || (t[ha] = true, dc("selectionchange", false, t));
    }
  }
  function vv(e, t, r, n) {
    switch (qm(t)) {
      case 1:
        var o = SS;
        break;
      case 4:
        o = xS;
        break;
      default:
        o = Cd;
    }
    r = o.bind(null, t, r, e), o = void 0, !Ic || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = true), n ? o !== void 0 ? e.addEventListener(t, r, { capture: true, passive: o }) : e.addEventListener(t, r, true) : o !== void 0 ? e.addEventListener(t, r, { passive: o }) : e.addEventListener(t, r, false);
  }
  function fc(e, t, r, n, o) {
    var l = n;
    if (!(t & 1) && !(t & 2) && n !== null)
      e:
        for (; ; ) {
          if (n === null)
            return;
          var i = n.tag;
          if (i === 3 || i === 4) {
            var a = n.stateNode.containerInfo;
            if (a === o || a.nodeType === 8 && a.parentNode === o)
              break;
            if (i === 4)
              for (i = n.return; i !== null; ) {
                var s = i.tag;
                if ((s === 3 || s === 4) && (s = i.stateNode.containerInfo, s === o || s.nodeType === 8 && s.parentNode === o))
                  return;
                i = i.return;
              }
            for (; a !== null; ) {
              if (i = Wn(a), i === null)
                return;
              if (s = i.tag, s === 5 || s === 6) {
                n = l = i;
                continue e;
              }
              a = a.parentNode;
            }
          }
          n = n.return;
        }
    Um(function() {
      var u = l, c = xd(r), d = [];
      e: {
        var p = hv.get(e);
        if (p !== void 0) {
          var v = Nd, g = e;
          switch (e) {
            case "keypress":
              if (Ra(r) === 0)
                break e;
            case "keydown":
            case "keyup":
              v = zS;
              break;
            case "focusin":
              g = "focus", v = sc;
              break;
            case "focusout":
              g = "blur", v = sc;
              break;
            case "beforeblur":
            case "afterblur":
              v = sc;
              break;
            case "click":
              if (r.button === 2)
                break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              v = bh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              v = kS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              v = US;
              break;
            case cv:
            case dv:
            case fv:
              v = NS;
              break;
            case pv:
              v = BS;
              break;
            case "scroll":
              v = ES;
              break;
            case "wheel":
              v = HS;
              break;
            case "copy":
            case "cut":
            case "paste":
              v = bS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              v = Th;
          }
          var y = (t & 4) !== 0, x = !y && e === "scroll", f = y ? p !== null ? p + "Capture" : null : p;
          y = [];
          for (var h = u, m; h !== null; ) {
            m = h;
            var E = m.stateNode;
            if (m.tag === 5 && E !== null && (m = E, f !== null && (E = Wl(h, f), E != null && y.push(Zl(h, E, m)))), x)
              break;
            h = h.return;
          }
          0 < y.length && (p = new v(p, g, null, r, c), d.push({ event: p, listeners: y }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (p = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", p && r !== Oc && (g = r.relatedTarget || r.fromElement) && (Wn(g) || g[Tr]))
            break e;
          if ((v || p) && (p = c.window === c ? c : (p = c.ownerDocument) ? p.defaultView || p.parentWindow : window, v ? (g = r.relatedTarget || r.toElement, v = u, g = g ? Wn(g) : null, g !== null && (x = ro(g), g !== x || g.tag !== 5 && g.tag !== 6) && (g = null)) : (v = null, g = u), v !== g)) {
            if (y = bh, E = "onMouseLeave", f = "onMouseEnter", h = "mouse", (e === "pointerout" || e === "pointerover") && (y = Th, E = "onPointerLeave", f = "onPointerEnter", h = "pointer"), x = v == null ? p : Lo(v), m = g == null ? p : Lo(g), p = new y(E, h + "leave", v, r, c), p.target = x, p.relatedTarget = m, E = null, Wn(c) === u && (y = new y(f, h + "enter", g, r, c), y.target = m, y.relatedTarget = x, E = y), x = E, v && g)
              t: {
                for (y = v, f = g, h = 0, m = y; m; m = ko(m))
                  h++;
                for (m = 0, E = f; E; E = ko(E))
                  m++;
                for (; 0 < h - m; )
                  y = ko(y), h--;
                for (; 0 < m - h; )
                  f = ko(f), m--;
                for (; h--; ) {
                  if (y === f || f !== null && y === f.alternate)
                    break t;
                  y = ko(y), f = ko(f);
                }
                y = null;
              }
            else
              y = null;
            v !== null && Hh(d, p, v, y, false), g !== null && x !== null && Hh(d, x, g, y, true);
          }
        }
        e: {
          if (p = u ? Lo(u) : window, v = p.nodeName && p.nodeName.toLowerCase(), v === "select" || v === "input" && p.type === "file")
            var k = JS;
          else if (Mh(p))
            if (lv)
              k = ex;
            else {
              k = ZS;
              var w = XS;
            }
          else
            (v = p.nodeName) && v.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (k = qS);
          if (k && (k = k(e, u))) {
            ov(d, k, r, c);
            break e;
          }
          w && w(e, p, u), e === "focusout" && (w = p._wrapperState) && w.controlled && p.type === "number" && Lc(p, "number", p.value);
        }
        switch (w = u ? Lo(u) : window, e) {
          case "focusin":
            (Mh(w) || w.contentEditable === "true") && (Po = w, Vc = u, Al = null);
            break;
          case "focusout":
            Al = Vc = Po = null;
            break;
          case "mousedown":
            Hc = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Hc = false, Ah(d, r, c);
            break;
          case "selectionchange":
            if (nx)
              break;
          case "keydown":
          case "keyup":
            Ah(d, r, c);
        }
        var C;
        if (bd)
          e: {
            switch (e) {
              case "compositionstart":
                var P = "onCompositionStart";
                break e;
              case "compositionend":
                P = "onCompositionEnd";
                break e;
              case "compositionupdate":
                P = "onCompositionUpdate";
                break e;
            }
            P = void 0;
          }
        else
          No ? rv(e, r) && (P = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (P = "onCompositionStart");
        P && (tv && r.locale !== "ko" && (No || P !== "onCompositionStart" ? P === "onCompositionEnd" && No && (C = ev()) : (en = c, _d = "value" in en ? en.value : en.textContent, No = true)), w = Aa(u, P), 0 < w.length && (P = new Lh(P, e, null, r, c), d.push({ event: P, listeners: w }), C ? P.data = C : (C = nv(r), C !== null && (P.data = C)))), (C = WS ? KS(e, r) : QS(e, r)) && (u = Aa(u, "onBeforeInput"), 0 < u.length && (c = new Lh("onBeforeInput", "beforeinput", null, r, c), d.push({ event: c, listeners: u }), c.data = C));
      }
      mv(d, t);
    });
  }
  function Zl(e, t, r) {
    return { instance: e, listener: t, currentTarget: r };
  }
  function Aa(e, t) {
    for (var r = t + "Capture", n = []; e !== null; ) {
      var o = e, l = o.stateNode;
      o.tag === 5 && l !== null && (o = l, l = Wl(e, r), l != null && n.unshift(Zl(e, l, o)), l = Wl(e, t), l != null && n.push(Zl(e, l, o))), e = e.return;
    }
    return n;
  }
  function ko(e) {
    if (e === null)
      return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Hh(e, t, r, n, o) {
    for (var l = t._reactName, i = []; r !== null && r !== n; ) {
      var a = r, s = a.alternate, u = a.stateNode;
      if (s !== null && s === n)
        break;
      a.tag === 5 && u !== null && (a = u, o ? (s = Wl(r, l), s != null && i.unshift(Zl(r, s, a))) : o || (s = Wl(r, l), s != null && i.push(Zl(r, s, a)))), r = r.return;
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
  }
  var lx = /\r\n?/g, ix = /\u0000|\uFFFD/g;
  function $h(e) {
    return (typeof e == "string" ? e : "" + e).replace(lx, `
`).replace(ix, "");
  }
  function ma(e, t, r) {
    if (t = $h(t), $h(e) !== t && r)
      throw Error(L(425));
  }
  function Ua() {
  }
  var $c = null, Wc = null;
  function Kc(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Qc = typeof setTimeout == "function" ? setTimeout : void 0, ax = typeof clearTimeout == "function" ? clearTimeout : void 0, Wh = typeof Promise == "function" ? Promise : void 0, sx = typeof queueMicrotask == "function" ? queueMicrotask : typeof Wh < "u" ? function(e) {
    return Wh.resolve(null).then(e).catch(ux);
  } : Qc;
  function ux(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function pc(e, t) {
    var r = t, n = 0;
    do {
      var o = r.nextSibling;
      if (e.removeChild(r), o && o.nodeType === 8)
        if (r = o.data, r === "/$") {
          if (n === 0) {
            e.removeChild(o), Yl(t);
            return;
          }
          n--;
        } else
          r !== "$" && r !== "$?" && r !== "$!" || n++;
      r = o;
    } while (r);
    Yl(t);
  }
  function ln(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3)
        break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?")
          break;
        if (t === "/$")
          return null;
      }
    }
    return e;
  }
  function Kh(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "$" || r === "$!" || r === "$?") {
          if (t === 0)
            return e;
          t--;
        } else
          r === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Xo = Math.random().toString(36).slice(2), fr = "__reactFiber$" + Xo, ql = "__reactProps$" + Xo, Tr = "__reactContainer$" + Xo, Yc = "__reactEvents$" + Xo, cx = "__reactListeners$" + Xo, dx = "__reactHandles$" + Xo;
  function Wn(e) {
    var t = e[fr];
    if (t)
      return t;
    for (var r = e.parentNode; r; ) {
      if (t = r[Tr] || r[fr]) {
        if (r = t.alternate, t.child !== null || r !== null && r.child !== null)
          for (e = Kh(e); e !== null; ) {
            if (r = e[fr])
              return r;
            e = Kh(e);
          }
        return t;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function si(e) {
    return e = e[fr] || e[Tr], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function Lo(e) {
    if (e.tag === 5 || e.tag === 6)
      return e.stateNode;
    throw Error(L(33));
  }
  function ls(e) {
    return e[ql] || null;
  }
  var Gc = [], To = -1;
  function hn(e) {
    return { current: e };
  }
  function fe(e) {
    0 > To || (e.current = Gc[To], Gc[To] = null, To--);
  }
  function se(e, t) {
    To++, Gc[To] = e.current, e.current = t;
  }
  var fn = {}, Ze = hn(fn), ft = hn(false), Jn = fn;
  function $o(e, t) {
    var r = e.type.contextTypes;
    if (!r)
      return fn;
    var n = e.stateNode;
    if (n && n.__reactInternalMemoizedUnmaskedChildContext === t)
      return n.__reactInternalMemoizedMaskedChildContext;
    var o = {}, l;
    for (l in r)
      o[l] = t[l];
    return n && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o;
  }
  function pt(e) {
    return e = e.childContextTypes, e != null;
  }
  function ja() {
    fe(ft), fe(Ze);
  }
  function Qh(e, t, r) {
    if (Ze.current !== fn)
      throw Error(L(168));
    se(Ze, t), se(ft, r);
  }
  function gv(e, t, r) {
    var n = e.stateNode;
    if (t = t.childContextTypes, typeof n.getChildContext != "function")
      return r;
    n = n.getChildContext();
    for (var o in n)
      if (!(o in t))
        throw Error(L(108, X1(e) || "Unknown", o));
    return Se({}, r, n);
  }
  function Ba(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || fn, Jn = Ze.current, se(Ze, e), se(ft, ft.current), true;
  }
  function Yh(e, t, r) {
    var n = e.stateNode;
    if (!n)
      throw Error(L(169));
    r ? (e = gv(e, t, Jn), n.__reactInternalMemoizedMergedChildContext = e, fe(ft), fe(Ze), se(Ze, e)) : fe(ft), se(ft, r);
  }
  var _r = null, is = false, hc = false;
  function yv(e) {
    _r === null ? _r = [e] : _r.push(e);
  }
  function fx(e) {
    is = true, yv(e);
  }
  function mn() {
    if (!hc && _r !== null) {
      hc = true;
      var e = 0, t = re;
      try {
        var r = _r;
        for (re = 1; e < r.length; e++) {
          var n = r[e];
          do
            n = n(true);
          while (n !== null);
        }
        _r = null, is = false;
      } catch (o) {
        throw _r !== null && (_r = _r.slice(e + 1)), Hm(Ed, mn), o;
      } finally {
        re = t, hc = false;
      }
    }
    return null;
  }
  var Do = [], Fo = 0, Va = null, Ha = 0, It = [], At = 0, Xn = null, Nr = 1, Pr = "";
  function Hn(e, t) {
    Do[Fo++] = Ha, Do[Fo++] = Va, Va = e, Ha = t;
  }
  function wv(e, t, r) {
    It[At++] = Nr, It[At++] = Pr, It[At++] = Xn, Xn = e;
    var n = Nr;
    e = Pr;
    var o = 32 - rr(n) - 1;
    n &= ~(1 << o), r += 1;
    var l = 32 - rr(t) + o;
    if (30 < l) {
      var i = o - o % 5;
      l = (n & (1 << i) - 1).toString(32), n >>= i, o -= i, Nr = 1 << 32 - rr(t) + o | r << o | n, Pr = l + e;
    } else
      Nr = 1 << l | r << o | n, Pr = e;
  }
  function Td(e) {
    e.return !== null && (Hn(e, 1), wv(e, 1, 0));
  }
  function Dd(e) {
    for (; e === Va; )
      Va = Do[--Fo], Do[Fo] = null, Ha = Do[--Fo], Do[Fo] = null;
    for (; e === Xn; )
      Xn = It[--At], It[At] = null, Pr = It[--At], It[At] = null, Nr = It[--At], It[At] = null;
  }
  var Et = null, xt = null, ve = false, tr = null;
  function Sv(e, t) {
    var r = Ut(5, null, null, 0);
    r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [r], e.flags |= 16) : t.push(r);
  }
  function Gh(e, t) {
    switch (e.tag) {
      case 5:
        var r = e.type;
        return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Et = e, xt = ln(t.firstChild), true) : false;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Et = e, xt = null, true) : false;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (r = Xn !== null ? { id: Nr, overflow: Pr } : null, e.memoizedState = { dehydrated: t, treeContext: r, retryLane: 1073741824 }, r = Ut(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, Et = e, xt = null, true) : false;
      default:
        return false;
    }
  }
  function Jc(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Xc(e) {
    if (ve) {
      var t = xt;
      if (t) {
        var r = t;
        if (!Gh(e, t)) {
          if (Jc(e))
            throw Error(L(418));
          t = ln(r.nextSibling);
          var n = Et;
          t && Gh(e, t) ? Sv(n, r) : (e.flags = e.flags & -4097 | 2, ve = false, Et = e);
        }
      } else {
        if (Jc(e))
          throw Error(L(418));
        e.flags = e.flags & -4097 | 2, ve = false, Et = e;
      }
    }
  }
  function Jh(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
      e = e.return;
    Et = e;
  }
  function va(e) {
    if (e !== Et)
      return false;
    if (!ve)
      return Jh(e), ve = true, false;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Kc(e.type, e.memoizedProps)), t && (t = xt)) {
      if (Jc(e))
        throw xv(), Error(L(418));
      for (; t; )
        Sv(e, t), t = ln(t.nextSibling);
    }
    if (Jh(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
        throw Error(L(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var r = e.data;
            if (r === "/$") {
              if (t === 0) {
                xt = ln(e.nextSibling);
                break e;
              }
              t--;
            } else
              r !== "$" && r !== "$!" && r !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        xt = null;
      }
    } else
      xt = Et ? ln(e.stateNode.nextSibling) : null;
    return true;
  }
  function xv() {
    for (var e = xt; e; )
      e = ln(e.nextSibling);
  }
  function Wo() {
    xt = Et = null, ve = false;
  }
  function Fd(e) {
    tr === null ? tr = [e] : tr.push(e);
  }
  var px = Mr.ReactCurrentBatchConfig;
  function qt(e, t) {
    if (e && e.defaultProps) {
      t = Se({}, t), e = e.defaultProps;
      for (var r in e)
        t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  var $a = hn(null), Wa = null, Mo = null, Md = null;
  function Od() {
    Md = Mo = Wa = null;
  }
  function zd(e) {
    var t = $a.current;
    fe($a), e._currentValue = t;
  }
  function Zc(e, t, r) {
    for (; e !== null; ) {
      var n = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === r)
        break;
      e = e.return;
    }
  }
  function Bo(e, t) {
    Wa = e, Md = Mo = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (dt = true), e.firstContext = null);
  }
  function Bt(e) {
    var t = e._currentValue;
    if (Md !== e)
      if (e = { context: e, memoizedValue: t, next: null }, Mo === null) {
        if (Wa === null)
          throw Error(L(308));
        Mo = e, Wa.dependencies = { lanes: 0, firstContext: e };
      } else
        Mo = Mo.next = e;
    return t;
  }
  var Kn = null;
  function Id(e) {
    Kn === null ? Kn = [e] : Kn.push(e);
  }
  function Ev(e, t, r, n) {
    var o = t.interleaved;
    return o === null ? (r.next = r, Id(t)) : (r.next = o.next, o.next = r), t.interleaved = r, Dr(e, n);
  }
  function Dr(e, t) {
    e.lanes |= t;
    var r = e.alternate;
    for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; )
      e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
    return r.tag === 3 ? r.stateNode : null;
  }
  var Xr = false;
  function Ad(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Rv(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function br(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function an(e, t, r) {
    var n = e.updateQueue;
    if (n === null)
      return null;
    if (n = n.shared, q & 2) {
      var o = n.pending;
      return o === null ? t.next = t : (t.next = o.next, o.next = t), n.pending = t, Dr(e, r);
    }
    return o = n.interleaved, o === null ? (t.next = t, Id(n)) : (t.next = o.next, o.next = t), n.interleaved = t, Dr(e, r);
  }
  function ka(e, t, r) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
      var n = t.lanes;
      n &= e.pendingLanes, r |= n, t.lanes = r, Rd(e, r);
    }
  }
  function Xh(e, t) {
    var r = e.updateQueue, n = e.alternate;
    if (n !== null && (n = n.updateQueue, r === n)) {
      var o = null, l = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var i = { eventTime: r.eventTime, lane: r.lane, tag: r.tag, payload: r.payload, callback: r.callback, next: null };
          l === null ? o = l = i : l = l.next = i, r = r.next;
        } while (r !== null);
        l === null ? o = l = t : l = l.next = t;
      } else
        o = l = t;
      r = { baseState: n.baseState, firstBaseUpdate: o, lastBaseUpdate: l, shared: n.shared, effects: n.effects }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
  }
  function Ka(e, t, r, n) {
    var o = e.updateQueue;
    Xr = false;
    var l = o.firstBaseUpdate, i = o.lastBaseUpdate, a = o.shared.pending;
    if (a !== null) {
      o.shared.pending = null;
      var s = a, u = s.next;
      s.next = null, i === null ? l = u : i.next = u, i = s;
      var c = e.alternate;
      c !== null && (c = c.updateQueue, a = c.lastBaseUpdate, a !== i && (a === null ? c.firstBaseUpdate = u : a.next = u, c.lastBaseUpdate = s));
    }
    if (l !== null) {
      var d = o.baseState;
      i = 0, c = u = s = null, a = l;
      do {
        var p = a.lane, v = a.eventTime;
        if ((n & p) === p) {
          c !== null && (c = c.next = { eventTime: v, lane: 0, tag: a.tag, payload: a.payload, callback: a.callback, next: null });
          e: {
            var g = e, y = a;
            switch (p = t, v = r, y.tag) {
              case 1:
                if (g = y.payload, typeof g == "function") {
                  d = g.call(v, d, p);
                  break e;
                }
                d = g;
                break e;
              case 3:
                g.flags = g.flags & -65537 | 128;
              case 0:
                if (g = y.payload, p = typeof g == "function" ? g.call(v, d, p) : g, p == null)
                  break e;
                d = Se({}, d, p);
                break e;
              case 2:
                Xr = true;
            }
          }
          a.callback !== null && a.lane !== 0 && (e.flags |= 64, p = o.effects, p === null ? o.effects = [a] : p.push(a));
        } else
          v = { eventTime: v, lane: p, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, c === null ? (u = c = v, s = d) : c = c.next = v, i |= p;
        if (a = a.next, a === null) {
          if (a = o.shared.pending, a === null)
            break;
          p = a, a = p.next, p.next = null, o.lastBaseUpdate = p, o.shared.pending = null;
        }
      } while (1);
      if (c === null && (s = d), o.baseState = s, o.firstBaseUpdate = u, o.lastBaseUpdate = c, t = o.shared.interleaved, t !== null) {
        o = t;
        do
          i |= o.lane, o = o.next;
        while (o !== t);
      } else
        l === null && (o.shared.lanes = 0);
      qn |= i, e.lanes = i, e.memoizedState = d;
    }
  }
  function Zh(e, t, r) {
    if (e = t.effects, t.effects = null, e !== null)
      for (t = 0; t < e.length; t++) {
        var n = e[t], o = n.callback;
        if (o !== null) {
          if (n.callback = null, n = r, typeof o != "function")
            throw Error(L(191, o));
          o.call(n);
        }
      }
  }
  var kv = new Em.Component().refs;
  function qc(e, t, r, n) {
    t = e.memoizedState, r = r(n, t), r = r == null ? t : Se({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var as = { isMounted: function(e) {
    return (e = e._reactInternals) ? ro(e) === e : false;
  }, enqueueSetState: function(e, t, r) {
    e = e._reactInternals;
    var n = lt(), o = un(e), l = br(n, o);
    l.payload = t, r != null && (l.callback = r), t = an(e, l, o), t !== null && (nr(t, e, o, n), ka(t, e, o));
  }, enqueueReplaceState: function(e, t, r) {
    e = e._reactInternals;
    var n = lt(), o = un(e), l = br(n, o);
    l.tag = 1, l.payload = t, r != null && (l.callback = r), t = an(e, l, o), t !== null && (nr(t, e, o, n), ka(t, e, o));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var r = lt(), n = un(e), o = br(r, n);
    o.tag = 2, t != null && (o.callback = t), t = an(e, o, n), t !== null && (nr(t, e, n, r), ka(t, e, n));
  } };
  function qh(e, t, r, n, o, l, i) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, l, i) : t.prototype && t.prototype.isPureReactComponent ? !Jl(r, n) || !Jl(o, l) : true;
  }
  function Cv(e, t, r) {
    var n = false, o = fn, l = t.contextType;
    return typeof l == "object" && l !== null ? l = Bt(l) : (o = pt(t) ? Jn : Ze.current, n = t.contextTypes, l = (n = n != null) ? $o(e, o) : fn), t = new t(r, l), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = as, e.stateNode = t, t._reactInternals = e, n && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = o, e.__reactInternalMemoizedMaskedChildContext = l), t;
  }
  function em(e, t, r, n) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, n), t.state !== e && as.enqueueReplaceState(t, t.state, null);
  }
  function ed(e, t, r, n) {
    var o = e.stateNode;
    o.props = r, o.state = e.memoizedState, o.refs = kv, Ad(e);
    var l = t.contextType;
    typeof l == "object" && l !== null ? o.context = Bt(l) : (l = pt(t) ? Jn : Ze.current, o.context = $o(e, l)), o.state = e.memoizedState, l = t.getDerivedStateFromProps, typeof l == "function" && (qc(e, t, l, r), o.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (t = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), t !== o.state && as.enqueueReplaceState(o, o.state, null), Ka(e, r, o, n), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function _l(e, t, r) {
    if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (r._owner) {
        if (r = r._owner, r) {
          if (r.tag !== 1)
            throw Error(L(309));
          var n = r.stateNode;
        }
        if (!n)
          throw Error(L(147, e));
        var o = n, l = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === l ? t.ref : (t = function(i) {
          var a = o.refs;
          a === kv && (a = o.refs = {}), i === null ? delete a[l] : a[l] = i;
        }, t._stringRef = l, t);
      }
      if (typeof e != "string")
        throw Error(L(284));
      if (!r._owner)
        throw Error(L(290, e));
    }
    return e;
  }
  function ga(e, t) {
    throw e = Object.prototype.toString.call(t), Error(L(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function tm(e) {
    var t = e._init;
    return t(e._payload);
  }
  function _v(e) {
    function t(f, h) {
      if (e) {
        var m = f.deletions;
        m === null ? (f.deletions = [h], f.flags |= 16) : m.push(h);
      }
    }
    function r(f, h) {
      if (!e)
        return null;
      for (; h !== null; )
        t(f, h), h = h.sibling;
      return null;
    }
    function n(f, h) {
      for (f = /* @__PURE__ */ new Map(); h !== null; )
        h.key !== null ? f.set(h.key, h) : f.set(h.index, h), h = h.sibling;
      return f;
    }
    function o(f, h) {
      return f = cn(f, h), f.index = 0, f.sibling = null, f;
    }
    function l(f, h, m) {
      return f.index = m, e ? (m = f.alternate, m !== null ? (m = m.index, m < h ? (f.flags |= 2, h) : m) : (f.flags |= 2, h)) : (f.flags |= 1048576, h);
    }
    function i(f) {
      return e && f.alternate === null && (f.flags |= 2), f;
    }
    function a(f, h, m, E) {
      return h === null || h.tag !== 6 ? (h = xc(m, f.mode, E), h.return = f, h) : (h = o(h, m), h.return = f, h);
    }
    function s(f, h, m, E) {
      var k = m.type;
      return k === _o ? c(f, h, m.props.children, E, m.key) : h !== null && (h.elementType === k || typeof k == "object" && k !== null && k.$$typeof === Jr && tm(k) === h.type) ? (E = o(h, m.props), E.ref = _l(f, h, m), E.return = f, E) : (E = La(m.type, m.key, m.props, null, f.mode, E), E.ref = _l(f, h, m), E.return = f, E);
    }
    function u(f, h, m, E) {
      return h === null || h.tag !== 4 || h.stateNode.containerInfo !== m.containerInfo || h.stateNode.implementation !== m.implementation ? (h = Ec(m, f.mode, E), h.return = f, h) : (h = o(h, m.children || []), h.return = f, h);
    }
    function c(f, h, m, E, k) {
      return h === null || h.tag !== 7 ? (h = Gn(m, f.mode, E, k), h.return = f, h) : (h = o(h, m), h.return = f, h);
    }
    function d(f, h, m) {
      if (typeof h == "string" && h !== "" || typeof h == "number")
        return h = xc("" + h, f.mode, m), h.return = f, h;
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case ra:
            return m = La(h.type, h.key, h.props, null, f.mode, m), m.ref = _l(f, null, h), m.return = f, m;
          case Co:
            return h = Ec(h, f.mode, m), h.return = f, h;
          case Jr:
            var E = h._init;
            return d(f, E(h._payload), m);
        }
        if (Tl(h) || El(h))
          return h = Gn(h, f.mode, m, null), h.return = f, h;
        ga(f, h);
      }
      return null;
    }
    function p(f, h, m, E) {
      var k = h !== null ? h.key : null;
      if (typeof m == "string" && m !== "" || typeof m == "number")
        return k !== null ? null : a(f, h, "" + m, E);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case ra:
            return m.key === k ? s(f, h, m, E) : null;
          case Co:
            return m.key === k ? u(f, h, m, E) : null;
          case Jr:
            return k = m._init, p(f, h, k(m._payload), E);
        }
        if (Tl(m) || El(m))
          return k !== null ? null : c(f, h, m, E, null);
        ga(f, m);
      }
      return null;
    }
    function v(f, h, m, E, k) {
      if (typeof E == "string" && E !== "" || typeof E == "number")
        return f = f.get(m) || null, a(h, f, "" + E, k);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case ra:
            return f = f.get(E.key === null ? m : E.key) || null, s(h, f, E, k);
          case Co:
            return f = f.get(E.key === null ? m : E.key) || null, u(h, f, E, k);
          case Jr:
            var w = E._init;
            return v(f, h, m, w(E._payload), k);
        }
        if (Tl(E) || El(E))
          return f = f.get(m) || null, c(h, f, E, k, null);
        ga(h, E);
      }
      return null;
    }
    function g(f, h, m, E) {
      for (var k = null, w = null, C = h, P = h = 0, T = null; C !== null && P < m.length; P++) {
        C.index > P ? (T = C, C = null) : T = C.sibling;
        var z = p(f, C, m[P], E);
        if (z === null) {
          C === null && (C = T);
          break;
        }
        e && C && z.alternate === null && t(f, C), h = l(z, h, P), w === null ? k = z : w.sibling = z, w = z, C = T;
      }
      if (P === m.length)
        return r(f, C), ve && Hn(f, P), k;
      if (C === null) {
        for (; P < m.length; P++)
          C = d(f, m[P], E), C !== null && (h = l(C, h, P), w === null ? k = C : w.sibling = C, w = C);
        return ve && Hn(f, P), k;
      }
      for (C = n(f, C); P < m.length; P++)
        T = v(C, f, P, m[P], E), T !== null && (e && T.alternate !== null && C.delete(T.key === null ? P : T.key), h = l(T, h, P), w === null ? k = T : w.sibling = T, w = T);
      return e && C.forEach(function(X) {
        return t(f, X);
      }), ve && Hn(f, P), k;
    }
    function y(f, h, m, E) {
      var k = El(m);
      if (typeof k != "function")
        throw Error(L(150));
      if (m = k.call(m), m == null)
        throw Error(L(151));
      for (var w = k = null, C = h, P = h = 0, T = null, z = m.next(); C !== null && !z.done; P++, z = m.next()) {
        C.index > P ? (T = C, C = null) : T = C.sibling;
        var X = p(f, C, z.value, E);
        if (X === null) {
          C === null && (C = T);
          break;
        }
        e && C && X.alternate === null && t(f, C), h = l(X, h, P), w === null ? k = X : w.sibling = X, w = X, C = T;
      }
      if (z.done)
        return r(f, C), ve && Hn(f, P), k;
      if (C === null) {
        for (; !z.done; P++, z = m.next())
          z = d(f, z.value, E), z !== null && (h = l(z, h, P), w === null ? k = z : w.sibling = z, w = z);
        return ve && Hn(f, P), k;
      }
      for (C = n(f, C); !z.done; P++, z = m.next())
        z = v(C, f, P, z.value, E), z !== null && (e && z.alternate !== null && C.delete(z.key === null ? P : z.key), h = l(z, h, P), w === null ? k = z : w.sibling = z, w = z);
      return e && C.forEach(function(H) {
        return t(f, H);
      }), ve && Hn(f, P), k;
    }
    function x(f, h, m, E) {
      if (typeof m == "object" && m !== null && m.type === _o && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case ra:
            e: {
              for (var k = m.key, w = h; w !== null; ) {
                if (w.key === k) {
                  if (k = m.type, k === _o) {
                    if (w.tag === 7) {
                      r(f, w.sibling), h = o(w, m.props.children), h.return = f, f = h;
                      break e;
                    }
                  } else if (w.elementType === k || typeof k == "object" && k !== null && k.$$typeof === Jr && tm(k) === w.type) {
                    r(f, w.sibling), h = o(w, m.props), h.ref = _l(f, w, m), h.return = f, f = h;
                    break e;
                  }
                  r(f, w);
                  break;
                } else
                  t(f, w);
                w = w.sibling;
              }
              m.type === _o ? (h = Gn(m.props.children, f.mode, E, m.key), h.return = f, f = h) : (E = La(m.type, m.key, m.props, null, f.mode, E), E.ref = _l(f, h, m), E.return = f, f = E);
            }
            return i(f);
          case Co:
            e: {
              for (w = m.key; h !== null; ) {
                if (h.key === w)
                  if (h.tag === 4 && h.stateNode.containerInfo === m.containerInfo && h.stateNode.implementation === m.implementation) {
                    r(f, h.sibling), h = o(h, m.children || []), h.return = f, f = h;
                    break e;
                  } else {
                    r(f, h);
                    break;
                  }
                else
                  t(f, h);
                h = h.sibling;
              }
              h = Ec(m, f.mode, E), h.return = f, f = h;
            }
            return i(f);
          case Jr:
            return w = m._init, x(f, h, w(m._payload), E);
        }
        if (Tl(m))
          return g(f, h, m, E);
        if (El(m))
          return y(f, h, m, E);
        ga(f, m);
      }
      return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, h !== null && h.tag === 6 ? (r(f, h.sibling), h = o(h, m), h.return = f, f = h) : (r(f, h), h = xc(m, f.mode, E), h.return = f, f = h), i(f)) : r(f, h);
    }
    return x;
  }
  var Ko = _v(true), Nv = _v(false), ui = {}, hr = hn(ui), ei = hn(ui), ti = hn(ui);
  function Qn(e) {
    if (e === ui)
      throw Error(L(174));
    return e;
  }
  function Ud(e, t) {
    switch (se(ti, t), se(ei, e), se(hr, ui), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Dc(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Dc(t, e);
    }
    fe(hr), se(hr, t);
  }
  function Qo() {
    fe(hr), fe(ei), fe(ti);
  }
  function Pv(e) {
    Qn(ti.current);
    var t = Qn(hr.current), r = Dc(t, e.type);
    t !== r && (se(ei, e), se(hr, r));
  }
  function jd(e) {
    ei.current === e && (fe(hr), fe(ei));
  }
  var ye = hn(0);
  function Qa(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var r = t.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || r.data === "$?" || r.data === "$!"))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if (t.flags & 128)
          return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e)
        break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e)
          return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var mc = [];
  function Bd() {
    for (var e = 0; e < mc.length; e++)
      mc[e]._workInProgressVersionPrimary = null;
    mc.length = 0;
  }
  var Ca = Mr.ReactCurrentDispatcher, vc = Mr.ReactCurrentBatchConfig, Zn = 0, we = null, Le = null, ze = null, Ya = false, Ul = false, ri = 0, hx = 0;
  function Ge() {
    throw Error(L(321));
  }
  function Vd(e, t) {
    if (t === null)
      return false;
    for (var r = 0; r < t.length && r < e.length; r++)
      if (!or(e[r], t[r]))
        return false;
    return true;
  }
  function Hd(e, t, r, n, o, l) {
    if (Zn = l, we = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ca.current = e === null || e.memoizedState === null ? yx : wx, e = r(n, o), Ul) {
      l = 0;
      do {
        if (Ul = false, ri = 0, 25 <= l)
          throw Error(L(301));
        l += 1, ze = Le = null, t.updateQueue = null, Ca.current = Sx, e = r(n, o);
      } while (Ul);
    }
    if (Ca.current = Ga, t = Le !== null && Le.next !== null, Zn = 0, ze = Le = we = null, Ya = false, t)
      throw Error(L(300));
    return e;
  }
  function $d() {
    var e = ri !== 0;
    return ri = 0, e;
  }
  function dr() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ze === null ? we.memoizedState = ze = e : ze = ze.next = e, ze;
  }
  function Vt() {
    if (Le === null) {
      var e = we.alternate;
      e = e !== null ? e.memoizedState : null;
    } else
      e = Le.next;
    var t = ze === null ? we.memoizedState : ze.next;
    if (t !== null)
      ze = t, Le = e;
    else {
      if (e === null)
        throw Error(L(310));
      Le = e, e = { memoizedState: Le.memoizedState, baseState: Le.baseState, baseQueue: Le.baseQueue, queue: Le.queue, next: null }, ze === null ? we.memoizedState = ze = e : ze = ze.next = e;
    }
    return ze;
  }
  function ni(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function gc(e) {
    var t = Vt(), r = t.queue;
    if (r === null)
      throw Error(L(311));
    r.lastRenderedReducer = e;
    var n = Le, o = n.baseQueue, l = r.pending;
    if (l !== null) {
      if (o !== null) {
        var i = o.next;
        o.next = l.next, l.next = i;
      }
      n.baseQueue = o = l, r.pending = null;
    }
    if (o !== null) {
      l = o.next, n = n.baseState;
      var a = i = null, s = null, u = l;
      do {
        var c = u.lane;
        if ((Zn & c) === c)
          s !== null && (s = s.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), n = u.hasEagerState ? u.eagerState : e(n, u.action);
        else {
          var d = { lane: c, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null };
          s === null ? (a = s = d, i = n) : s = s.next = d, we.lanes |= c, qn |= c;
        }
        u = u.next;
      } while (u !== null && u !== l);
      s === null ? i = n : s.next = a, or(n, t.memoizedState) || (dt = true), t.memoizedState = n, t.baseState = i, t.baseQueue = s, r.lastRenderedState = n;
    }
    if (e = r.interleaved, e !== null) {
      o = e;
      do
        l = o.lane, we.lanes |= l, qn |= l, o = o.next;
      while (o !== e);
    } else
      o === null && (r.lanes = 0);
    return [t.memoizedState, r.dispatch];
  }
  function yc(e) {
    var t = Vt(), r = t.queue;
    if (r === null)
      throw Error(L(311));
    r.lastRenderedReducer = e;
    var n = r.dispatch, o = r.pending, l = t.memoizedState;
    if (o !== null) {
      r.pending = null;
      var i = o = o.next;
      do
        l = e(l, i.action), i = i.next;
      while (i !== o);
      or(l, t.memoizedState) || (dt = true), t.memoizedState = l, t.baseQueue === null && (t.baseState = l), r.lastRenderedState = l;
    }
    return [l, n];
  }
  function bv() {
  }
  function Lv(e, t) {
    var r = we, n = Vt(), o = t(), l = !or(n.memoizedState, o);
    if (l && (n.memoizedState = o, dt = true), n = n.queue, Wd(Fv.bind(null, r, n, e), [e]), n.getSnapshot !== t || l || ze !== null && ze.memoizedState.tag & 1) {
      if (r.flags |= 2048, oi(9, Dv.bind(null, r, n, o, t), void 0, null), Ie === null)
        throw Error(L(349));
      Zn & 30 || Tv(r, t, o);
    }
    return o;
  }
  function Tv(e, t, r) {
    e.flags |= 16384, e = { getSnapshot: t, value: r }, t = we.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, we.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e));
  }
  function Dv(e, t, r, n) {
    t.value = r, t.getSnapshot = n, Mv(t) && Ov(e);
  }
  function Fv(e, t, r) {
    return r(function() {
      Mv(t) && Ov(e);
    });
  }
  function Mv(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var r = t();
      return !or(e, r);
    } catch {
      return true;
    }
  }
  function Ov(e) {
    var t = Dr(e, 1);
    t !== null && nr(t, e, 1, -1);
  }
  function rm(e) {
    var t = dr();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ni, lastRenderedState: e }, t.queue = e, e = e.dispatch = gx.bind(null, we, e), [t.memoizedState, e];
  }
  function oi(e, t, r, n) {
    return e = { tag: e, create: t, destroy: r, deps: n, next: null }, t = we.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, we.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (n = r.next, r.next = e, e.next = n, t.lastEffect = e)), e;
  }
  function zv() {
    return Vt().memoizedState;
  }
  function _a(e, t, r, n) {
    var o = dr();
    we.flags |= e, o.memoizedState = oi(1 | t, r, void 0, n === void 0 ? null : n);
  }
  function ss(e, t, r, n) {
    var o = Vt();
    n = n === void 0 ? null : n;
    var l = void 0;
    if (Le !== null) {
      var i = Le.memoizedState;
      if (l = i.destroy, n !== null && Vd(n, i.deps)) {
        o.memoizedState = oi(t, r, l, n);
        return;
      }
    }
    we.flags |= e, o.memoizedState = oi(1 | t, r, l, n);
  }
  function nm(e, t) {
    return _a(8390656, 8, e, t);
  }
  function Wd(e, t) {
    return ss(2048, 8, e, t);
  }
  function Iv(e, t) {
    return ss(4, 2, e, t);
  }
  function Av(e, t) {
    return ss(4, 4, e, t);
  }
  function Uv(e, t) {
    if (typeof t == "function")
      return e = e(), t(e), function() {
        t(null);
      };
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function jv(e, t, r) {
    return r = r != null ? r.concat([e]) : null, ss(4, 4, Uv.bind(null, t, e), r);
  }
  function Kd() {
  }
  function Bv(e, t) {
    var r = Vt();
    t = t === void 0 ? null : t;
    var n = r.memoizedState;
    return n !== null && t !== null && Vd(t, n[1]) ? n[0] : (r.memoizedState = [e, t], e);
  }
  function Vv(e, t) {
    var r = Vt();
    t = t === void 0 ? null : t;
    var n = r.memoizedState;
    return n !== null && t !== null && Vd(t, n[1]) ? n[0] : (e = e(), r.memoizedState = [e, t], e);
  }
  function Hv(e, t, r) {
    return Zn & 21 ? (or(r, t) || (r = Km(), we.lanes |= r, qn |= r, e.baseState = true), t) : (e.baseState && (e.baseState = false, dt = true), e.memoizedState = r);
  }
  function mx(e, t) {
    var r = re;
    re = r !== 0 && 4 > r ? r : 4, e(true);
    var n = vc.transition;
    vc.transition = {};
    try {
      e(false), t();
    } finally {
      re = r, vc.transition = n;
    }
  }
  function $v() {
    return Vt().memoizedState;
  }
  function vx(e, t, r) {
    var n = un(e);
    if (r = { lane: n, action: r, hasEagerState: false, eagerState: null, next: null }, Wv(e))
      Kv(t, r);
    else if (r = Ev(e, t, r, n), r !== null) {
      var o = lt();
      nr(r, e, n, o), Qv(r, t, n);
    }
  }
  function gx(e, t, r) {
    var n = un(e), o = { lane: n, action: r, hasEagerState: false, eagerState: null, next: null };
    if (Wv(e))
      Kv(t, o);
    else {
      var l = e.alternate;
      if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer, l !== null))
        try {
          var i = t.lastRenderedState, a = l(i, r);
          if (o.hasEagerState = true, o.eagerState = a, or(a, i)) {
            var s = t.interleaved;
            s === null ? (o.next = o, Id(t)) : (o.next = s.next, s.next = o), t.interleaved = o;
            return;
          }
        } catch {
        } finally {
        }
      r = Ev(e, t, o, n), r !== null && (o = lt(), nr(r, e, n, o), Qv(r, t, n));
    }
  }
  function Wv(e) {
    var t = e.alternate;
    return e === we || t !== null && t === we;
  }
  function Kv(e, t) {
    Ul = Ya = true;
    var r = e.pending;
    r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
  }
  function Qv(e, t, r) {
    if (r & 4194240) {
      var n = t.lanes;
      n &= e.pendingLanes, r |= n, t.lanes = r, Rd(e, r);
    }
  }
  var Ga = { readContext: Bt, useCallback: Ge, useContext: Ge, useEffect: Ge, useImperativeHandle: Ge, useInsertionEffect: Ge, useLayoutEffect: Ge, useMemo: Ge, useReducer: Ge, useRef: Ge, useState: Ge, useDebugValue: Ge, useDeferredValue: Ge, useTransition: Ge, useMutableSource: Ge, useSyncExternalStore: Ge, useId: Ge, unstable_isNewReconciler: false }, yx = { readContext: Bt, useCallback: function(e, t) {
    return dr().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: Bt, useEffect: nm, useImperativeHandle: function(e, t, r) {
    return r = r != null ? r.concat([e]) : null, _a(4194308, 4, Uv.bind(null, t, e), r);
  }, useLayoutEffect: function(e, t) {
    return _a(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return _a(4, 2, e, t);
  }, useMemo: function(e, t) {
    var r = dr();
    return t = t === void 0 ? null : t, e = e(), r.memoizedState = [e, t], e;
  }, useReducer: function(e, t, r) {
    var n = dr();
    return t = r !== void 0 ? r(t) : t, n.memoizedState = n.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, n.queue = e, e = e.dispatch = vx.bind(null, we, e), [n.memoizedState, e];
  }, useRef: function(e) {
    var t = dr();
    return e = { current: e }, t.memoizedState = e;
  }, useState: rm, useDebugValue: Kd, useDeferredValue: function(e) {
    return dr().memoizedState = e;
  }, useTransition: function() {
    var e = rm(false), t = e[0];
    return e = mx.bind(null, e[1]), dr().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, r) {
    var n = we, o = dr();
    if (ve) {
      if (r === void 0)
        throw Error(L(407));
      r = r();
    } else {
      if (r = t(), Ie === null)
        throw Error(L(349));
      Zn & 30 || Tv(n, t, r);
    }
    o.memoizedState = r;
    var l = { value: r, getSnapshot: t };
    return o.queue = l, nm(Fv.bind(null, n, l, e), [e]), n.flags |= 2048, oi(9, Dv.bind(null, n, l, r, t), void 0, null), r;
  }, useId: function() {
    var e = dr(), t = Ie.identifierPrefix;
    if (ve) {
      var r = Pr, n = Nr;
      r = (n & ~(1 << 32 - rr(n) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = ri++, 0 < r && (t += "H" + r.toString(32)), t += ":";
    } else
      r = hx++, t = ":" + t + "r" + r.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: false }, wx = { readContext: Bt, useCallback: Bv, useContext: Bt, useEffect: Wd, useImperativeHandle: jv, useInsertionEffect: Iv, useLayoutEffect: Av, useMemo: Vv, useReducer: gc, useRef: zv, useState: function() {
    return gc(ni);
  }, useDebugValue: Kd, useDeferredValue: function(e) {
    var t = Vt();
    return Hv(t, Le.memoizedState, e);
  }, useTransition: function() {
    var e = gc(ni)[0], t = Vt().memoizedState;
    return [e, t];
  }, useMutableSource: bv, useSyncExternalStore: Lv, useId: $v, unstable_isNewReconciler: false }, Sx = { readContext: Bt, useCallback: Bv, useContext: Bt, useEffect: Wd, useImperativeHandle: jv, useInsertionEffect: Iv, useLayoutEffect: Av, useMemo: Vv, useReducer: yc, useRef: zv, useState: function() {
    return yc(ni);
  }, useDebugValue: Kd, useDeferredValue: function(e) {
    var t = Vt();
    return Le === null ? t.memoizedState = e : Hv(t, Le.memoizedState, e);
  }, useTransition: function() {
    var e = yc(ni)[0], t = Vt().memoizedState;
    return [e, t];
  }, useMutableSource: bv, useSyncExternalStore: Lv, useId: $v, unstable_isNewReconciler: false };
  function Yo(e, t) {
    try {
      var r = "", n = t;
      do
        r += J1(n), n = n.return;
      while (n);
      var o = r;
    } catch (l) {
      o = `
Error generating stack: ` + l.message + `
` + l.stack;
    }
    return { value: e, source: t, stack: o, digest: null };
  }
  function wc(e, t, r) {
    return { value: e, source: null, stack: r ?? null, digest: t ?? null };
  }
  function td(e, t) {
    try {
      console.error(t.value);
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  var xx = typeof WeakMap == "function" ? WeakMap : Map;
  function Yv(e, t, r) {
    r = br(-1, r), r.tag = 3, r.payload = { element: null };
    var n = t.value;
    return r.callback = function() {
      Xa || (Xa = true, dd = n), td(e, t);
    }, r;
  }
  function Gv(e, t, r) {
    r = br(-1, r), r.tag = 3;
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var o = t.value;
      r.payload = function() {
        return n(o);
      }, r.callback = function() {
        td(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (r.callback = function() {
      td(e, t), typeof n != "function" && (sn === null ? sn = /* @__PURE__ */ new Set([this]) : sn.add(this));
      var i = t.stack;
      this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
    }), r;
  }
  function om(e, t, r) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new xx();
      var o = /* @__PURE__ */ new Set();
      n.set(t, o);
    } else
      o = n.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), n.set(t, o));
    o.has(r) || (o.add(r), e = Ox.bind(null, e, t, r), t.then(e, e));
  }
  function lm(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : true), t)
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function im(e, t, r, n, o) {
    return e.mode & 1 ? (e.flags |= 65536, e.lanes = o, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = br(-1, 1), t.tag = 2, an(r, t, 1))), r.lanes |= 1), e);
  }
  var Ex = Mr.ReactCurrentOwner, dt = false;
  function ot(e, t, r, n) {
    t.child = e === null ? Nv(t, null, r, n) : Ko(t, e.child, r, n);
  }
  function am(e, t, r, n, o) {
    r = r.render;
    var l = t.ref;
    return Bo(t, o), n = Hd(e, t, r, n, l, o), r = $d(), e !== null && !dt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, Fr(e, t, o)) : (ve && r && Td(t), t.flags |= 1, ot(e, t, n, o), t.child);
  }
  function sm(e, t, r, n, o) {
    if (e === null) {
      var l = r.type;
      return typeof l == "function" && !ef(l) && l.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = l, Jv(e, t, l, n, o)) : (e = La(r.type, null, n, t, t.mode, o), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (l = e.child, !(e.lanes & o)) {
      var i = l.memoizedProps;
      if (r = r.compare, r = r !== null ? r : Jl, r(i, n) && e.ref === t.ref)
        return Fr(e, t, o);
    }
    return t.flags |= 1, e = cn(l, n), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Jv(e, t, r, n, o) {
    if (e !== null) {
      var l = e.memoizedProps;
      if (Jl(l, n) && e.ref === t.ref)
        if (dt = false, t.pendingProps = n = l, (e.lanes & o) !== 0)
          e.flags & 131072 && (dt = true);
        else
          return t.lanes = e.lanes, Fr(e, t, o);
    }
    return rd(e, t, r, n, o);
  }
  function Xv(e, t, r) {
    var n = t.pendingProps, o = n.children, l = e !== null ? e.memoizedState : null;
    if (n.mode === "hidden")
      if (!(t.mode & 1))
        t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, se(zo, St), St |= r;
      else {
        if (!(r & 1073741824))
          return e = l !== null ? l.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, se(zo, St), St |= e, null;
        t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, n = l !== null ? l.baseLanes : r, se(zo, St), St |= n;
      }
    else
      l !== null ? (n = l.baseLanes | r, t.memoizedState = null) : n = r, se(zo, St), St |= n;
    return ot(e, t, o, r), t.child;
  }
  function Zv(e, t) {
    var r = t.ref;
    (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
  }
  function rd(e, t, r, n, o) {
    var l = pt(r) ? Jn : Ze.current;
    return l = $o(t, l), Bo(t, o), r = Hd(e, t, r, n, l, o), n = $d(), e !== null && !dt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, Fr(e, t, o)) : (ve && n && Td(t), t.flags |= 1, ot(e, t, r, o), t.child);
  }
  function um(e, t, r, n, o) {
    if (pt(r)) {
      var l = true;
      Ba(t);
    } else
      l = false;
    if (Bo(t, o), t.stateNode === null)
      Na(e, t), Cv(t, r, n), ed(t, r, n, o), n = true;
    else if (e === null) {
      var i = t.stateNode, a = t.memoizedProps;
      i.props = a;
      var s = i.context, u = r.contextType;
      typeof u == "object" && u !== null ? u = Bt(u) : (u = pt(r) ? Jn : Ze.current, u = $o(t, u));
      var c = r.getDerivedStateFromProps, d = typeof c == "function" || typeof i.getSnapshotBeforeUpdate == "function";
      d || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== n || s !== u) && em(t, i, n, u), Xr = false;
      var p = t.memoizedState;
      i.state = p, Ka(t, n, i, o), s = t.memoizedState, a !== n || p !== s || ft.current || Xr ? (typeof c == "function" && (qc(t, r, c, n), s = t.memoizedState), (a = Xr || qh(t, r, a, n, p, s, u)) ? (d || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = s), i.props = n, i.state = s, i.context = u, n = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), n = false);
    } else {
      i = t.stateNode, Rv(e, t), a = t.memoizedProps, u = t.type === t.elementType ? a : qt(t.type, a), i.props = u, d = t.pendingProps, p = i.context, s = r.contextType, typeof s == "object" && s !== null ? s = Bt(s) : (s = pt(r) ? Jn : Ze.current, s = $o(t, s));
      var v = r.getDerivedStateFromProps;
      (c = typeof v == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== d || p !== s) && em(t, i, n, s), Xr = false, p = t.memoizedState, i.state = p, Ka(t, n, i, o);
      var g = t.memoizedState;
      a !== d || p !== g || ft.current || Xr ? (typeof v == "function" && (qc(t, r, v, n), g = t.memoizedState), (u = Xr || qh(t, r, u, n, p, g, s) || false) ? (c || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(n, g, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(n, g, s)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = g), i.props = n, i.state = g, i.context = s, n = u) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), n = false);
    }
    return nd(e, t, r, n, l, o);
  }
  function nd(e, t, r, n, o, l) {
    Zv(e, t);
    var i = (t.flags & 128) !== 0;
    if (!n && !i)
      return o && Yh(t, r, false), Fr(e, t, l);
    n = t.stateNode, Ex.current = t;
    var a = i && typeof r.getDerivedStateFromError != "function" ? null : n.render();
    return t.flags |= 1, e !== null && i ? (t.child = Ko(t, e.child, null, l), t.child = Ko(t, null, a, l)) : ot(e, t, a, l), t.memoizedState = n.state, o && Yh(t, r, true), t.child;
  }
  function qv(e) {
    var t = e.stateNode;
    t.pendingContext ? Qh(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Qh(e, t.context, false), Ud(e, t.containerInfo);
  }
  function cm(e, t, r, n, o) {
    return Wo(), Fd(o), t.flags |= 256, ot(e, t, r, n), t.child;
  }
  var od = { dehydrated: null, treeContext: null, retryLane: 0 };
  function ld(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function eg(e, t, r) {
    var n = t.pendingProps, o = ye.current, l = false, i = (t.flags & 128) !== 0, a;
    if ((a = i) || (a = e !== null && e.memoizedState === null ? false : (o & 2) !== 0), a ? (l = true, t.flags &= -129) : (e === null || e.memoizedState !== null) && (o |= 1), se(ye, o & 1), e === null)
      return Xc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = n.children, e = n.fallback, l ? (n = t.mode, l = t.child, i = { mode: "hidden", children: i }, !(n & 1) && l !== null ? (l.childLanes = 0, l.pendingProps = i) : l = ds(i, n, 0, null), e = Gn(e, n, r, null), l.return = t, e.return = t, l.sibling = e, t.child = l, t.child.memoizedState = ld(r), t.memoizedState = od, e) : Qd(t, i));
    if (o = e.memoizedState, o !== null && (a = o.dehydrated, a !== null))
      return Rx(e, t, i, n, a, o, r);
    if (l) {
      l = n.fallback, i = t.mode, o = e.child, a = o.sibling;
      var s = { mode: "hidden", children: n.children };
      return !(i & 1) && t.child !== o ? (n = t.child, n.childLanes = 0, n.pendingProps = s, t.deletions = null) : (n = cn(o, s), n.subtreeFlags = o.subtreeFlags & 14680064), a !== null ? l = cn(a, l) : (l = Gn(l, i, r, null), l.flags |= 2), l.return = t, n.return = t, n.sibling = l, t.child = n, n = l, l = t.child, i = e.child.memoizedState, i = i === null ? ld(r) : { baseLanes: i.baseLanes | r, cachePool: null, transitions: i.transitions }, l.memoizedState = i, l.childLanes = e.childLanes & ~r, t.memoizedState = od, n;
    }
    return l = e.child, e = l.sibling, n = cn(l, { mode: "visible", children: n.children }), !(t.mode & 1) && (n.lanes = r), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n;
  }
  function Qd(e, t) {
    return t = ds({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function ya(e, t, r, n) {
    return n !== null && Fd(n), Ko(t, e.child, null, r), e = Qd(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Rx(e, t, r, n, o, l, i) {
    if (r)
      return t.flags & 256 ? (t.flags &= -257, n = wc(Error(L(422))), ya(e, t, i, n)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (l = n.fallback, o = t.mode, n = ds({ mode: "visible", children: n.children }, o, 0, null), l = Gn(l, o, i, null), l.flags |= 2, n.return = t, l.return = t, n.sibling = l, t.child = n, t.mode & 1 && Ko(t, e.child, null, i), t.child.memoizedState = ld(i), t.memoizedState = od, l);
    if (!(t.mode & 1))
      return ya(e, t, i, null);
    if (o.data === "$!") {
      if (n = o.nextSibling && o.nextSibling.dataset, n)
        var a = n.dgst;
      return n = a, l = Error(L(419)), n = wc(l, n, void 0), ya(e, t, i, n);
    }
    if (a = (i & e.childLanes) !== 0, dt || a) {
      if (n = Ie, n !== null) {
        switch (i & -i) {
          case 4:
            o = 2;
            break;
          case 16:
            o = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            o = 32;
            break;
          case 536870912:
            o = 268435456;
            break;
          default:
            o = 0;
        }
        o = o & (n.suspendedLanes | i) ? 0 : o, o !== 0 && o !== l.retryLane && (l.retryLane = o, Dr(e, o), nr(n, e, o, -1));
      }
      return qd(), n = wc(Error(L(421))), ya(e, t, i, n);
    }
    return o.data === "$?" ? (t.flags |= 128, t.child = e.child, t = zx.bind(null, e), o._reactRetry = t, null) : (e = l.treeContext, xt = ln(o.nextSibling), Et = t, ve = true, tr = null, e !== null && (It[At++] = Nr, It[At++] = Pr, It[At++] = Xn, Nr = e.id, Pr = e.overflow, Xn = t), t = Qd(t, n.children), t.flags |= 4096, t);
  }
  function dm(e, t, r) {
    e.lanes |= t;
    var n = e.alternate;
    n !== null && (n.lanes |= t), Zc(e.return, t, r);
  }
  function Sc(e, t, r, n, o) {
    var l = e.memoizedState;
    l === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: n, tail: r, tailMode: o } : (l.isBackwards = t, l.rendering = null, l.renderingStartTime = 0, l.last = n, l.tail = r, l.tailMode = o);
  }
  function tg(e, t, r) {
    var n = t.pendingProps, o = n.revealOrder, l = n.tail;
    if (ot(e, t, n.children, r), n = ye.current, n & 2)
      n = n & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && e.flags & 128)
        e:
          for (e = t.child; e !== null; ) {
            if (e.tag === 13)
              e.memoizedState !== null && dm(e, r, t);
            else if (e.tag === 19)
              dm(e, r, t);
            else if (e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t)
              break e;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t)
                break e;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
      n &= 1;
    }
    if (se(ye, n), !(t.mode & 1))
      t.memoizedState = null;
    else
      switch (o) {
        case "forwards":
          for (r = t.child, o = null; r !== null; )
            e = r.alternate, e !== null && Qa(e) === null && (o = r), r = r.sibling;
          r = o, r === null ? (o = t.child, t.child = null) : (o = r.sibling, r.sibling = null), Sc(t, false, o, r, l);
          break;
        case "backwards":
          for (r = null, o = t.child, t.child = null; o !== null; ) {
            if (e = o.alternate, e !== null && Qa(e) === null) {
              t.child = o;
              break;
            }
            e = o.sibling, o.sibling = r, r = o, o = e;
          }
          Sc(t, true, r, null, l);
          break;
        case "together":
          Sc(t, false, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function Na(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Fr(e, t, r) {
    if (e !== null && (t.dependencies = e.dependencies), qn |= t.lanes, !(r & t.childLanes))
      return null;
    if (e !== null && t.child !== e.child)
      throw Error(L(153));
    if (t.child !== null) {
      for (e = t.child, r = cn(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; )
        e = e.sibling, r = r.sibling = cn(e, e.pendingProps), r.return = t;
      r.sibling = null;
    }
    return t.child;
  }
  function kx(e, t, r) {
    switch (t.tag) {
      case 3:
        qv(t), Wo();
        break;
      case 5:
        Pv(t);
        break;
      case 1:
        pt(t.type) && Ba(t);
        break;
      case 4:
        Ud(t, t.stateNode.containerInfo);
        break;
      case 10:
        var n = t.type._context, o = t.memoizedProps.value;
        se($a, n._currentValue), n._currentValue = o;
        break;
      case 13:
        if (n = t.memoizedState, n !== null)
          return n.dehydrated !== null ? (se(ye, ye.current & 1), t.flags |= 128, null) : r & t.child.childLanes ? eg(e, t, r) : (se(ye, ye.current & 1), e = Fr(e, t, r), e !== null ? e.sibling : null);
        se(ye, ye.current & 1);
        break;
      case 19:
        if (n = (r & t.childLanes) !== 0, e.flags & 128) {
          if (n)
            return tg(e, t, r);
          t.flags |= 128;
        }
        if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), se(ye, ye.current), n)
          break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Xv(e, t, r);
    }
    return Fr(e, t, r);
  }
  var rg, id, ng, og;
  rg = function(e, t) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === 5 || r.tag === 6)
        e.appendChild(r.stateNode);
      else if (r.tag !== 4 && r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === t)
        break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t)
          return;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
  };
  id = function() {
  };
  ng = function(e, t, r, n) {
    var o = e.memoizedProps;
    if (o !== n) {
      e = t.stateNode, Qn(hr.current);
      var l = null;
      switch (r) {
        case "input":
          o = Pc(e, o), n = Pc(e, n), l = [];
          break;
        case "select":
          o = Se({}, o, { value: void 0 }), n = Se({}, n, { value: void 0 }), l = [];
          break;
        case "textarea":
          o = Tc(e, o), n = Tc(e, n), l = [];
          break;
        default:
          typeof o.onClick != "function" && typeof n.onClick == "function" && (e.onclick = Ua);
      }
      Fc(r, n);
      var i;
      r = null;
      for (u in o)
        if (!n.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
          if (u === "style") {
            var a = o[u];
            for (i in a)
              a.hasOwnProperty(i) && (r || (r = {}), r[i] = "");
          } else
            u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Hl.hasOwnProperty(u) ? l || (l = []) : (l = l || []).push(u, null));
      for (u in n) {
        var s = n[u];
        if (a = o?.[u], n.hasOwnProperty(u) && s !== a && (s != null || a != null))
          if (u === "style")
            if (a) {
              for (i in a)
                !a.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (r || (r = {}), r[i] = "");
              for (i in s)
                s.hasOwnProperty(i) && a[i] !== s[i] && (r || (r = {}), r[i] = s[i]);
            } else
              r || (l || (l = []), l.push(u, r)), r = s;
          else
            u === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, a = a ? a.__html : void 0, s != null && a !== s && (l = l || []).push(u, s)) : u === "children" ? typeof s != "string" && typeof s != "number" || (l = l || []).push(u, "" + s) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (Hl.hasOwnProperty(u) ? (s != null && u === "onScroll" && de("scroll", e), l || a === s || (l = [])) : (l = l || []).push(u, s));
      }
      r && (l = l || []).push("style", r);
      var u = l;
      (t.updateQueue = u) && (t.flags |= 4);
    }
  };
  og = function(e, t, r, n) {
    r !== n && (t.flags |= 4);
  };
  function Nl(e, t) {
    if (!ve)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var r = null; t !== null; )
            t.alternate !== null && (r = t), t = t.sibling;
          r === null ? e.tail = null : r.sibling = null;
          break;
        case "collapsed":
          r = e.tail;
          for (var n = null; r !== null; )
            r.alternate !== null && (n = r), r = r.sibling;
          n === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : n.sibling = null;
      }
  }
  function Je(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, r = 0, n = 0;
    if (t)
      for (var o = e.child; o !== null; )
        r |= o.lanes | o.childLanes, n |= o.subtreeFlags & 14680064, n |= o.flags & 14680064, o.return = e, o = o.sibling;
    else
      for (o = e.child; o !== null; )
        r |= o.lanes | o.childLanes, n |= o.subtreeFlags, n |= o.flags, o.return = e, o = o.sibling;
    return e.subtreeFlags |= n, e.childLanes = r, t;
  }
  function Cx(e, t, r) {
    var n = t.pendingProps;
    switch (Dd(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Je(t), null;
      case 1:
        return pt(t.type) && ja(), Je(t), null;
      case 3:
        return n = t.stateNode, Qo(), fe(ft), fe(Ze), Bd(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (va(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, tr !== null && (hd(tr), tr = null))), id(e, t), Je(t), null;
      case 5:
        jd(t);
        var o = Qn(ti.current);
        if (r = t.type, e !== null && t.stateNode != null)
          ng(e, t, r, n, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!n) {
            if (t.stateNode === null)
              throw Error(L(166));
            return Je(t), null;
          }
          if (e = Qn(hr.current), va(t)) {
            n = t.stateNode, r = t.type;
            var l = t.memoizedProps;
            switch (n[fr] = t, n[ql] = l, e = (t.mode & 1) !== 0, r) {
              case "dialog":
                de("cancel", n), de("close", n);
                break;
              case "iframe":
              case "object":
              case "embed":
                de("load", n);
                break;
              case "video":
              case "audio":
                for (o = 0; o < Fl.length; o++)
                  de(Fl[o], n);
                break;
              case "source":
                de("error", n);
                break;
              case "img":
              case "image":
              case "link":
                de("error", n), de("load", n);
                break;
              case "details":
                de("toggle", n);
                break;
              case "input":
                wh(n, l), de("invalid", n);
                break;
              case "select":
                n._wrapperState = { wasMultiple: !!l.multiple }, de("invalid", n);
                break;
              case "textarea":
                xh(n, l), de("invalid", n);
            }
            Fc(r, l), o = null;
            for (var i in l)
              if (l.hasOwnProperty(i)) {
                var a = l[i];
                i === "children" ? typeof a == "string" ? n.textContent !== a && (l.suppressHydrationWarning !== true && ma(n.textContent, a, e), o = ["children", a]) : typeof a == "number" && n.textContent !== "" + a && (l.suppressHydrationWarning !== true && ma(n.textContent, a, e), o = ["children", "" + a]) : Hl.hasOwnProperty(i) && a != null && i === "onScroll" && de("scroll", n);
              }
            switch (r) {
              case "input":
                na(n), Sh(n, l, true);
                break;
              case "textarea":
                na(n), Eh(n);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof l.onClick == "function" && (n.onclick = Ua);
            }
            n = o, t.updateQueue = n, n !== null && (t.flags |= 4);
          } else {
            i = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Tm(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof n.is == "string" ? e = i.createElement(r, { is: n.is }) : (e = i.createElement(r), r === "select" && (i = e, n.multiple ? i.multiple = true : n.size && (i.size = n.size))) : e = i.createElementNS(e, r), e[fr] = t, e[ql] = n, rg(e, t, false, false), t.stateNode = e;
            e: {
              switch (i = Mc(r, n), r) {
                case "dialog":
                  de("cancel", e), de("close", e), o = n;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  de("load", e), o = n;
                  break;
                case "video":
                case "audio":
                  for (o = 0; o < Fl.length; o++)
                    de(Fl[o], e);
                  o = n;
                  break;
                case "source":
                  de("error", e), o = n;
                  break;
                case "img":
                case "image":
                case "link":
                  de("error", e), de("load", e), o = n;
                  break;
                case "details":
                  de("toggle", e), o = n;
                  break;
                case "input":
                  wh(e, n), o = Pc(e, n), de("invalid", e);
                  break;
                case "option":
                  o = n;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!n.multiple }, o = Se({}, n, { value: void 0 }), de("invalid", e);
                  break;
                case "textarea":
                  xh(e, n), o = Tc(e, n), de("invalid", e);
                  break;
                default:
                  o = n;
              }
              Fc(r, o), a = o;
              for (l in a)
                if (a.hasOwnProperty(l)) {
                  var s = a[l];
                  l === "style" ? Mm(e, s) : l === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Dm(e, s)) : l === "children" ? typeof s == "string" ? (r !== "textarea" || s !== "") && $l(e, s) : typeof s == "number" && $l(e, "" + s) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (Hl.hasOwnProperty(l) ? s != null && l === "onScroll" && de("scroll", e) : s != null && gd(e, l, s, i));
                }
              switch (r) {
                case "input":
                  na(e), Sh(e, n, false);
                  break;
                case "textarea":
                  na(e), Eh(e);
                  break;
                case "option":
                  n.value != null && e.setAttribute("value", "" + dn(n.value));
                  break;
                case "select":
                  e.multiple = !!n.multiple, l = n.value, l != null ? Io(e, !!n.multiple, l, false) : n.defaultValue != null && Io(e, !!n.multiple, n.defaultValue, true);
                  break;
                default:
                  typeof o.onClick == "function" && (e.onclick = Ua);
              }
              switch (r) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  n = !!n.autoFocus;
                  break e;
                case "img":
                  n = true;
                  break e;
                default:
                  n = false;
              }
            }
            n && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return Je(t), null;
      case 6:
        if (e && t.stateNode != null)
          og(e, t, e.memoizedProps, n);
        else {
          if (typeof n != "string" && t.stateNode === null)
            throw Error(L(166));
          if (r = Qn(ti.current), Qn(hr.current), va(t)) {
            if (n = t.stateNode, r = t.memoizedProps, n[fr] = t, (l = n.nodeValue !== r) && (e = Et, e !== null))
              switch (e.tag) {
                case 3:
                  ma(n.nodeValue, r, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== true && ma(n.nodeValue, r, (e.mode & 1) !== 0);
              }
            l && (t.flags |= 4);
          } else
            n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n), n[fr] = t, t.stateNode = n;
        }
        return Je(t), null;
      case 13:
        if (fe(ye), n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (ve && xt !== null && t.mode & 1 && !(t.flags & 128))
            xv(), Wo(), t.flags |= 98560, l = false;
          else if (l = va(t), n !== null && n.dehydrated !== null) {
            if (e === null) {
              if (!l)
                throw Error(L(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l)
                throw Error(L(317));
              l[fr] = t;
            } else
              Wo(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
            Je(t), l = false;
          } else
            tr !== null && (hd(tr), tr = null), l = true;
          if (!l)
            return t.flags & 65536 ? t : null;
        }
        return t.flags & 128 ? (t.lanes = r, t) : (n = n !== null, n !== (e !== null && e.memoizedState !== null) && n && (t.child.flags |= 8192, t.mode & 1 && (e === null || ye.current & 1 ? Te === 0 && (Te = 3) : qd())), t.updateQueue !== null && (t.flags |= 4), Je(t), null);
      case 4:
        return Qo(), id(e, t), e === null && Xl(t.stateNode.containerInfo), Je(t), null;
      case 10:
        return zd(t.type._context), Je(t), null;
      case 17:
        return pt(t.type) && ja(), Je(t), null;
      case 19:
        if (fe(ye), l = t.memoizedState, l === null)
          return Je(t), null;
        if (n = (t.flags & 128) !== 0, i = l.rendering, i === null)
          if (n)
            Nl(l, false);
          else {
            if (Te !== 0 || e !== null && e.flags & 128)
              for (e = t.child; e !== null; ) {
                if (i = Qa(e), i !== null) {
                  for (t.flags |= 128, Nl(l, false), n = i.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), t.subtreeFlags = 0, n = r, r = t.child; r !== null; )
                    l = r, e = n, l.flags &= 14680066, i = l.alternate, i === null ? (l.childLanes = 0, l.lanes = e, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = i.childLanes, l.lanes = i.lanes, l.child = i.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = i.memoizedProps, l.memoizedState = i.memoizedState, l.updateQueue = i.updateQueue, l.type = i.type, e = i.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), r = r.sibling;
                  return se(ye, ye.current & 1 | 2), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && ke() > Go && (t.flags |= 128, n = true, Nl(l, false), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = Qa(i), e !== null) {
              if (t.flags |= 128, n = true, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), Nl(l, true), l.tail === null && l.tailMode === "hidden" && !i.alternate && !ve)
                return Je(t), null;
            } else
              2 * ke() - l.renderingStartTime > Go && r !== 1073741824 && (t.flags |= 128, n = true, Nl(l, false), t.lanes = 4194304);
          l.isBackwards ? (i.sibling = t.child, t.child = i) : (r = l.last, r !== null ? r.sibling = i : t.child = i, l.last = i);
        }
        return l.tail !== null ? (t = l.tail, l.rendering = t, l.tail = t.sibling, l.renderingStartTime = ke(), t.sibling = null, r = ye.current, se(ye, n ? r & 1 | 2 : r & 1), t) : (Je(t), null);
      case 22:
      case 23:
        return Zd(), n = t.memoizedState !== null, e !== null && e.memoizedState !== null !== n && (t.flags |= 8192), n && t.mode & 1 ? St & 1073741824 && (Je(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Je(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(L(156, t.tag));
  }
  function _x(e, t) {
    switch (Dd(t), t.tag) {
      case 1:
        return pt(t.type) && ja(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Qo(), fe(ft), fe(Ze), Bd(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return jd(t), null;
      case 13:
        if (fe(ye), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(L(340));
          Wo();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return fe(ye), null;
      case 4:
        return Qo(), null;
      case 10:
        return zd(t.type._context), null;
      case 22:
      case 23:
        return Zd(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var wa = false, Xe = false, Nx = typeof WeakSet == "function" ? WeakSet : Set, O = null;
  function Oo(e, t) {
    var r = e.ref;
    if (r !== null)
      if (typeof r == "function")
        try {
          r(null);
        } catch (n) {
          Re(e, t, n);
        }
      else
        r.current = null;
  }
  function ad(e, t, r) {
    try {
      r();
    } catch (n) {
      Re(e, t, n);
    }
  }
  var fm = false;
  function Px(e, t) {
    if ($c = za, e = sv(), Ld(e)) {
      if ("selectionStart" in e)
        var r = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          r = (r = e.ownerDocument) && r.defaultView || window;
          var n = r.getSelection && r.getSelection();
          if (n && n.rangeCount !== 0) {
            r = n.anchorNode;
            var o = n.anchorOffset, l = n.focusNode;
            n = n.focusOffset;
            try {
              r.nodeType, l.nodeType;
            } catch {
              r = null;
              break e;
            }
            var i = 0, a = -1, s = -1, u = 0, c = 0, d = e, p = null;
            t:
              for (; ; ) {
                for (var v; d !== r || o !== 0 && d.nodeType !== 3 || (a = i + o), d !== l || n !== 0 && d.nodeType !== 3 || (s = i + n), d.nodeType === 3 && (i += d.nodeValue.length), (v = d.firstChild) !== null; )
                  p = d, d = v;
                for (; ; ) {
                  if (d === e)
                    break t;
                  if (p === r && ++u === o && (a = i), p === l && ++c === n && (s = i), (v = d.nextSibling) !== null)
                    break;
                  d = p, p = d.parentNode;
                }
                d = v;
              }
            r = a === -1 || s === -1 ? null : { start: a, end: s };
          } else
            r = null;
        }
      r = r || { start: 0, end: 0 };
    } else
      r = null;
    for (Wc = { focusedElem: e, selectionRange: r }, za = false, O = t; O !== null; )
      if (t = O, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, O = e;
      else
        for (; O !== null; ) {
          t = O;
          try {
            var g = t.alternate;
            if (t.flags & 1024)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (g !== null) {
                    var y = g.memoizedProps, x = g.memoizedState, f = t.stateNode, h = f.getSnapshotBeforeUpdate(t.elementType === t.type ? y : qt(t.type, y), x);
                    f.__reactInternalSnapshotBeforeUpdate = h;
                  }
                  break;
                case 3:
                  var m = t.stateNode.containerInfo;
                  m.nodeType === 1 ? m.textContent = "" : m.nodeType === 9 && m.documentElement && m.removeChild(m.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(L(163));
              }
          } catch (E) {
            Re(t, t.return, E);
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, O = e;
            break;
          }
          O = t.return;
        }
    return g = fm, fm = false, g;
  }
  function jl(e, t, r) {
    var n = t.updateQueue;
    if (n = n !== null ? n.lastEffect : null, n !== null) {
      var o = n = n.next;
      do {
        if ((o.tag & e) === e) {
          var l = o.destroy;
          o.destroy = void 0, l !== void 0 && ad(t, r, l);
        }
        o = o.next;
      } while (o !== n);
    }
  }
  function us(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var r = t = t.next;
      do {
        if ((r.tag & e) === e) {
          var n = r.create;
          r.destroy = n();
        }
        r = r.next;
      } while (r !== t);
    }
  }
  function sd(e) {
    var t = e.ref;
    if (t !== null) {
      var r = e.stateNode;
      switch (e.tag) {
        case 5:
          e = r;
          break;
        default:
          e = r;
      }
      typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function lg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, lg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[fr], delete t[ql], delete t[Yc], delete t[cx], delete t[dx])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function ig(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function pm(e) {
    e:
      for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || ig(e.return))
            return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.flags & 2 || e.child === null || e.tag === 4)
            continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2))
          return e.stateNode;
      }
  }
  function ud(e, t, r) {
    var n = e.tag;
    if (n === 5 || n === 6)
      e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = Ua));
    else if (n !== 4 && (e = e.child, e !== null))
      for (ud(e, t, r), e = e.sibling; e !== null; )
        ud(e, t, r), e = e.sibling;
  }
  function cd(e, t, r) {
    var n = e.tag;
    if (n === 5 || n === 6)
      e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
    else if (n !== 4 && (e = e.child, e !== null))
      for (cd(e, t, r), e = e.sibling; e !== null; )
        cd(e, t, r), e = e.sibling;
  }
  var Be = null, er = false;
  function Gr(e, t, r) {
    for (r = r.child; r !== null; )
      ag(e, t, r), r = r.sibling;
  }
  function ag(e, t, r) {
    if (pr && typeof pr.onCommitFiberUnmount == "function")
      try {
        pr.onCommitFiberUnmount(ts, r);
      } catch {
      }
    switch (r.tag) {
      case 5:
        Xe || Oo(r, t);
      case 6:
        var n = Be, o = er;
        Be = null, Gr(e, t, r), Be = n, er = o, Be !== null && (er ? (e = Be, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : Be.removeChild(r.stateNode));
        break;
      case 18:
        Be !== null && (er ? (e = Be, r = r.stateNode, e.nodeType === 8 ? pc(e.parentNode, r) : e.nodeType === 1 && pc(e, r), Yl(e)) : pc(Be, r.stateNode));
        break;
      case 4:
        n = Be, o = er, Be = r.stateNode.containerInfo, er = true, Gr(e, t, r), Be = n, er = o;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Xe && (n = r.updateQueue, n !== null && (n = n.lastEffect, n !== null))) {
          o = n = n.next;
          do {
            var l = o, i = l.destroy;
            l = l.tag, i !== void 0 && (l & 2 || l & 4) && ad(r, t, i), o = o.next;
          } while (o !== n);
        }
        Gr(e, t, r);
        break;
      case 1:
        if (!Xe && (Oo(r, t), n = r.stateNode, typeof n.componentWillUnmount == "function"))
          try {
            n.props = r.memoizedProps, n.state = r.memoizedState, n.componentWillUnmount();
          } catch (a) {
            Re(r, t, a);
          }
        Gr(e, t, r);
        break;
      case 21:
        Gr(e, t, r);
        break;
      case 22:
        r.mode & 1 ? (Xe = (n = Xe) || r.memoizedState !== null, Gr(e, t, r), Xe = n) : Gr(e, t, r);
        break;
      default:
        Gr(e, t, r);
    }
  }
  function hm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var r = e.stateNode;
      r === null && (r = e.stateNode = new Nx()), t.forEach(function(n) {
        var o = Ix.bind(null, e, n);
        r.has(n) || (r.add(n), n.then(o, o));
      });
    }
  }
  function Zt(e, t) {
    var r = t.deletions;
    if (r !== null)
      for (var n = 0; n < r.length; n++) {
        var o = r[n];
        try {
          var l = e, i = t, a = i;
          e:
            for (; a !== null; ) {
              switch (a.tag) {
                case 5:
                  Be = a.stateNode, er = false;
                  break e;
                case 3:
                  Be = a.stateNode.containerInfo, er = true;
                  break e;
                case 4:
                  Be = a.stateNode.containerInfo, er = true;
                  break e;
              }
              a = a.return;
            }
          if (Be === null)
            throw Error(L(160));
          ag(l, i, o), Be = null, er = false;
          var s = o.alternate;
          s !== null && (s.return = null), o.return = null;
        } catch (u) {
          Re(o, t, u);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; )
        sg(t, e), t = t.sibling;
  }
  function sg(e, t) {
    var r = e.alternate, n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Zt(t, e), cr(e), n & 4) {
          try {
            jl(3, e, e.return), us(3, e);
          } catch (y) {
            Re(e, e.return, y);
          }
          try {
            jl(5, e, e.return);
          } catch (y) {
            Re(e, e.return, y);
          }
        }
        break;
      case 1:
        Zt(t, e), cr(e), n & 512 && r !== null && Oo(r, r.return);
        break;
      case 5:
        if (Zt(t, e), cr(e), n & 512 && r !== null && Oo(r, r.return), e.flags & 32) {
          var o = e.stateNode;
          try {
            $l(o, "");
          } catch (y) {
            Re(e, e.return, y);
          }
        }
        if (n & 4 && (o = e.stateNode, o != null)) {
          var l = e.memoizedProps, i = r !== null ? r.memoizedProps : l, a = e.type, s = e.updateQueue;
          if (e.updateQueue = null, s !== null)
            try {
              a === "input" && l.type === "radio" && l.name != null && bm(o, l), Mc(a, i);
              var u = Mc(a, l);
              for (i = 0; i < s.length; i += 2) {
                var c = s[i], d = s[i + 1];
                c === "style" ? Mm(o, d) : c === "dangerouslySetInnerHTML" ? Dm(o, d) : c === "children" ? $l(o, d) : gd(o, c, d, u);
              }
              switch (a) {
                case "input":
                  bc(o, l);
                  break;
                case "textarea":
                  Lm(o, l);
                  break;
                case "select":
                  var p = o._wrapperState.wasMultiple;
                  o._wrapperState.wasMultiple = !!l.multiple;
                  var v = l.value;
                  v != null ? Io(o, !!l.multiple, v, false) : p !== !!l.multiple && (l.defaultValue != null ? Io(o, !!l.multiple, l.defaultValue, true) : Io(o, !!l.multiple, l.multiple ? [] : "", false));
              }
              o[ql] = l;
            } catch (y) {
              Re(e, e.return, y);
            }
        }
        break;
      case 6:
        if (Zt(t, e), cr(e), n & 4) {
          if (e.stateNode === null)
            throw Error(L(162));
          o = e.stateNode, l = e.memoizedProps;
          try {
            o.nodeValue = l;
          } catch (y) {
            Re(e, e.return, y);
          }
        }
        break;
      case 3:
        if (Zt(t, e), cr(e), n & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Yl(t.containerInfo);
          } catch (y) {
            Re(e, e.return, y);
          }
        break;
      case 4:
        Zt(t, e), cr(e);
        break;
      case 13:
        Zt(t, e), cr(e), o = e.child, o.flags & 8192 && (l = o.memoizedState !== null, o.stateNode.isHidden = l, !l || o.alternate !== null && o.alternate.memoizedState !== null || (Jd = ke())), n & 4 && hm(e);
        break;
      case 22:
        if (c = r !== null && r.memoizedState !== null, e.mode & 1 ? (Xe = (u = Xe) || c, Zt(t, e), Xe = u) : Zt(t, e), cr(e), n & 8192) {
          if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !c && e.mode & 1)
            for (O = e, c = e.child; c !== null; ) {
              for (d = O = c; O !== null; ) {
                switch (p = O, v = p.child, p.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    jl(4, p, p.return);
                    break;
                  case 1:
                    Oo(p, p.return);
                    var g = p.stateNode;
                    if (typeof g.componentWillUnmount == "function") {
                      n = p, r = p.return;
                      try {
                        t = n, g.props = t.memoizedProps, g.state = t.memoizedState, g.componentWillUnmount();
                      } catch (y) {
                        Re(n, r, y);
                      }
                    }
                    break;
                  case 5:
                    Oo(p, p.return);
                    break;
                  case 22:
                    if (p.memoizedState !== null) {
                      vm(d);
                      continue;
                    }
                }
                v !== null ? (v.return = p, O = v) : vm(d);
              }
              c = c.sibling;
            }
          e:
            for (c = null, d = e; ; ) {
              if (d.tag === 5) {
                if (c === null) {
                  c = d;
                  try {
                    o = d.stateNode, u ? (l = o.style, typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none") : (a = d.stateNode, s = d.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, a.style.display = Fm("display", i));
                  } catch (y) {
                    Re(e, e.return, y);
                  }
                }
              } else if (d.tag === 6) {
                if (c === null)
                  try {
                    d.stateNode.nodeValue = u ? "" : d.memoizedProps;
                  } catch (y) {
                    Re(e, e.return, y);
                  }
              } else if ((d.tag !== 22 && d.tag !== 23 || d.memoizedState === null || d === e) && d.child !== null) {
                d.child.return = d, d = d.child;
                continue;
              }
              if (d === e)
                break e;
              for (; d.sibling === null; ) {
                if (d.return === null || d.return === e)
                  break e;
                c === d && (c = null), d = d.return;
              }
              c === d && (c = null), d.sibling.return = d.return, d = d.sibling;
            }
        }
        break;
      case 19:
        Zt(t, e), cr(e), n & 4 && hm(e);
        break;
      case 21:
        break;
      default:
        Zt(t, e), cr(e);
    }
  }
  function cr(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var r = e.return; r !== null; ) {
            if (ig(r)) {
              var n = r;
              break e;
            }
            r = r.return;
          }
          throw Error(L(160));
        }
        switch (n.tag) {
          case 5:
            var o = n.stateNode;
            n.flags & 32 && ($l(o, ""), n.flags &= -33);
            var l = pm(e);
            cd(e, l, o);
            break;
          case 3:
          case 4:
            var i = n.stateNode.containerInfo, a = pm(e);
            ud(e, a, i);
            break;
          default:
            throw Error(L(161));
        }
      } catch (s) {
        Re(e, e.return, s);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function bx(e, t, r) {
    O = e, ug(e, t, r);
  }
  function ug(e, t, r) {
    for (var n = (e.mode & 1) !== 0; O !== null; ) {
      var o = O, l = o.child;
      if (o.tag === 22 && n) {
        var i = o.memoizedState !== null || wa;
        if (!i) {
          var a = o.alternate, s = a !== null && a.memoizedState !== null || Xe;
          a = wa;
          var u = Xe;
          if (wa = i, (Xe = s) && !u)
            for (O = o; O !== null; )
              i = O, s = i.child, i.tag === 22 && i.memoizedState !== null ? gm(o) : s !== null ? (s.return = i, O = s) : gm(o);
          for (; l !== null; )
            O = l, ug(l, t, r), l = l.sibling;
          O = o, wa = a, Xe = u;
        }
        mm(e, t, r);
      } else
        o.subtreeFlags & 8772 && l !== null ? (l.return = o, O = l) : mm(e, t, r);
    }
  }
  function mm(e) {
    for (; O !== null; ) {
      var t = O;
      if (t.flags & 8772) {
        var r = t.alternate;
        try {
          if (t.flags & 8772)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Xe || us(5, t);
                break;
              case 1:
                var n = t.stateNode;
                if (t.flags & 4 && !Xe)
                  if (r === null)
                    n.componentDidMount();
                  else {
                    var o = t.elementType === t.type ? r.memoizedProps : qt(t.type, r.memoizedProps);
                    n.componentDidUpdate(o, r.memoizedState, n.__reactInternalSnapshotBeforeUpdate);
                  }
                var l = t.updateQueue;
                l !== null && Zh(t, l, n);
                break;
              case 3:
                var i = t.updateQueue;
                if (i !== null) {
                  if (r = null, t.child !== null)
                    switch (t.child.tag) {
                      case 5:
                        r = t.child.stateNode;
                        break;
                      case 1:
                        r = t.child.stateNode;
                    }
                  Zh(t, i, r);
                }
                break;
              case 5:
                var a = t.stateNode;
                if (r === null && t.flags & 4) {
                  r = a;
                  var s = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      s.autoFocus && r.focus();
                      break;
                    case "img":
                      s.src && (r.src = s.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var u = t.alternate;
                  if (u !== null) {
                    var c = u.memoizedState;
                    if (c !== null) {
                      var d = c.dehydrated;
                      d !== null && Yl(d);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(L(163));
            }
          Xe || t.flags & 512 && sd(t);
        } catch (p) {
          Re(t, t.return, p);
        }
      }
      if (t === e) {
        O = null;
        break;
      }
      if (r = t.sibling, r !== null) {
        r.return = t.return, O = r;
        break;
      }
      O = t.return;
    }
  }
  function vm(e) {
    for (; O !== null; ) {
      var t = O;
      if (t === e) {
        O = null;
        break;
      }
      var r = t.sibling;
      if (r !== null) {
        r.return = t.return, O = r;
        break;
      }
      O = t.return;
    }
  }
  function gm(e) {
    for (; O !== null; ) {
      var t = O;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var r = t.return;
            try {
              us(4, t);
            } catch (s) {
              Re(t, r, s);
            }
            break;
          case 1:
            var n = t.stateNode;
            if (typeof n.componentDidMount == "function") {
              var o = t.return;
              try {
                n.componentDidMount();
              } catch (s) {
                Re(t, o, s);
              }
            }
            var l = t.return;
            try {
              sd(t);
            } catch (s) {
              Re(t, l, s);
            }
            break;
          case 5:
            var i = t.return;
            try {
              sd(t);
            } catch (s) {
              Re(t, i, s);
            }
        }
      } catch (s) {
        Re(t, t.return, s);
      }
      if (t === e) {
        O = null;
        break;
      }
      var a = t.sibling;
      if (a !== null) {
        a.return = t.return, O = a;
        break;
      }
      O = t.return;
    }
  }
  var Lx = Math.ceil, Ja = Mr.ReactCurrentDispatcher, Yd = Mr.ReactCurrentOwner, jt = Mr.ReactCurrentBatchConfig, q = 0, Ie = null, Pe = null, Ve = 0, St = 0, zo = hn(0), Te = 0, li = null, qn = 0, cs = 0, Gd = 0, Bl = null, ct = null, Jd = 0, Go = 1 / 0, Cr = null, Xa = false, dd = null, sn = null, Sa = false, tn = null, Za = 0, Vl = 0, fd = null, Pa = -1, ba = 0;
  function lt() {
    return q & 6 ? ke() : Pa !== -1 ? Pa : Pa = ke();
  }
  function un(e) {
    return e.mode & 1 ? q & 2 && Ve !== 0 ? Ve & -Ve : px.transition !== null ? (ba === 0 && (ba = Km()), ba) : (e = re, e !== 0 || (e = window.event, e = e === void 0 ? 16 : qm(e.type)), e) : 1;
  }
  function nr(e, t, r, n) {
    if (50 < Vl)
      throw Vl = 0, fd = null, Error(L(185));
    ii(e, r, n), (!(q & 2) || e !== Ie) && (e === Ie && (!(q & 2) && (cs |= r), Te === 4 && qr(e, Ve)), ht(e, n), r === 1 && q === 0 && !(t.mode & 1) && (Go = ke() + 500, is && mn()));
  }
  function ht(e, t) {
    var r = e.callbackNode;
    mS(e, t);
    var n = Oa(e, e === Ie ? Ve : 0);
    if (n === 0)
      r !== null && Ch(r), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = n & -n, e.callbackPriority !== t) {
      if (r != null && Ch(r), t === 1)
        e.tag === 0 ? fx(ym.bind(null, e)) : yv(ym.bind(null, e)), sx(function() {
          !(q & 6) && mn();
        }), r = null;
      else {
        switch (Qm(n)) {
          case 1:
            r = Ed;
            break;
          case 4:
            r = $m;
            break;
          case 16:
            r = Ma;
            break;
          case 536870912:
            r = Wm;
            break;
          default:
            r = Ma;
        }
        r = gg(r, cg.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = r;
    }
  }
  function cg(e, t) {
    if (Pa = -1, ba = 0, q & 6)
      throw Error(L(327));
    var r = e.callbackNode;
    if (Vo() && e.callbackNode !== r)
      return null;
    var n = Oa(e, e === Ie ? Ve : 0);
    if (n === 0)
      return null;
    if (n & 30 || n & e.expiredLanes || t)
      t = qa(e, n);
    else {
      t = n;
      var o = q;
      q |= 2;
      var l = fg();
      (Ie !== e || Ve !== t) && (Cr = null, Go = ke() + 500, Yn(e, t));
      do
        try {
          Fx();
          break;
        } catch (a) {
          dg(e, a);
        }
      while (1);
      Od(), Ja.current = l, q = o, Pe !== null ? t = 0 : (Ie = null, Ve = 0, t = Te);
    }
    if (t !== 0) {
      if (t === 2 && (o = Uc(e), o !== 0 && (n = o, t = pd(e, o))), t === 1)
        throw r = li, Yn(e, 0), qr(e, n), ht(e, ke()), r;
      if (t === 6)
        qr(e, n);
      else {
        if (o = e.current.alternate, !(n & 30) && !Tx(o) && (t = qa(e, n), t === 2 && (l = Uc(e), l !== 0 && (n = l, t = pd(e, l))), t === 1))
          throw r = li, Yn(e, 0), qr(e, n), ht(e, ke()), r;
        switch (e.finishedWork = o, e.finishedLanes = n, t) {
          case 0:
          case 1:
            throw Error(L(345));
          case 2:
            $n(e, ct, Cr);
            break;
          case 3:
            if (qr(e, n), (n & 130023424) === n && (t = Jd + 500 - ke(), 10 < t)) {
              if (Oa(e, 0) !== 0)
                break;
              if (o = e.suspendedLanes, (o & n) !== n) {
                lt(), e.pingedLanes |= e.suspendedLanes & o;
                break;
              }
              e.timeoutHandle = Qc($n.bind(null, e, ct, Cr), t);
              break;
            }
            $n(e, ct, Cr);
            break;
          case 4:
            if (qr(e, n), (n & 4194240) === n)
              break;
            for (t = e.eventTimes, o = -1; 0 < n; ) {
              var i = 31 - rr(n);
              l = 1 << i, i = t[i], i > o && (o = i), n &= ~l;
            }
            if (n = o, n = ke() - n, n = (120 > n ? 120 : 480 > n ? 480 : 1080 > n ? 1080 : 1920 > n ? 1920 : 3e3 > n ? 3e3 : 4320 > n ? 4320 : 1960 * Lx(n / 1960)) - n, 10 < n) {
              e.timeoutHandle = Qc($n.bind(null, e, ct, Cr), n);
              break;
            }
            $n(e, ct, Cr);
            break;
          case 5:
            $n(e, ct, Cr);
            break;
          default:
            throw Error(L(329));
        }
      }
    }
    return ht(e, ke()), e.callbackNode === r ? cg.bind(null, e) : null;
  }
  function pd(e, t) {
    var r = Bl;
    return e.current.memoizedState.isDehydrated && (Yn(e, t).flags |= 256), e = qa(e, t), e !== 2 && (t = ct, ct = r, t !== null && hd(t)), e;
  }
  function hd(e) {
    ct === null ? ct = e : ct.push.apply(ct, e);
  }
  function Tx(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var r = t.updateQueue;
        if (r !== null && (r = r.stores, r !== null))
          for (var n = 0; n < r.length; n++) {
            var o = r[n], l = o.getSnapshot;
            o = o.value;
            try {
              if (!or(l(), o))
                return false;
            } catch {
              return false;
            }
          }
      }
      if (r = t.child, t.subtreeFlags & 16384 && r !== null)
        r.return = t, t = r;
      else {
        if (t === e)
          break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return true;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return true;
  }
  function qr(e, t) {
    for (t &= ~Gd, t &= ~cs, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var r = 31 - rr(t), n = 1 << r;
      e[r] = -1, t &= ~n;
    }
  }
  function ym(e) {
    if (q & 6)
      throw Error(L(327));
    Vo();
    var t = Oa(e, 0);
    if (!(t & 1))
      return ht(e, ke()), null;
    var r = qa(e, t);
    if (e.tag !== 0 && r === 2) {
      var n = Uc(e);
      n !== 0 && (t = n, r = pd(e, n));
    }
    if (r === 1)
      throw r = li, Yn(e, 0), qr(e, t), ht(e, ke()), r;
    if (r === 6)
      throw Error(L(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, $n(e, ct, Cr), ht(e, ke()), null;
  }
  function Xd(e, t) {
    var r = q;
    q |= 1;
    try {
      return e(t);
    } finally {
      q = r, q === 0 && (Go = ke() + 500, is && mn());
    }
  }
  function eo(e) {
    tn !== null && tn.tag === 0 && !(q & 6) && Vo();
    var t = q;
    q |= 1;
    var r = jt.transition, n = re;
    try {
      if (jt.transition = null, re = 1, e)
        return e();
    } finally {
      re = n, jt.transition = r, q = t, !(q & 6) && mn();
    }
  }
  function Zd() {
    St = zo.current, fe(zo);
  }
  function Yn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var r = e.timeoutHandle;
    if (r !== -1 && (e.timeoutHandle = -1, ax(r)), Pe !== null)
      for (r = Pe.return; r !== null; ) {
        var n = r;
        switch (Dd(n), n.tag) {
          case 1:
            n = n.type.childContextTypes, n != null && ja();
            break;
          case 3:
            Qo(), fe(ft), fe(Ze), Bd();
            break;
          case 5:
            jd(n);
            break;
          case 4:
            Qo();
            break;
          case 13:
            fe(ye);
            break;
          case 19:
            fe(ye);
            break;
          case 10:
            zd(n.type._context);
            break;
          case 22:
          case 23:
            Zd();
        }
        r = r.return;
      }
    if (Ie = e, Pe = e = cn(e.current, null), Ve = St = t, Te = 0, li = null, Gd = cs = qn = 0, ct = Bl = null, Kn !== null) {
      for (t = 0; t < Kn.length; t++)
        if (r = Kn[t], n = r.interleaved, n !== null) {
          r.interleaved = null;
          var o = n.next, l = r.pending;
          if (l !== null) {
            var i = l.next;
            l.next = o, n.next = i;
          }
          r.pending = n;
        }
      Kn = null;
    }
    return e;
  }
  function dg(e, t) {
    do {
      var r = Pe;
      try {
        if (Od(), Ca.current = Ga, Ya) {
          for (var n = we.memoizedState; n !== null; ) {
            var o = n.queue;
            o !== null && (o.pending = null), n = n.next;
          }
          Ya = false;
        }
        if (Zn = 0, ze = Le = we = null, Ul = false, ri = 0, Yd.current = null, r === null || r.return === null) {
          Te = 1, li = t, Pe = null;
          break;
        }
        e: {
          var l = e, i = r.return, a = r, s = t;
          if (t = Ve, a.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
            var u = s, c = a, d = c.tag;
            if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
              var p = c.alternate;
              p ? (c.updateQueue = p.updateQueue, c.memoizedState = p.memoizedState, c.lanes = p.lanes) : (c.updateQueue = null, c.memoizedState = null);
            }
            var v = lm(i);
            if (v !== null) {
              v.flags &= -257, im(v, i, a, l, t), v.mode & 1 && om(l, u, t), t = v, s = u;
              var g = t.updateQueue;
              if (g === null) {
                var y = /* @__PURE__ */ new Set();
                y.add(s), t.updateQueue = y;
              } else
                g.add(s);
              break e;
            } else {
              if (!(t & 1)) {
                om(l, u, t), qd();
                break e;
              }
              s = Error(L(426));
            }
          } else if (ve && a.mode & 1) {
            var x = lm(i);
            if (x !== null) {
              !(x.flags & 65536) && (x.flags |= 256), im(x, i, a, l, t), Fd(Yo(s, a));
              break e;
            }
          }
          l = s = Yo(s, a), Te !== 4 && (Te = 2), Bl === null ? Bl = [l] : Bl.push(l), l = i;
          do {
            switch (l.tag) {
              case 3:
                l.flags |= 65536, t &= -t, l.lanes |= t;
                var f = Yv(l, s, t);
                Xh(l, f);
                break e;
              case 1:
                a = s;
                var h = l.type, m = l.stateNode;
                if (!(l.flags & 128) && (typeof h.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (sn === null || !sn.has(m)))) {
                  l.flags |= 65536, t &= -t, l.lanes |= t;
                  var E = Gv(l, a, t);
                  Xh(l, E);
                  break e;
                }
            }
            l = l.return;
          } while (l !== null);
        }
        hg(r);
      } catch (k) {
        t = k, Pe === r && r !== null && (Pe = r = r.return);
        continue;
      }
      break;
    } while (1);
  }
  function fg() {
    var e = Ja.current;
    return Ja.current = Ga, e === null ? Ga : e;
  }
  function qd() {
    (Te === 0 || Te === 3 || Te === 2) && (Te = 4), Ie === null || !(qn & 268435455) && !(cs & 268435455) || qr(Ie, Ve);
  }
  function qa(e, t) {
    var r = q;
    q |= 2;
    var n = fg();
    (Ie !== e || Ve !== t) && (Cr = null, Yn(e, t));
    do
      try {
        Dx();
        break;
      } catch (o) {
        dg(e, o);
      }
    while (1);
    if (Od(), q = r, Ja.current = n, Pe !== null)
      throw Error(L(261));
    return Ie = null, Ve = 0, Te;
  }
  function Dx() {
    for (; Pe !== null; )
      pg(Pe);
  }
  function Fx() {
    for (; Pe !== null && !iS(); )
      pg(Pe);
  }
  function pg(e) {
    var t = vg(e.alternate, e, St);
    e.memoizedProps = e.pendingProps, t === null ? hg(e) : Pe = t, Yd.current = null;
  }
  function hg(e) {
    var t = e;
    do {
      var r = t.alternate;
      if (e = t.return, t.flags & 32768) {
        if (r = _x(r, t), r !== null) {
          r.flags &= 32767, Pe = r;
          return;
        }
        if (e !== null)
          e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Te = 6, Pe = null;
          return;
        }
      } else if (r = Cx(r, t, St), r !== null) {
        Pe = r;
        return;
      }
      if (t = t.sibling, t !== null) {
        Pe = t;
        return;
      }
      Pe = t = e;
    } while (t !== null);
    Te === 0 && (Te = 5);
  }
  function $n(e, t, r) {
    var n = re, o = jt.transition;
    try {
      jt.transition = null, re = 1, Mx(e, t, r, n);
    } finally {
      jt.transition = o, re = n;
    }
    return null;
  }
  function Mx(e, t, r, n) {
    do
      Vo();
    while (tn !== null);
    if (q & 6)
      throw Error(L(327));
    r = e.finishedWork;
    var o = e.finishedLanes;
    if (r === null)
      return null;
    if (e.finishedWork = null, e.finishedLanes = 0, r === e.current)
      throw Error(L(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var l = r.lanes | r.childLanes;
    if (vS(e, l), e === Ie && (Pe = Ie = null, Ve = 0), !(r.subtreeFlags & 2064) && !(r.flags & 2064) || Sa || (Sa = true, gg(Ma, function() {
      return Vo(), null;
    })), l = (r.flags & 15990) !== 0, r.subtreeFlags & 15990 || l) {
      l = jt.transition, jt.transition = null;
      var i = re;
      re = 1;
      var a = q;
      q |= 4, Yd.current = null, Px(e, r), sg(r, e), rx(Wc), za = !!$c, Wc = $c = null, e.current = r, bx(r, e, o), aS(), q = a, re = i, jt.transition = l;
    } else
      e.current = r;
    if (Sa && (Sa = false, tn = e, Za = o), l = e.pendingLanes, l === 0 && (sn = null), cS(r.stateNode, n), ht(e, ke()), t !== null)
      for (n = e.onRecoverableError, r = 0; r < t.length; r++)
        o = t[r], n(o.value, { componentStack: o.stack, digest: o.digest });
    if (Xa)
      throw Xa = false, e = dd, dd = null, e;
    return Za & 1 && e.tag !== 0 && Vo(), l = e.pendingLanes, l & 1 ? e === fd ? Vl++ : (Vl = 0, fd = e) : Vl = 0, mn(), null;
  }
  function Vo() {
    if (tn !== null) {
      var e = Qm(Za), t = jt.transition, r = re;
      try {
        if (jt.transition = null, re = 16 > e ? 16 : e, tn === null)
          var n = false;
        else {
          if (e = tn, tn = null, Za = 0, q & 6)
            throw Error(L(331));
          var o = q;
          for (q |= 4, O = e.current; O !== null; ) {
            var l = O, i = l.child;
            if (O.flags & 16) {
              var a = l.deletions;
              if (a !== null) {
                for (var s = 0; s < a.length; s++) {
                  var u = a[s];
                  for (O = u; O !== null; ) {
                    var c = O;
                    switch (c.tag) {
                      case 0:
                      case 11:
                      case 15:
                        jl(8, c, l);
                    }
                    var d = c.child;
                    if (d !== null)
                      d.return = c, O = d;
                    else
                      for (; O !== null; ) {
                        c = O;
                        var p = c.sibling, v = c.return;
                        if (lg(c), c === u) {
                          O = null;
                          break;
                        }
                        if (p !== null) {
                          p.return = v, O = p;
                          break;
                        }
                        O = v;
                      }
                  }
                }
                var g = l.alternate;
                if (g !== null) {
                  var y = g.child;
                  if (y !== null) {
                    g.child = null;
                    do {
                      var x = y.sibling;
                      y.sibling = null, y = x;
                    } while (y !== null);
                  }
                }
                O = l;
              }
            }
            if (l.subtreeFlags & 2064 && i !== null)
              i.return = l, O = i;
            else
              e:
                for (; O !== null; ) {
                  if (l = O, l.flags & 2048)
                    switch (l.tag) {
                      case 0:
                      case 11:
                      case 15:
                        jl(9, l, l.return);
                    }
                  var f = l.sibling;
                  if (f !== null) {
                    f.return = l.return, O = f;
                    break e;
                  }
                  O = l.return;
                }
          }
          var h = e.current;
          for (O = h; O !== null; ) {
            i = O;
            var m = i.child;
            if (i.subtreeFlags & 2064 && m !== null)
              m.return = i, O = m;
            else
              e:
                for (i = h; O !== null; ) {
                  if (a = O, a.flags & 2048)
                    try {
                      switch (a.tag) {
                        case 0:
                        case 11:
                        case 15:
                          us(9, a);
                      }
                    } catch (k) {
                      Re(a, a.return, k);
                    }
                  if (a === i) {
                    O = null;
                    break e;
                  }
                  var E = a.sibling;
                  if (E !== null) {
                    E.return = a.return, O = E;
                    break e;
                  }
                  O = a.return;
                }
          }
          if (q = o, mn(), pr && typeof pr.onPostCommitFiberRoot == "function")
            try {
              pr.onPostCommitFiberRoot(ts, e);
            } catch {
            }
          n = true;
        }
        return n;
      } finally {
        re = r, jt.transition = t;
      }
    }
    return false;
  }
  function wm(e, t, r) {
    t = Yo(r, t), t = Yv(e, t, 1), e = an(e, t, 1), t = lt(), e !== null && (ii(e, 1, t), ht(e, t));
  }
  function Re(e, t, r) {
    if (e.tag === 3)
      wm(e, e, r);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          wm(t, e, r);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (sn === null || !sn.has(n))) {
            e = Yo(r, e), e = Gv(t, e, 1), t = an(t, e, 1), e = lt(), t !== null && (ii(t, 1, e), ht(t, e));
            break;
          }
        }
        t = t.return;
      }
  }
  function Ox(e, t, r) {
    var n = e.pingCache;
    n !== null && n.delete(t), t = lt(), e.pingedLanes |= e.suspendedLanes & r, Ie === e && (Ve & r) === r && (Te === 4 || Te === 3 && (Ve & 130023424) === Ve && 500 > ke() - Jd ? Yn(e, 0) : Gd |= r), ht(e, t);
  }
  function mg(e, t) {
    t === 0 && (e.mode & 1 ? (t = ia, ia <<= 1, !(ia & 130023424) && (ia = 4194304)) : t = 1);
    var r = lt();
    e = Dr(e, t), e !== null && (ii(e, t, r), ht(e, r));
  }
  function zx(e) {
    var t = e.memoizedState, r = 0;
    t !== null && (r = t.retryLane), mg(e, r);
  }
  function Ix(e, t) {
    var r = 0;
    switch (e.tag) {
      case 13:
        var n = e.stateNode, o = e.memoizedState;
        o !== null && (r = o.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      default:
        throw Error(L(314));
    }
    n !== null && n.delete(t), mg(e, r);
  }
  var vg;
  vg = function(e, t, r) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || ft.current)
        dt = true;
      else {
        if (!(e.lanes & r) && !(t.flags & 128))
          return dt = false, kx(e, t, r);
        dt = !!(e.flags & 131072);
      }
    else
      dt = false, ve && t.flags & 1048576 && wv(t, Ha, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var n = t.type;
        Na(e, t), e = t.pendingProps;
        var o = $o(t, Ze.current);
        Bo(t, r), o = Hd(null, t, n, e, o, r);
        var l = $d();
        return t.flags |= 1, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, pt(n) ? (l = true, Ba(t)) : l = false, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Ad(t), o.updater = as, t.stateNode = o, o._reactInternals = t, ed(t, n, e, r), t = nd(null, t, n, true, l, r)) : (t.tag = 0, ve && l && Td(t), ot(null, t, o, r), t = t.child), t;
      case 16:
        n = t.elementType;
        e: {
          switch (Na(e, t), e = t.pendingProps, o = n._init, n = o(n._payload), t.type = n, o = t.tag = Ux(n), e = qt(n, e), o) {
            case 0:
              t = rd(null, t, n, e, r);
              break e;
            case 1:
              t = um(null, t, n, e, r);
              break e;
            case 11:
              t = am(null, t, n, e, r);
              break e;
            case 14:
              t = sm(null, t, n, qt(n.type, e), r);
              break e;
          }
          throw Error(L(306, n, ""));
        }
        return t;
      case 0:
        return n = t.type, o = t.pendingProps, o = t.elementType === n ? o : qt(n, o), rd(e, t, n, o, r);
      case 1:
        return n = t.type, o = t.pendingProps, o = t.elementType === n ? o : qt(n, o), um(e, t, n, o, r);
      case 3:
        e: {
          if (qv(t), e === null)
            throw Error(L(387));
          n = t.pendingProps, l = t.memoizedState, o = l.element, Rv(e, t), Ka(t, n, null, r);
          var i = t.memoizedState;
          if (n = i.element, l.isDehydrated)
            if (l = { element: n, isDehydrated: false, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = l, t.memoizedState = l, t.flags & 256) {
              o = Yo(Error(L(423)), t), t = cm(e, t, n, r, o);
              break e;
            } else if (n !== o) {
              o = Yo(Error(L(424)), t), t = cm(e, t, n, r, o);
              break e;
            } else
              for (xt = ln(t.stateNode.containerInfo.firstChild), Et = t, ve = true, tr = null, r = Nv(t, null, n, r), t.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
          else {
            if (Wo(), n === o) {
              t = Fr(e, t, r);
              break e;
            }
            ot(e, t, n, r);
          }
          t = t.child;
        }
        return t;
      case 5:
        return Pv(t), e === null && Xc(t), n = t.type, o = t.pendingProps, l = e !== null ? e.memoizedProps : null, i = o.children, Kc(n, o) ? i = null : l !== null && Kc(n, l) && (t.flags |= 32), Zv(e, t), ot(e, t, i, r), t.child;
      case 6:
        return e === null && Xc(t), null;
      case 13:
        return eg(e, t, r);
      case 4:
        return Ud(t, t.stateNode.containerInfo), n = t.pendingProps, e === null ? t.child = Ko(t, null, n, r) : ot(e, t, n, r), t.child;
      case 11:
        return n = t.type, o = t.pendingProps, o = t.elementType === n ? o : qt(n, o), am(e, t, n, o, r);
      case 7:
        return ot(e, t, t.pendingProps, r), t.child;
      case 8:
        return ot(e, t, t.pendingProps.children, r), t.child;
      case 12:
        return ot(e, t, t.pendingProps.children, r), t.child;
      case 10:
        e: {
          if (n = t.type._context, o = t.pendingProps, l = t.memoizedProps, i = o.value, se($a, n._currentValue), n._currentValue = i, l !== null)
            if (or(l.value, i)) {
              if (l.children === o.children && !ft.current) {
                t = Fr(e, t, r);
                break e;
              }
            } else
              for (l = t.child, l !== null && (l.return = t); l !== null; ) {
                var a = l.dependencies;
                if (a !== null) {
                  i = l.child;
                  for (var s = a.firstContext; s !== null; ) {
                    if (s.context === n) {
                      if (l.tag === 1) {
                        s = br(-1, r & -r), s.tag = 2;
                        var u = l.updateQueue;
                        if (u !== null) {
                          u = u.shared;
                          var c = u.pending;
                          c === null ? s.next = s : (s.next = c.next, c.next = s), u.pending = s;
                        }
                      }
                      l.lanes |= r, s = l.alternate, s !== null && (s.lanes |= r), Zc(l.return, r, t), a.lanes |= r;
                      break;
                    }
                    s = s.next;
                  }
                } else if (l.tag === 10)
                  i = l.type === t.type ? null : l.child;
                else if (l.tag === 18) {
                  if (i = l.return, i === null)
                    throw Error(L(341));
                  i.lanes |= r, a = i.alternate, a !== null && (a.lanes |= r), Zc(i, r, t), i = l.sibling;
                } else
                  i = l.child;
                if (i !== null)
                  i.return = l;
                else
                  for (i = l; i !== null; ) {
                    if (i === t) {
                      i = null;
                      break;
                    }
                    if (l = i.sibling, l !== null) {
                      l.return = i.return, i = l;
                      break;
                    }
                    i = i.return;
                  }
                l = i;
              }
          ot(e, t, o.children, r), t = t.child;
        }
        return t;
      case 9:
        return o = t.type, n = t.pendingProps.children, Bo(t, r), o = Bt(o), n = n(o), t.flags |= 1, ot(e, t, n, r), t.child;
      case 14:
        return n = t.type, o = qt(n, t.pendingProps), o = qt(n.type, o), sm(e, t, n, o, r);
      case 15:
        return Jv(e, t, t.type, t.pendingProps, r);
      case 17:
        return n = t.type, o = t.pendingProps, o = t.elementType === n ? o : qt(n, o), Na(e, t), t.tag = 1, pt(n) ? (e = true, Ba(t)) : e = false, Bo(t, r), Cv(t, n, o), ed(t, n, o, r), nd(null, t, n, true, e, r);
      case 19:
        return tg(e, t, r);
      case 22:
        return Xv(e, t, r);
    }
    throw Error(L(156, t.tag));
  };
  function gg(e, t) {
    return Hm(e, t);
  }
  function Ax(e, t, r, n) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ut(e, t, r, n) {
    return new Ax(e, t, r, n);
  }
  function ef(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ux(e) {
    if (typeof e == "function")
      return ef(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === wd)
        return 11;
      if (e === Sd)
        return 14;
    }
    return 2;
  }
  function cn(e, t) {
    var r = e.alternate;
    return r === null ? (r = Ut(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
  }
  function La(e, t, r, n, o, l) {
    var i = 2;
    if (n = e, typeof e == "function")
      ef(e) && (i = 1);
    else if (typeof e == "string")
      i = 5;
    else
      e:
        switch (e) {
          case _o:
            return Gn(r.children, o, l, t);
          case yd:
            i = 8, o |= 8;
            break;
          case kc:
            return e = Ut(12, r, t, o | 2), e.elementType = kc, e.lanes = l, e;
          case Cc:
            return e = Ut(13, r, t, o), e.elementType = Cc, e.lanes = l, e;
          case _c:
            return e = Ut(19, r, t, o), e.elementType = _c, e.lanes = l, e;
          case _m:
            return ds(r, o, l, t);
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case km:
                  i = 10;
                  break e;
                case Cm:
                  i = 9;
                  break e;
                case wd:
                  i = 11;
                  break e;
                case Sd:
                  i = 14;
                  break e;
                case Jr:
                  i = 16, n = null;
                  break e;
              }
            throw Error(L(130, e == null ? e : typeof e, ""));
        }
    return t = Ut(i, r, t, o), t.elementType = e, t.type = n, t.lanes = l, t;
  }
  function Gn(e, t, r, n) {
    return e = Ut(7, e, n, t), e.lanes = r, e;
  }
  function ds(e, t, r, n) {
    return e = Ut(22, e, n, t), e.elementType = _m, e.lanes = r, e.stateNode = { isHidden: false }, e;
  }
  function xc(e, t, r) {
    return e = Ut(6, e, null, t), e.lanes = r, e;
  }
  function Ec(e, t, r) {
    return t = Ut(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function jx(e, t, r, n, o) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = lc(0), this.expirationTimes = lc(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = lc(0), this.identifierPrefix = n, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null;
  }
  function tf(e, t, r, n, o, l, i, a, s) {
    return e = new jx(e, t, r, a, s), t === 1 ? (t = 1, l === true && (t |= 8)) : t = 0, l = Ut(3, null, null, t), e.current = l, l.stateNode = e, l.memoizedState = { element: n, isDehydrated: r, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ad(l), e;
  }
  function Bx(e, t, r) {
    var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Co, key: n == null ? null : "" + n, children: e, containerInfo: t, implementation: r };
  }
  function yg(e) {
    if (!e)
      return fn;
    e = e._reactInternals;
    e: {
      if (ro(e) !== e || e.tag !== 1)
        throw Error(L(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (pt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(L(171));
    }
    if (e.tag === 1) {
      var r = e.type;
      if (pt(r))
        return gv(e, r, t);
    }
    return t;
  }
  function wg(e, t, r, n, o, l, i, a, s) {
    return e = tf(r, n, true, e, o, l, i, a, s), e.context = yg(null), r = e.current, n = lt(), o = un(r), l = br(n, o), l.callback = t ?? null, an(r, l, o), e.current.lanes = o, ii(e, o, n), ht(e, n), e;
  }
  function fs(e, t, r, n) {
    var o = t.current, l = lt(), i = un(o);
    return r = yg(r), t.context === null ? t.context = r : t.pendingContext = r, t = br(l, i), t.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (t.callback = n), e = an(o, t, i), e !== null && (nr(e, o, i, l), ka(e, o, i)), i;
  }
  function es(e) {
    if (e = e.current, !e.child)
      return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Sm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < t ? r : t;
    }
  }
  function rf(e, t) {
    Sm(e, t), (e = e.alternate) && Sm(e, t);
  }
  function Vx() {
    return null;
  }
  var Sg = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function nf(e) {
    this._internalRoot = e;
  }
  ps.prototype.render = nf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw Error(L(409));
    fs(e, t, null, null);
  };
  ps.prototype.unmount = nf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      eo(function() {
        fs(null, e, null, null);
      }), t[Tr] = null;
    }
  };
  function ps(e) {
    this._internalRoot = e;
  }
  ps.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Jm();
      e = { blockedOn: null, target: e, priority: t };
      for (var r = 0; r < Zr.length && t !== 0 && t < Zr[r].priority; r++)
        ;
      Zr.splice(r, 0, e), r === 0 && Zm(e);
    }
  };
  function of(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function hs(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function xm() {
  }
  function Hx(e, t, r, n, o) {
    if (o) {
      if (typeof n == "function") {
        var l = n;
        n = function() {
          var u = es(i);
          l.call(u);
        };
      }
      var i = wg(t, n, e, 0, null, false, false, "", xm);
      return e._reactRootContainer = i, e[Tr] = i.current, Xl(e.nodeType === 8 ? e.parentNode : e), eo(), i;
    }
    for (; o = e.lastChild; )
      e.removeChild(o);
    if (typeof n == "function") {
      var a = n;
      n = function() {
        var u = es(s);
        a.call(u);
      };
    }
    var s = tf(e, 0, false, null, null, false, false, "", xm);
    return e._reactRootContainer = s, e[Tr] = s.current, Xl(e.nodeType === 8 ? e.parentNode : e), eo(function() {
      fs(t, s, r, n);
    }), s;
  }
  function ms(e, t, r, n, o) {
    var l = r._reactRootContainer;
    if (l) {
      var i = l;
      if (typeof o == "function") {
        var a = o;
        o = function() {
          var s = es(i);
          a.call(s);
        };
      }
      fs(t, i, e, o);
    } else
      i = Hx(r, t, e, o, n);
    return es(i);
  }
  Ym = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var r = Dl(t.pendingLanes);
          r !== 0 && (Rd(t, r | 1), ht(t, ke()), !(q & 6) && (Go = ke() + 500, mn()));
        }
        break;
      case 13:
        eo(function() {
          var n = Dr(e, 1);
          if (n !== null) {
            var o = lt();
            nr(n, e, 1, o);
          }
        }), rf(e, 1);
    }
  };
  kd = function(e) {
    if (e.tag === 13) {
      var t = Dr(e, 134217728);
      if (t !== null) {
        var r = lt();
        nr(t, e, 134217728, r);
      }
      rf(e, 134217728);
    }
  };
  Gm = function(e) {
    if (e.tag === 13) {
      var t = un(e), r = Dr(e, t);
      if (r !== null) {
        var n = lt();
        nr(r, e, t, n);
      }
      rf(e, t);
    }
  };
  Jm = function() {
    return re;
  };
  Xm = function(e, t) {
    var r = re;
    try {
      return re = e, t();
    } finally {
      re = r;
    }
  };
  zc = function(e, t, r) {
    switch (t) {
      case "input":
        if (bc(e, r), t = r.name, r.type === "radio" && t != null) {
          for (r = e; r.parentNode; )
            r = r.parentNode;
          for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
            var n = r[t];
            if (n !== e && n.form === e.form) {
              var o = ls(n);
              if (!o)
                throw Error(L(90));
              Pm(n), bc(n, o);
            }
          }
        }
        break;
      case "textarea":
        Lm(e, r);
        break;
      case "select":
        t = r.value, t != null && Io(e, !!r.multiple, t, false);
    }
  };
  Im = Xd;
  Am = eo;
  var $x = { usingClientEntryPoint: false, Events: [si, Lo, ls, Om, zm, Xd] }, Pl = { findFiberByHostInstance: Wn, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, Wx = { bundleType: Pl.bundleType, version: Pl.version, rendererPackageName: Pl.rendererPackageName, rendererConfig: Pl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Mr.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Bm(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: Pl.findFiberByHostInstance || Vx, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && (bl = __REACT_DEVTOOLS_GLOBAL_HOOK__, !bl.isDisabled && bl.supportsFiber))
    try {
      ts = bl.inject(Wx), pr = bl;
    } catch {
    }
  var bl;
  Ct.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $x;
  Ct.createPortal = function(e, t) {
    var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!of(t))
      throw Error(L(200));
    return Bx(e, t, null, r);
  };
  Ct.createRoot = function(e, t) {
    if (!of(e))
      throw Error(L(299));
    var r = false, n = "", o = Sg;
    return t != null && (t.unstable_strictMode === true && (r = true), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = tf(e, 1, false, null, null, r, false, n, o), e[Tr] = t.current, Xl(e.nodeType === 8 ? e.parentNode : e), new nf(t);
  };
  Ct.findDOMNode = function(e) {
    if (e == null)
      return null;
    if (e.nodeType === 1)
      return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(L(188)) : (e = Object.keys(e).join(","), Error(L(268, e)));
    return e = Bm(t), e = e === null ? null : e.stateNode, e;
  };
  Ct.flushSync = function(e) {
    return eo(e);
  };
  Ct.hydrate = function(e, t, r) {
    if (!hs(t))
      throw Error(L(200));
    return ms(null, e, t, true, r);
  };
  Ct.hydrateRoot = function(e, t, r) {
    if (!of(e))
      throw Error(L(405));
    var n = r != null && r.hydratedSources || null, o = false, l = "", i = Sg;
    if (r != null && (r.unstable_strictMode === true && (o = true), r.identifierPrefix !== void 0 && (l = r.identifierPrefix), r.onRecoverableError !== void 0 && (i = r.onRecoverableError)), t = wg(t, null, e, 1, r ?? null, o, false, l, i), e[Tr] = t.current, Xl(e), n)
      for (e = 0; e < n.length; e++)
        r = n[e], o = r._getVersion, o = o(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [r, o] : t.mutableSourceEagerHydrationData.push(r, o);
    return new ps(t);
  };
  Ct.render = function(e, t, r) {
    if (!hs(t))
      throw Error(L(200));
    return ms(null, e, t, false, r);
  };
  Ct.unmountComponentAtNode = function(e) {
    if (!hs(e))
      throw Error(L(40));
    return e._reactRootContainer ? (eo(function() {
      ms(null, null, e, false, function() {
        e._reactRootContainer = null, e[Tr] = null;
      });
    }), true) : false;
  };
  Ct.unstable_batchedUpdates = Xd;
  Ct.unstable_renderSubtreeIntoContainer = function(e, t, r, n) {
    if (!hs(r))
      throw Error(L(200));
    if (e == null || e._reactInternals === void 0)
      throw Error(L(38));
    return ms(e, t, r, false, n);
  };
  Ct.version = "18.2.0-next-9e3b772b8-20220608";
});
var kg = Ot((Z_, Rg) => {
  "use strict";
  function Eg() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Eg);
      } catch (e) {
        console.error(e);
      }
  }
  Eg(), Rg.exports = xg();
});
var ey = {};
xo(ey, { AbortedDeferredError: () => ir, Action: () => te, IDLE_BLOCKER: () => gn, IDLE_FETCHER: () => Rs, IDLE_NAVIGATION: () => vs, UNSAFE_DEFERRED_SYMBOL: () => Qg, UNSAFE_DeferredData: () => gs, UNSAFE_ErrorResponseImpl: () => oo, UNSAFE_convertRouteMatchToUiMatch: () => Es, UNSAFE_convertRoutesToDataRoutes: () => fi, UNSAFE_getResolveToMatches: () => tl, UNSAFE_invariant: () => U, UNSAFE_warning: () => lr, createBrowserHistory: () => Ss, createHashHistory: () => xs, createMemoryHistory: () => ws, createPath: () => De, createRouter: () => nl, createStaticHandler: () => wE, defer: () => mi, generatePath: () => el, getStaticContextFromError: () => SE, getToPathname: () => uE, isDeferredData: () => Zg, isRouteErrorResponse: () => Wt, joinPaths: () => _t, json: () => hi, matchPath: () => $t, matchRoutes: () => Ae, normalizePathname: () => Vg, parsePath: () => _e, redirect: () => io, redirectDocument: () => vi, resolvePath: () => lo, resolveTo: () => rl, stripBasename: () => qe });
function ee() {
  return ee = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ee.apply(this, arguments);
}
function ws(e) {
  e === void 0 && (e = {});
  let { initialEntries: t = ["/"], initialIndex: r, v5Compat: n = false } = e, o;
  o = t.map((v, g) => c(v, typeof v == "string" ? null : v.state, g === 0 ? "default" : void 0));
  let l = s(r ?? o.length - 1), i = te.Pop, a = null;
  function s(v) {
    return Math.min(Math.max(v, 0), o.length - 1);
  }
  function u() {
    return o[l];
  }
  function c(v, g, y) {
    g === void 0 && (g = null);
    let x = Or(o ? u().pathname : "/", v, g, y);
    return lr(x.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(v)), x;
  }
  function d(v) {
    return typeof v == "string" ? v : De(v);
  }
  return { get index() {
    return l;
  }, get action() {
    return i;
  }, get location() {
    return u();
  }, createHref: d, createURL(v) {
    return new URL(d(v), "http://localhost");
  }, encodeLocation(v) {
    let g = typeof v == "string" ? _e(v) : v;
    return { pathname: g.pathname || "", search: g.search || "", hash: g.hash || "" };
  }, push(v, g) {
    i = te.Push;
    let y = c(v, g);
    l += 1, o.splice(l, o.length, y), n && a && a({ action: i, location: y, delta: 1 });
  }, replace(v, g) {
    i = te.Replace;
    let y = c(v, g);
    o[l] = y, n && a && a({ action: i, location: y, delta: 0 });
  }, go(v) {
    i = te.Pop;
    let g = s(l + v), y = o[g];
    l = g, a && a({ action: i, location: y, delta: v });
  }, listen(v) {
    return a = v, () => {
      a = null;
    };
  } };
}
function Ss(e) {
  e === void 0 && (e = {});
  function t(n, o) {
    let { pathname: l, search: i, hash: a } = n.location;
    return Or("", { pathname: l, search: i, hash: a }, o.state && o.state.usr || null, o.state && o.state.key || "default");
  }
  function r(n, o) {
    return typeof o == "string" ? o : De(o);
  }
  return Ag(t, r, null, e);
}
function xs(e) {
  e === void 0 && (e = {});
  function t(o, l) {
    let { pathname: i = "/", search: a = "", hash: s = "" } = _e(o.location.hash.substr(1));
    return !i.startsWith("/") && !i.startsWith(".") && (i = "/" + i), Or("", { pathname: i, search: a, hash: s }, l.state && l.state.usr || null, l.state && l.state.key || "default");
  }
  function r(o, l) {
    let i = o.document.querySelector("base"), a = "";
    if (i && i.getAttribute("href")) {
      let s = o.location.href, u = s.indexOf("#");
      a = u === -1 ? s : s.slice(0, u);
    }
    return a + "#" + (typeof l == "string" ? l : De(l));
  }
  function n(o, l) {
    lr(o.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(l) + ")");
  }
  return Ag(t, r, n, e);
}
function U(e, t) {
  if (e === false || e === null || typeof e > "u")
    throw new Error(t);
}
function lr(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Kx() {
  return Math.random().toString(36).substr(2, 8);
}
function _g(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Or(e, t, r, n) {
  return r === void 0 && (r = null), ee({ pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" }, typeof t == "string" ? _e(t) : t, { state: r, key: t && t.key || n || Kx() });
}
function De(e) {
  let { pathname: t = "/", search: r = "", hash: n = "" } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function _e(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
  }
  return t;
}
function Ag(e, t, r, n) {
  n === void 0 && (n = {});
  let { window: o = document.defaultView, v5Compat: l = false } = n, i = o.history, a = te.Pop, s = null, u = c();
  u == null && (u = 0, i.replaceState(ee({}, i.state, { idx: u }), ""));
  function c() {
    return (i.state || { idx: null }).idx;
  }
  function d() {
    a = te.Pop;
    let x = c(), f = x == null ? null : x - u;
    u = x, s && s({ action: a, location: y.location, delta: f });
  }
  function p(x, f) {
    a = te.Push;
    let h = Or(y.location, x, f);
    r && r(h, x), u = c() + 1;
    let m = _g(h, u), E = y.createHref(h);
    try {
      i.pushState(m, "", E);
    } catch (k) {
      if (k instanceof DOMException && k.name === "DataCloneError")
        throw k;
      o.location.assign(E);
    }
    l && s && s({ action: a, location: y.location, delta: 1 });
  }
  function v(x, f) {
    a = te.Replace;
    let h = Or(y.location, x, f);
    r && r(h, x), u = c();
    let m = _g(h, u), E = y.createHref(h);
    i.replaceState(m, "", E), l && s && s({ action: a, location: y.location, delta: 0 });
  }
  function g(x) {
    let f = o.location.origin !== "null" ? o.location.origin : o.location.href, h = typeof x == "string" ? x : De(x);
    return U(f, "No window.location.(origin|href) available to create URL for href: " + h), new URL(h, f);
  }
  let y = { get action() {
    return a;
  }, get location() {
    return e(o, i);
  }, listen(x) {
    if (s)
      throw new Error("A history only accepts one active listener");
    return o.addEventListener(Cg, d), s = x, () => {
      o.removeEventListener(Cg, d), s = null;
    };
  }, createHref(x) {
    return t(o, x);
  }, createURL: g, encodeLocation(x) {
    let f = g(x);
    return { pathname: f.pathname, search: f.search, hash: f.hash };
  }, push: p, replace: v, go(x) {
    return i.go(x);
  } };
  return y;
}
function Yx(e) {
  return e.index === true;
}
function fi(e, t, r, n) {
  return r === void 0 && (r = []), n === void 0 && (n = {}), e.map((o, l) => {
    let i = [...r, l], a = typeof o.id == "string" ? o.id : i.join("-");
    if (U(o.index !== true || !o.children, "Cannot specify children on an index route"), U(!n[a], 'Found a route id collision on id "' + a + `".  Route id's must be globally unique within Data Router usages`), Yx(o)) {
      let s = ee({}, o, t(o), { id: a });
      return n[a] = s, s;
    } else {
      let s = ee({}, o, t(o), { id: a, children: void 0 });
      return n[a] = s, o.children && (s.children = fi(o.children, t, i, n)), s;
    }
  });
}
function Ae(e, t, r) {
  r === void 0 && (r = "/");
  let n = typeof t == "string" ? _e(t) : t, o = qe(n.pathname || "/", r);
  if (o == null)
    return null;
  let l = Ug(e);
  Gx(l);
  let i = null;
  for (let a = 0; i == null && a < l.length; ++a)
    i = oE(l[a], iE(o));
  return i;
}
function Es(e, t) {
  let { route: r, pathname: n, params: o } = e;
  return { id: r.id, pathname: n, params: o, data: t[r.id], handle: r.handle };
}
function Ug(e, t, r, n) {
  t === void 0 && (t = []), r === void 0 && (r = []), n === void 0 && (n = "");
  let o = (l, i, a) => {
    let s = { relativePath: a === void 0 ? l.path || "" : a, caseSensitive: l.caseSensitive === true, childrenIndex: i, route: l };
    s.relativePath.startsWith("/") && (U(s.relativePath.startsWith(n), 'Absolute route path "' + s.relativePath + '" nested under path ' + ('"' + n + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), s.relativePath = s.relativePath.slice(n.length));
    let u = _t([n, s.relativePath]), c = r.concat(s);
    l.children && l.children.length > 0 && (U(l.index !== true, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + u + '".')), Ug(l.children, t, c, u)), !(l.path == null && !l.index) && t.push({ path: u, score: rE(u, l.index), routesMeta: c });
  };
  return e.forEach((l, i) => {
    var a;
    if (l.path === "" || !((a = l.path) != null && a.includes("?")))
      o(l, i);
    else
      for (let s of jg(l.path))
        o(l, i, s);
  }), t;
}
function jg(e) {
  let t = e.split("/");
  if (t.length === 0)
    return [];
  let [r, ...n] = t, o = r.endsWith("?"), l = r.replace(/\?$/, "");
  if (n.length === 0)
    return o ? [l, ""] : [l];
  let i = jg(n.join("/")), a = [];
  return a.push(...i.map((s) => s === "" ? l : [l, s].join("/"))), o && a.push(...i), a.map((s) => e.startsWith("/") && s === "" ? "/" : s);
}
function Gx(e) {
  e.sort((t, r) => t.score !== r.score ? r.score - t.score : nE(t.routesMeta.map((n) => n.childrenIndex), r.routesMeta.map((n) => n.childrenIndex)));
}
function rE(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(Ng) && (n += tE), t && (n += Zx), r.filter((o) => !Ng(o)).reduce((o, l) => o + (Jx.test(l) ? Xx : l === "" ? qx : eE), n);
}
function nE(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, o) => n === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0;
}
function oE(e, t) {
  let { routesMeta: r } = e, n = {}, o = "/", l = [];
  for (let i = 0; i < r.length; ++i) {
    let a = r[i], s = i === r.length - 1, u = o === "/" ? t : t.slice(o.length) || "/", c = $t({ path: a.relativePath, caseSensitive: a.caseSensitive, end: s }, u);
    if (!c)
      return null;
    Object.assign(n, c.params);
    let d = a.route;
    l.push({ params: n, pathname: _t([o, c.pathname]), pathnameBase: Vg(_t([o, c.pathnameBase])), route: d }), c.pathnameBase !== "/" && (o = _t([o, c.pathnameBase]));
  }
  return l;
}
function el(e, t) {
  t === void 0 && (t = {});
  let r = e;
  r.endsWith("*") && r !== "*" && !r.endsWith("/*") && (lr(false, 'Route path "' + r + '" will be treated as if it were ' + ('"' + r.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + r.replace(/\*$/, "/*") + '".')), r = r.replace(/\*$/, "/*"));
  let n = r.startsWith("/") ? "/" : "", o = (i) => i == null ? "" : typeof i == "string" ? i : String(i), l = r.split(/\/+/).map((i, a, s) => {
    if (a === s.length - 1 && i === "*")
      return o(t["*"]);
    let c = i.match(/^:([\w-]+)(\??)$/);
    if (c) {
      let [, d, p] = c, v = t[d];
      return U(p === "?" || v != null, 'Missing ":' + d + '" param'), o(v);
    }
    return i.replace(/\?$/g, "");
  }).filter((i) => !!i);
  return n + l.join("/");
}
function $t(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: false, end: true });
  let [r, n] = lE(e.path, e.caseSensitive, e.end), o = t.match(r);
  if (!o)
    return null;
  let l = o[0], i = l.replace(/(.)\/+$/, "$1"), a = o.slice(1);
  return { params: n.reduce((u, c, d) => {
    let { paramName: p, isOptional: v } = c;
    if (p === "*") {
      let y = a[d] || "";
      i = l.slice(0, l.length - y.length).replace(/(.)\/+$/, "$1");
    }
    let g = a[d];
    return v && !g ? u[p] = void 0 : u[p] = aE(g || "", p), u;
  }, {}), pathname: l, pathnameBase: i, pattern: e };
}
function lE(e, t, r) {
  t === void 0 && (t = false), r === void 0 && (r = true), lr(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let n = [], o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (i, a, s) => (n.push({ paramName: a, isOptional: s != null }), s ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (n.push({ paramName: "*" }), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), n];
}
function iE(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return lr(false, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function aE(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (r) {
    return lr(false, 'The value for the URL param "' + t + '" will not be decoded because' + (' the string "' + e + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + r + ").")), e;
  }
}
function qe(e, t) {
  if (t === "/")
    return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function lo(e, t) {
  t === void 0 && (t = "/");
  let { pathname: r, search: n = "", hash: o = "" } = typeof e == "string" ? _e(e) : e;
  return { pathname: r ? r.startsWith("/") ? r : sE(r, t) : t, search: cE(n), hash: dE(o) };
}
function sE(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function lf(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Bg(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function tl(e, t) {
  let r = Bg(e);
  return t ? r.map((n, o) => o === e.length - 1 ? n.pathname : n.pathnameBase) : r.map((n) => n.pathnameBase);
}
function rl(e, t, r, n) {
  n === void 0 && (n = false);
  let o;
  typeof e == "string" ? o = _e(e) : (o = ee({}, e), U(!o.pathname || !o.pathname.includes("?"), lf("?", "pathname", "search", o)), U(!o.pathname || !o.pathname.includes("#"), lf("#", "pathname", "hash", o)), U(!o.search || !o.search.includes("#"), lf("#", "search", "hash", o)));
  let l = e === "" || o.pathname === "", i = l ? "/" : o.pathname, a;
  if (i == null)
    a = r;
  else {
    let d = t.length - 1;
    if (!n && i.startsWith("..")) {
      let p = i.split("/");
      for (; p[0] === ".."; )
        p.shift(), d -= 1;
      o.pathname = p.join("/");
    }
    a = d >= 0 ? t[d] : "/";
  }
  let s = lo(o, a), u = i && i !== "/" && i.endsWith("/"), c = (l || i === ".") && r.endsWith("/");
  return !s.pathname.endsWith("/") && (u || c) && (s.pathname += "/"), s;
}
function uE(e) {
  return e === "" || e.pathname === "" ? "/" : typeof e == "string" ? _e(e).pathname : e.pathname;
}
function fE(e) {
  return e instanceof Promise && e._tracked === true;
}
function pE(e) {
  if (!fE(e))
    return e;
  if (e._error)
    throw e._error;
  return e._data;
}
function Wt(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function nl(e) {
  let t = e.window ? e.window : typeof window < "u" ? window : void 0, r = typeof t < "u" && typeof t.document < "u" && typeof t.document.createElement < "u", n = !r;
  U(e.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let o;
  if (e.mapRouteProperties)
    o = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let S = e.detectErrorBoundary;
    o = (R) => ({ hasErrorBoundary: S(R) });
  } else
    o = Wg;
  let l = {}, i = fi(e.routes, o, void 0, l), a, s = e.basename || "/", u = ee({ v7_fetcherPersist: false, v7_normalizeFormMethod: false, v7_partialHydration: false, v7_prependBasename: false, v7_relativeSplatPath: false }, e.future), c = null, d = /* @__PURE__ */ new Set(), p = null, v = null, g = null, y = e.hydrationData != null, x = Ae(i, e.history.location, s), f = null;
  if (x == null) {
    let S = Ce(404, { pathname: e.history.location.pathname }), { matches: R, route: _ } = ys(i);
    x = R, f = { [_.id]: S };
  }
  let h, m = x.some((S) => S.route.lazy), E = x.some((S) => S.route.loader);
  if (m)
    h = false;
  else if (!E)
    h = true;
  else if (u.v7_partialHydration) {
    let S = e.hydrationData ? e.hydrationData.loaderData : null, R = e.hydrationData ? e.hydrationData.errors : null;
    h = x.every((_) => _.route.loader && _.route.loader.hydrate !== true && (S && S[_.route.id] !== void 0 || R && R[_.route.id] !== void 0));
  } else
    h = e.hydrationData != null;
  let k, w = { historyAction: e.history.action, location: e.history.location, matches: x, initialized: h, navigation: vs, restoreScrollPosition: e.hydrationData != null ? false : null, preventScrollReset: false, revalidation: "idle", loaderData: e.hydrationData && e.hydrationData.loaderData || {}, actionData: e.hydrationData && e.hydrationData.actionData || null, errors: e.hydrationData && e.hydrationData.errors || f, fetchers: /* @__PURE__ */ new Map(), blockers: /* @__PURE__ */ new Map() }, C = te.Pop, P = false, T, z = false, X = /* @__PURE__ */ new Map(), H = null, le = false, Fe = false, In = [], Er = [], ge = /* @__PURE__ */ new Map(), $r = 0, Gt = -1, Rr = /* @__PURE__ */ new Map(), rt = /* @__PURE__ */ new Set(), Jt = /* @__PURE__ */ new Map(), hl = /* @__PURE__ */ new Map(), kr = /* @__PURE__ */ new Set(), An = /* @__PURE__ */ new Map(), Un = /* @__PURE__ */ new Map(), Du = false;
  function c1() {
    if (c = e.history.listen((S) => {
      let { action: R, location: _, delta: F } = S;
      if (Du) {
        Du = false;
        return;
      }
      lr(Un.size === 0 || F != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
      let A = Vp({ currentLocation: w.location, nextLocation: _, historyAction: R });
      if (A && F != null) {
        Du = true, e.history.go(F * -1), $i(A, { state: "blocked", location: _, proceed() {
          $i(A, { state: "proceeding", proceed: void 0, reset: void 0, location: _ }), e.history.go(F);
        }, reset() {
          let Y = new Map(w.blockers);
          Y.set(A, gn), wt({ blockers: Y });
        } });
        return;
      }
      return jn(R, _);
    }), r) {
      PE(t, X);
      let S = () => bE(t, X);
      t.addEventListener("pagehide", S), H = () => t.removeEventListener("pagehide", S);
    }
    return w.initialized || jn(te.Pop, w.location, { initialHydration: true }), k;
  }
  function d1() {
    c && c(), H && H(), d.clear(), T && T.abort(), w.fetchers.forEach((S, R) => Hi(R)), w.blockers.forEach((S, R) => Bp(R));
  }
  function f1(S) {
    return d.add(S), () => d.delete(S);
  }
  function wt(S, R) {
    R === void 0 && (R = {}), w = ee({}, w, S);
    let _ = [], F = [];
    u.v7_fetcherPersist && w.fetchers.forEach((A, Y) => {
      A.state === "idle" && (kr.has(Y) ? F.push(Y) : _.push(Y));
    }), [...d].forEach((A) => A(w, { deletedFetchers: F, unstable_viewTransitionOpts: R.viewTransitionOpts, unstable_flushSync: R.flushSync === true })), u.v7_fetcherPersist && (_.forEach((A) => w.fetchers.delete(A)), F.forEach((A) => Hi(A)));
  }
  function ml(S, R, _) {
    var F, A;
    let { flushSync: Y } = _ === void 0 ? {} : _, V = w.actionData != null && w.navigation.formMethod != null && Ht(w.navigation.formMethod) && w.navigation.state === "loading" && ((F = S.state) == null ? void 0 : F._isRedirect) !== true, B;
    R.actionData ? Object.keys(R.actionData).length > 0 ? B = R.actionData : B = null : V ? B = w.actionData : B = null;
    let j = R.loaderData ? Mg(w.loaderData, R.loaderData, R.matches || [], R.errors) : w.loaderData, Z = w.blockers;
    Z.size > 0 && (Z = new Map(Z), Z.forEach((ie, Ue) => Z.set(Ue, gn)));
    let Me = P === true || w.navigation.formMethod != null && Ht(w.navigation.formMethod) && ((A = S.state) == null ? void 0 : A._isRedirect) !== true;
    a && (i = a, a = void 0), le || C === te.Pop || (C === te.Push ? e.history.push(S, S.state) : C === te.Replace && e.history.replace(S, S.state));
    let K;
    if (C === te.Pop) {
      let ie = X.get(w.location.pathname);
      ie && ie.has(S.pathname) ? K = { currentLocation: w.location, nextLocation: S } : X.has(S.pathname) && (K = { currentLocation: S, nextLocation: w.location });
    } else if (z) {
      let ie = X.get(w.location.pathname);
      ie ? ie.add(S.pathname) : (ie = /* @__PURE__ */ new Set([S.pathname]), X.set(w.location.pathname, ie)), K = { currentLocation: w.location, nextLocation: S };
    }
    wt(ee({}, R, { actionData: B, loaderData: j, historyAction: C, location: S, initialized: true, navigation: vs, revalidation: "idle", restoreScrollPosition: $p(S, R.matches || w.matches), preventScrollReset: Me, blockers: Z }), { viewTransitionOpts: K, flushSync: Y === true }), C = te.Pop, P = false, z = false, le = false, Fe = false, In = [], Er = [];
  }
  async function Op(S, R) {
    if (typeof S == "number") {
      e.history.go(S);
      return;
    }
    let _ = sf(w.location, w.matches, s, u.v7_prependBasename, S, u.v7_relativeSplatPath, R?.fromRouteId, R?.relative), { path: F, submission: A, error: Y } = Pg(u.v7_normalizeFormMethod, false, _, R), V = w.location, B = Or(w.location, F, R && R.state);
    B = ee({}, B, e.history.encodeLocation(B));
    let j = R && R.replace != null ? R.replace : void 0, Z = te.Push;
    j === true ? Z = te.Replace : j === false || A != null && Ht(A.formMethod) && A.formAction === w.location.pathname + w.location.search && (Z = te.Replace);
    let Me = R && "preventScrollReset" in R ? R.preventScrollReset === true : void 0, K = (R && R.unstable_flushSync) === true, ie = Vp({ currentLocation: V, nextLocation: B, historyAction: Z });
    if (ie) {
      $i(ie, { state: "blocked", location: B, proceed() {
        $i(ie, { state: "proceeding", proceed: void 0, reset: void 0, location: B }), Op(S, R);
      }, reset() {
        let Ue = new Map(w.blockers);
        Ue.set(ie, gn), wt({ blockers: Ue });
      } });
      return;
    }
    return await jn(Z, B, { submission: A, pendingError: Y, preventScrollReset: Me, replace: R && R.replace, enableViewTransition: R && R.unstable_viewTransition, flushSync: K });
  }
  function p1() {
    if (Fu(), wt({ revalidation: "loading" }), w.navigation.state !== "submitting") {
      if (w.navigation.state === "idle") {
        jn(w.historyAction, w.location, { startUninterruptedRevalidation: true });
        return;
      }
      jn(C || w.historyAction, w.navigation.location, { overrideNavigation: w.navigation });
    }
  }
  async function jn(S, R, _) {
    T && T.abort(), T = null, C = S, le = (_ && _.startUninterruptedRevalidation) === true, E1(w.location, w.matches), P = (_ && _.preventScrollReset) === true, z = (_ && _.enableViewTransition) === true;
    let F = a || i, A = _ && _.overrideNavigation, Y = Ae(F, R, s), V = (_ && _.flushSync) === true;
    if (!Y) {
      let Ue = Ce(404, { pathname: R.pathname }), { matches: Mt, route: Oe } = ys(F);
      Mu(), ml(R, { matches: Mt, loaderData: {}, errors: { [Oe.id]: Ue } }, { flushSync: V });
      return;
    }
    if (w.initialized && !Fe && RE(w.location, R) && !(_ && _.submission && Ht(_.submission.formMethod))) {
      ml(R, { matches: Y }, { flushSync: V });
      return;
    }
    T = new AbortController();
    let B = ci(e.history, R, T.signal, _ && _.submission), j, Z;
    if (_ && _.pendingError)
      Z = { [Zo(Y).route.id]: _.pendingError };
    else if (_ && _.submission && Ht(_.submission.formMethod)) {
      let Ue = await h1(B, R, _.submission, Y, { replace: _.replace, flushSync: V });
      if (Ue.shortCircuited)
        return;
      j = Ue.pendingActionData, Z = Ue.pendingActionError, A = af(R, _.submission), V = false, B = new Request(B.url, { signal: B.signal });
    }
    let { shortCircuited: Me, loaderData: K, errors: ie } = await m1(B, R, Y, A, _ && _.submission, _ && _.fetcherSubmission, _ && _.replace, _ && _.initialHydration === true, V, j, Z);
    Me || (T = null, ml(R, ee({ matches: Y }, j ? { actionData: j } : {}, { loaderData: K, errors: ie })));
  }
  async function h1(S, R, _, F, A) {
    A === void 0 && (A = {}), Fu();
    let Y = _E(R, _);
    wt({ navigation: Y }, { flushSync: A.flushSync === true });
    let V, B = pi(F, R);
    if (!B.route.action && !B.route.lazy)
      V = { type: oe.error, error: Ce(405, { method: S.method, pathname: R.pathname, routeId: B.route.id }) };
    else if (V = await no("action", S, B, F, l, o, s, u.v7_relativeSplatPath), S.signal.aborted)
      return { shortCircuited: true };
    if (Sn(V)) {
      let j;
      return A && A.replace != null ? j = A.replace : j = V.location === w.location.pathname + w.location.search, await vl(w, V, { submission: _, replace: j }), { shortCircuited: true };
    }
    if (wn(V)) {
      let j = Zo(F, B.route.id);
      return (A && A.replace) !== true && (C = te.Push), { pendingActionData: {}, pendingActionError: { [j.route.id]: V.error } };
    }
    if (yn(V))
      throw Ce(400, { type: "defer-action" });
    return { pendingActionData: { [B.route.id]: V.data } };
  }
  async function m1(S, R, _, F, A, Y, V, B, j, Z, Me) {
    let K = F || af(R, A), ie = A || Y || Ig(K), Ue = a || i, [Mt, Oe] = bg(e.history, w, _, ie, R, u.v7_partialHydration && B === true, Fe, In, Er, kr, Jt, rt, Ue, s, Z, Me);
    if (Mu((ne) => !(_ && _.some((me) => me.route.id === ne)) || Mt && Mt.some((me) => me.route.id === ne)), Gt = ++$r, Mt.length === 0 && Oe.length === 0) {
      let ne = Up();
      return ml(R, ee({ matches: _, loaderData: {}, errors: Me || null }, Z ? { actionData: Z } : {}, ne ? { fetchers: new Map(w.fetchers) } : {}), { flushSync: j }), { shortCircuited: true };
    }
    if (!le && (!u.v7_partialHydration || !B)) {
      Oe.forEach((me) => {
        let sr = w.fetchers.get(me.key), Ki = di(void 0, sr ? sr.data : void 0);
        w.fetchers.set(me.key, Ki);
      });
      let ne = Z || w.actionData;
      wt(ee({ navigation: K }, ne ? Object.keys(ne).length === 0 ? { actionData: null } : { actionData: ne } : {}, Oe.length > 0 ? { fetchers: new Map(w.fetchers) } : {}), { flushSync: j });
    }
    Oe.forEach((ne) => {
      ge.has(ne.key) && Kr(ne.key), ne.controller && ge.set(ne.key, ne.controller);
    });
    let yo = () => Oe.forEach((ne) => Kr(ne.key));
    T && T.signal.addEventListener("abort", yo);
    let { results: Ou, loaderResults: wo, fetcherResults: Qr } = await zp(w.matches, _, Mt, Oe, S);
    if (S.signal.aborted)
      return { shortCircuited: true };
    T && T.signal.removeEventListener("abort", yo), Oe.forEach((ne) => ge.delete(ne.key));
    let Bn = Og(Ou);
    if (Bn) {
      if (Bn.idx >= Mt.length) {
        let ne = Oe[Bn.idx - Mt.length].key;
        rt.add(ne);
      }
      return await vl(w, Bn.result, { replace: V }), { shortCircuited: true };
    }
    let { loaderData: zu, errors: Iu } = Fg(w, _, Mt, wo, Me, Oe, Qr, An);
    An.forEach((ne, me) => {
      ne.subscribe((sr) => {
        (sr || ne.done) && An.delete(me);
      });
    });
    let Au = Up(), So = jp(Gt), Wi = Au || So || Oe.length > 0;
    return ee({ loaderData: zu, errors: Iu }, Wi ? { fetchers: new Map(w.fetchers) } : {});
  }
  function v1(S, R, _, F) {
    if (n)
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
    ge.has(S) && Kr(S);
    let A = (F && F.unstable_flushSync) === true, Y = a || i, V = sf(w.location, w.matches, s, u.v7_prependBasename, _, u.v7_relativeSplatPath, R, F?.relative), B = Ae(Y, V, s);
    if (!B) {
      gl(S, R, Ce(404, { pathname: V }), { flushSync: A });
      return;
    }
    let { path: j, submission: Z, error: Me } = Pg(u.v7_normalizeFormMethod, true, V, F);
    if (Me) {
      gl(S, R, Me, { flushSync: A });
      return;
    }
    let K = pi(B, j);
    if (P = (F && F.preventScrollReset) === true, Z && Ht(Z.formMethod)) {
      g1(S, R, j, K, B, A, Z);
      return;
    }
    Jt.set(S, { routeId: R, path: j }), y1(S, R, j, K, B, A, Z);
  }
  async function g1(S, R, _, F, A, Y, V) {
    if (Fu(), Jt.delete(S), !F.route.action && !F.route.lazy) {
      let me = Ce(405, { method: V.formMethod, pathname: _, routeId: R });
      gl(S, R, me, { flushSync: Y });
      return;
    }
    let B = w.fetchers.get(S);
    Wr(S, NE(V, B), { flushSync: Y });
    let j = new AbortController(), Z = ci(e.history, _, j.signal, V);
    ge.set(S, j);
    let Me = $r, K = await no("action", Z, F, A, l, o, s, u.v7_relativeSplatPath);
    if (Z.signal.aborted) {
      ge.get(S) === j && ge.delete(S);
      return;
    }
    if (u.v7_fetcherPersist && kr.has(S)) {
      if (Sn(K) || wn(K)) {
        Wr(S, vn(void 0));
        return;
      }
    } else {
      if (Sn(K))
        if (ge.delete(S), Gt > Me) {
          Wr(S, vn(void 0));
          return;
        } else
          return rt.add(S), Wr(S, di(V)), vl(w, K, { fetcherSubmission: V });
      if (wn(K)) {
        gl(S, R, K.error);
        return;
      }
    }
    if (yn(K))
      throw Ce(400, { type: "defer-action" });
    let ie = w.navigation.location || w.location, Ue = ci(e.history, ie, j.signal), Mt = a || i, Oe = w.navigation.state !== "idle" ? Ae(Mt, w.navigation.location, s) : w.matches;
    U(Oe, "Didn't find any matches after fetcher action");
    let yo = ++$r;
    Rr.set(S, yo);
    let Ou = di(V, K.data);
    w.fetchers.set(S, Ou);
    let [wo, Qr] = bg(e.history, w, Oe, V, ie, false, Fe, In, Er, kr, Jt, rt, Mt, s, { [F.route.id]: K.data }, void 0);
    Qr.filter((me) => me.key !== S).forEach((me) => {
      let sr = me.key, Ki = w.fetchers.get(sr), k1 = di(void 0, Ki ? Ki.data : void 0);
      w.fetchers.set(sr, k1), ge.has(sr) && Kr(sr), me.controller && ge.set(sr, me.controller);
    }), wt({ fetchers: new Map(w.fetchers) });
    let Bn = () => Qr.forEach((me) => Kr(me.key));
    j.signal.addEventListener("abort", Bn);
    let { results: zu, loaderResults: Iu, fetcherResults: Au } = await zp(w.matches, Oe, wo, Qr, Ue);
    if (j.signal.aborted)
      return;
    j.signal.removeEventListener("abort", Bn), Rr.delete(S), ge.delete(S), Qr.forEach((me) => ge.delete(me.key));
    let So = Og(zu);
    if (So) {
      if (So.idx >= wo.length) {
        let me = Qr[So.idx - wo.length].key;
        rt.add(me);
      }
      return vl(w, So.result);
    }
    let { loaderData: Wi, errors: ne } = Fg(w, w.matches, wo, Iu, void 0, Qr, Au, An);
    if (w.fetchers.has(S)) {
      let me = vn(K.data);
      w.fetchers.set(S, me);
    }
    jp(yo), w.navigation.state === "loading" && yo > Gt ? (U(C, "Expected pending action"), T && T.abort(), ml(w.navigation.location, { matches: Oe, loaderData: Wi, errors: ne, fetchers: new Map(w.fetchers) })) : (wt({ errors: ne, loaderData: Mg(w.loaderData, Wi, Oe, ne), fetchers: new Map(w.fetchers) }), Fe = false);
  }
  async function y1(S, R, _, F, A, Y, V) {
    let B = w.fetchers.get(S);
    Wr(S, di(V, B ? B.data : void 0), { flushSync: Y });
    let j = new AbortController(), Z = ci(e.history, _, j.signal);
    ge.set(S, j);
    let Me = $r, K = await no("loader", Z, F, A, l, o, s, u.v7_relativeSplatPath);
    if (yn(K) && (K = await qg(K, Z.signal, true) || K), ge.get(S) === j && ge.delete(S), !Z.signal.aborted) {
      if (kr.has(S)) {
        Wr(S, vn(void 0));
        return;
      }
      if (Sn(K))
        if (Gt > Me) {
          Wr(S, vn(void 0));
          return;
        } else {
          rt.add(S), await vl(w, K);
          return;
        }
      if (wn(K)) {
        gl(S, R, K.error);
        return;
      }
      U(!yn(K), "Unhandled fetcher deferred data"), Wr(S, vn(K.data));
    }
  }
  async function vl(S, R, _) {
    let { submission: F, fetcherSubmission: A, replace: Y } = _ === void 0 ? {} : _;
    R.revalidate && (Fe = true);
    let V = Or(S.location, R.location, { _isRedirect: true });
    if (U(V, "Expected a location on the redirect navigation"), r) {
      let ie = false;
      if (R.reloadDocument)
        ie = true;
      else if ($g.test(R.location)) {
        let Ue = e.history.createURL(R.location);
        ie = Ue.origin !== t.location.origin || qe(Ue.pathname, s) == null;
      }
      if (ie) {
        Y ? t.location.replace(R.location) : t.location.assign(R.location);
        return;
      }
    }
    T = null;
    let B = Y === true ? te.Replace : te.Push, { formMethod: j, formAction: Z, formEncType: Me } = S.navigation;
    !F && !A && j && Z && Me && (F = Ig(S.navigation));
    let K = F || A;
    if (yE.has(R.status) && K && Ht(K.formMethod))
      await jn(B, V, { submission: ee({}, K, { formAction: R.location }), preventScrollReset: P });
    else {
      let ie = af(V, F);
      await jn(B, V, { overrideNavigation: ie, fetcherSubmission: A, preventScrollReset: P });
    }
  }
  async function zp(S, R, _, F, A) {
    let Y = await Promise.all([..._.map((j) => no("loader", A, j, R, l, o, s, u.v7_relativeSplatPath)), ...F.map((j) => j.matches && j.match && j.controller ? no("loader", ci(e.history, j.path, j.controller.signal), j.match, j.matches, l, o, s, u.v7_relativeSplatPath) : { type: oe.error, error: Ce(404, { pathname: j.path }) })]), V = Y.slice(0, _.length), B = Y.slice(_.length);
    return await Promise.all([zg(S, _, V, V.map(() => A.signal), false, w.loaderData), zg(S, F.map((j) => j.match), B, F.map((j) => j.controller ? j.controller.signal : null), true)]), { results: Y, loaderResults: V, fetcherResults: B };
  }
  function Fu() {
    Fe = true, In.push(...Mu()), Jt.forEach((S, R) => {
      ge.has(R) && (Er.push(R), Kr(R));
    });
  }
  function Wr(S, R, _) {
    _ === void 0 && (_ = {}), w.fetchers.set(S, R), wt({ fetchers: new Map(w.fetchers) }, { flushSync: (_ && _.flushSync) === true });
  }
  function gl(S, R, _, F) {
    F === void 0 && (F = {});
    let A = Zo(w.matches, R);
    Hi(S), wt({ errors: { [A.route.id]: _ }, fetchers: new Map(w.fetchers) }, { flushSync: (F && F.flushSync) === true });
  }
  function Ip(S) {
    return u.v7_fetcherPersist && (hl.set(S, (hl.get(S) || 0) + 1), kr.has(S) && kr.delete(S)), w.fetchers.get(S) || Rs;
  }
  function Hi(S) {
    let R = w.fetchers.get(S);
    ge.has(S) && !(R && R.state === "loading" && Rr.has(S)) && Kr(S), Jt.delete(S), Rr.delete(S), rt.delete(S), kr.delete(S), w.fetchers.delete(S);
  }
  function w1(S) {
    if (u.v7_fetcherPersist) {
      let R = (hl.get(S) || 0) - 1;
      R <= 0 ? (hl.delete(S), kr.add(S)) : hl.set(S, R);
    } else
      Hi(S);
    wt({ fetchers: new Map(w.fetchers) });
  }
  function Kr(S) {
    let R = ge.get(S);
    U(R, "Expected fetch controller: " + S), R.abort(), ge.delete(S);
  }
  function Ap(S) {
    for (let R of S) {
      let _ = Ip(R), F = vn(_.data);
      w.fetchers.set(R, F);
    }
  }
  function Up() {
    let S = [], R = false;
    for (let _ of rt) {
      let F = w.fetchers.get(_);
      U(F, "Expected fetcher: " + _), F.state === "loading" && (rt.delete(_), S.push(_), R = true);
    }
    return Ap(S), R;
  }
  function jp(S) {
    let R = [];
    for (let [_, F] of Rr)
      if (F < S) {
        let A = w.fetchers.get(_);
        U(A, "Expected fetcher: " + _), A.state === "loading" && (Kr(_), Rr.delete(_), R.push(_));
      }
    return Ap(R), R.length > 0;
  }
  function S1(S, R) {
    let _ = w.blockers.get(S) || gn;
    return Un.get(S) !== R && Un.set(S, R), _;
  }
  function Bp(S) {
    w.blockers.delete(S), Un.delete(S);
  }
  function $i(S, R) {
    let _ = w.blockers.get(S) || gn;
    U(_.state === "unblocked" && R.state === "blocked" || _.state === "blocked" && R.state === "blocked" || _.state === "blocked" && R.state === "proceeding" || _.state === "blocked" && R.state === "unblocked" || _.state === "proceeding" && R.state === "unblocked", "Invalid blocker state transition: " + _.state + " -> " + R.state);
    let F = new Map(w.blockers);
    F.set(S, R), wt({ blockers: F });
  }
  function Vp(S) {
    let { currentLocation: R, nextLocation: _, historyAction: F } = S;
    if (Un.size === 0)
      return;
    Un.size > 1 && lr(false, "A router only supports one blocker at a time");
    let A = Array.from(Un.entries()), [Y, V] = A[A.length - 1], B = w.blockers.get(Y);
    if (!(B && B.state === "proceeding") && V({ currentLocation: R, nextLocation: _, historyAction: F }))
      return Y;
  }
  function Mu(S) {
    let R = [];
    return An.forEach((_, F) => {
      (!S || S(F)) && (_.cancel(), R.push(F), An.delete(F));
    }), R;
  }
  function x1(S, R, _) {
    if (p = S, g = R, v = _ || null, !y && w.navigation === vs) {
      y = true;
      let F = $p(w.location, w.matches);
      F != null && wt({ restoreScrollPosition: F });
    }
    return () => {
      p = null, g = null, v = null;
    };
  }
  function Hp(S, R) {
    return v && v(S, R.map((F) => Es(F, w.loaderData))) || S.key;
  }
  function E1(S, R) {
    if (p && g) {
      let _ = Hp(S, R);
      p[_] = g();
    }
  }
  function $p(S, R) {
    if (p) {
      let _ = Hp(S, R), F = p[_];
      if (typeof F == "number")
        return F;
    }
    return null;
  }
  function R1(S) {
    l = {}, a = fi(S, o, void 0, l);
  }
  return k = { get basename() {
    return s;
  }, get future() {
    return u;
  }, get state() {
    return w;
  }, get routes() {
    return i;
  }, get window() {
    return t;
  }, initialize: c1, subscribe: f1, enableScrollRestoration: x1, navigate: Op, fetch: v1, revalidate: p1, createHref: (S) => e.history.createHref(S), encodeLocation: (S) => e.history.encodeLocation(S), getFetcher: Ip, deleteFetcher: w1, dispose: d1, getBlocker: S1, deleteBlocker: Bp, _internalFetchControllers: ge, _internalActiveDeferreds: An, _internalSetRoutes: R1 }, k;
}
function wE(e, t) {
  U(e.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let r = {}, n = (t ? t.basename : null) || "/", o;
  if (t != null && t.mapRouteProperties)
    o = t.mapRouteProperties;
  else if (t != null && t.detectErrorBoundary) {
    let p = t.detectErrorBoundary;
    o = (v) => ({ hasErrorBoundary: p(v) });
  } else
    o = Wg;
  let l = ee({ v7_relativeSplatPath: false }, t ? t.future : null), i = fi(e, o, void 0, r);
  async function a(p, v) {
    let { requestContext: g } = v === void 0 ? {} : v, y = new URL(p.url), x = p.method, f = Or("", De(y), null, "default"), h = Ae(i, f, n);
    if (!cf(x) && x !== "HEAD") {
      let E = Ce(405, { method: x }), { matches: k, route: w } = ys(i);
      return { basename: n, location: f, matches: k, loaderData: {}, actionData: null, errors: { [w.id]: E }, statusCode: E.status, loaderHeaders: {}, actionHeaders: {}, activeDeferreds: null };
    } else if (!h) {
      let E = Ce(404, { pathname: f.pathname }), { matches: k, route: w } = ys(i);
      return { basename: n, location: f, matches: k, loaderData: {}, actionData: null, errors: { [w.id]: E }, statusCode: E.status, loaderHeaders: {}, actionHeaders: {}, activeDeferreds: null };
    }
    let m = await u(p, f, h, g);
    return qo(m) ? m : ee({ location: f, basename: n }, m);
  }
  async function s(p, v) {
    let { routeId: g, requestContext: y } = v === void 0 ? {} : v, x = new URL(p.url), f = p.method, h = Or("", De(x), null, "default"), m = Ae(i, h, n);
    if (!cf(f) && f !== "HEAD" && f !== "OPTIONS")
      throw Ce(405, { method: f });
    if (!m)
      throw Ce(404, { pathname: h.pathname });
    let E = g ? m.find((P) => P.route.id === g) : pi(m, h);
    if (g && !E)
      throw Ce(403, { pathname: h.pathname, routeId: g });
    if (!E)
      throw Ce(404, { pathname: h.pathname });
    let k = await u(p, h, m, y, E);
    if (qo(k))
      return k;
    let w = k.errors ? Object.values(k.errors)[0] : void 0;
    if (w !== void 0)
      throw w;
    if (k.actionData)
      return Object.values(k.actionData)[0];
    if (k.loaderData) {
      var C;
      let P = Object.values(k.loaderData)[0];
      return (C = k.activeDeferreds) != null && C[E.route.id] && (P[Qg] = k.activeDeferreds[E.route.id]), P;
    }
  }
  async function u(p, v, g, y, x) {
    U(p.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (Ht(p.method.toLowerCase()))
        return await c(p, g, x || pi(g, v), y, x != null);
      let f = await d(p, g, y, x);
      return qo(f) ? f : ee({}, f, { actionData: null, actionHeaders: {} });
    } catch (f) {
      if (CE(f)) {
        if (f.type === oe.error)
          throw f.response;
        return f.response;
      }
      if (kE(f))
        return f;
      throw f;
    }
  }
  async function c(p, v, g, y, x) {
    let f;
    if (!g.route.action && !g.route.lazy) {
      let E = Ce(405, { method: p.method, pathname: new URL(p.url).pathname, routeId: g.route.id });
      if (x)
        throw E;
      f = { type: oe.error, error: E };
    } else if (f = await no("action", p, g, v, r, o, n, l.v7_relativeSplatPath, { isStaticRequest: true, isRouteRequest: x, requestContext: y }), p.signal.aborted) {
      let E = x ? "queryRoute" : "query";
      throw new Error(E + "() call aborted: " + p.method + " " + p.url);
    }
    if (Sn(f))
      throw new Response(null, { status: f.status, headers: { Location: f.location } });
    if (yn(f)) {
      let E = Ce(400, { type: "defer-action" });
      if (x)
        throw E;
      f = { type: oe.error, error: E };
    }
    if (x) {
      if (wn(f))
        throw f.error;
      return { matches: [g], loaderData: {}, actionData: { [g.route.id]: f.data }, errors: null, statusCode: 200, loaderHeaders: {}, actionHeaders: {}, activeDeferreds: null };
    }
    if (wn(f)) {
      let E = Zo(v, g.route.id), k = await d(p, v, y, void 0, { [E.route.id]: f.error });
      return ee({}, k, { statusCode: Wt(f.error) ? f.error.status : 500, actionData: null, actionHeaders: ee({}, f.headers ? { [g.route.id]: f.headers } : {}) });
    }
    let h = new Request(p.url, { headers: p.headers, redirect: p.redirect, signal: p.signal }), m = await d(h, v, y);
    return ee({}, m, f.statusCode ? { statusCode: f.statusCode } : {}, { actionData: { [g.route.id]: f.data }, actionHeaders: ee({}, f.headers ? { [g.route.id]: f.headers } : {}) });
  }
  async function d(p, v, g, y, x) {
    let f = y != null;
    if (f && !(y != null && y.route.loader) && !(y != null && y.route.lazy))
      throw Ce(400, { method: p.method, pathname: new URL(p.url).pathname, routeId: y?.route.id });
    let m = (y ? [y] : Yg(v, Object.keys(x || {})[0])).filter((P) => P.route.loader || P.route.lazy);
    if (m.length === 0)
      return { matches: v, loaderData: v.reduce((P, T) => Object.assign(P, { [T.route.id]: null }), {}), errors: x || null, statusCode: 200, loaderHeaders: {}, activeDeferreds: null };
    let E = await Promise.all([...m.map((P) => no("loader", p, P, v, r, o, n, l.v7_relativeSplatPath, { isStaticRequest: true, isRouteRequest: f, requestContext: g }))]);
    if (p.signal.aborted) {
      let P = f ? "queryRoute" : "query";
      throw new Error(P + "() call aborted: " + p.method + " " + p.url);
    }
    let k = /* @__PURE__ */ new Map(), w = Jg(v, m, E, x, k), C = new Set(m.map((P) => P.route.id));
    return v.forEach((P) => {
      C.has(P.route.id) || (w.loaderData[P.route.id] = null);
    }), ee({}, w, { matches: v, activeDeferreds: k.size > 0 ? Object.fromEntries(k.entries()) : null });
  }
  return { dataRoutes: i, query: a, queryRoute: s };
}
function SE(e, t, r) {
  return ee({}, t, { statusCode: 500, errors: { [t._deepestRenderedBoundaryId || e[0].id]: r } });
}
function xE(e) {
  return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0);
}
function sf(e, t, r, n, o, l, i, a) {
  let s, u;
  if (i) {
    s = [];
    for (let d of t)
      if (s.push(d), d.route.id === i) {
        u = d;
        break;
      }
  } else
    s = t, u = t[t.length - 1];
  let c = rl(o || ".", tl(s, l), qe(e.pathname, r) || e.pathname, a === "path");
  return o == null && (c.search = e.search, c.hash = e.hash), (o == null || o === "" || o === ".") && u && u.route.index && !df(c.search) && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), n && r !== "/" && (c.pathname = c.pathname === "/" ? r : _t([r, c.pathname])), De(c);
}
function Pg(e, t, r, n) {
  if (!n || !xE(n))
    return { path: r };
  if (n.formMethod && !cf(n.formMethod))
    return { path: r, error: Ce(405, { method: n.formMethod }) };
  let o = () => ({ path: r, error: Ce(400, { type: "invalid-body" }) }), l = n.formMethod || "get", i = e ? l.toUpperCase() : l.toLowerCase(), a = Xg(r);
  if (n.body !== void 0) {
    if (n.formEncType === "text/plain") {
      if (!Ht(i))
        return o();
      let p = typeof n.body == "string" ? n.body : n.body instanceof FormData || n.body instanceof URLSearchParams ? Array.from(n.body.entries()).reduce((v, g) => {
        let [y, x] = g;
        return "" + v + y + "=" + x + `
`;
      }, "") : String(n.body);
      return { path: r, submission: { formMethod: i, formAction: a, formEncType: n.formEncType, formData: void 0, json: void 0, text: p } };
    } else if (n.formEncType === "application/json") {
      if (!Ht(i))
        return o();
      try {
        let p = typeof n.body == "string" ? JSON.parse(n.body) : n.body;
        return { path: r, submission: { formMethod: i, formAction: a, formEncType: n.formEncType, formData: void 0, json: p, text: void 0 } };
      } catch {
        return o();
      }
    }
  }
  U(typeof FormData == "function", "FormData is not available in this environment");
  let s, u;
  if (n.formData)
    s = uf(n.formData), u = n.formData;
  else if (n.body instanceof FormData)
    s = uf(n.body), u = n.body;
  else if (n.body instanceof URLSearchParams)
    s = n.body, u = Dg(s);
  else if (n.body == null)
    s = new URLSearchParams(), u = new FormData();
  else
    try {
      s = new URLSearchParams(n.body), u = Dg(s);
    } catch {
      return o();
    }
  let c = { formMethod: i, formAction: a, formEncType: n && n.formEncType || "application/x-www-form-urlencoded", formData: u, json: void 0, text: void 0 };
  if (Ht(c.formMethod))
    return { path: r, submission: c };
  let d = _e(r);
  return t && d.search && df(d.search) && s.append("index", ""), d.search = "?" + s, { path: De(d), submission: c };
}
function Yg(e, t) {
  let r = e;
  if (t) {
    let n = e.findIndex((o) => o.route.id === t);
    n >= 0 && (r = e.slice(0, n));
  }
  return r;
}
function bg(e, t, r, n, o, l, i, a, s, u, c, d, p, v, g, y) {
  let x = y ? Object.values(y)[0] : g ? Object.values(g)[0] : void 0, f = e.createURL(t.location), h = e.createURL(o), m = y ? Object.keys(y)[0] : void 0, k = Yg(r, m).filter((C, P) => {
    let { route: T } = C;
    if (T.lazy)
      return true;
    if (T.loader == null)
      return false;
    if (l)
      return T.loader.hydrate ? true : t.loaderData[T.id] === void 0 && (!t.errors || t.errors[T.id] === void 0);
    if (EE(t.loaderData, t.matches[P], C) || a.some((H) => H === C.route.id))
      return true;
    let z = t.matches[P], X = C;
    return Lg(C, ee({ currentUrl: f, currentParams: z.params, nextUrl: h, nextParams: X.params }, n, { actionResult: x, defaultShouldRevalidate: i || f.pathname + f.search === h.pathname + h.search || f.search !== h.search || Gg(z, X) }));
  }), w = [];
  return c.forEach((C, P) => {
    if (l || !r.some((le) => le.route.id === C.routeId) || u.has(P))
      return;
    let T = Ae(p, C.path, v);
    if (!T) {
      w.push({ key: P, routeId: C.routeId, path: C.path, matches: null, match: null, controller: null });
      return;
    }
    let z = t.fetchers.get(P), X = pi(T, C.path), H = false;
    d.has(P) ? H = false : s.includes(P) ? H = true : z && z.state !== "idle" && z.data === void 0 ? H = i : H = Lg(X, ee({ currentUrl: f, currentParams: t.matches[t.matches.length - 1].params, nextUrl: h, nextParams: r[r.length - 1].params }, n, { actionResult: x, defaultShouldRevalidate: i })), H && w.push({ key: P, routeId: C.routeId, path: C.path, matches: T, match: X, controller: new AbortController() });
  }), [k, w];
}
function EE(e, t, r) {
  let n = !t || r.route.id !== t.route.id, o = e[r.route.id] === void 0;
  return n || o;
}
function Gg(e, t) {
  let r = e.route.path;
  return e.pathname !== t.pathname || r != null && r.endsWith("*") && e.params["*"] !== t.params["*"];
}
function Lg(e, t) {
  if (e.route.shouldRevalidate) {
    let r = e.route.shouldRevalidate(t);
    if (typeof r == "boolean")
      return r;
  }
  return t.defaultShouldRevalidate;
}
async function Tg(e, t, r) {
  if (!e.lazy)
    return;
  let n = await e.lazy();
  if (!e.lazy)
    return;
  let o = r[e.id];
  U(o, "No route found in manifest");
  let l = {};
  for (let i in n) {
    let s = o[i] !== void 0 && i !== "hasErrorBoundary";
    lr(!s, 'Route "' + o.id + '" has a static property "' + i + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + i + '" will be ignored.')), !s && !Qx.has(i) && (l[i] = n[i]);
  }
  Object.assign(o, l), Object.assign(o, ee({}, t(o), { lazy: void 0 }));
}
async function no(e, t, r, n, o, l, i, a, s) {
  s === void 0 && (s = {});
  let u, c, d, p = (y) => {
    let x, f = new Promise((h, m) => x = m);
    return d = () => x(), t.signal.addEventListener("abort", d), Promise.race([y({ request: t, params: r.params, context: s.requestContext }), f]);
  };
  try {
    let y = r.route[e];
    if (r.route.lazy)
      if (y) {
        let x, f = await Promise.all([p(y).catch((h) => {
          x = h;
        }), Tg(r.route, l, o)]);
        if (x)
          throw x;
        c = f[0];
      } else if (await Tg(r.route, l, o), y = r.route[e], y)
        c = await p(y);
      else if (e === "action") {
        let x = new URL(t.url), f = x.pathname + x.search;
        throw Ce(405, { method: t.method, pathname: f, routeId: r.route.id });
      } else
        return { type: oe.data, data: void 0 };
    else if (y)
      c = await p(y);
    else {
      let x = new URL(t.url), f = x.pathname + x.search;
      throw Ce(404, { pathname: f });
    }
    U(c !== void 0, "You defined " + (e === "action" ? "an action" : "a loader") + " for route " + ('"' + r.route.id + "\" but didn't return anything from your `" + e + "` ") + "function. Please return a value or `null`.");
  } catch (y) {
    u = oe.error, c = y;
  } finally {
    d && t.signal.removeEventListener("abort", d);
  }
  if (qo(c)) {
    let y = c.status;
    if (gE.has(y)) {
      let f = c.headers.get("Location");
      if (U(f, "Redirects returned/thrown from loaders/actions must have a Location header"), !$g.test(f))
        f = sf(new URL(t.url), n.slice(0, n.indexOf(r) + 1), i, true, f, a);
      else if (!s.isStaticRequest) {
        let h = new URL(t.url), m = f.startsWith("//") ? new URL(h.protocol + f) : new URL(f), E = qe(m.pathname, i) != null;
        m.origin === h.origin && E && (f = m.pathname + m.search + m.hash);
      }
      if (s.isStaticRequest)
        throw c.headers.set("Location", f), c;
      return { type: oe.redirect, status: y, location: f, revalidate: c.headers.get("X-Remix-Revalidate") !== null, reloadDocument: c.headers.get("X-Remix-Reload-Document") !== null };
    }
    if (s.isRouteRequest)
      throw { type: u === oe.error ? oe.error : oe.data, response: c };
    let x;
    try {
      let f = c.headers.get("Content-Type");
      f && /\bapplication\/json\b/.test(f) ? c.body == null ? x = null : x = await c.json() : x = await c.text();
    } catch (f) {
      return { type: oe.error, error: f };
    }
    return u === oe.error ? { type: u, error: new oo(y, c.statusText, x), headers: c.headers } : { type: oe.data, data: x, statusCode: c.status, headers: c.headers };
  }
  if (u === oe.error)
    return { type: u, error: c };
  if (Zg(c)) {
    var v, g;
    return { type: oe.deferred, deferredData: c, statusCode: (v = c.init) == null ? void 0 : v.status, headers: ((g = c.init) == null ? void 0 : g.headers) && new Headers(c.init.headers) };
  }
  return { type: oe.data, data: c };
}
function ci(e, t, r, n) {
  let o = e.createURL(Xg(t)).toString(), l = { signal: r };
  if (n && Ht(n.formMethod)) {
    let { formMethod: i, formEncType: a } = n;
    l.method = i.toUpperCase(), a === "application/json" ? (l.headers = new Headers({ "Content-Type": a }), l.body = JSON.stringify(n.json)) : a === "text/plain" ? l.body = n.text : a === "application/x-www-form-urlencoded" && n.formData ? l.body = uf(n.formData) : l.body = n.formData;
  }
  return new Request(o, l);
}
function uf(e) {
  let t = new URLSearchParams();
  for (let [r, n] of e.entries())
    t.append(r, typeof n == "string" ? n : n.name);
  return t;
}
function Dg(e) {
  let t = new FormData();
  for (let [r, n] of e.entries())
    t.append(r, n);
  return t;
}
function Jg(e, t, r, n, o) {
  let l = {}, i = null, a, s = false, u = {};
  return r.forEach((c, d) => {
    let p = t[d].route.id;
    if (U(!Sn(c), "Cannot handle redirect results in processLoaderData"), wn(c)) {
      let v = Zo(e, p), g = c.error;
      n && (g = Object.values(n)[0], n = void 0), i = i || {}, i[v.route.id] == null && (i[v.route.id] = g), l[p] = void 0, s || (s = true, a = Wt(c.error) ? c.error.status : 500), c.headers && (u[p] = c.headers);
    } else
      yn(c) ? (o.set(p, c.deferredData), l[p] = c.deferredData.data) : l[p] = c.data, c.statusCode != null && c.statusCode !== 200 && !s && (a = c.statusCode), c.headers && (u[p] = c.headers);
  }), n && (i = n, l[Object.keys(n)[0]] = void 0), { loaderData: l, errors: i, statusCode: a || 200, loaderHeaders: u };
}
function Fg(e, t, r, n, o, l, i, a) {
  let { loaderData: s, errors: u } = Jg(t, r, n, o, a);
  for (let c = 0; c < l.length; c++) {
    let { key: d, match: p, controller: v } = l[c];
    U(i !== void 0 && i[c] !== void 0, "Did not find corresponding fetcher result");
    let g = i[c];
    if (!(v && v.signal.aborted))
      if (wn(g)) {
        let y = Zo(e.matches, p?.route.id);
        u && u[y.route.id] || (u = ee({}, u, { [y.route.id]: g.error })), e.fetchers.delete(d);
      } else if (Sn(g))
        U(false, "Unhandled fetcher revalidation redirect");
      else if (yn(g))
        U(false, "Unhandled fetcher deferred data");
      else {
        let y = vn(g.data);
        e.fetchers.set(d, y);
      }
  }
  return { loaderData: s, errors: u };
}
function Mg(e, t, r, n) {
  let o = ee({}, t);
  for (let l of r) {
    let i = l.route.id;
    if (t.hasOwnProperty(i) ? t[i] !== void 0 && (o[i] = t[i]) : e[i] !== void 0 && l.route.loader && (o[i] = e[i]), n && n.hasOwnProperty(i))
      break;
  }
  return o;
}
function Zo(e, t) {
  return (t ? e.slice(0, e.findIndex((n) => n.route.id === t) + 1) : [...e]).reverse().find((n) => n.route.hasErrorBoundary === true) || e[0];
}
function ys(e) {
  let t = e.length === 1 ? e[0] : e.find((r) => r.index || !r.path || r.path === "/") || { id: "__shim-error-route__" };
  return { matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }], route: t };
}
function Ce(e, t) {
  let { pathname: r, routeId: n, method: o, type: l } = t === void 0 ? {} : t, i = "Unknown Server Error", a = "Unknown @remix-run/router error";
  return e === 400 ? (i = "Bad Request", o && r && n ? a = "You made a " + o + ' request to "' + r + '" but ' + ('did not provide a `loader` for route "' + n + '", ') + "so there is no way to handle the request." : l === "defer-action" ? a = "defer() is not supported in actions" : l === "invalid-body" && (a = "Unable to encode submission body")) : e === 403 ? (i = "Forbidden", a = 'Route "' + n + '" does not match URL "' + r + '"') : e === 404 ? (i = "Not Found", a = 'No route matches URL "' + r + '"') : e === 405 && (i = "Method Not Allowed", o && r && n ? a = "You made a " + o.toUpperCase() + ' request to "' + r + '" but ' + ('did not provide an `action` for route "' + n + '", ') + "so there is no way to handle the request." : o && (a = 'Invalid request method "' + o.toUpperCase() + '"')), new oo(e || 500, i, new Error(a), true);
}
function Og(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let r = e[t];
    if (Sn(r))
      return { result: r, idx: t };
  }
}
function Xg(e) {
  let t = typeof e == "string" ? _e(e) : e;
  return De(ee({}, t, { hash: "" }));
}
function RE(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search ? false : e.hash === "" ? t.hash !== "" : e.hash === t.hash ? true : t.hash !== "";
}
function yn(e) {
  return e.type === oe.deferred;
}
function wn(e) {
  return e.type === oe.error;
}
function Sn(e) {
  return (e && e.type) === oe.redirect;
}
function Zg(e) {
  let t = e;
  return t && typeof t == "object" && typeof t.data == "object" && typeof t.subscribe == "function" && typeof t.cancel == "function" && typeof t.resolveData == "function";
}
function qo(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function kE(e) {
  if (!qo(e))
    return false;
  let t = e.status, r = e.headers.get("Location");
  return t >= 300 && t <= 399 && r != null;
}
function CE(e) {
  return e && qo(e.response) && (e.type === oe.data || e.type === oe.error);
}
function cf(e) {
  return vE.has(e.toLowerCase());
}
function Ht(e) {
  return hE.has(e.toLowerCase());
}
async function zg(e, t, r, n, o, l) {
  for (let i = 0; i < r.length; i++) {
    let a = r[i], s = t[i];
    if (!s)
      continue;
    let u = e.find((d) => d.route.id === s.route.id), c = u != null && !Gg(u, s) && (l && l[s.route.id]) !== void 0;
    if (yn(a) && (o || c)) {
      let d = n[i];
      U(d, "Expected an AbortSignal for revalidating fetcher deferred result"), await qg(a, d, o).then((p) => {
        p && (r[i] = p || r[i]);
      });
    }
  }
}
async function qg(e, t, r) {
  if (r === void 0 && (r = false), !await e.deferredData.resolveData(t)) {
    if (r)
      try {
        return { type: oe.data, data: e.deferredData.unwrappedData };
      } catch (o) {
        return { type: oe.error, error: o };
      }
    return { type: oe.data, data: e.deferredData.data };
  }
}
function df(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function pi(e, t) {
  let r = typeof t == "string" ? _e(t).search : t.search;
  if (e[e.length - 1].route.index && df(r || ""))
    return e[e.length - 1];
  let n = Bg(e);
  return n[n.length - 1];
}
function Ig(e) {
  let { formMethod: t, formAction: r, formEncType: n, text: o, formData: l, json: i } = e;
  if (!(!t || !r || !n)) {
    if (o != null)
      return { formMethod: t, formAction: r, formEncType: n, formData: void 0, json: void 0, text: o };
    if (l != null)
      return { formMethod: t, formAction: r, formEncType: n, formData: l, json: void 0, text: void 0 };
    if (i !== void 0)
      return { formMethod: t, formAction: r, formEncType: n, formData: void 0, json: i, text: void 0 };
  }
}
function af(e, t) {
  return t ? { state: "loading", location: e, formMethod: t.formMethod, formAction: t.formAction, formEncType: t.formEncType, formData: t.formData, json: t.json, text: t.text } : { state: "loading", location: e, formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0 };
}
function _E(e, t) {
  return { state: "submitting", location: e, formMethod: t.formMethod, formAction: t.formAction, formEncType: t.formEncType, formData: t.formData, json: t.json, text: t.text };
}
function di(e, t) {
  return e ? { state: "loading", formMethod: e.formMethod, formAction: e.formAction, formEncType: e.formEncType, formData: e.formData, json: e.json, text: e.text, data: t } : { state: "loading", formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0, data: t };
}
function NE(e, t) {
  return { state: "submitting", formMethod: e.formMethod, formAction: e.formAction, formEncType: e.formEncType, formData: e.formData, json: e.json, text: e.text, data: t ? t.data : void 0 };
}
function vn(e) {
  return { state: "idle", formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0, data: e };
}
function PE(e, t) {
  try {
    let r = e.sessionStorage.getItem(Kg);
    if (r) {
      let n = JSON.parse(r);
      for (let [o, l] of Object.entries(n || {}))
        l && Array.isArray(l) && t.set(o, new Set(l || []));
    }
  } catch {
  }
}
function bE(e, t) {
  if (t.size > 0) {
    let r = {};
    for (let [n, o] of t)
      r[n] = [...o];
    try {
      e.sessionStorage.setItem(Kg, JSON.stringify(r));
    } catch (n) {
      lr(false, "Failed to save applied view transitions in sessionStorage (" + n + ").");
    }
  }
}
var te;
var Cg;
var oe;
var Qx;
var Jx;
var Xx;
var Zx;
var qx;
var eE;
var tE;
var Ng;
var _t;
var Vg;
var cE;
var dE;
var hi;
var ir;
var gs;
var mi;
var io;
var vi;
var oo;
var Hg;
var hE;
var mE;
var vE;
var gE;
var yE;
var vs;
var Rs;
var gn;
var $g;
var Wg;
var Kg;
var Qg;
var gi = Uu(() => {
  (function(e) {
    e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
  })(te || (te = {}));
  Cg = "popstate";
  (function(e) {
    e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
  })(oe || (oe = {}));
  Qx = /* @__PURE__ */ new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
  Jx = /^:[\w-]+$/, Xx = 3, Zx = 2, qx = 1, eE = 10, tE = -2, Ng = (e) => e === "*";
  _t = (e) => e.join("/").replace(/\/\/+/g, "/"), Vg = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), cE = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, dE = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, hi = function(t, r) {
    r === void 0 && (r = {});
    let n = typeof r == "number" ? { status: r } : r, o = new Headers(n.headers);
    return o.has("Content-Type") || o.set("Content-Type", "application/json; charset=utf-8"), new Response(JSON.stringify(t), ee({}, n, { headers: o }));
  }, ir = class extends Error {
  }, gs = class {
    constructor(t, r) {
      this.pendingKeysSet = /* @__PURE__ */ new Set(), this.subscribers = /* @__PURE__ */ new Set(), this.deferredKeys = [], U(t && typeof t == "object" && !Array.isArray(t), "defer() only accepts plain objects");
      let n;
      this.abortPromise = new Promise((l, i) => n = i), this.controller = new AbortController();
      let o = () => n(new ir("Deferred data aborted"));
      this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", o), this.controller.signal.addEventListener("abort", o), this.data = Object.entries(t).reduce((l, i) => {
        let [a, s] = i;
        return Object.assign(l, { [a]: this.trackPromise(a, s) });
      }, {}), this.done && this.unlistenAbortSignal(), this.init = r;
    }
    trackPromise(t, r) {
      if (!(r instanceof Promise))
        return r;
      this.deferredKeys.push(t), this.pendingKeysSet.add(t);
      let n = Promise.race([r, this.abortPromise]).then((o) => this.onSettle(n, t, void 0, o), (o) => this.onSettle(n, t, o));
      return n.catch(() => {
      }), Object.defineProperty(n, "_tracked", { get: () => true }), n;
    }
    onSettle(t, r, n, o) {
      if (this.controller.signal.aborted && n instanceof ir)
        return this.unlistenAbortSignal(), Object.defineProperty(t, "_error", { get: () => n }), Promise.reject(n);
      if (this.pendingKeysSet.delete(r), this.done && this.unlistenAbortSignal(), n === void 0 && o === void 0) {
        let l = new Error('Deferred data for key "' + r + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
        return Object.defineProperty(t, "_error", { get: () => l }), this.emit(false, r), Promise.reject(l);
      }
      return o === void 0 ? (Object.defineProperty(t, "_error", { get: () => n }), this.emit(false, r), Promise.reject(n)) : (Object.defineProperty(t, "_data", { get: () => o }), this.emit(false, r), o);
    }
    emit(t, r) {
      this.subscribers.forEach((n) => n(t, r));
    }
    subscribe(t) {
      return this.subscribers.add(t), () => this.subscribers.delete(t);
    }
    cancel() {
      this.controller.abort(), this.pendingKeysSet.forEach((t, r) => this.pendingKeysSet.delete(r)), this.emit(true);
    }
    async resolveData(t) {
      let r = false;
      if (!this.done) {
        let n = () => this.cancel();
        t.addEventListener("abort", n), r = await new Promise((o) => {
          this.subscribe((l) => {
            t.removeEventListener("abort", n), (l || this.done) && o(l);
          });
        });
      }
      return r;
    }
    get done() {
      return this.pendingKeysSet.size === 0;
    }
    get unwrappedData() {
      return U(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds"), Object.entries(this.data).reduce((t, r) => {
        let [n, o] = r;
        return Object.assign(t, { [n]: pE(o) });
      }, {});
    }
    get pendingKeys() {
      return Array.from(this.pendingKeysSet);
    }
  };
  mi = function(t, r) {
    r === void 0 && (r = {});
    let n = typeof r == "number" ? { status: r } : r;
    return new gs(t, n);
  }, io = function(t, r) {
    r === void 0 && (r = 302);
    let n = r;
    typeof n == "number" ? n = { status: n } : typeof n.status > "u" && (n.status = 302);
    let o = new Headers(n.headers);
    return o.set("Location", t), new Response(null, ee({}, n, { headers: o }));
  }, vi = (e, t) => {
    let r = io(e, t);
    return r.headers.set("X-Remix-Reload-Document", "true"), r;
  }, oo = class {
    constructor(t, r, n, o) {
      o === void 0 && (o = false), this.status = t, this.statusText = r || "", this.internal = o, n instanceof Error ? (this.data = n.toString(), this.error = n) : this.data = n;
    }
  };
  Hg = ["post", "put", "patch", "delete"], hE = new Set(Hg), mE = ["get", ...Hg], vE = new Set(mE), gE = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), yE = /* @__PURE__ */ new Set([307, 308]), vs = { state: "idle", location: void 0, formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0 }, Rs = { state: "idle", data: void 0, formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0 }, gn = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 }, $g = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Wg = (e) => ({ hasErrorBoundary: Boolean(e.hasErrorBoundary) }), Kg = "remix-router-transitions";
  Qg = Symbol("deferred");
});
var iy = {};
xo(iy, { AbortedDeferredError: () => ir, Await: () => Ri, MemoryRouter: () => mf, Navigate: () => vf, NavigationType: () => te, Outlet: () => il, Route: () => zs, Router: () => gr, RouterProvider: () => UE, Routes: () => gf, UNSAFE_DataRouterContext: () => Qt, UNSAFE_DataRouterStateContext: () => ar, UNSAFE_LocationContext: () => En, UNSAFE_NavigationContext: () => et, UNSAFE_RouteContext: () => tt, UNSAFE_mapRouteProperties: () => ki, UNSAFE_useRouteId: () => xi, UNSAFE_useRoutesImpl: () => wi, createMemoryRouter: () => wf, createPath: () => De, createRoutesFromChildren: () => ao, createRoutesFromElements: () => ao, defer: () => mi, generatePath: () => el, isRouteErrorResponse: () => Wt, json: () => hi, matchPath: () => $t, matchRoutes: () => Ae, parsePath: () => _e, redirect: () => io, redirectDocument: () => vi, renderMatches: () => yf, resolvePath: () => lo, useActionData: () => Os, useAsyncError: () => ol, useAsyncValue: () => Ei, useBlocker: () => ll, useHref: () => zr, useInRouterContext: () => mr, useLoaderData: () => Fs, useLocation: () => be, useMatch: () => Ns, useMatches: () => _n, useNavigate: () => Rn, useNavigation: () => Cn, useNavigationType: () => _s, useOutlet: () => yi, useOutletContext: () => Ps, useParams: () => bs, useResolvedPath: () => vr, useRevalidator: () => Ds, useRouteError: () => so, useRouteLoaderData: () => Ms, useRoutes: () => Ls });
function xn() {
  return xn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, xn.apply(this, arguments);
}
function zr(e, t) {
  let { relative: r } = t === void 0 ? {} : t;
  mr() || U(false);
  let { basename: n, navigator: o } = N.useContext(et), { hash: l, pathname: i, search: a } = vr(e, { relative: r }), s = i;
  return n !== "/" && (s = i === "/" ? n : _t([n, i])), o.createHref({ pathname: s, search: a, hash: l });
}
function mr() {
  return N.useContext(En) != null;
}
function be() {
  return mr() || U(false), N.useContext(En).location;
}
function _s() {
  return N.useContext(En).navigationType;
}
function Ns(e) {
  mr() || U(false);
  let { pathname: t } = be();
  return N.useMemo(() => $t(e, t), [t, e]);
}
function ny(e) {
  N.useContext(et).static || N.useLayoutEffect(e);
}
function Rn() {
  let { isDataRoute: e } = N.useContext(tt);
  return e ? zE() : LE();
}
function LE() {
  mr() || U(false);
  let e = N.useContext(Qt), { basename: t, future: r, navigator: n } = N.useContext(et), { matches: o } = N.useContext(tt), { pathname: l } = be(), i = JSON.stringify(tl(o, r.v7_relativeSplatPath)), a = N.useRef(false);
  return ny(() => {
    a.current = true;
  }), N.useCallback(function(u, c) {
    if (c === void 0 && (c = {}), !a.current)
      return;
    if (typeof u == "number") {
      n.go(u);
      return;
    }
    let d = rl(u, JSON.parse(i), l, c.relative === "path");
    e == null && t !== "/" && (d.pathname = d.pathname === "/" ? t : _t([t, d.pathname])), (c.replace ? n.replace : n.push)(d, c.state, c);
  }, [t, n, i, l, e]);
}
function Ps() {
  return N.useContext(oy);
}
function yi(e) {
  let t = N.useContext(tt).outlet;
  return t && N.createElement(oy.Provider, { value: e }, t);
}
function bs() {
  let { matches: e } = N.useContext(tt), t = e[e.length - 1];
  return t ? t.params : {};
}
function vr(e, t) {
  let { relative: r } = t === void 0 ? {} : t, { future: n } = N.useContext(et), { matches: o } = N.useContext(tt), { pathname: l } = be(), i = JSON.stringify(tl(o, n.v7_relativeSplatPath));
  return N.useMemo(() => rl(e, JSON.parse(i), l, r === "path"), [e, i, l, r]);
}
function Ls(e, t) {
  return wi(e, t);
}
function wi(e, t, r, n) {
  mr() || U(false);
  let { navigator: o } = N.useContext(et), { matches: l } = N.useContext(tt), i = l[l.length - 1], a = i ? i.params : {}, s = i ? i.pathname : "/", u = i ? i.pathnameBase : "/", c = i && i.route, d = be(), p;
  if (t) {
    var v;
    let h = typeof t == "string" ? _e(t) : t;
    u === "/" || (v = h.pathname) != null && v.startsWith(u) || U(false), p = h;
  } else
    p = d;
  let g = p.pathname || "/", y = u === "/" ? g : g.slice(u.length) || "/", x = Ae(e, { pathname: y }), f = ly(x && x.map((h) => Object.assign({}, h, { params: Object.assign({}, a, h.params), pathname: _t([u, o.encodeLocation ? o.encodeLocation(h.pathname).pathname : h.pathname]), pathnameBase: h.pathnameBase === "/" ? u : _t([u, o.encodeLocation ? o.encodeLocation(h.pathnameBase).pathname : h.pathnameBase]) })), l, r, n);
  return t && f ? N.createElement(En.Provider, { value: { location: xn({ pathname: "/", search: "", hash: "", state: null, key: "default" }, p), navigationType: te.Pop } }, f) : f;
}
function TE() {
  let e = so(), t = Wt(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, n = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: n }, l = { padding: "2px 4px", backgroundColor: n };
  return N.createElement(N.Fragment, null, N.createElement("h2", null, "Unexpected Application Error!"), N.createElement("h3", { style: { fontStyle: "italic" } }, t), r ? N.createElement("pre", { style: o }, r) : null, null);
}
function FE(e) {
  let { routeContext: t, match: r, children: n } = e, o = N.useContext(Qt);
  return o && o.static && o.staticContext && (r.route.errorElement || r.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = r.route.id), N.createElement(tt.Provider, { value: t }, n);
}
function ly(e, t, r, n) {
  var o;
  if (t === void 0 && (t = []), r === void 0 && (r = null), n === void 0 && (n = null), e == null) {
    var l;
    if ((l = r) != null && l.errors)
      e = r.matches;
    else
      return null;
  }
  let i = e, a = (o = r) == null ? void 0 : o.errors;
  if (a != null) {
    let c = i.findIndex((d) => d.route.id && a?.[d.route.id]);
    c >= 0 || U(false), i = i.slice(0, Math.min(i.length, c + 1));
  }
  let s = false, u = -1;
  if (r && n && n.v7_partialHydration)
    for (let c = 0; c < i.length; c++) {
      let d = i[c];
      if ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (u = c), d.route.id) {
        let { loaderData: p, errors: v } = r, g = d.route.loader && p[d.route.id] === void 0 && (!v || v[d.route.id] === void 0);
        if (d.route.lazy || g) {
          s = true, u >= 0 ? i = i.slice(0, u + 1) : i = [i[0]];
          break;
        }
      }
    }
  return i.reduceRight((c, d, p) => {
    let v, g = false, y = null, x = null;
    r && (v = a && d.route.id ? a[d.route.id] : void 0, y = d.route.errorElement || DE, s && (u < 0 && p === 0 ? (IE("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration"), g = true, x = null) : u === p && (g = true, x = d.route.hydrateFallbackElement || null)));
    let f = t.concat(i.slice(0, p + 1)), h = () => {
      let m;
      return v ? m = y : g ? m = x : d.route.Component ? m = N.createElement(d.route.Component, null) : d.route.element ? m = d.route.element : m = c, N.createElement(FE, { match: d, routeContext: { outlet: c, matches: f, isDataRoute: r != null }, children: m });
    };
    return r && (d.route.ErrorBoundary || d.route.errorElement || p === 0) ? N.createElement(ff, { location: r.location, revalidation: r.revalidation, component: y, error: v, children: h(), routeContext: { outlet: null, matches: f, isDataRoute: true } }) : h();
  }, null);
}
function hf(e) {
  let t = N.useContext(Qt);
  return t || U(false), t;
}
function kn(e) {
  let t = N.useContext(ar);
  return t || U(false), t;
}
function ME(e) {
  let t = N.useContext(tt);
  return t || U(false), t;
}
function Si(e) {
  let t = ME(e), r = t.matches[t.matches.length - 1];
  return r.route.id || U(false), r.route.id;
}
function xi() {
  return Si(mt.UseRouteId);
}
function Cn() {
  return kn(mt.UseNavigation).navigation;
}
function Ds() {
  let e = hf(Ts.UseRevalidator), t = kn(mt.UseRevalidator);
  return N.useMemo(() => ({ revalidate: e.router.revalidate, state: t.revalidation }), [e.router.revalidate, t.revalidation]);
}
function _n() {
  let { matches: e, loaderData: t } = kn(mt.UseMatches);
  return N.useMemo(() => e.map((r) => Es(r, t)), [e, t]);
}
function Fs() {
  let e = kn(mt.UseLoaderData), t = Si(mt.UseLoaderData);
  if (e.errors && e.errors[t] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + t + ")");
    return;
  }
  return e.loaderData[t];
}
function Ms(e) {
  return kn(mt.UseRouteLoaderData).loaderData[e];
}
function Os() {
  let e = kn(mt.UseActionData), t = Si(mt.UseLoaderData);
  return e.actionData ? e.actionData[t] : void 0;
}
function so() {
  var e;
  let t = N.useContext(ry), r = kn(mt.UseRouteError), n = Si(mt.UseRouteError);
  return t !== void 0 ? t : (e = r.errors) == null ? void 0 : e[n];
}
function Ei() {
  let e = N.useContext(ks);
  return e?._data;
}
function ol() {
  let e = N.useContext(ks);
  return e?._error;
}
function ll(e) {
  let { router: t, basename: r } = hf(Ts.UseBlocker), n = kn(mt.UseBlocker), [o, l] = N.useState(""), i = N.useCallback((a) => {
    if (typeof e != "function")
      return !!e;
    if (r === "/")
      return e(a);
    let { currentLocation: s, nextLocation: u, historyAction: c } = a;
    return e({ currentLocation: xn({}, s, { pathname: qe(s.pathname, r) || s.pathname }), nextLocation: xn({}, u, { pathname: qe(u.pathname, r) || u.pathname }), historyAction: c });
  }, [r, e]);
  return N.useEffect(() => {
    let a = String(++OE);
    return l(a), () => t.deleteBlocker(a);
  }, [t]), N.useEffect(() => {
    o !== "" && t.getBlocker(o, i);
  }, [t, o, i]), o && n.blockers.has(o) ? n.blockers.get(o) : gn;
}
function zE() {
  let { router: e } = hf(Ts.UseNavigateStable), t = Si(mt.UseNavigateStable), r = N.useRef(false);
  return ny(() => {
    r.current = true;
  }), N.useCallback(function(o, l) {
    l === void 0 && (l = {}), r.current && (typeof o == "number" ? e.navigate(o) : e.navigate(o, xn({ fromRouteId: t }, l)));
  }, [e, t]);
}
function IE(e, t, r) {
  !t && !ty[e] && (ty[e] = true);
}
function UE(e) {
  let { fallbackElement: t, router: r, future: n } = e, [o, l] = N.useState(r.state), { v7_startTransition: i } = n || {}, a = N.useCallback((d) => {
    i && Cs ? Cs(() => l(d)) : l(d);
  }, [l, i]);
  N.useLayoutEffect(() => r.subscribe(a), [r, a]), N.useEffect(() => {
  }, []);
  let s = N.useMemo(() => ({ createHref: r.createHref, encodeLocation: r.encodeLocation, go: (d) => r.navigate(d), push: (d, p, v) => r.navigate(d, { state: p, preventScrollReset: v?.preventScrollReset }), replace: (d, p, v) => r.navigate(d, { replace: true, state: p, preventScrollReset: v?.preventScrollReset }) }), [r]), u = r.basename || "/", c = N.useMemo(() => ({ router: r, navigator: s, static: false, basename: u }), [r, s, u]);
  return N.createElement(N.Fragment, null, N.createElement(Qt.Provider, { value: c }, N.createElement(ar.Provider, { value: o }, N.createElement(gr, { basename: u, location: o.location, navigationType: o.historyAction, navigator: s, future: { v7_relativeSplatPath: r.future.v7_relativeSplatPath } }, o.initialized || r.future.v7_partialHydration ? N.createElement(jE, { routes: r.routes, future: r.future, state: o }) : t))), null);
}
function jE(e) {
  let { routes: t, future: r, state: n } = e;
  return wi(t, void 0, n, r);
}
function mf(e) {
  let { basename: t, children: r, initialEntries: n, initialIndex: o, future: l } = e, i = N.useRef();
  i.current == null && (i.current = ws({ initialEntries: n, initialIndex: o, v5Compat: true }));
  let a = i.current, [s, u] = N.useState({ action: a.action, location: a.location }), { v7_startTransition: c } = l || {}, d = N.useCallback((p) => {
    c && Cs ? Cs(() => u(p)) : u(p);
  }, [u, c]);
  return N.useLayoutEffect(() => a.listen(d), [a, d]), N.createElement(gr, { basename: t, children: r, location: s.location, navigationType: s.action, navigator: a, future: l });
}
function vf(e) {
  let { to: t, replace: r, state: n, relative: o } = e;
  mr() || U(false);
  let { future: l, static: i } = N.useContext(et), { matches: a } = N.useContext(tt), { pathname: s } = be(), u = Rn(), c = rl(t, tl(a, l.v7_relativeSplatPath), s, o === "path"), d = JSON.stringify(c);
  return N.useEffect(() => u(JSON.parse(d), { replace: r, state: n, relative: o }), [u, d, o, r, n]), null;
}
function il(e) {
  return yi(e.context);
}
function zs(e) {
  U(false);
}
function gr(e) {
  let { basename: t = "/", children: r = null, location: n, navigationType: o = te.Pop, navigator: l, static: i = false, future: a } = e;
  mr() && U(false);
  let s = t.replace(/^\/*/, "/"), u = N.useMemo(() => ({ basename: s, navigator: l, static: i, future: xn({ v7_relativeSplatPath: false }, a) }), [s, a, l, i]);
  typeof n == "string" && (n = _e(n));
  let { pathname: c = "/", search: d = "", hash: p = "", state: v = null, key: g = "default" } = n, y = N.useMemo(() => {
    let x = qe(c, s);
    return x == null ? null : { location: { pathname: x, search: d, hash: p, state: v, key: g }, navigationType: o };
  }, [s, c, d, p, v, g, o]);
  return y == null ? null : N.createElement(et.Provider, { value: u }, N.createElement(En.Provider, { children: r, value: y }));
}
function gf(e) {
  let { children: t, location: r } = e;
  return Ls(ao(t), r);
}
function Ri(e) {
  let { children: t, errorElement: r, resolve: n } = e;
  return N.createElement(pf, { resolve: n, errorElement: r }, N.createElement(VE, null, t));
}
function VE(e) {
  let { children: t } = e, r = Ei(), n = typeof t == "function" ? t(r) : t;
  return N.createElement(N.Fragment, null, n);
}
function ao(e, t) {
  t === void 0 && (t = []);
  let r = [];
  return N.Children.forEach(e, (n, o) => {
    if (!N.isValidElement(n))
      return;
    let l = [...t, o];
    if (n.type === N.Fragment) {
      r.push.apply(r, ao(n.props.children, l));
      return;
    }
    n.type !== zs && U(false), !n.props.index || !n.props.children || U(false);
    let i = { id: n.props.id || l.join("-"), caseSensitive: n.props.caseSensitive, element: n.props.element, Component: n.props.Component, index: n.props.index, path: n.props.path, loader: n.props.loader, action: n.props.action, errorElement: n.props.errorElement, ErrorBoundary: n.props.ErrorBoundary, hasErrorBoundary: n.props.ErrorBoundary != null || n.props.errorElement != null, shouldRevalidate: n.props.shouldRevalidate, handle: n.props.handle, lazy: n.props.lazy };
    n.props.children && (i.children = ao(n.props.children, l)), r.push(i);
  }), r;
}
function yf(e) {
  return ly(e);
}
function ki(e) {
  let t = { hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null };
  return e.Component && Object.assign(t, { element: N.createElement(e.Component), Component: void 0 }), e.HydrateFallback && Object.assign(t, { hydrateFallbackElement: N.createElement(e.HydrateFallback), HydrateFallback: void 0 }), e.ErrorBoundary && Object.assign(t, { errorElement: N.createElement(e.ErrorBoundary), ErrorBoundary: void 0 }), t;
}
function wf(e, t) {
  return nl({ basename: t?.basename, future: xn({}, t?.future, { v7_prependBasename: true }), history: ws({ initialEntries: t?.initialEntries, initialIndex: t?.initialIndex }), hydrationData: t?.hydrationData, routes: e, mapRouteProperties: ki }).initialize();
}
var N;
var Qt;
var ar;
var ks;
var et;
var En;
var tt;
var ry;
var oy;
var DE;
var ff;
var Ts;
var mt;
var OE;
var ty;
var AE;
var Cs;
var Kt;
var BE;
var pf;
var Is = Uu(() => {
  N = Ee(je());
  gi();
  gi();
  Qt = N.createContext(null), ar = N.createContext(null), ks = N.createContext(null), et = N.createContext(null), En = N.createContext(null), tt = N.createContext({ outlet: null, matches: [], isDataRoute: false }), ry = N.createContext(null);
  oy = N.createContext(null);
  DE = N.createElement(TE, null), ff = class extends N.Component {
    constructor(t) {
      super(t), this.state = { location: t.location, revalidation: t.revalidation, error: t.error };
    }
    static getDerivedStateFromError(t) {
      return { error: t };
    }
    static getDerivedStateFromProps(t, r) {
      return r.location !== t.location || r.revalidation !== "idle" && t.revalidation === "idle" ? { error: t.error, location: t.location, revalidation: t.revalidation } : { error: t.error !== void 0 ? t.error : r.error, location: r.location, revalidation: t.revalidation || r.revalidation };
    }
    componentDidCatch(t, r) {
      console.error("React Router caught the following error during render", t, r);
    }
    render() {
      return this.state.error !== void 0 ? N.createElement(tt.Provider, { value: this.props.routeContext }, N.createElement(ry.Provider, { value: this.state.error, children: this.props.component })) : this.props.children;
    }
  };
  Ts = function(e) {
    return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
  }(Ts || {}), mt = function(e) {
    return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
  }(mt || {});
  OE = 0;
  ty = {};
  AE = "startTransition", Cs = N[AE];
  Kt = function(e) {
    return e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error", e;
  }(Kt || {}), BE = new Promise(() => {
  }), pf = class extends N.Component {
    constructor(t) {
      super(t), this.state = { error: null };
    }
    static getDerivedStateFromError(t) {
      return { error: t };
    }
    componentDidCatch(t, r) {
      console.error("<Await> caught the following error during render", t, r);
    }
    render() {
      let { children: t, errorElement: r, resolve: n } = this.props, o = null, l = Kt.pending;
      if (!(n instanceof Promise))
        l = Kt.success, o = Promise.resolve(), Object.defineProperty(o, "_tracked", { get: () => true }), Object.defineProperty(o, "_data", { get: () => n });
      else if (this.state.error) {
        l = Kt.error;
        let i = this.state.error;
        o = Promise.reject().catch(() => {
        }), Object.defineProperty(o, "_tracked", { get: () => true }), Object.defineProperty(o, "_error", { get: () => i });
      } else
        n._tracked ? (o = n, l = o._error !== void 0 ? Kt.error : o._data !== void 0 ? Kt.success : Kt.pending) : (l = Kt.pending, Object.defineProperty(n, "_tracked", { get: () => true }), o = n.then((i) => Object.defineProperty(n, "_data", { get: () => i }), (i) => Object.defineProperty(n, "_error", { get: () => i })));
      if (l === Kt.error && o._error instanceof ir)
        throw BE;
      if (l === Kt.error && !r)
        throw o._error;
      if (l === Kt.error)
        return N.createElement(ks.Provider, { value: o, children: r });
      if (l === Kt.success)
        return N.createElement(ks.Provider, { value: o, children: t });
      throw o;
    }
  };
});
var yy = {};
xo(yy, { AbortedDeferredError: () => ir, Await: () => Ri, BrowserRouter: () => dR, Form: () => Nf, HashRouter: () => fR, Link: () => Hs, MemoryRouter: () => mf, NavLink: () => _f, Navigate: () => vf, NavigationType: () => te, Outlet: () => il, Route: () => zs, Router: () => gr, RouterProvider: () => uR, Routes: () => gf, ScrollRestoration: () => vR, UNSAFE_DataRouterContext: () => Qt, UNSAFE_DataRouterStateContext: () => ar, UNSAFE_FetchersContext: () => Cf, UNSAFE_LocationContext: () => En, UNSAFE_NavigationContext: () => et, UNSAFE_RouteContext: () => tt, UNSAFE_ViewTransitionContext: () => kf, UNSAFE_useRouteId: () => xi, UNSAFE_useScrollRestoration: () => Ks, createBrowserRouter: () => rR, createHashRouter: () => nR, createMemoryRouter: () => wf, createPath: () => De, createRoutesFromChildren: () => ao, createRoutesFromElements: () => ao, createSearchParams: () => Bs, defer: () => mi, generatePath: () => el, isRouteErrorResponse: () => Wt, json: () => hi, matchPath: () => $t, matchRoutes: () => Ae, parsePath: () => _e, redirect: () => io, redirectDocument: () => vi, renderMatches: () => yf, resolvePath: () => lo, unstable_HistoryRouter: () => pR, unstable_usePrompt: () => gy, unstable_useViewTransitionState: () => Lf, useActionData: () => Os, useAsyncError: () => ol, useAsyncValue: () => Ei, useBeforeUnload: () => vy, useBlocker: () => ll, useFetcher: () => hy, useFetchers: () => my, useFormAction: () => bf, useHref: () => zr, useInRouterContext: () => mr, useLinkClickHandler: () => dy, useLoaderData: () => Fs, useLocation: () => be, useMatch: () => Ns, useMatches: () => _n, useNavigate: () => Rn, useNavigation: () => Cn, useNavigationType: () => _s, useOutlet: () => yi, useOutletContext: () => Ps, useParams: () => bs, useResolvedPath: () => vr, useRevalidator: () => Ds, useRouteError: () => so, useRouteLoaderData: () => Ms, useRoutes: () => Ls, useSearchParams: () => fy, useSubmit: () => Ws });
function vt() {
  return vt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, vt.apply(this, arguments);
}
function Rf(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, l;
  for (l = 0; l < n.length; l++)
    o = n[l], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
function Vs(e) {
  return e != null && typeof e.tagName == "string";
}
function $E(e) {
  return Vs(e) && e.tagName.toLowerCase() === "button";
}
function WE(e) {
  return Vs(e) && e.tagName.toLowerCase() === "form";
}
function KE(e) {
  return Vs(e) && e.tagName.toLowerCase() === "input";
}
function QE(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function YE(e, t) {
  return e.button === 0 && (!t || t === "_self") && !QE(e);
}
function Bs(e) {
  return e === void 0 && (e = ""), new URLSearchParams(typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
    let n = e[r];
    return t.concat(Array.isArray(n) ? n.map((o) => [r, o]) : [[r, n]]);
  }, []));
}
function GE(e, t) {
  let r = Bs(e);
  return t && t.forEach((n, o) => {
    r.has(o) || t.getAll(o).forEach((l) => {
      r.append(o, l);
    });
  }), r;
}
function JE() {
  if (As === null)
    try {
      new FormData(document.createElement("form"), 0), As = false;
    } catch {
      As = true;
    }
  return As;
}
function xf(e) {
  return e != null && !XE.has(e) ? null : e;
}
function ZE(e, t) {
  let r, n, o, l, i;
  if (WE(e)) {
    let a = e.getAttribute("action");
    n = a ? qe(a, t) : null, r = e.getAttribute("method") || js, o = xf(e.getAttribute("enctype")) || Sf, l = new FormData(e);
  } else if ($E(e) || KE(e) && (e.type === "submit" || e.type === "image")) {
    let a = e.form;
    if (a == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let s = e.getAttribute("formaction") || a.getAttribute("action");
    if (n = s ? qe(s, t) : null, r = e.getAttribute("formmethod") || a.getAttribute("method") || js, o = xf(e.getAttribute("formenctype")) || xf(a.getAttribute("enctype")) || Sf, l = new FormData(a, e), !JE()) {
      let { name: u, type: c, value: d } = e;
      if (c === "image") {
        let p = u ? u + "." : "";
        l.append(p + "x", "0"), l.append(p + "y", "0");
      } else
        u && l.append(u, d);
    }
  } else {
    if (Vs(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    r = js, n = null, o = Sf, i = e;
  }
  return l && o === "text/plain" && (i = l, l = void 0), { action: n, method: r.toLowerCase(), encType: o, formData: l, body: i };
}
function rR(e, t) {
  return nl({ basename: t?.basename, future: vt({}, t?.future, { v7_prependBasename: true }), history: Ss({ window: t?.window }), hydrationData: t?.hydrationData || cy(), routes: e, mapRouteProperties: ki, window: t?.window }).initialize();
}
function nR(e, t) {
  return nl({ basename: t?.basename, future: vt({}, t?.future, { v7_prependBasename: true }), history: xs({ window: t?.window }), hydrationData: t?.hydrationData || cy(), routes: e, mapRouteProperties: ki, window: t?.window }).initialize();
}
function cy() {
  var e;
  let t = (e = window) == null ? void 0 : e.__staticRouterHydrationData;
  return t && t.errors && (t = vt({}, t, { errors: oR(t.errors) })), t;
}
function oR(e) {
  if (!e)
    return null;
  let t = Object.entries(e), r = {};
  for (let [n, o] of t)
    if (o && o.__type === "RouteErrorResponse")
      r[n] = new oo(o.status, o.statusText, o.data, o.internal === true);
    else if (o && o.__type === "Error") {
      if (o.__subType) {
        let l = window[o.__subType];
        if (typeof l == "function")
          try {
            let i = new l(o.message);
            i.stack = "", r[n] = i;
          } catch {
          }
      }
      if (r[n] == null) {
        let l = new Error(o.message);
        l.stack = "", r[n] = l;
      }
    } else
      r[n] = o;
  return r;
}
function sR(e) {
  Nn ? Nn(e) : e();
}
function Ci(e) {
  ay ? ay(e) : e();
}
function uR(e) {
  let { fallbackElement: t, router: r, future: n } = e, [o, l] = b.useState(r.state), [i, a] = b.useState(), [s, u] = b.useState({ isTransitioning: false }), [c, d] = b.useState(), [p, v] = b.useState(), [g, y] = b.useState(), x = b.useRef(/* @__PURE__ */ new Map()), { v7_startTransition: f } = n || {}, h = b.useCallback((C) => {
    f ? sR(C) : C();
  }, [f]), m = b.useCallback((C, P) => {
    let { deletedFetchers: T, unstable_flushSync: z, unstable_viewTransitionOpts: X } = P;
    T.forEach((le) => x.current.delete(le)), C.fetchers.forEach((le, Fe) => {
      le.data !== void 0 && x.current.set(Fe, le.data);
    });
    let H = r.window == null || typeof r.window.document.startViewTransition != "function";
    if (!X || H) {
      z ? Ci(() => l(C)) : h(() => l(C));
      return;
    }
    if (z) {
      Ci(() => {
        p && (c && c.resolve(), p.skipTransition()), u({ isTransitioning: true, flushSync: true, currentLocation: X.currentLocation, nextLocation: X.nextLocation });
      });
      let le = r.window.document.startViewTransition(() => {
        Ci(() => l(C));
      });
      le.finished.finally(() => {
        Ci(() => {
          d(void 0), v(void 0), a(void 0), u({ isTransitioning: false });
        });
      }), Ci(() => v(le));
      return;
    }
    p ? (c && c.resolve(), p.skipTransition(), y({ state: C, currentLocation: X.currentLocation, nextLocation: X.nextLocation })) : (a(C), u({ isTransitioning: true, flushSync: false, currentLocation: X.currentLocation, nextLocation: X.nextLocation }));
  }, [r.window, p, c, x, h]);
  b.useLayoutEffect(() => r.subscribe(m), [r, m]), b.useEffect(() => {
    s.isTransitioning && !s.flushSync && d(new Ef());
  }, [s]), b.useEffect(() => {
    if (c && i && r.window) {
      let C = i, P = c.promise, T = r.window.document.startViewTransition(async () => {
        h(() => l(C)), await P;
      });
      T.finished.finally(() => {
        d(void 0), v(void 0), a(void 0), u({ isTransitioning: false });
      }), v(T);
    }
  }, [h, i, c, r.window]), b.useEffect(() => {
    c && i && o.location.key === i.location.key && c.resolve();
  }, [c, p, o.location, i]), b.useEffect(() => {
    !s.isTransitioning && g && (a(g.state), u({ isTransitioning: true, flushSync: false, currentLocation: g.currentLocation, nextLocation: g.nextLocation }), y(void 0));
  }, [s.isTransitioning, g]), b.useEffect(() => {
  }, []);
  let E = b.useMemo(() => ({ createHref: r.createHref, encodeLocation: r.encodeLocation, go: (C) => r.navigate(C), push: (C, P, T) => r.navigate(C, { state: P, preventScrollReset: T?.preventScrollReset }), replace: (C, P, T) => r.navigate(C, { replace: true, state: P, preventScrollReset: T?.preventScrollReset }) }), [r]), k = r.basename || "/", w = b.useMemo(() => ({ router: r, navigator: E, static: false, basename: k }), [r, E, k]);
  return b.createElement(b.Fragment, null, b.createElement(Qt.Provider, { value: w }, b.createElement(ar.Provider, { value: o }, b.createElement(Cf.Provider, { value: x.current }, b.createElement(kf.Provider, { value: s }, b.createElement(gr, { basename: k, location: o.location, navigationType: o.historyAction, navigator: E, future: { v7_relativeSplatPath: r.future.v7_relativeSplatPath } }, o.initialized || r.future.v7_partialHydration ? b.createElement(cR, { routes: r.routes, future: r.future, state: o }) : t))))), null);
}
function cR(e) {
  let { routes: t, future: r, state: n } = e;
  return wi(t, void 0, n, r);
}
function dR(e) {
  let { basename: t, children: r, future: n, window: o } = e, l = b.useRef();
  l.current == null && (l.current = Ss({ window: o, v5Compat: true }));
  let i = l.current, [a, s] = b.useState({ action: i.action, location: i.location }), { v7_startTransition: u } = n || {}, c = b.useCallback((d) => {
    u && Nn ? Nn(() => s(d)) : s(d);
  }, [s, u]);
  return b.useLayoutEffect(() => i.listen(c), [i, c]), b.createElement(gr, { basename: t, children: r, location: a.location, navigationType: a.action, navigator: i, future: n });
}
function fR(e) {
  let { basename: t, children: r, future: n, window: o } = e, l = b.useRef();
  l.current == null && (l.current = xs({ window: o, v5Compat: true }));
  let i = l.current, [a, s] = b.useState({ action: i.action, location: i.location }), { v7_startTransition: u } = n || {}, c = b.useCallback((d) => {
    u && Nn ? Nn(() => s(d)) : s(d);
  }, [s, u]);
  return b.useLayoutEffect(() => i.listen(c), [i, c]), b.createElement(gr, { basename: t, children: r, location: a.location, navigationType: a.action, navigator: i, future: n });
}
function pR(e) {
  let { basename: t, children: r, future: n, history: o } = e, [l, i] = b.useState({ action: o.action, location: o.location }), { v7_startTransition: a } = n || {}, s = b.useCallback((u) => {
    a && Nn ? Nn(() => i(u)) : i(u);
  }, [i, a]);
  return b.useLayoutEffect(() => o.listen(s), [o, s]), b.createElement(gr, { basename: t, children: r, location: l.location, navigationType: l.action, navigator: o, future: n });
}
function vR(e) {
  let { getKey: t, storageKey: r } = e;
  return Ks({ getKey: t, storageKey: r }), null;
}
function $s(e) {
  let t = b.useContext(Qt);
  return t || U(false), t;
}
function Pf(e) {
  let t = b.useContext(ar);
  return t || U(false), t;
}
function dy(e, t) {
  let { target: r, replace: n, state: o, preventScrollReset: l, relative: i, unstable_viewTransition: a } = t === void 0 ? {} : t, s = Rn(), u = be(), c = vr(e, { relative: i });
  return b.useCallback((d) => {
    if (YE(d, r)) {
      d.preventDefault();
      let p = n !== void 0 ? n : De(u) === De(c);
      s(e, { replace: p, state: o, preventScrollReset: l, relative: i, unstable_viewTransition: a });
    }
  }, [u, s, c, n, o, r, e, l, i, a]);
}
function fy(e) {
  let t = b.useRef(Bs(e)), r = b.useRef(false), n = be(), o = b.useMemo(() => GE(n.search, r.current ? null : t.current), [n.search]), l = Rn(), i = b.useCallback((a, s) => {
    let u = Bs(typeof a == "function" ? a(o) : a);
    r.current = true, l("?" + u, s);
  }, [l, o]);
  return [o, i];
}
function gR() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
function Ws() {
  let { router: e } = $s(al.UseSubmit), { basename: t } = b.useContext(et), r = xi();
  return b.useCallback(function(n, o) {
    o === void 0 && (o = {}), gR();
    let { action: l, method: i, encType: a, formData: s, body: u } = ZE(n, t);
    if (o.navigate === false) {
      let c = o.fetcherKey || py();
      e.fetch(c, r, o.action || l, { preventScrollReset: o.preventScrollReset, formData: s, body: u, formMethod: o.method || i, formEncType: o.encType || a, unstable_flushSync: o.unstable_flushSync });
    } else
      e.navigate(o.action || l, { preventScrollReset: o.preventScrollReset, formData: s, body: u, formMethod: o.method || i, formEncType: o.encType || a, replace: o.replace, state: o.state, fromRouteId: r, unstable_flushSync: o.unstable_flushSync, unstable_viewTransition: o.unstable_viewTransition });
  }, [e, t, r]);
}
function bf(e, t) {
  let { relative: r } = t === void 0 ? {} : t, { basename: n } = b.useContext(et), o = b.useContext(tt);
  o || U(false);
  let [l] = o.matches.slice(-1), i = vt({}, vr(e || ".", { relative: r })), a = be();
  if (e == null) {
    i.search = a.search;
    let s = new URLSearchParams(i.search);
    s.has("index") && s.get("index") === "" && (s.delete("index"), i.search = s.toString() ? "?" + s.toString() : "");
  }
  return (!e || e === ".") && l.route.index && (i.search = i.search ? i.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (i.pathname = i.pathname === "/" ? n : _t([n, i.pathname])), De(i);
}
function hy(e) {
  var t;
  let { key: r } = e === void 0 ? {} : e, { router: n } = $s(al.UseFetcher), o = Pf(_i.UseFetcher), l = b.useContext(Cf), i = b.useContext(tt), a = (t = i.matches[i.matches.length - 1]) == null ? void 0 : t.route.id;
  l || U(false), i || U(false), a == null && U(false);
  let s = sy ? sy() : "", [u, c] = b.useState(r || s);
  r && r !== u ? c(r) : u || c(py()), b.useEffect(() => (n.getFetcher(u), () => {
    n.deleteFetcher(u);
  }), [n, u]);
  let d = b.useCallback((h, m) => {
    a || U(false), n.fetch(u, a, h, m);
  }, [u, a, n]), p = Ws(), v = b.useCallback((h, m) => {
    p(h, vt({}, m, { navigate: false, fetcherKey: u }));
  }, [u, p]), g = b.useMemo(() => b.forwardRef((m, E) => b.createElement(Nf, vt({}, m, { navigate: false, fetcherKey: u, ref: E }))), [u]), y = o.fetchers.get(u) || Rs, x = l.get(u);
  return b.useMemo(() => vt({ Form: g, submit: v, load: d }, y, { data: x }), [g, v, d, y, x]);
}
function my() {
  let e = Pf(_i.UseFetchers);
  return Array.from(e.fetchers.entries()).map((t) => {
    let [r, n] = t;
    return vt({}, n, { key: r });
  });
}
function Ks(e) {
  let { getKey: t, storageKey: r } = e === void 0 ? {} : e, { router: n } = $s(al.UseScrollRestoration), { restoreScrollPosition: o, preventScrollReset: l } = Pf(_i.UseScrollRestoration), { basename: i } = b.useContext(et), a = be(), s = _n(), u = Cn();
  b.useEffect(() => (window.history.scrollRestoration = "manual", () => {
    window.history.scrollRestoration = "auto";
  }), []), wR(b.useCallback(() => {
    if (u.state === "idle") {
      let c = (t ? t(a, s) : null) || a.key;
      Us[c] = window.scrollY;
    }
    try {
      sessionStorage.setItem(r || uy, JSON.stringify(Us));
    } catch {
    }
    window.history.scrollRestoration = "auto";
  }, [r, t, u.state, a, s])), typeof document < "u" && (b.useLayoutEffect(() => {
    try {
      let c = sessionStorage.getItem(r || uy);
      c && (Us = JSON.parse(c));
    } catch {
    }
  }, [r]), b.useLayoutEffect(() => {
    let c = t && i !== "/" ? (p, v) => t(vt({}, p, { pathname: qe(p.pathname, i) || p.pathname }), v) : t, d = n?.enableScrollRestoration(Us, () => window.scrollY, c);
    return () => d && d();
  }, [n, i, t]), b.useLayoutEffect(() => {
    if (o !== false) {
      if (typeof o == "number") {
        window.scrollTo(0, o);
        return;
      }
      if (a.hash) {
        let c = document.getElementById(decodeURIComponent(a.hash.slice(1)));
        if (c) {
          c.scrollIntoView();
          return;
        }
      }
      l !== true && window.scrollTo(0, 0);
    }
  }, [a, o, l]));
}
function vy(e, t) {
  let { capture: r } = t || {};
  b.useEffect(() => {
    let n = r != null ? { capture: r } : void 0;
    return window.addEventListener("beforeunload", e, n), () => {
      window.removeEventListener("beforeunload", e, n);
    };
  }, [e, r]);
}
function wR(e, t) {
  let { capture: r } = t || {};
  b.useEffect(() => {
    let n = r != null ? { capture: r } : void 0;
    return window.addEventListener("pagehide", e, n), () => {
      window.removeEventListener("pagehide", e, n);
    };
  }, [e, r]);
}
function gy(e) {
  let { when: t, message: r } = e, n = ll(t);
  b.useEffect(() => {
    n.state === "blocked" && (window.confirm(r) ? setTimeout(n.proceed, 0) : n.reset());
  }, [n, r]), b.useEffect(() => {
    n.state === "blocked" && !t && n.reset();
  }, [n, t]);
}
function Lf(e, t) {
  t === void 0 && (t = {});
  let r = b.useContext(kf);
  r == null && U(false);
  let { basename: n } = $s(al.useViewTransitionState), o = vr(e, { relative: t.relative });
  if (!r.isTransitioning)
    return false;
  let l = qe(r.currentLocation.pathname, n) || r.currentLocation.pathname, i = qe(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return $t(o.pathname, i) != null || $t(o.pathname, l) != null;
}
var b;
var HE;
var js;
var Sf;
var As;
var XE;
var qE;
var eR;
var tR;
var kf;
var Cf;
var lR;
var Nn;
var iR;
var ay;
var aR;
var sy;
var Ef;
var hR;
var mR;
var Hs;
var _f;
var Nf;
var al;
var _i;
var yR;
var py;
var uy;
var Us;
var Pn = Uu(() => {
  b = Ee(je()), HE = Ee(kg());
  Is();
  Is();
  gi();
  js = "get", Sf = "application/x-www-form-urlencoded";
  As = null;
  XE = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
  qE = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "unstable_viewTransition"], eR = ["aria-current", "caseSensitive", "className", "end", "style", "to", "unstable_viewTransition", "children"], tR = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "unstable_viewTransition"];
  kf = b.createContext({ isTransitioning: false }), Cf = b.createContext(/* @__PURE__ */ new Map()), lR = "startTransition", Nn = b[lR], iR = "flushSync", ay = HE[iR], aR = "useId", sy = b[aR];
  Ef = class {
    constructor() {
      this.status = "pending", this.promise = new Promise((t, r) => {
        this.resolve = (n) => {
          this.status === "pending" && (this.status = "resolved", t(n));
        }, this.reject = (n) => {
          this.status === "pending" && (this.status = "rejected", r(n));
        };
      });
    }
  };
  hR = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", mR = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Hs = b.forwardRef(function(t, r) {
    let { onClick: n, relative: o, reloadDocument: l, replace: i, state: a, target: s, to: u, preventScrollReset: c, unstable_viewTransition: d } = t, p = Rf(t, qE), { basename: v } = b.useContext(et), g, y = false;
    if (typeof u == "string" && mR.test(u) && (g = u, hR))
      try {
        let m = new URL(window.location.href), E = u.startsWith("//") ? new URL(m.protocol + u) : new URL(u), k = qe(E.pathname, v);
        E.origin === m.origin && k != null ? u = k + E.search + E.hash : y = true;
      } catch {
      }
    let x = zr(u, { relative: o }), f = dy(u, { replace: i, state: a, target: s, preventScrollReset: c, relative: o, unstable_viewTransition: d });
    function h(m) {
      n && n(m), m.defaultPrevented || f(m);
    }
    return b.createElement("a", vt({}, p, { href: g || x, onClick: y || l ? n : h, ref: r, target: s }));
  }), _f = b.forwardRef(function(t, r) {
    let { "aria-current": n = "page", caseSensitive: o = false, className: l = "", end: i = false, style: a, to: s, unstable_viewTransition: u, children: c } = t, d = Rf(t, eR), p = vr(s, { relative: d.relative }), v = be(), g = b.useContext(ar), { navigator: y } = b.useContext(et), x = g != null && Lf(p) && u === true, f = y.encodeLocation ? y.encodeLocation(p).pathname : p.pathname, h = v.pathname, m = g && g.navigation && g.navigation.location ? g.navigation.location.pathname : null;
    o || (h = h.toLowerCase(), m = m ? m.toLowerCase() : null, f = f.toLowerCase());
    let E = f !== "/" && f.endsWith("/") ? f.length - 1 : f.length, k = h === f || !i && h.startsWith(f) && h.charAt(E) === "/", w = m != null && (m === f || !i && m.startsWith(f) && m.charAt(f.length) === "/"), C = { isActive: k, isPending: w, isTransitioning: x }, P = k ? n : void 0, T;
    typeof l == "function" ? T = l(C) : T = [l, k ? "active" : null, w ? "pending" : null, x ? "transitioning" : null].filter(Boolean).join(" ");
    let z = typeof a == "function" ? a(C) : a;
    return b.createElement(Hs, vt({}, d, { "aria-current": P, className: T, ref: r, style: z, to: s, unstable_viewTransition: u }), typeof c == "function" ? c(C) : c);
  }), Nf = b.forwardRef((e, t) => {
    let { fetcherKey: r, navigate: n, reloadDocument: o, replace: l, state: i, method: a = js, action: s, onSubmit: u, relative: c, preventScrollReset: d, unstable_viewTransition: p } = e, v = Rf(e, tR), g = Ws(), y = bf(s, { relative: c }), x = a.toLowerCase() === "get" ? "get" : "post";
    return b.createElement("form", vt({ ref: t, method: x, action: y, onSubmit: o ? u : (h) => {
      if (u && u(h), h.defaultPrevented)
        return;
      h.preventDefault();
      let m = h.nativeEvent.submitter, E = m?.getAttribute("formmethod") || a;
      g(m || h.currentTarget, { fetcherKey: r, method: E, navigate: n, replace: l, state: i, relative: c, preventScrollReset: d, unstable_viewTransition: p });
    } }, v));
  });
  (function(e) {
    e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
  })(al || (al = {}));
  (function(e) {
    e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
  })(_i || (_i = {}));
  yR = 0, py = () => "__" + String(++yR) + "__";
  uy = "react-router-scroll-positions", Us = {};
});
var Vy = Ot((sl) => {
  "use strict";
  Object.defineProperty(sl, "__esModule", { value: true });
  var DR = je(), Ir = (gi(), ju(ey)), Vf = (Is(), ju(iy)), Ar = (Pn(), ju(yy));
  function FR(e) {
    if (e && e.__esModule)
      return e;
    var t = /* @__PURE__ */ Object.create(null);
    return e && Object.keys(e).forEach(function(r) {
      if (r !== "default") {
        var n = Object.getOwnPropertyDescriptor(e, r);
        Object.defineProperty(t, r, n.get ? n : { enumerable: true, get: function() {
          return e[r];
        } });
      }
    }), t.default = e, Object.freeze(t);
  }
  var yr = FR(DR);
  function MR({ basename: e, children: t, location: r = "/", future: n }) {
    typeof r == "string" && (r = Ar.parsePath(r));
    let o = Ir.Action.Pop, l = { pathname: r.pathname || "/", search: r.search || "", hash: r.hash || "", state: r.state || null, key: r.key || "default" }, i = Uy();
    return yr.createElement(Ar.Router, { basename: e, children: t, location: l, navigationType: o, navigator: i, future: n, static: true });
  }
  function OR({ context: e, router: t, hydrate: r = true, nonce: n }) {
    t && e || Ir.UNSAFE_invariant(false);
    let o = { router: t, navigator: Uy(), static: true, staticContext: e, basename: e.basename || "/" }, l = /* @__PURE__ */ new Map(), i = "";
    if (r !== false) {
      let s = { loaderData: e.loaderData, actionData: e.actionData, errors: IR(e.errors) };
      i = `window.__staticRouterHydrationData = JSON.parse(${HR(JSON.stringify(JSON.stringify(s)))});`;
    }
    let { state: a } = o.router;
    return yr.createElement(yr.Fragment, null, yr.createElement(Ar.UNSAFE_DataRouterContext.Provider, { value: o }, yr.createElement(Ar.UNSAFE_DataRouterStateContext.Provider, { value: a }, yr.createElement(Ar.UNSAFE_FetchersContext.Provider, { value: l }, yr.createElement(Ar.UNSAFE_ViewTransitionContext.Provider, { value: { isTransitioning: false } }, yr.createElement(Ar.Router, { basename: o.basename, location: a.location, navigationType: a.historyAction, navigator: o.navigator, static: o.static, future: { v7_relativeSplatPath: t.future.v7_relativeSplatPath } }, yr.createElement(zR, { routes: t.routes, future: t.future, state: a })))))), i ? yr.createElement("script", { suppressHydrationWarning: true, nonce: n, dangerouslySetInnerHTML: { __html: i } }) : null);
  }
  function zR({ routes: e, future: t, state: r }) {
    return Vf.UNSAFE_useRoutesImpl(e, void 0, r, t);
  }
  function IR(e) {
    if (!e)
      return null;
    let t = Object.entries(e), r = {};
    for (let [n, o] of t)
      Ir.isRouteErrorResponse(o) ? r[n] = { ...o, __type: "RouteErrorResponse" } : o instanceof Error ? r[n] = { message: o.message, __type: "Error", ...o.name !== "Error" ? { __subType: o.name } : {} } : r[n] = o;
    return r;
  }
  function Uy() {
    return { createHref: jy, encodeLocation: By, push(e) {
      throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(e)})\` somewhere in your app.`);
    }, replace(e) {
      throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(e)}, { replace: true })\` somewhere in your app.`);
    }, go(e) {
      throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${e})\` somewhere in your app.`);
    }, back() {
      throw new Error("You cannot use navigator.back() on the server because it is a stateless environment.");
    }, forward() {
      throw new Error("You cannot use navigator.forward() on the server because it is a stateless environment.");
    } };
  }
  function AR(e, t) {
    return Ir.createStaticHandler(e, { ...t, mapRouteProperties: Vf.UNSAFE_mapRouteProperties });
  }
  function UR(e, t, r = {}) {
    let n = {}, o = Ir.UNSAFE_convertRoutesToDataRoutes(e, Vf.UNSAFE_mapRouteProperties, void 0, n), l = t.matches.map((a) => {
      let s = n[a.route.id] || a.route;
      return { ...a, route: s };
    }), i = (a) => `You cannot use router.${a}() on the server because it is a stateless environment`;
    return { get basename() {
      return t.basename;
    }, get future() {
      return { v7_fetcherPersist: false, v7_normalizeFormMethod: false, v7_partialHydration: r.future?.v7_partialHydration === true, v7_prependBasename: false, v7_relativeSplatPath: r.future?.v7_relativeSplatPath === true };
    }, get state() {
      return { historyAction: Ir.Action.Pop, location: t.location, matches: l, loaderData: t.loaderData, actionData: t.actionData, errors: t.errors, initialized: true, navigation: Ir.IDLE_NAVIGATION, restoreScrollPosition: null, preventScrollReset: false, revalidation: "idle", fetchers: /* @__PURE__ */ new Map(), blockers: /* @__PURE__ */ new Map() };
    }, get routes() {
      return o;
    }, get window() {
    }, initialize() {
      throw i("initialize");
    }, subscribe() {
      throw i("subscribe");
    }, enableScrollRestoration() {
      throw i("enableScrollRestoration");
    }, navigate() {
      throw i("navigate");
    }, fetch() {
      throw i("fetch");
    }, revalidate() {
      throw i("revalidate");
    }, createHref: jy, encodeLocation: By, getFetcher() {
      return Ir.IDLE_FETCHER;
    }, deleteFetcher() {
      throw i("deleteFetcher");
    }, dispose() {
      throw i("dispose");
    }, getBlocker() {
      return Ir.IDLE_BLOCKER;
    }, deleteBlocker() {
      throw i("deleteBlocker");
    }, _internalFetchControllers: /* @__PURE__ */ new Map(), _internalActiveDeferreds: /* @__PURE__ */ new Map(), _internalSetRoutes() {
      throw i("_internalSetRoutes");
    } };
  }
  function jy(e) {
    return typeof e == "string" ? e : Ar.createPath(e);
  }
  function By(e) {
    let t = typeof e == "string" ? e : Ar.createPath(e), r = jR.test(t) ? new URL(t) : new URL(t, "http://localhost");
    return { pathname: r.pathname, search: r.search, hash: r.hash };
  }
  var jR = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, BR = { "&": "\\u0026", ">": "\\u003e", "<": "\\u003c", "\u2028": "\\u2028", "\u2029": "\\u2029" }, VR = /[&><\u2028\u2029]/g;
  function HR(e) {
    return e.replace(VR, (t) => BR[t]);
  }
  sl.StaticRouter = MR;
  sl.StaticRouterProvider = OR;
  sl.createStaticHandler = AR;
  sl.createStaticRouter = UR;
});
var M0 = Ot((ul) => {
  "use strict";
  var c0 = je();
  function $(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++)
      t += "&args[]=" + encodeURIComponent(arguments[r]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var gt = Object.prototype.hasOwnProperty, KR = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, $y = {}, Wy = {};
  function d0(e) {
    return gt.call(Wy, e) ? true : gt.call($y, e) ? false : KR.test(e) ? Wy[e] = true : ($y[e] = true, false);
  }
  function st(e, t, r, n, o, l, i) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = n, this.attributeNamespace = o, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = l, this.removeEmptyString = i;
  }
  var We = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    We[e] = new st(e, 0, false, e, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    We[t] = new st(t, 1, false, e[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    We[e] = new st(e, 2, false, e.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    We[e] = new st(e, 2, false, e, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    We[e] = new st(e, 3, false, e.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    We[e] = new st(e, 3, true, e, null, false, false);
  });
  ["capture", "download"].forEach(function(e) {
    We[e] = new st(e, 4, false, e, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(e) {
    We[e] = new st(e, 6, false, e, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(e) {
    We[e] = new st(e, 5, false, e.toLowerCase(), null, false, false);
  });
  var Zf = /[\-:]([a-z])/g;
  function qf(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(Zf, qf);
    We[t] = new st(t, 1, false, e, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Zf, qf);
    We[t] = new st(t, 1, false, e, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Zf, qf);
    We[t] = new st(t, 1, false, e, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(e) {
    We[e] = new st(e, 1, false, e.toLowerCase(), null, false, false);
  });
  We.xlinkHref = new st("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(e) {
    We[e] = new st(e, 1, false, e.toLowerCase(), null, true, true);
  });
  var ru = { animationIterationCount: true, aspectRatio: true, borderImageOutset: true, borderImageSlice: true, borderImageWidth: true, boxFlex: true, boxFlexGroup: true, boxOrdinalGroup: true, columnCount: true, columns: true, flex: true, flexGrow: true, flexPositive: true, flexShrink: true, flexNegative: true, flexOrder: true, gridArea: true, gridRow: true, gridRowEnd: true, gridRowSpan: true, gridRowStart: true, gridColumn: true, gridColumnEnd: true, gridColumnSpan: true, gridColumnStart: true, fontWeight: true, lineClamp: true, lineHeight: true, opacity: true, order: true, orphans: true, tabSize: true, widows: true, zIndex: true, zoom: true, fillOpacity: true, floodOpacity: true, stopOpacity: true, strokeDasharray: true, strokeDashoffset: true, strokeMiterlimit: true, strokeOpacity: true, strokeWidth: true }, QR = ["Webkit", "ms", "Moz", "O"];
  Object.keys(ru).forEach(function(e) {
    QR.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), ru[t] = ru[e];
    });
  });
  var YR = /["'&<>]/;
  function at(e) {
    if (typeof e == "boolean" || typeof e == "number")
      return "" + e;
    e = "" + e;
    var t = YR.exec(e);
    if (t) {
      var r = "", n, o = 0;
      for (n = t.index; n < e.length; n++) {
        switch (e.charCodeAt(n)) {
          case 34:
            t = "&quot;";
            break;
          case 38:
            t = "&amp;";
            break;
          case 39:
            t = "&#x27;";
            break;
          case 60:
            t = "&lt;";
            break;
          case 62:
            t = "&gt;";
            break;
          default:
            continue;
        }
        o !== n && (r += e.substring(o, n)), o = n + 1, r += t;
      }
      e = o !== n ? r + e.substring(o, n) : r;
    }
    return e;
  }
  var GR = /([A-Z])/g, JR = /^ms-/, Qf = Array.isArray;
  function Ur(e, t) {
    return { insertionMode: e, selectedValue: t };
  }
  function XR(e, t, r) {
    switch (t) {
      case "select":
        return Ur(1, r.value != null ? r.value : r.defaultValue);
      case "svg":
        return Ur(2, null);
      case "math":
        return Ur(3, null);
      case "foreignObject":
        return Ur(1, null);
      case "table":
        return Ur(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return Ur(5, null);
      case "colgroup":
        return Ur(7, null);
      case "tr":
        return Ur(6, null);
    }
    return 4 <= e.insertionMode || e.insertionMode === 0 ? Ur(1, null) : e;
  }
  var Ky = /* @__PURE__ */ new Map();
  function f0(e, t, r) {
    if (typeof r != "object")
      throw Error($(62));
    t = true;
    for (var n in r)
      if (gt.call(r, n)) {
        var o = r[n];
        if (o != null && typeof o != "boolean" && o !== "") {
          if (n.indexOf("--") === 0) {
            var l = at(n);
            o = at(("" + o).trim());
          } else {
            l = n;
            var i = Ky.get(l);
            i !== void 0 || (i = at(l.replace(GR, "-$1").toLowerCase().replace(JR, "-ms-")), Ky.set(l, i)), l = i, o = typeof o == "number" ? o === 0 || gt.call(ru, n) ? "" + o : o + "px" : at(("" + o).trim());
          }
          t ? (t = false, e.push(' style="', l, ":", o)) : e.push(";", l, ":", o);
        }
      }
    t || e.push('"');
  }
  function Nt(e, t, r, n) {
    switch (r) {
      case "style":
        f0(e, t, n);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") {
      if (t = We.hasOwnProperty(r) ? We[r] : null, t !== null) {
        switch (typeof n) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!t.acceptsBooleans)
              return;
        }
        switch (r = t.attributeName, t.type) {
          case 3:
            n && e.push(" ", r, '=""');
            break;
          case 4:
            n === true ? e.push(" ", r, '=""') : n !== false && e.push(" ", r, '="', at(n), '"');
            break;
          case 5:
            isNaN(n) || e.push(" ", r, '="', at(n), '"');
            break;
          case 6:
            !isNaN(n) && 1 <= n && e.push(" ", r, '="', at(n), '"');
            break;
          default:
            t.sanitizeURL && (n = "" + n), e.push(" ", r, '="', at(n), '"');
        }
      } else if (d0(r)) {
        switch (typeof n) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (t = r.toLowerCase().slice(0, 5), t !== "data-" && t !== "aria-")
              return;
        }
        e.push(" ", r, '="', at(n), '"');
      }
    }
  }
  function nu(e, t, r) {
    if (t != null) {
      if (r != null)
        throw Error($(60));
      if (typeof t != "object" || !("__html" in t))
        throw Error($(61));
      t = t.__html, t != null && e.push("" + t);
    }
  }
  function ZR(e) {
    var t = "";
    return c0.Children.forEach(e, function(r) {
      r != null && (t += r);
    }), t;
  }
  function $f(e, t, r, n) {
    e.push(wr(r));
    var o = r = null, l;
    for (l in t)
      if (gt.call(t, l)) {
        var i = t[l];
        if (i != null)
          switch (l) {
            case "children":
              r = i;
              break;
            case "dangerouslySetInnerHTML":
              o = i;
              break;
            default:
              Nt(e, n, l, i);
          }
      }
    return e.push(">"), nu(e, o, r), typeof r == "string" ? (e.push(at(r)), null) : r;
  }
  var qR = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Qy = /* @__PURE__ */ new Map();
  function wr(e) {
    var t = Qy.get(e);
    if (t === void 0) {
      if (!qR.test(e))
        throw Error($(65, e));
      t = "<" + e, Qy.set(e, t);
    }
    return t;
  }
  function ek(e, t, r, n, o) {
    switch (t) {
      case "select":
        e.push(wr("select"));
        var l = null, i = null;
        for (c in r)
          if (gt.call(r, c)) {
            var a = r[c];
            if (a != null)
              switch (c) {
                case "children":
                  l = a;
                  break;
                case "dangerouslySetInnerHTML":
                  i = a;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  Nt(e, n, c, a);
              }
          }
        return e.push(">"), nu(e, i, l), l;
      case "option":
        i = o.selectedValue, e.push(wr("option"));
        var s = a = null, u = null, c = null;
        for (l in r)
          if (gt.call(r, l)) {
            var d = r[l];
            if (d != null)
              switch (l) {
                case "children":
                  a = d;
                  break;
                case "selected":
                  u = d;
                  break;
                case "dangerouslySetInnerHTML":
                  c = d;
                  break;
                case "value":
                  s = d;
                default:
                  Nt(e, n, l, d);
              }
          }
        if (i != null)
          if (r = s !== null ? "" + s : ZR(a), Qf(i)) {
            for (n = 0; n < i.length; n++)
              if ("" + i[n] === r) {
                e.push(' selected=""');
                break;
              }
          } else
            "" + i === r && e.push(' selected=""');
        else
          u && e.push(' selected=""');
        return e.push(">"), nu(e, c, a), a;
      case "textarea":
        e.push(wr("textarea")), c = i = l = null;
        for (a in r)
          if (gt.call(r, a) && (s = r[a], s != null))
            switch (a) {
              case "children":
                c = s;
                break;
              case "value":
                l = s;
                break;
              case "defaultValue":
                i = s;
                break;
              case "dangerouslySetInnerHTML":
                throw Error($(91));
              default:
                Nt(e, n, a, s);
            }
        if (l === null && i !== null && (l = i), e.push(">"), c != null) {
          if (l != null)
            throw Error($(92));
          if (Qf(c) && 1 < c.length)
            throw Error($(93));
          l = "" + c;
        }
        return typeof l == "string" && l[0] === `
` && e.push(`
`), l !== null && e.push(at("" + l)), null;
      case "input":
        e.push(wr("input")), s = c = a = l = null;
        for (i in r)
          if (gt.call(r, i) && (u = r[i], u != null))
            switch (i) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error($(399, "input"));
              case "defaultChecked":
                s = u;
                break;
              case "defaultValue":
                a = u;
                break;
              case "checked":
                c = u;
                break;
              case "value":
                l = u;
                break;
              default:
                Nt(e, n, i, u);
            }
        return c !== null ? Nt(e, n, "checked", c) : s !== null && Nt(e, n, "checked", s), l !== null ? Nt(e, n, "value", l) : a !== null && Nt(e, n, "value", a), e.push("/>"), null;
      case "menuitem":
        e.push(wr("menuitem"));
        for (var p in r)
          if (gt.call(r, p) && (l = r[p], l != null))
            switch (p) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error($(400));
              default:
                Nt(e, n, p, l);
            }
        return e.push(">"), null;
      case "title":
        e.push(wr("title")), l = null;
        for (d in r)
          if (gt.call(r, d) && (i = r[d], i != null))
            switch (d) {
              case "children":
                l = i;
                break;
              case "dangerouslySetInnerHTML":
                throw Error($(434));
              default:
                Nt(e, n, d, i);
            }
        return e.push(">"), l;
      case "listing":
      case "pre":
        e.push(wr(t)), i = l = null;
        for (s in r)
          if (gt.call(r, s) && (a = r[s], a != null))
            switch (s) {
              case "children":
                l = a;
                break;
              case "dangerouslySetInnerHTML":
                i = a;
                break;
              default:
                Nt(e, n, s, a);
            }
        if (e.push(">"), i != null) {
          if (l != null)
            throw Error($(60));
          if (typeof i != "object" || !("__html" in i))
            throw Error($(61));
          r = i.__html, r != null && (typeof r == "string" && 0 < r.length && r[0] === `
` ? e.push(`
`, r) : e.push("" + r));
        }
        return typeof l == "string" && l[0] === `
` && e.push(`
`), l;
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        e.push(wr(t));
        for (var v in r)
          if (gt.call(r, v) && (l = r[v], l != null))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error($(399, t));
              default:
                Nt(e, n, v, l);
            }
        return e.push("/>"), null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return $f(e, r, t, n);
      case "html":
        return o.insertionMode === 0 && e.push("<!DOCTYPE html>"), $f(e, r, t, n);
      default:
        if (t.indexOf("-") === -1 && typeof r.is != "string")
          return $f(e, r, t, n);
        e.push(wr(t)), i = l = null;
        for (u in r)
          if (gt.call(r, u) && (a = r[u], a != null))
            switch (u) {
              case "children":
                l = a;
                break;
              case "dangerouslySetInnerHTML":
                i = a;
                break;
              case "style":
                f0(e, n, a);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                d0(u) && typeof a != "function" && typeof a != "symbol" && e.push(" ", u, '="', at(a), '"');
            }
        return e.push(">"), nu(e, i, l), l;
    }
  }
  function Yy(e, t, r) {
    if (e.push('<!--$?--><template id="'), r === null)
      throw Error($(395));
    return e.push(r), e.push('"></template>');
  }
  function tk(e, t, r, n) {
    switch (r.insertionMode) {
      case 0:
      case 1:
        return e.push('<div hidden id="'), e.push(t.segmentPrefix), t = n.toString(16), e.push(t), e.push('">');
      case 2:
        return e.push('<svg aria-hidden="true" style="display:none" id="'), e.push(t.segmentPrefix), t = n.toString(16), e.push(t), e.push('">');
      case 3:
        return e.push('<math aria-hidden="true" style="display:none" id="'), e.push(t.segmentPrefix), t = n.toString(16), e.push(t), e.push('">');
      case 4:
        return e.push('<table hidden id="'), e.push(t.segmentPrefix), t = n.toString(16), e.push(t), e.push('">');
      case 5:
        return e.push('<table hidden><tbody id="'), e.push(t.segmentPrefix), t = n.toString(16), e.push(t), e.push('">');
      case 6:
        return e.push('<table hidden><tr id="'), e.push(t.segmentPrefix), t = n.toString(16), e.push(t), e.push('">');
      case 7:
        return e.push('<table hidden><colgroup id="'), e.push(t.segmentPrefix), t = n.toString(16), e.push(t), e.push('">');
      default:
        throw Error($(397));
    }
  }
  function rk(e, t) {
    switch (t.insertionMode) {
      case 0:
      case 1:
        return e.push("</div>");
      case 2:
        return e.push("</svg>");
      case 3:
        return e.push("</math>");
      case 4:
        return e.push("</table>");
      case 5:
        return e.push("</tbody></table>");
      case 6:
        return e.push("</tr></table>");
      case 7:
        return e.push("</colgroup></table>");
      default:
        throw Error($(397));
    }
  }
  var nk = /[<\u2028\u2029]/g;
  function Wf(e) {
    return JSON.stringify(e).replace(nk, function(t) {
      switch (t) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  function ok(e, t) {
    return t = t === void 0 ? "" : t, { bootstrapChunks: [], startInlineScript: "<script>", placeholderPrefix: t + "P:", segmentPrefix: t + "S:", boundaryPrefix: t + "B:", idPrefix: t, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false, generateStaticMarkup: e };
  }
  function Gy(e, t, r, n) {
    return r.generateStaticMarkup ? (e.push(at(t)), false) : (t === "" ? e = n : (n && e.push("<!-- -->"), e.push(at(t)), e = true), e);
  }
  var Fi = Object.assign, lk = Symbol.for("react.element"), p0 = Symbol.for("react.portal"), h0 = Symbol.for("react.fragment"), m0 = Symbol.for("react.strict_mode"), v0 = Symbol.for("react.profiler"), g0 = Symbol.for("react.provider"), y0 = Symbol.for("react.context"), w0 = Symbol.for("react.forward_ref"), S0 = Symbol.for("react.suspense"), x0 = Symbol.for("react.suspense_list"), E0 = Symbol.for("react.memo"), ep = Symbol.for("react.lazy"), ik = Symbol.for("react.scope"), ak = Symbol.for("react.debug_trace_mode"), sk = Symbol.for("react.legacy_hidden"), uk = Symbol.for("react.default_value"), Jy = Symbol.iterator;
  function Yf(e) {
    if (e == null)
      return null;
    if (typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case h0:
        return "Fragment";
      case p0:
        return "Portal";
      case v0:
        return "Profiler";
      case m0:
        return "StrictMode";
      case S0:
        return "Suspense";
      case x0:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case y0:
          return (e.displayName || "Context") + ".Consumer";
        case g0:
          return (e._context.displayName || "Context") + ".Provider";
        case w0:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case E0:
          return t = e.displayName || null, t !== null ? t : Yf(e.type) || "Memo";
        case ep:
          t = e._payload, e = e._init;
          try {
            return Yf(e(t));
          } catch {
          }
      }
    return null;
  }
  var R0 = {};
  function Xy(e, t) {
    if (e = e.contextTypes, !e)
      return R0;
    var r = {}, n;
    for (n in e)
      r[n] = t[n];
    return r;
  }
  var fo = null;
  function fu(e, t) {
    if (e !== t) {
      e.context._currentValue2 = e.parentValue, e = e.parent;
      var r = t.parent;
      if (e === null) {
        if (r !== null)
          throw Error($(401));
      } else {
        if (r === null)
          throw Error($(401));
        fu(e, r);
      }
      t.context._currentValue2 = t.value;
    }
  }
  function k0(e) {
    e.context._currentValue2 = e.parentValue, e = e.parent, e !== null && k0(e);
  }
  function C0(e) {
    var t = e.parent;
    t !== null && C0(t), e.context._currentValue2 = e.value;
  }
  function _0(e, t) {
    if (e.context._currentValue2 = e.parentValue, e = e.parent, e === null)
      throw Error($(402));
    e.depth === t.depth ? fu(e, t) : _0(e, t);
  }
  function N0(e, t) {
    var r = t.parent;
    if (r === null)
      throw Error($(402));
    e.depth === r.depth ? fu(e, r) : N0(e, r), t.context._currentValue2 = t.value;
  }
  function au(e) {
    var t = fo;
    t !== e && (t === null ? C0(e) : e === null ? k0(t) : t.depth === e.depth ? fu(t, e) : t.depth > e.depth ? _0(t, e) : N0(t, e), fo = e);
  }
  var Zy = { isMounted: function() {
    return false;
  }, enqueueSetState: function(e, t) {
    e = e._reactInternals, e.queue !== null && e.queue.push(t);
  }, enqueueReplaceState: function(e, t) {
    e = e._reactInternals, e.replace = true, e.queue = [t];
  }, enqueueForceUpdate: function() {
  } };
  function qy(e, t, r, n) {
    var o = e.state !== void 0 ? e.state : null;
    e.updater = Zy, e.props = r, e.state = o;
    var l = { queue: [], replace: false };
    e._reactInternals = l;
    var i = t.contextType;
    if (e.context = typeof i == "object" && i !== null ? i._currentValue2 : n, i = t.getDerivedStateFromProps, typeof i == "function" && (i = i(r, o), o = i == null ? o : Fi({}, o, i), e.state = o), typeof t.getDerivedStateFromProps != "function" && typeof e.getSnapshotBeforeUpdate != "function" && (typeof e.UNSAFE_componentWillMount == "function" || typeof e.componentWillMount == "function"))
      if (t = e.state, typeof e.componentWillMount == "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount(), t !== e.state && Zy.enqueueReplaceState(e, e.state, null), l.queue !== null && 0 < l.queue.length)
        if (t = l.queue, i = l.replace, l.queue = null, l.replace = false, i && t.length === 1)
          e.state = t[0];
        else {
          for (l = i ? t[0] : e.state, o = true, i = i ? 1 : 0; i < t.length; i++) {
            var a = t[i];
            a = typeof a == "function" ? a.call(e, l, r, n) : a, a != null && (o ? (o = false, l = Fi({}, l, a)) : Fi(l, a));
          }
          e.state = l;
        }
      else
        l.queue = null;
  }
  var ck = { id: 1, overflow: "" };
  function Gf(e, t, r) {
    var n = e.id;
    e = e.overflow;
    var o = 32 - ou(n) - 1;
    n &= ~(1 << o), r += 1;
    var l = 32 - ou(t) + o;
    if (30 < l) {
      var i = o - o % 5;
      return l = (n & (1 << i) - 1).toString(32), n >>= i, o -= i, { id: 1 << 32 - ou(t) + o | r << o | n, overflow: l + e };
    }
    return { id: 1 << l | r << o | n, overflow: e };
  }
  var ou = Math.clz32 ? Math.clz32 : pk, dk = Math.log, fk = Math.LN2;
  function pk(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (dk(e) / fk | 0) | 0;
  }
  function hk(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var mk = typeof Object.is == "function" ? Object.is : hk, jr = null, tp = null, lu = null, ue = null, Ti = false, su = false, Mi = 0, Tn = null, pu = 0;
  function co() {
    if (jr === null)
      throw Error($(321));
    return jr;
  }
  function e0() {
    if (0 < pu)
      throw Error($(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function rp() {
    return ue === null ? lu === null ? (Ti = false, lu = ue = e0()) : (Ti = true, ue = lu) : ue.next === null ? (Ti = false, ue = ue.next = e0()) : (Ti = true, ue = ue.next), ue;
  }
  function np() {
    tp = jr = null, su = false, lu = null, pu = 0, ue = Tn = null;
  }
  function P0(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function t0(e, t, r) {
    if (jr = co(), ue = rp(), Ti) {
      var n = ue.queue;
      if (t = n.dispatch, Tn !== null && (r = Tn.get(n), r !== void 0)) {
        Tn.delete(n), n = ue.memoizedState;
        do
          n = e(n, r.action), r = r.next;
        while (r !== null);
        return ue.memoizedState = n, [n, t];
      }
      return [ue.memoizedState, t];
    }
    return e = e === P0 ? typeof t == "function" ? t() : t : r !== void 0 ? r(t) : t, ue.memoizedState = e, e = ue.queue = { last: null, dispatch: null }, e = e.dispatch = vk.bind(null, jr, e), [ue.memoizedState, e];
  }
  function r0(e, t) {
    if (jr = co(), ue = rp(), t = t === void 0 ? null : t, ue !== null) {
      var r = ue.memoizedState;
      if (r !== null && t !== null) {
        var n = r[1];
        e:
          if (n === null)
            n = false;
          else {
            for (var o = 0; o < n.length && o < t.length; o++)
              if (!mk(t[o], n[o])) {
                n = false;
                break e;
              }
            n = true;
          }
        if (n)
          return r[0];
      }
    }
    return e = e(), ue.memoizedState = [e, t], e;
  }
  function vk(e, t, r) {
    if (25 <= pu)
      throw Error($(301));
    if (e === jr)
      if (su = true, e = { action: r, next: null }, Tn === null && (Tn = /* @__PURE__ */ new Map()), r = Tn.get(t), r === void 0)
        Tn.set(t, e);
      else {
        for (t = r; t.next !== null; )
          t = t.next;
        t.next = e;
      }
  }
  function gk() {
    throw Error($(394));
  }
  function eu() {
  }
  var n0 = { readContext: function(e) {
    return e._currentValue2;
  }, useContext: function(e) {
    return co(), e._currentValue2;
  }, useMemo: r0, useReducer: t0, useRef: function(e) {
    jr = co(), ue = rp();
    var t = ue.memoizedState;
    return t === null ? (e = { current: e }, ue.memoizedState = e) : t;
  }, useState: function(e) {
    return t0(P0, e);
  }, useInsertionEffect: eu, useLayoutEffect: function() {
  }, useCallback: function(e, t) {
    return r0(function() {
      return e;
    }, t);
  }, useImperativeHandle: eu, useEffect: eu, useDebugValue: eu, useDeferredValue: function(e) {
    return co(), e;
  }, useTransition: function() {
    return co(), [false, gk];
  }, useId: function() {
    var e = tp.treeContext, t = e.overflow;
    e = e.id, e = (e & ~(1 << 32 - ou(e) - 1)).toString(32) + t;
    var r = iu;
    if (r === null)
      throw Error($(404));
    return t = Mi++, e = ":" + r.idPrefix + "R" + e, 0 < t && (e += "H" + t.toString(32)), e + ":";
  }, useMutableSource: function(e, t) {
    return co(), t(e._source);
  }, useSyncExternalStore: function(e, t, r) {
    if (r === void 0)
      throw Error($(407));
    return r();
  } }, iu = null, Kf = c0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
  function yk(e) {
    return console.error(e), null;
  }
  function Di() {
  }
  function wk(e, t, r, n, o, l, i, a, s) {
    var u = [], c = /* @__PURE__ */ new Set();
    return t = { destination: null, responseState: t, progressiveChunkSize: n === void 0 ? 12800 : n, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: c, pingedTasks: u, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: o === void 0 ? yk : o, onAllReady: l === void 0 ? Di : l, onShellReady: i === void 0 ? Di : i, onShellError: a === void 0 ? Di : a, onFatalError: s === void 0 ? Di : s }, r = uu(t, 0, null, r, false, false), r.parentFlushed = true, e = op(t, e, null, r, c, R0, null, ck), u.push(e), t;
  }
  function op(e, t, r, n, o, l, i, a) {
    e.allPendingTasks++, r === null ? e.pendingRootTasks++ : r.pendingTasks++;
    var s = { node: t, ping: function() {
      var u = e.pingedTasks;
      u.push(s), u.length === 1 && T0(e);
    }, blockedBoundary: r, blockedSegment: n, abortSet: o, legacyContext: l, context: i, treeContext: a };
    return o.add(s), s;
  }
  function uu(e, t, r, n, o, l) {
    return { status: 0, id: -1, index: t, parentFlushed: false, chunks: [], children: [], formatContext: n, boundary: r, lastPushedText: o, textEmbedded: l };
  }
  function Oi(e, t) {
    if (e = e.onError(t), e != null && typeof e != "string")
      throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof e + '" instead');
    return e;
  }
  function cu(e, t) {
    var r = e.onShellError;
    r(t), r = e.onFatalError, r(t), e.destination !== null ? (e.status = 2, e.destination.destroy(t)) : (e.status = 1, e.fatalError = t);
  }
  function o0(e, t, r, n, o) {
    for (jr = {}, tp = t, Mi = 0, e = r(n, o); su; )
      su = false, Mi = 0, pu += 1, ue = null, e = r(n, o);
    return np(), e;
  }
  function l0(e, t, r, n) {
    var o = r.render(), l = n.childContextTypes;
    if (l != null) {
      var i = t.legacyContext;
      if (typeof r.getChildContext != "function")
        n = i;
      else {
        r = r.getChildContext();
        for (var a in r)
          if (!(a in l))
            throw Error($(108, Yf(n) || "Unknown", a));
        n = Fi({}, i, r);
      }
      t.legacyContext = n, Pt(e, t, o), t.legacyContext = i;
    } else
      Pt(e, t, o);
  }
  function i0(e, t) {
    if (e && e.defaultProps) {
      t = Fi({}, t), e = e.defaultProps;
      for (var r in e)
        t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  function Jf(e, t, r, n, o) {
    if (typeof r == "function")
      if (r.prototype && r.prototype.isReactComponent) {
        o = Xy(r, t.legacyContext);
        var l = r.contextType;
        l = new r(n, typeof l == "object" && l !== null ? l._currentValue2 : o), qy(l, r, n, o), l0(e, t, l, r);
      } else {
        l = Xy(r, t.legacyContext), o = o0(e, t, r, n, l);
        var i = Mi !== 0;
        if (typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0)
          qy(o, r, n, l), l0(e, t, o, r);
        else if (i) {
          n = t.treeContext, t.treeContext = Gf(n, 1, 0);
          try {
            Pt(e, t, o);
          } finally {
            t.treeContext = n;
          }
        } else
          Pt(e, t, o);
      }
    else if (typeof r == "string") {
      switch (o = t.blockedSegment, l = ek(o.chunks, r, n, e.responseState, o.formatContext), o.lastPushedText = false, i = o.formatContext, o.formatContext = XR(i, r, n), Xf(e, t, l), o.formatContext = i, r) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          o.chunks.push("</", r, ">");
      }
      o.lastPushedText = false;
    } else {
      switch (r) {
        case sk:
        case ak:
        case m0:
        case v0:
        case h0:
          Pt(e, t, n.children);
          return;
        case x0:
          Pt(e, t, n.children);
          return;
        case ik:
          throw Error($(343));
        case S0:
          e: {
            r = t.blockedBoundary, o = t.blockedSegment, l = n.fallback, n = n.children, i = /* @__PURE__ */ new Set();
            var a = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: i, errorDigest: null }, s = uu(e, o.chunks.length, a, o.formatContext, false, false);
            o.children.push(s), o.lastPushedText = false;
            var u = uu(e, 0, null, o.formatContext, false, false);
            u.parentFlushed = true, t.blockedBoundary = a, t.blockedSegment = u;
            try {
              if (Xf(e, t, n), e.responseState.generateStaticMarkup || u.lastPushedText && u.textEmbedded && u.chunks.push("<!-- -->"), u.status = 1, du(a, u), a.pendingTasks === 0)
                break e;
            } catch (c) {
              u.status = 4, a.forceClientRender = true, a.errorDigest = Oi(e, c);
            } finally {
              t.blockedBoundary = r, t.blockedSegment = o;
            }
            t = op(e, l, r, s, i, t.legacyContext, t.context, t.treeContext), e.pingedTasks.push(t);
          }
          return;
      }
      if (typeof r == "object" && r !== null)
        switch (r.$$typeof) {
          case w0:
            if (n = o0(e, t, r.render, n, o), Mi !== 0) {
              r = t.treeContext, t.treeContext = Gf(r, 1, 0);
              try {
                Pt(e, t, n);
              } finally {
                t.treeContext = r;
              }
            } else
              Pt(e, t, n);
            return;
          case E0:
            r = r.type, n = i0(r, n), Jf(e, t, r, n, o);
            return;
          case g0:
            if (o = n.children, r = r._context, n = n.value, l = r._currentValue2, r._currentValue2 = n, i = fo, fo = n = { parent: i, depth: i === null ? 0 : i.depth + 1, context: r, parentValue: l, value: n }, t.context = n, Pt(e, t, o), e = fo, e === null)
              throw Error($(403));
            n = e.parentValue, e.context._currentValue2 = n === uk ? e.context._defaultValue : n, e = fo = e.parent, t.context = e;
            return;
          case y0:
            n = n.children, n = n(r._currentValue2), Pt(e, t, n);
            return;
          case ep:
            o = r._init, r = o(r._payload), n = i0(r, n), Jf(e, t, r, n, void 0);
            return;
        }
      throw Error($(130, r == null ? r : typeof r, ""));
    }
  }
  function Pt(e, t, r) {
    if (t.node = r, typeof r == "object" && r !== null) {
      switch (r.$$typeof) {
        case lk:
          Jf(e, t, r.type, r.props, r.ref);
          return;
        case p0:
          throw Error($(257));
        case ep:
          var n = r._init;
          r = n(r._payload), Pt(e, t, r);
          return;
      }
      if (Qf(r)) {
        a0(e, t, r);
        return;
      }
      if (r === null || typeof r != "object" ? n = null : (n = Jy && r[Jy] || r["@@iterator"], n = typeof n == "function" ? n : null), n && (n = n.call(r))) {
        if (r = n.next(), !r.done) {
          var o = [];
          do
            o.push(r.value), r = n.next();
          while (!r.done);
          a0(e, t, o);
        }
        return;
      }
      throw e = Object.prototype.toString.call(r), Error($(31, e === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : e));
    }
    typeof r == "string" ? (n = t.blockedSegment, n.lastPushedText = Gy(t.blockedSegment.chunks, r, e.responseState, n.lastPushedText)) : typeof r == "number" && (n = t.blockedSegment, n.lastPushedText = Gy(t.blockedSegment.chunks, "" + r, e.responseState, n.lastPushedText));
  }
  function a0(e, t, r) {
    for (var n = r.length, o = 0; o < n; o++) {
      var l = t.treeContext;
      t.treeContext = Gf(l, n, o);
      try {
        Xf(e, t, r[o]);
      } finally {
        t.treeContext = l;
      }
    }
  }
  function Xf(e, t, r) {
    var n = t.blockedSegment.formatContext, o = t.legacyContext, l = t.context;
    try {
      return Pt(e, t, r);
    } catch (s) {
      if (np(), typeof s == "object" && s !== null && typeof s.then == "function") {
        r = s;
        var i = t.blockedSegment, a = uu(e, i.chunks.length, null, i.formatContext, i.lastPushedText, true);
        i.children.push(a), i.lastPushedText = false, e = op(e, t.node, t.blockedBoundary, a, t.abortSet, t.legacyContext, t.context, t.treeContext).ping, r.then(e, e), t.blockedSegment.formatContext = n, t.legacyContext = o, t.context = l, au(l);
      } else
        throw t.blockedSegment.formatContext = n, t.legacyContext = o, t.context = l, au(l), s;
    }
  }
  function Sk(e) {
    var t = e.blockedBoundary;
    e = e.blockedSegment, e.status = 3, L0(this, t, e);
  }
  function b0(e, t, r) {
    var n = e.blockedBoundary;
    e.blockedSegment.status = 3, n === null ? (t.allPendingTasks--, t.status !== 2 && (t.status = 2, t.destination !== null && t.destination.push(null))) : (n.pendingTasks--, n.forceClientRender || (n.forceClientRender = true, e = r === void 0 ? Error($(432)) : r, n.errorDigest = t.onError(e), n.parentFlushed && t.clientRenderedBoundaries.push(n)), n.fallbackAbortableTasks.forEach(function(o) {
      return b0(o, t, r);
    }), n.fallbackAbortableTasks.clear(), t.allPendingTasks--, t.allPendingTasks === 0 && (n = t.onAllReady, n()));
  }
  function du(e, t) {
    if (t.chunks.length === 0 && t.children.length === 1 && t.children[0].boundary === null) {
      var r = t.children[0];
      r.id = t.id, r.parentFlushed = true, r.status === 1 && du(e, r);
    } else
      e.completedSegments.push(t);
  }
  function L0(e, t, r) {
    if (t === null) {
      if (r.parentFlushed) {
        if (e.completedRootSegment !== null)
          throw Error($(389));
        e.completedRootSegment = r;
      }
      e.pendingRootTasks--, e.pendingRootTasks === 0 && (e.onShellError = Di, t = e.onShellReady, t());
    } else
      t.pendingTasks--, t.forceClientRender || (t.pendingTasks === 0 ? (r.parentFlushed && r.status === 1 && du(t, r), t.parentFlushed && e.completedBoundaries.push(t), t.fallbackAbortableTasks.forEach(Sk, e), t.fallbackAbortableTasks.clear()) : r.parentFlushed && r.status === 1 && (du(t, r), t.completedSegments.length === 1 && t.parentFlushed && e.partialBoundaries.push(t)));
    e.allPendingTasks--, e.allPendingTasks === 0 && (e = e.onAllReady, e());
  }
  function T0(e) {
    if (e.status !== 2) {
      var t = fo, r = Kf.current;
      Kf.current = n0;
      var n = iu;
      iu = e.responseState;
      try {
        var o = e.pingedTasks, l;
        for (l = 0; l < o.length; l++) {
          var i = o[l], a = e, s = i.blockedSegment;
          if (s.status === 0) {
            au(i.context);
            try {
              Pt(a, i, i.node), a.responseState.generateStaticMarkup || s.lastPushedText && s.textEmbedded && s.chunks.push("<!-- -->"), i.abortSet.delete(i), s.status = 1, L0(a, i.blockedBoundary, s);
            } catch (g) {
              if (np(), typeof g == "object" && g !== null && typeof g.then == "function") {
                var u = i.ping;
                g.then(u, u);
              } else {
                i.abortSet.delete(i), s.status = 4;
                var c = i.blockedBoundary, d = g, p = Oi(a, d);
                if (c === null ? cu(a, d) : (c.pendingTasks--, c.forceClientRender || (c.forceClientRender = true, c.errorDigest = p, c.parentFlushed && a.clientRenderedBoundaries.push(c))), a.allPendingTasks--, a.allPendingTasks === 0) {
                  var v = a.onAllReady;
                  v();
                }
              }
            } finally {
            }
          }
        }
        o.splice(0, l), e.destination !== null && lp(e, e.destination);
      } catch (g) {
        Oi(e, g), cu(e, g);
      } finally {
        iu = n, Kf.current = r, r === n0 && au(t);
      }
    }
  }
  function tu(e, t, r) {
    switch (r.parentFlushed = true, r.status) {
      case 0:
        var n = r.id = e.nextSegmentId++;
        return r.lastPushedText = false, r.textEmbedded = false, e = e.responseState, t.push('<template id="'), t.push(e.placeholderPrefix), e = n.toString(16), t.push(e), t.push('"></template>');
      case 1:
        r.status = 2;
        var o = true;
        n = r.chunks;
        var l = 0;
        r = r.children;
        for (var i = 0; i < r.length; i++) {
          for (o = r[i]; l < o.index; l++)
            t.push(n[l]);
          o = hu(e, t, o);
        }
        for (; l < n.length - 1; l++)
          t.push(n[l]);
        return l < n.length && (o = t.push(n[l])), o;
      default:
        throw Error($(390));
    }
  }
  function hu(e, t, r) {
    var n = r.boundary;
    if (n === null)
      return tu(e, t, r);
    if (n.parentFlushed = true, n.forceClientRender)
      return e.responseState.generateStaticMarkup || (n = n.errorDigest, t.push("<!--$!-->"), t.push("<template"), n && (t.push(' data-dgst="'), n = at(n), t.push(n), t.push('"')), t.push("></template>")), tu(e, t, r), e = e.responseState.generateStaticMarkup ? true : t.push("<!--/$-->"), e;
    if (0 < n.pendingTasks) {
      n.rootSegmentID = e.nextSegmentId++, 0 < n.completedSegments.length && e.partialBoundaries.push(n);
      var o = e.responseState, l = o.nextSuspenseID++;
      return o = o.boundaryPrefix + l.toString(16), n = n.id = o, Yy(t, e.responseState, n), tu(e, t, r), t.push("<!--/$-->");
    }
    if (n.byteSize > e.progressiveChunkSize)
      return n.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(n), Yy(t, e.responseState, n.id), tu(e, t, r), t.push("<!--/$-->");
    if (e.responseState.generateStaticMarkup || t.push("<!--$-->"), r = n.completedSegments, r.length !== 1)
      throw Error($(391));
    return hu(e, t, r[0]), e = e.responseState.generateStaticMarkup ? true : t.push("<!--/$-->"), e;
  }
  function s0(e, t, r) {
    return tk(t, e.responseState, r.formatContext, r.id), hu(e, t, r), rk(t, r.formatContext);
  }
  function u0(e, t, r) {
    for (var n = r.completedSegments, o = 0; o < n.length; o++)
      D0(e, t, r, n[o]);
    if (n.length = 0, e = e.responseState, n = r.id, r = r.rootSegmentID, t.push(e.startInlineScript), e.sentCompleteBoundaryFunction ? t.push('$RC("') : (e.sentCompleteBoundaryFunction = true, t.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("')), n === null)
      throw Error($(395));
    return r = r.toString(16), t.push(n), t.push('","'), t.push(e.segmentPrefix), t.push(r), t.push('")<\/script>');
  }
  function D0(e, t, r, n) {
    if (n.status === 2)
      return true;
    var o = n.id;
    if (o === -1) {
      if ((n.id = r.rootSegmentID) === -1)
        throw Error($(392));
      return s0(e, t, n);
    }
    return s0(e, t, n), e = e.responseState, t.push(e.startInlineScript), e.sentCompleteSegmentFunction ? t.push('$RS("') : (e.sentCompleteSegmentFunction = true, t.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("')), t.push(e.segmentPrefix), o = o.toString(16), t.push(o), t.push('","'), t.push(e.placeholderPrefix), t.push(o), t.push('")<\/script>');
  }
  function lp(e, t) {
    try {
      var r = e.completedRootSegment;
      if (r !== null && e.pendingRootTasks === 0) {
        hu(e, t, r), e.completedRootSegment = null;
        var n = e.responseState.bootstrapChunks;
        for (r = 0; r < n.length - 1; r++)
          t.push(n[r]);
        r < n.length && t.push(n[r]);
      }
      var o = e.clientRenderedBoundaries, l;
      for (l = 0; l < o.length; l++) {
        var i = o[l];
        n = t;
        var a = e.responseState, s = i.id, u = i.errorDigest, c = i.errorMessage, d = i.errorComponentStack;
        if (n.push(a.startInlineScript), a.sentClientRenderFunction ? n.push('$RX("') : (a.sentClientRenderFunction = true, n.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("')), s === null)
          throw Error($(395));
        if (n.push(s), n.push('"'), u || c || d) {
          n.push(",");
          var p = Wf(u || "");
          n.push(p);
        }
        if (c || d) {
          n.push(",");
          var v = Wf(c || "");
          n.push(v);
        }
        if (d) {
          n.push(",");
          var g = Wf(d);
          n.push(g);
        }
        if (!n.push(")<\/script>")) {
          e.destination = null, l++, o.splice(0, l);
          return;
        }
      }
      o.splice(0, l);
      var y = e.completedBoundaries;
      for (l = 0; l < y.length; l++)
        if (!u0(e, t, y[l])) {
          e.destination = null, l++, y.splice(0, l);
          return;
        }
      y.splice(0, l);
      var x = e.partialBoundaries;
      for (l = 0; l < x.length; l++) {
        var f = x[l];
        e: {
          o = e, i = t;
          var h = f.completedSegments;
          for (a = 0; a < h.length; a++)
            if (!D0(o, i, f, h[a])) {
              a++, h.splice(0, a);
              var m = false;
              break e;
            }
          h.splice(0, a), m = true;
        }
        if (!m) {
          e.destination = null, l++, x.splice(0, l);
          return;
        }
      }
      x.splice(0, l);
      var E = e.completedBoundaries;
      for (l = 0; l < E.length; l++)
        if (!u0(e, t, E[l])) {
          e.destination = null, l++, E.splice(0, l);
          return;
        }
      E.splice(0, l);
    } finally {
      e.allPendingTasks === 0 && e.pingedTasks.length === 0 && e.clientRenderedBoundaries.length === 0 && e.completedBoundaries.length === 0 && t.push(null);
    }
  }
  function xk(e, t) {
    try {
      var r = e.abortableTasks;
      r.forEach(function(n) {
        return b0(n, e, t);
      }), r.clear(), e.destination !== null && lp(e, e.destination);
    } catch (n) {
      Oi(e, n), cu(e, n);
    }
  }
  function Ek() {
  }
  function F0(e, t, r, n) {
    var o = false, l = null, i = "", a = { push: function(u) {
      return u !== null && (i += u), true;
    }, destroy: function(u) {
      o = true, l = u;
    } }, s = false;
    if (e = wk(e, ok(r, t ? t.identifierPrefix : void 0), { insertionMode: 1, selectedValue: null }, 1 / 0, Ek, void 0, function() {
      s = true;
    }, void 0, void 0), T0(e), xk(e, n), e.status === 1)
      e.status = 2, a.destroy(e.fatalError);
    else if (e.status !== 2 && e.destination === null) {
      e.destination = a;
      try {
        lp(e, a);
      } catch (u) {
        Oi(e, u), cu(e, u);
      }
    }
    if (o)
      throw l;
    if (!s)
      throw Error($(426));
    return i;
  }
  ul.renderToNodeStream = function() {
    throw Error($(207));
  };
  ul.renderToStaticMarkup = function(e, t) {
    return F0(e, t, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
  };
  ul.renderToStaticNodeStream = function() {
    throw Error($(208));
  };
  ul.renderToString = function(e, t) {
    return F0(e, t, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
  };
  ul.version = "18.2.0";
});
var Dw = Ot((_p) => {
  "use strict";
  var aw = je();
  function Q(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++)
      t += "&args[]=" + encodeURIComponent(arguments[r]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var Lt = null, Tt = 0;
  function I(e, t) {
    if (t.length !== 0)
      if (512 < t.length)
        0 < Tt && (e.enqueue(new Uint8Array(Lt.buffer, 0, Tt)), Lt = new Uint8Array(512), Tt = 0), e.enqueue(t);
      else {
        var r = Lt.length - Tt;
        r < t.length && (r === 0 ? e.enqueue(Lt) : (Lt.set(t.subarray(0, r), Tt), e.enqueue(Lt), t = t.subarray(r)), Lt = new Uint8Array(512), Tt = 0), Lt.set(t, Tt), Tt += t.length;
      }
  }
  function pe(e, t) {
    return I(e, t), true;
  }
  function O0(e) {
    Lt && 0 < Tt && (e.enqueue(new Uint8Array(Lt.buffer, 0, Tt)), Lt = null, Tt = 0);
  }
  var sw = new TextEncoder();
  function G(e) {
    return sw.encode(e);
  }
  function M(e) {
    return sw.encode(e);
  }
  function uw(e, t) {
    typeof e.error == "function" ? e.error(t) : e.close();
  }
  var yt = Object.prototype.hasOwnProperty, Rk = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, z0 = {}, I0 = {};
  function cw(e) {
    return yt.call(I0, e) ? true : yt.call(z0, e) ? false : Rk.test(e) ? I0[e] = true : (z0[e] = true, false);
  }
  function ut(e, t, r, n, o, l, i) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = n, this.attributeNamespace = o, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = l, this.removeEmptyString = i;
  }
  var Qe = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    Qe[e] = new ut(e, 0, false, e, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    Qe[t] = new ut(t, 1, false, e[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    Qe[e] = new ut(e, 2, false, e.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    Qe[e] = new ut(e, 2, false, e, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    Qe[e] = new ut(e, 3, false, e.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    Qe[e] = new ut(e, 3, true, e, null, false, false);
  });
  ["capture", "download"].forEach(function(e) {
    Qe[e] = new ut(e, 4, false, e, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(e) {
    Qe[e] = new ut(e, 6, false, e, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(e) {
    Qe[e] = new ut(e, 5, false, e.toLowerCase(), null, false, false);
  });
  var gp = /[\-:]([a-z])/g;
  function yp(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(gp, yp);
    Qe[t] = new ut(t, 1, false, e, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(gp, yp);
    Qe[t] = new ut(t, 1, false, e, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(gp, yp);
    Qe[t] = new ut(t, 1, false, e, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(e) {
    Qe[e] = new ut(e, 1, false, e.toLowerCase(), null, false, false);
  });
  Qe.xlinkHref = new ut("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(e) {
    Qe[e] = new ut(e, 1, false, e.toLowerCase(), null, true, true);
  });
  var gu = { animationIterationCount: true, aspectRatio: true, borderImageOutset: true, borderImageSlice: true, borderImageWidth: true, boxFlex: true, boxFlexGroup: true, boxOrdinalGroup: true, columnCount: true, columns: true, flex: true, flexGrow: true, flexPositive: true, flexShrink: true, flexNegative: true, flexOrder: true, gridArea: true, gridRow: true, gridRowEnd: true, gridRowSpan: true, gridRowStart: true, gridColumn: true, gridColumnEnd: true, gridColumnSpan: true, gridColumnStart: true, fontWeight: true, lineClamp: true, lineHeight: true, opacity: true, order: true, orphans: true, tabSize: true, widows: true, zIndex: true, zoom: true, fillOpacity: true, floodOpacity: true, stopOpacity: true, strokeDasharray: true, strokeDashoffset: true, strokeMiterlimit: true, strokeOpacity: true, strokeWidth: true }, kk = ["Webkit", "ms", "Moz", "O"];
  Object.keys(gu).forEach(function(e) {
    kk.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), gu[t] = gu[e];
    });
  });
  var Ck = /["'&<>]/;
  function Ke(e) {
    if (typeof e == "boolean" || typeof e == "number")
      return "" + e;
    e = "" + e;
    var t = Ck.exec(e);
    if (t) {
      var r = "", n, o = 0;
      for (n = t.index; n < e.length; n++) {
        switch (e.charCodeAt(n)) {
          case 34:
            t = "&quot;";
            break;
          case 38:
            t = "&amp;";
            break;
          case 39:
            t = "&#x27;";
            break;
          case 60:
            t = "&lt;";
            break;
          case 62:
            t = "&gt;";
            break;
          default:
            continue;
        }
        o !== n && (r += e.substring(o, n)), o = n + 1, r += t;
      }
      e = o !== n ? r + e.substring(o, n) : r;
    }
    return e;
  }
  var _k = /([A-Z])/g, Nk = /^ms-/, fp = Array.isArray, Pk = M("<script>"), bk = M("<\/script>"), Lk = M('<script src="'), Tk = M('<script type="module" src="'), A0 = M('" async=""><\/script>'), Dk = /(<\/|<)(s)(cript)/gi;
  function Fk(e, t, r, n) {
    return "" + t + (r === "s" ? "\\u0073" : "\\u0053") + n;
  }
  function Mk(e, t, r, n, o) {
    e = e === void 0 ? "" : e, t = t === void 0 ? Pk : M('<script nonce="' + Ke(t) + '">');
    var l = [];
    if (r !== void 0 && l.push(t, G(("" + r).replace(Dk, Fk)), bk), n !== void 0)
      for (r = 0; r < n.length; r++)
        l.push(Lk, G(Ke(n[r])), A0);
    if (o !== void 0)
      for (n = 0; n < o.length; n++)
        l.push(Tk, G(Ke(o[n])), A0);
    return { bootstrapChunks: l, startInlineScript: t, placeholderPrefix: M(e + "P:"), segmentPrefix: M(e + "S:"), boundaryPrefix: e + "B:", idPrefix: e, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false };
  }
  function Sr(e, t) {
    return { insertionMode: e, selectedValue: t };
  }
  function Ok(e) {
    return Sr(e === "http://www.w3.org/2000/svg" ? 2 : e === "http://www.w3.org/1998/Math/MathML" ? 3 : 0, null);
  }
  function zk(e, t, r) {
    switch (t) {
      case "select":
        return Sr(1, r.value != null ? r.value : r.defaultValue);
      case "svg":
        return Sr(2, null);
      case "math":
        return Sr(3, null);
      case "foreignObject":
        return Sr(1, null);
      case "table":
        return Sr(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return Sr(5, null);
      case "colgroup":
        return Sr(7, null);
      case "tr":
        return Sr(6, null);
    }
    return 4 <= e.insertionMode || e.insertionMode === 0 ? Sr(1, null) : e;
  }
  var wp = M("<!-- -->");
  function U0(e, t, r, n) {
    return t === "" ? n : (n && e.push(wp), e.push(G(Ke(t))), true);
  }
  var j0 = /* @__PURE__ */ new Map(), Ik = M(' style="'), B0 = M(":"), Ak = M(";");
  function dw(e, t, r) {
    if (typeof r != "object")
      throw Error(Q(62));
    t = true;
    for (var n in r)
      if (yt.call(r, n)) {
        var o = r[n];
        if (o != null && typeof o != "boolean" && o !== "") {
          if (n.indexOf("--") === 0) {
            var l = G(Ke(n));
            o = G(Ke(("" + o).trim()));
          } else {
            l = n;
            var i = j0.get(l);
            i !== void 0 || (i = M(Ke(l.replace(_k, "-$1").toLowerCase().replace(Nk, "-ms-"))), j0.set(l, i)), l = i, o = typeof o == "number" ? o === 0 || yt.call(gu, n) ? G("" + o) : G(o + "px") : G(Ke(("" + o).trim()));
          }
          t ? (t = false, e.push(Ik, l, B0, o)) : e.push(Ak, l, B0, o);
        }
      }
    t || e.push(po);
  }
  var Dn = M(" "), cl = M('="'), po = M('"'), V0 = M('=""');
  function bt(e, t, r, n) {
    switch (r) {
      case "style":
        dw(e, t, n);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") {
      if (t = Qe.hasOwnProperty(r) ? Qe[r] : null, t !== null) {
        switch (typeof n) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!t.acceptsBooleans)
              return;
        }
        switch (r = G(t.attributeName), t.type) {
          case 3:
            n && e.push(Dn, r, V0);
            break;
          case 4:
            n === true ? e.push(Dn, r, V0) : n !== false && e.push(Dn, r, cl, G(Ke(n)), po);
            break;
          case 5:
            isNaN(n) || e.push(Dn, r, cl, G(Ke(n)), po);
            break;
          case 6:
            !isNaN(n) && 1 <= n && e.push(Dn, r, cl, G(Ke(n)), po);
            break;
          default:
            t.sanitizeURL && (n = "" + n), e.push(Dn, r, cl, G(Ke(n)), po);
        }
      } else if (cw(r)) {
        switch (typeof n) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (t = r.toLowerCase().slice(0, 5), t !== "data-" && t !== "aria-")
              return;
        }
        e.push(Dn, G(r), cl, G(Ke(n)), po);
      }
    }
  }
  var Fn = M(">"), H0 = M("/>");
  function yu(e, t, r) {
    if (t != null) {
      if (r != null)
        throw Error(Q(60));
      if (typeof t != "object" || !("__html" in t))
        throw Error(Q(61));
      t = t.__html, t != null && e.push(G("" + t));
    }
  }
  function Uk(e) {
    var t = "";
    return aw.Children.forEach(e, function(r) {
      r != null && (t += r);
    }), t;
  }
  var ip = M(' selected=""');
  function ap(e, t, r, n) {
    e.push(xr(r));
    var o = r = null, l;
    for (l in t)
      if (yt.call(t, l)) {
        var i = t[l];
        if (i != null)
          switch (l) {
            case "children":
              r = i;
              break;
            case "dangerouslySetInnerHTML":
              o = i;
              break;
            default:
              bt(e, n, l, i);
          }
      }
    return e.push(Fn), yu(e, o, r), typeof r == "string" ? (e.push(G(Ke(r))), null) : r;
  }
  var sp = M(`
`), jk = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, $0 = /* @__PURE__ */ new Map();
  function xr(e) {
    var t = $0.get(e);
    if (t === void 0) {
      if (!jk.test(e))
        throw Error(Q(65, e));
      t = M("<" + e), $0.set(e, t);
    }
    return t;
  }
  var Bk = M("<!DOCTYPE html>");
  function Vk(e, t, r, n, o) {
    switch (t) {
      case "select":
        e.push(xr("select"));
        var l = null, i = null;
        for (c in r)
          if (yt.call(r, c)) {
            var a = r[c];
            if (a != null)
              switch (c) {
                case "children":
                  l = a;
                  break;
                case "dangerouslySetInnerHTML":
                  i = a;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  bt(e, n, c, a);
              }
          }
        return e.push(Fn), yu(e, i, l), l;
      case "option":
        i = o.selectedValue, e.push(xr("option"));
        var s = a = null, u = null, c = null;
        for (l in r)
          if (yt.call(r, l)) {
            var d = r[l];
            if (d != null)
              switch (l) {
                case "children":
                  a = d;
                  break;
                case "selected":
                  u = d;
                  break;
                case "dangerouslySetInnerHTML":
                  c = d;
                  break;
                case "value":
                  s = d;
                default:
                  bt(e, n, l, d);
              }
          }
        if (i != null)
          if (r = s !== null ? "" + s : Uk(a), fp(i)) {
            for (n = 0; n < i.length; n++)
              if ("" + i[n] === r) {
                e.push(ip);
                break;
              }
          } else
            "" + i === r && e.push(ip);
        else
          u && e.push(ip);
        return e.push(Fn), yu(e, c, a), a;
      case "textarea":
        e.push(xr("textarea")), c = i = l = null;
        for (a in r)
          if (yt.call(r, a) && (s = r[a], s != null))
            switch (a) {
              case "children":
                c = s;
                break;
              case "value":
                l = s;
                break;
              case "defaultValue":
                i = s;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(Q(91));
              default:
                bt(e, n, a, s);
            }
        if (l === null && i !== null && (l = i), e.push(Fn), c != null) {
          if (l != null)
            throw Error(Q(92));
          if (fp(c) && 1 < c.length)
            throw Error(Q(93));
          l = "" + c;
        }
        return typeof l == "string" && l[0] === `
` && e.push(sp), l !== null && e.push(G(Ke("" + l))), null;
      case "input":
        e.push(xr("input")), s = c = a = l = null;
        for (i in r)
          if (yt.call(r, i) && (u = r[i], u != null))
            switch (i) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(Q(399, "input"));
              case "defaultChecked":
                s = u;
                break;
              case "defaultValue":
                a = u;
                break;
              case "checked":
                c = u;
                break;
              case "value":
                l = u;
                break;
              default:
                bt(e, n, i, u);
            }
        return c !== null ? bt(e, n, "checked", c) : s !== null && bt(e, n, "checked", s), l !== null ? bt(e, n, "value", l) : a !== null && bt(e, n, "value", a), e.push(H0), null;
      case "menuitem":
        e.push(xr("menuitem"));
        for (var p in r)
          if (yt.call(r, p) && (l = r[p], l != null))
            switch (p) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(Q(400));
              default:
                bt(e, n, p, l);
            }
        return e.push(Fn), null;
      case "title":
        e.push(xr("title")), l = null;
        for (d in r)
          if (yt.call(r, d) && (i = r[d], i != null))
            switch (d) {
              case "children":
                l = i;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(Q(434));
              default:
                bt(e, n, d, i);
            }
        return e.push(Fn), l;
      case "listing":
      case "pre":
        e.push(xr(t)), i = l = null;
        for (s in r)
          if (yt.call(r, s) && (a = r[s], a != null))
            switch (s) {
              case "children":
                l = a;
                break;
              case "dangerouslySetInnerHTML":
                i = a;
                break;
              default:
                bt(e, n, s, a);
            }
        if (e.push(Fn), i != null) {
          if (l != null)
            throw Error(Q(60));
          if (typeof i != "object" || !("__html" in i))
            throw Error(Q(61));
          r = i.__html, r != null && (typeof r == "string" && 0 < r.length && r[0] === `
` ? e.push(sp, G(r)) : e.push(G("" + r)));
        }
        return typeof l == "string" && l[0] === `
` && e.push(sp), l;
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        e.push(xr(t));
        for (var v in r)
          if (yt.call(r, v) && (l = r[v], l != null))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(Q(399, t));
              default:
                bt(e, n, v, l);
            }
        return e.push(H0), null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return ap(e, r, t, n);
      case "html":
        return o.insertionMode === 0 && e.push(Bk), ap(e, r, t, n);
      default:
        if (t.indexOf("-") === -1 && typeof r.is != "string")
          return ap(e, r, t, n);
        e.push(xr(t)), i = l = null;
        for (u in r)
          if (yt.call(r, u) && (a = r[u], a != null))
            switch (u) {
              case "children":
                l = a;
                break;
              case "dangerouslySetInnerHTML":
                i = a;
                break;
              case "style":
                dw(e, n, a);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                cw(u) && typeof a != "function" && typeof a != "symbol" && e.push(Dn, G(u), cl, G(Ke(a)), po);
            }
        return e.push(Fn), yu(e, i, l), l;
    }
  }
  var Hk = M("</"), $k = M(">"), Wk = M('<template id="'), Kk = M('"></template>'), Qk = M("<!--$-->"), Yk = M('<!--$?--><template id="'), Gk = M('"></template>'), Jk = M("<!--$!-->"), Xk = M("<!--/$-->"), Zk = M("<template"), qk = M('"'), eC = M(' data-dgst="');
  M(' data-msg="');
  M(' data-stck="');
  var tC = M("></template>");
  function W0(e, t, r) {
    if (I(e, Yk), r === null)
      throw Error(Q(395));
    return I(e, r), pe(e, Gk);
  }
  var rC = M('<div hidden id="'), nC = M('">'), oC = M("</div>"), lC = M('<svg aria-hidden="true" style="display:none" id="'), iC = M('">'), aC = M("</svg>"), sC = M('<math aria-hidden="true" style="display:none" id="'), uC = M('">'), cC = M("</math>"), dC = M('<table hidden id="'), fC = M('">'), pC = M("</table>"), hC = M('<table hidden><tbody id="'), mC = M('">'), vC = M("</tbody></table>"), gC = M('<table hidden><tr id="'), yC = M('">'), wC = M("</tr></table>"), SC = M('<table hidden><colgroup id="'), xC = M('">'), EC = M("</colgroup></table>");
  function RC(e, t, r, n) {
    switch (r.insertionMode) {
      case 0:
      case 1:
        return I(e, rC), I(e, t.segmentPrefix), I(e, G(n.toString(16))), pe(e, nC);
      case 2:
        return I(e, lC), I(e, t.segmentPrefix), I(e, G(n.toString(16))), pe(e, iC);
      case 3:
        return I(e, sC), I(e, t.segmentPrefix), I(e, G(n.toString(16))), pe(e, uC);
      case 4:
        return I(e, dC), I(e, t.segmentPrefix), I(e, G(n.toString(16))), pe(e, fC);
      case 5:
        return I(e, hC), I(e, t.segmentPrefix), I(e, G(n.toString(16))), pe(e, mC);
      case 6:
        return I(e, gC), I(e, t.segmentPrefix), I(e, G(n.toString(16))), pe(e, yC);
      case 7:
        return I(e, SC), I(e, t.segmentPrefix), I(e, G(n.toString(16))), pe(e, xC);
      default:
        throw Error(Q(397));
    }
  }
  function kC(e, t) {
    switch (t.insertionMode) {
      case 0:
      case 1:
        return pe(e, oC);
      case 2:
        return pe(e, aC);
      case 3:
        return pe(e, cC);
      case 4:
        return pe(e, pC);
      case 5:
        return pe(e, vC);
      case 6:
        return pe(e, wC);
      case 7:
        return pe(e, EC);
      default:
        throw Error(Q(397));
    }
  }
  var CC = M('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'), _C = M('$RS("'), NC = M('","'), PC = M('")<\/script>'), bC = M('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'), LC = M('$RC("'), TC = M('","'), DC = M('")<\/script>'), FC = M('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'), MC = M('$RX("'), OC = M('"'), zC = M(")<\/script>"), up = M(","), IC = /[<\u2028\u2029]/g;
  function cp(e) {
    return JSON.stringify(e).replace(IC, function(t) {
      switch (t) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  var Ai = Object.assign, AC = Symbol.for("react.element"), fw = Symbol.for("react.portal"), pw = Symbol.for("react.fragment"), hw = Symbol.for("react.strict_mode"), mw = Symbol.for("react.profiler"), vw = Symbol.for("react.provider"), gw = Symbol.for("react.context"), yw = Symbol.for("react.forward_ref"), ww = Symbol.for("react.suspense"), Sw = Symbol.for("react.suspense_list"), xw = Symbol.for("react.memo"), Sp = Symbol.for("react.lazy"), UC = Symbol.for("react.scope"), jC = Symbol.for("react.debug_trace_mode"), BC = Symbol.for("react.legacy_hidden"), VC = Symbol.for("react.default_value"), K0 = Symbol.iterator;
  function pp(e) {
    if (e == null)
      return null;
    if (typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case pw:
        return "Fragment";
      case fw:
        return "Portal";
      case mw:
        return "Profiler";
      case hw:
        return "StrictMode";
      case ww:
        return "Suspense";
      case Sw:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case gw:
          return (e.displayName || "Context") + ".Consumer";
        case vw:
          return (e._context.displayName || "Context") + ".Provider";
        case yw:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case xw:
          return t = e.displayName || null, t !== null ? t : pp(e.type) || "Memo";
        case Sp:
          t = e._payload, e = e._init;
          try {
            return pp(e(t));
          } catch {
          }
      }
    return null;
  }
  var Ew = {};
  function Q0(e, t) {
    if (e = e.contextTypes, !e)
      return Ew;
    var r = {}, n;
    for (n in e)
      r[n] = t[n];
    return r;
  }
  var mo = null;
  function Nu(e, t) {
    if (e !== t) {
      e.context._currentValue = e.parentValue, e = e.parent;
      var r = t.parent;
      if (e === null) {
        if (r !== null)
          throw Error(Q(401));
      } else {
        if (r === null)
          throw Error(Q(401));
        Nu(e, r);
      }
      t.context._currentValue = t.value;
    }
  }
  function Rw(e) {
    e.context._currentValue = e.parentValue, e = e.parent, e !== null && Rw(e);
  }
  function kw(e) {
    var t = e.parent;
    t !== null && kw(t), e.context._currentValue = e.value;
  }
  function Cw(e, t) {
    if (e.context._currentValue = e.parentValue, e = e.parent, e === null)
      throw Error(Q(402));
    e.depth === t.depth ? Nu(e, t) : Cw(e, t);
  }
  function _w(e, t) {
    var r = t.parent;
    if (r === null)
      throw Error(Q(402));
    e.depth === r.depth ? Nu(e, r) : _w(e, r), t.context._currentValue = t.value;
  }
  function Eu(e) {
    var t = mo;
    t !== e && (t === null ? kw(e) : e === null ? Rw(t) : t.depth === e.depth ? Nu(t, e) : t.depth > e.depth ? Cw(t, e) : _w(t, e), mo = e);
  }
  var Y0 = { isMounted: function() {
    return false;
  }, enqueueSetState: function(e, t) {
    e = e._reactInternals, e.queue !== null && e.queue.push(t);
  }, enqueueReplaceState: function(e, t) {
    e = e._reactInternals, e.replace = true, e.queue = [t];
  }, enqueueForceUpdate: function() {
  } };
  function G0(e, t, r, n) {
    var o = e.state !== void 0 ? e.state : null;
    e.updater = Y0, e.props = r, e.state = o;
    var l = { queue: [], replace: false };
    e._reactInternals = l;
    var i = t.contextType;
    if (e.context = typeof i == "object" && i !== null ? i._currentValue : n, i = t.getDerivedStateFromProps, typeof i == "function" && (i = i(r, o), o = i == null ? o : Ai({}, o, i), e.state = o), typeof t.getDerivedStateFromProps != "function" && typeof e.getSnapshotBeforeUpdate != "function" && (typeof e.UNSAFE_componentWillMount == "function" || typeof e.componentWillMount == "function"))
      if (t = e.state, typeof e.componentWillMount == "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount(), t !== e.state && Y0.enqueueReplaceState(e, e.state, null), l.queue !== null && 0 < l.queue.length)
        if (t = l.queue, i = l.replace, l.queue = null, l.replace = false, i && t.length === 1)
          e.state = t[0];
        else {
          for (l = i ? t[0] : e.state, o = true, i = i ? 1 : 0; i < t.length; i++) {
            var a = t[i];
            a = typeof a == "function" ? a.call(e, l, r, n) : a, a != null && (o ? (o = false, l = Ai({}, l, a)) : Ai(l, a));
          }
          e.state = l;
        }
      else
        l.queue = null;
  }
  var HC = { id: 1, overflow: "" };
  function hp(e, t, r) {
    var n = e.id;
    e = e.overflow;
    var o = 32 - wu(n) - 1;
    n &= ~(1 << o), r += 1;
    var l = 32 - wu(t) + o;
    if (30 < l) {
      var i = o - o % 5;
      return l = (n & (1 << i) - 1).toString(32), n >>= i, o -= i, { id: 1 << 32 - wu(t) + o | r << o | n, overflow: l + e };
    }
    return { id: 1 << l | r << o | n, overflow: e };
  }
  var wu = Math.clz32 ? Math.clz32 : KC, $C = Math.log, WC = Math.LN2;
  function KC(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - ($C(e) / WC | 0) | 0;
  }
  function QC(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var YC = typeof Object.is == "function" ? Object.is : QC, Br = null, xp = null, Su = null, ce = null, zi = false, Ru = false, Ui = 0, Mn = null, Pu = 0;
  function ho() {
    if (Br === null)
      throw Error(Q(321));
    return Br;
  }
  function J0() {
    if (0 < Pu)
      throw Error(Q(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function Ep() {
    return ce === null ? Su === null ? (zi = false, Su = ce = J0()) : (zi = true, ce = Su) : ce.next === null ? (zi = false, ce = ce.next = J0()) : (zi = true, ce = ce.next), ce;
  }
  function Rp() {
    xp = Br = null, Ru = false, Su = null, Pu = 0, ce = Mn = null;
  }
  function Nw(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function X0(e, t, r) {
    if (Br = ho(), ce = Ep(), zi) {
      var n = ce.queue;
      if (t = n.dispatch, Mn !== null && (r = Mn.get(n), r !== void 0)) {
        Mn.delete(n), n = ce.memoizedState;
        do
          n = e(n, r.action), r = r.next;
        while (r !== null);
        return ce.memoizedState = n, [n, t];
      }
      return [ce.memoizedState, t];
    }
    return e = e === Nw ? typeof t == "function" ? t() : t : r !== void 0 ? r(t) : t, ce.memoizedState = e, e = ce.queue = { last: null, dispatch: null }, e = e.dispatch = GC.bind(null, Br, e), [ce.memoizedState, e];
  }
  function Z0(e, t) {
    if (Br = ho(), ce = Ep(), t = t === void 0 ? null : t, ce !== null) {
      var r = ce.memoizedState;
      if (r !== null && t !== null) {
        var n = r[1];
        e:
          if (n === null)
            n = false;
          else {
            for (var o = 0; o < n.length && o < t.length; o++)
              if (!YC(t[o], n[o])) {
                n = false;
                break e;
              }
            n = true;
          }
        if (n)
          return r[0];
      }
    }
    return e = e(), ce.memoizedState = [e, t], e;
  }
  function GC(e, t, r) {
    if (25 <= Pu)
      throw Error(Q(301));
    if (e === Br)
      if (Ru = true, e = { action: r, next: null }, Mn === null && (Mn = /* @__PURE__ */ new Map()), r = Mn.get(t), r === void 0)
        Mn.set(t, e);
      else {
        for (t = r; t.next !== null; )
          t = t.next;
        t.next = e;
      }
  }
  function JC() {
    throw Error(Q(394));
  }
  function mu() {
  }
  var q0 = { readContext: function(e) {
    return e._currentValue;
  }, useContext: function(e) {
    return ho(), e._currentValue;
  }, useMemo: Z0, useReducer: X0, useRef: function(e) {
    Br = ho(), ce = Ep();
    var t = ce.memoizedState;
    return t === null ? (e = { current: e }, ce.memoizedState = e) : t;
  }, useState: function(e) {
    return X0(Nw, e);
  }, useInsertionEffect: mu, useLayoutEffect: function() {
  }, useCallback: function(e, t) {
    return Z0(function() {
      return e;
    }, t);
  }, useImperativeHandle: mu, useEffect: mu, useDebugValue: mu, useDeferredValue: function(e) {
    return ho(), e;
  }, useTransition: function() {
    return ho(), [false, JC];
  }, useId: function() {
    var e = xp.treeContext, t = e.overflow;
    e = e.id, e = (e & ~(1 << 32 - wu(e) - 1)).toString(32) + t;
    var r = xu;
    if (r === null)
      throw Error(Q(404));
    return t = Ui++, e = ":" + r.idPrefix + "R" + e, 0 < t && (e += "H" + t.toString(32)), e + ":";
  }, useMutableSource: function(e, t) {
    return ho(), t(e._source);
  }, useSyncExternalStore: function(e, t, r) {
    if (r === void 0)
      throw Error(Q(407));
    return r();
  } }, xu = null, dp = aw.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
  function XC(e) {
    return console.error(e), null;
  }
  function Ii() {
  }
  function ZC(e, t, r, n, o, l, i, a, s) {
    var u = [], c = /* @__PURE__ */ new Set();
    return t = { destination: null, responseState: t, progressiveChunkSize: n === void 0 ? 12800 : n, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: c, pingedTasks: u, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: o === void 0 ? XC : o, onAllReady: l === void 0 ? Ii : l, onShellReady: i === void 0 ? Ii : i, onShellError: a === void 0 ? Ii : a, onFatalError: s === void 0 ? Ii : s }, r = ku(t, 0, null, r, false, false), r.parentFlushed = true, e = kp(t, e, null, r, c, Ew, null, HC), u.push(e), t;
  }
  function kp(e, t, r, n, o, l, i, a) {
    e.allPendingTasks++, r === null ? e.pendingRootTasks++ : r.pendingTasks++;
    var s = { node: t, ping: function() {
      var u = e.pingedTasks;
      u.push(s), u.length === 1 && Lw(e);
    }, blockedBoundary: r, blockedSegment: n, abortSet: o, legacyContext: l, context: i, treeContext: a };
    return o.add(s), s;
  }
  function ku(e, t, r, n, o, l) {
    return { status: 0, id: -1, index: t, parentFlushed: false, chunks: [], children: [], formatContext: n, boundary: r, lastPushedText: o, textEmbedded: l };
  }
  function ji(e, t) {
    if (e = e.onError(t), e != null && typeof e != "string")
      throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof e + '" instead');
    return e;
  }
  function Cu(e, t) {
    var r = e.onShellError;
    r(t), r = e.onFatalError, r(t), e.destination !== null ? (e.status = 2, uw(e.destination, t)) : (e.status = 1, e.fatalError = t);
  }
  function ew(e, t, r, n, o) {
    for (Br = {}, xp = t, Ui = 0, e = r(n, o); Ru; )
      Ru = false, Ui = 0, Pu += 1, ce = null, e = r(n, o);
    return Rp(), e;
  }
  function tw(e, t, r, n) {
    var o = r.render(), l = n.childContextTypes;
    if (l != null) {
      var i = t.legacyContext;
      if (typeof r.getChildContext != "function")
        n = i;
      else {
        r = r.getChildContext();
        for (var a in r)
          if (!(a in l))
            throw Error(Q(108, pp(n) || "Unknown", a));
        n = Ai({}, i, r);
      }
      t.legacyContext = n, Dt(e, t, o), t.legacyContext = i;
    } else
      Dt(e, t, o);
  }
  function rw(e, t) {
    if (e && e.defaultProps) {
      t = Ai({}, t), e = e.defaultProps;
      for (var r in e)
        t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  function mp(e, t, r, n, o) {
    if (typeof r == "function")
      if (r.prototype && r.prototype.isReactComponent) {
        o = Q0(r, t.legacyContext);
        var l = r.contextType;
        l = new r(n, typeof l == "object" && l !== null ? l._currentValue : o), G0(l, r, n, o), tw(e, t, l, r);
      } else {
        l = Q0(r, t.legacyContext), o = ew(e, t, r, n, l);
        var i = Ui !== 0;
        if (typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0)
          G0(o, r, n, l), tw(e, t, o, r);
        else if (i) {
          n = t.treeContext, t.treeContext = hp(n, 1, 0);
          try {
            Dt(e, t, o);
          } finally {
            t.treeContext = n;
          }
        } else
          Dt(e, t, o);
      }
    else if (typeof r == "string") {
      switch (o = t.blockedSegment, l = Vk(o.chunks, r, n, e.responseState, o.formatContext), o.lastPushedText = false, i = o.formatContext, o.formatContext = zk(i, r, n), vp(e, t, l), o.formatContext = i, r) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          o.chunks.push(Hk, G(r), $k);
      }
      o.lastPushedText = false;
    } else {
      switch (r) {
        case BC:
        case jC:
        case hw:
        case mw:
        case pw:
          Dt(e, t, n.children);
          return;
        case Sw:
          Dt(e, t, n.children);
          return;
        case UC:
          throw Error(Q(343));
        case ww:
          e: {
            r = t.blockedBoundary, o = t.blockedSegment, l = n.fallback, n = n.children, i = /* @__PURE__ */ new Set();
            var a = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: i, errorDigest: null }, s = ku(e, o.chunks.length, a, o.formatContext, false, false);
            o.children.push(s), o.lastPushedText = false;
            var u = ku(e, 0, null, o.formatContext, false, false);
            u.parentFlushed = true, t.blockedBoundary = a, t.blockedSegment = u;
            try {
              if (vp(e, t, n), u.lastPushedText && u.textEmbedded && u.chunks.push(wp), u.status = 1, _u(a, u), a.pendingTasks === 0)
                break e;
            } catch (c) {
              u.status = 4, a.forceClientRender = true, a.errorDigest = ji(e, c);
            } finally {
              t.blockedBoundary = r, t.blockedSegment = o;
            }
            t = kp(e, l, r, s, i, t.legacyContext, t.context, t.treeContext), e.pingedTasks.push(t);
          }
          return;
      }
      if (typeof r == "object" && r !== null)
        switch (r.$$typeof) {
          case yw:
            if (n = ew(e, t, r.render, n, o), Ui !== 0) {
              r = t.treeContext, t.treeContext = hp(r, 1, 0);
              try {
                Dt(e, t, n);
              } finally {
                t.treeContext = r;
              }
            } else
              Dt(e, t, n);
            return;
          case xw:
            r = r.type, n = rw(r, n), mp(e, t, r, n, o);
            return;
          case vw:
            if (o = n.children, r = r._context, n = n.value, l = r._currentValue, r._currentValue = n, i = mo, mo = n = { parent: i, depth: i === null ? 0 : i.depth + 1, context: r, parentValue: l, value: n }, t.context = n, Dt(e, t, o), e = mo, e === null)
              throw Error(Q(403));
            n = e.parentValue, e.context._currentValue = n === VC ? e.context._defaultValue : n, e = mo = e.parent, t.context = e;
            return;
          case gw:
            n = n.children, n = n(r._currentValue), Dt(e, t, n);
            return;
          case Sp:
            o = r._init, r = o(r._payload), n = rw(r, n), mp(e, t, r, n, void 0);
            return;
        }
      throw Error(Q(130, r == null ? r : typeof r, ""));
    }
  }
  function Dt(e, t, r) {
    if (t.node = r, typeof r == "object" && r !== null) {
      switch (r.$$typeof) {
        case AC:
          mp(e, t, r.type, r.props, r.ref);
          return;
        case fw:
          throw Error(Q(257));
        case Sp:
          var n = r._init;
          r = n(r._payload), Dt(e, t, r);
          return;
      }
      if (fp(r)) {
        nw(e, t, r);
        return;
      }
      if (r === null || typeof r != "object" ? n = null : (n = K0 && r[K0] || r["@@iterator"], n = typeof n == "function" ? n : null), n && (n = n.call(r))) {
        if (r = n.next(), !r.done) {
          var o = [];
          do
            o.push(r.value), r = n.next();
          while (!r.done);
          nw(e, t, o);
        }
        return;
      }
      throw e = Object.prototype.toString.call(r), Error(Q(31, e === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : e));
    }
    typeof r == "string" ? (n = t.blockedSegment, n.lastPushedText = U0(t.blockedSegment.chunks, r, e.responseState, n.lastPushedText)) : typeof r == "number" && (n = t.blockedSegment, n.lastPushedText = U0(t.blockedSegment.chunks, "" + r, e.responseState, n.lastPushedText));
  }
  function nw(e, t, r) {
    for (var n = r.length, o = 0; o < n; o++) {
      var l = t.treeContext;
      t.treeContext = hp(l, n, o);
      try {
        vp(e, t, r[o]);
      } finally {
        t.treeContext = l;
      }
    }
  }
  function vp(e, t, r) {
    var n = t.blockedSegment.formatContext, o = t.legacyContext, l = t.context;
    try {
      return Dt(e, t, r);
    } catch (s) {
      if (Rp(), typeof s == "object" && s !== null && typeof s.then == "function") {
        r = s;
        var i = t.blockedSegment, a = ku(e, i.chunks.length, null, i.formatContext, i.lastPushedText, true);
        i.children.push(a), i.lastPushedText = false, e = kp(e, t.node, t.blockedBoundary, a, t.abortSet, t.legacyContext, t.context, t.treeContext).ping, r.then(e, e), t.blockedSegment.formatContext = n, t.legacyContext = o, t.context = l, Eu(l);
      } else
        throw t.blockedSegment.formatContext = n, t.legacyContext = o, t.context = l, Eu(l), s;
    }
  }
  function qC(e) {
    var t = e.blockedBoundary;
    e = e.blockedSegment, e.status = 3, bw(this, t, e);
  }
  function Pw(e, t, r) {
    var n = e.blockedBoundary;
    e.blockedSegment.status = 3, n === null ? (t.allPendingTasks--, t.status !== 2 && (t.status = 2, t.destination !== null && t.destination.close())) : (n.pendingTasks--, n.forceClientRender || (n.forceClientRender = true, e = r === void 0 ? Error(Q(432)) : r, n.errorDigest = t.onError(e), n.parentFlushed && t.clientRenderedBoundaries.push(n)), n.fallbackAbortableTasks.forEach(function(o) {
      return Pw(o, t, r);
    }), n.fallbackAbortableTasks.clear(), t.allPendingTasks--, t.allPendingTasks === 0 && (n = t.onAllReady, n()));
  }
  function _u(e, t) {
    if (t.chunks.length === 0 && t.children.length === 1 && t.children[0].boundary === null) {
      var r = t.children[0];
      r.id = t.id, r.parentFlushed = true, r.status === 1 && _u(e, r);
    } else
      e.completedSegments.push(t);
  }
  function bw(e, t, r) {
    if (t === null) {
      if (r.parentFlushed) {
        if (e.completedRootSegment !== null)
          throw Error(Q(389));
        e.completedRootSegment = r;
      }
      e.pendingRootTasks--, e.pendingRootTasks === 0 && (e.onShellError = Ii, t = e.onShellReady, t());
    } else
      t.pendingTasks--, t.forceClientRender || (t.pendingTasks === 0 ? (r.parentFlushed && r.status === 1 && _u(t, r), t.parentFlushed && e.completedBoundaries.push(t), t.fallbackAbortableTasks.forEach(qC, e), t.fallbackAbortableTasks.clear()) : r.parentFlushed && r.status === 1 && (_u(t, r), t.completedSegments.length === 1 && t.parentFlushed && e.partialBoundaries.push(t)));
    e.allPendingTasks--, e.allPendingTasks === 0 && (e = e.onAllReady, e());
  }
  function Lw(e) {
    if (e.status !== 2) {
      var t = mo, r = dp.current;
      dp.current = q0;
      var n = xu;
      xu = e.responseState;
      try {
        var o = e.pingedTasks, l;
        for (l = 0; l < o.length; l++) {
          var i = o[l], a = e, s = i.blockedSegment;
          if (s.status === 0) {
            Eu(i.context);
            try {
              Dt(a, i, i.node), s.lastPushedText && s.textEmbedded && s.chunks.push(wp), i.abortSet.delete(i), s.status = 1, bw(a, i.blockedBoundary, s);
            } catch (g) {
              if (Rp(), typeof g == "object" && g !== null && typeof g.then == "function") {
                var u = i.ping;
                g.then(u, u);
              } else {
                i.abortSet.delete(i), s.status = 4;
                var c = i.blockedBoundary, d = g, p = ji(a, d);
                if (c === null ? Cu(a, d) : (c.pendingTasks--, c.forceClientRender || (c.forceClientRender = true, c.errorDigest = p, c.parentFlushed && a.clientRenderedBoundaries.push(c))), a.allPendingTasks--, a.allPendingTasks === 0) {
                  var v = a.onAllReady;
                  v();
                }
              }
            } finally {
            }
          }
        }
        o.splice(0, l), e.destination !== null && Cp(e, e.destination);
      } catch (g) {
        ji(e, g), Cu(e, g);
      } finally {
        xu = n, dp.current = r, r === q0 && Eu(t);
      }
    }
  }
  function vu(e, t, r) {
    switch (r.parentFlushed = true, r.status) {
      case 0:
        var n = r.id = e.nextSegmentId++;
        return r.lastPushedText = false, r.textEmbedded = false, e = e.responseState, I(t, Wk), I(t, e.placeholderPrefix), e = G(n.toString(16)), I(t, e), pe(t, Kk);
      case 1:
        r.status = 2;
        var o = true;
        n = r.chunks;
        var l = 0;
        r = r.children;
        for (var i = 0; i < r.length; i++) {
          for (o = r[i]; l < o.index; l++)
            I(t, n[l]);
          o = bu(e, t, o);
        }
        for (; l < n.length - 1; l++)
          I(t, n[l]);
        return l < n.length && (o = pe(t, n[l])), o;
      default:
        throw Error(Q(390));
    }
  }
  function bu(e, t, r) {
    var n = r.boundary;
    if (n === null)
      return vu(e, t, r);
    if (n.parentFlushed = true, n.forceClientRender)
      n = n.errorDigest, pe(t, Jk), I(t, Zk), n && (I(t, eC), I(t, G(Ke(n))), I(t, qk)), pe(t, tC), vu(e, t, r);
    else if (0 < n.pendingTasks) {
      n.rootSegmentID = e.nextSegmentId++, 0 < n.completedSegments.length && e.partialBoundaries.push(n);
      var o = e.responseState, l = o.nextSuspenseID++;
      o = M(o.boundaryPrefix + l.toString(16)), n = n.id = o, W0(t, e.responseState, n), vu(e, t, r);
    } else if (n.byteSize > e.progressiveChunkSize)
      n.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(n), W0(t, e.responseState, n.id), vu(e, t, r);
    else {
      if (pe(t, Qk), r = n.completedSegments, r.length !== 1)
        throw Error(Q(391));
      bu(e, t, r[0]);
    }
    return pe(t, Xk);
  }
  function ow(e, t, r) {
    return RC(t, e.responseState, r.formatContext, r.id), bu(e, t, r), kC(t, r.formatContext);
  }
  function lw(e, t, r) {
    for (var n = r.completedSegments, o = 0; o < n.length; o++)
      Tw(e, t, r, n[o]);
    if (n.length = 0, e = e.responseState, n = r.id, r = r.rootSegmentID, I(t, e.startInlineScript), e.sentCompleteBoundaryFunction ? I(t, LC) : (e.sentCompleteBoundaryFunction = true, I(t, bC)), n === null)
      throw Error(Q(395));
    return r = G(r.toString(16)), I(t, n), I(t, TC), I(t, e.segmentPrefix), I(t, r), pe(t, DC);
  }
  function Tw(e, t, r, n) {
    if (n.status === 2)
      return true;
    var o = n.id;
    if (o === -1) {
      if ((n.id = r.rootSegmentID) === -1)
        throw Error(Q(392));
      return ow(e, t, n);
    }
    return ow(e, t, n), e = e.responseState, I(t, e.startInlineScript), e.sentCompleteSegmentFunction ? I(t, _C) : (e.sentCompleteSegmentFunction = true, I(t, CC)), I(t, e.segmentPrefix), o = G(o.toString(16)), I(t, o), I(t, NC), I(t, e.placeholderPrefix), I(t, o), pe(t, PC);
  }
  function Cp(e, t) {
    Lt = new Uint8Array(512), Tt = 0;
    try {
      var r = e.completedRootSegment;
      if (r !== null && e.pendingRootTasks === 0) {
        bu(e, t, r), e.completedRootSegment = null;
        var n = e.responseState.bootstrapChunks;
        for (r = 0; r < n.length - 1; r++)
          I(t, n[r]);
        r < n.length && pe(t, n[r]);
      }
      var o = e.clientRenderedBoundaries, l;
      for (l = 0; l < o.length; l++) {
        var i = o[l];
        n = t;
        var a = e.responseState, s = i.id, u = i.errorDigest, c = i.errorMessage, d = i.errorComponentStack;
        if (I(n, a.startInlineScript), a.sentClientRenderFunction ? I(n, MC) : (a.sentClientRenderFunction = true, I(n, FC)), s === null)
          throw Error(Q(395));
        if (I(n, s), I(n, OC), (u || c || d) && (I(n, up), I(n, G(cp(u || "")))), (c || d) && (I(n, up), I(n, G(cp(c || "")))), d && (I(n, up), I(n, G(cp(d)))), !pe(n, zC)) {
          e.destination = null, l++, o.splice(0, l);
          return;
        }
      }
      o.splice(0, l);
      var p = e.completedBoundaries;
      for (l = 0; l < p.length; l++)
        if (!lw(e, t, p[l])) {
          e.destination = null, l++, p.splice(0, l);
          return;
        }
      p.splice(0, l), O0(t), Lt = new Uint8Array(512), Tt = 0;
      var v = e.partialBoundaries;
      for (l = 0; l < v.length; l++) {
        var g = v[l];
        e: {
          o = e, i = t;
          var y = g.completedSegments;
          for (a = 0; a < y.length; a++)
            if (!Tw(o, i, g, y[a])) {
              a++, y.splice(0, a);
              var x = false;
              break e;
            }
          y.splice(0, a), x = true;
        }
        if (!x) {
          e.destination = null, l++, v.splice(0, l);
          return;
        }
      }
      v.splice(0, l);
      var f = e.completedBoundaries;
      for (l = 0; l < f.length; l++)
        if (!lw(e, t, f[l])) {
          e.destination = null, l++, f.splice(0, l);
          return;
        }
      f.splice(0, l);
    } finally {
      O0(t), e.allPendingTasks === 0 && e.pingedTasks.length === 0 && e.clientRenderedBoundaries.length === 0 && e.completedBoundaries.length === 0 && t.close();
    }
  }
  function iw(e, t) {
    try {
      var r = e.abortableTasks;
      r.forEach(function(n) {
        return Pw(n, e, t);
      }), r.clear(), e.destination !== null && Cp(e, e.destination);
    } catch (n) {
      ji(e, n), Cu(e, n);
    }
  }
  _p.renderToReadableStream = function(e, t) {
    return new Promise(function(r, n) {
      var o, l, i = new Promise(function(c, d) {
        l = c, o = d;
      }), a = ZC(e, Mk(t ? t.identifierPrefix : void 0, t ? t.nonce : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0), Ok(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, l, function() {
        var c = new ReadableStream({ type: "bytes", pull: function(d) {
          if (a.status === 1)
            a.status = 2, uw(d, a.fatalError);
          else if (a.status !== 2 && a.destination === null) {
            a.destination = d;
            try {
              Cp(a, d);
            } catch (p) {
              ji(a, p), Cu(a, p);
            }
          }
        }, cancel: function() {
          iw(a);
        } }, { highWaterMark: 0 });
        c.allReady = i, r(c);
      }, function(c) {
        i.catch(function() {
        }), n(c);
      }, o);
      if (t && t.signal) {
        var s = t.signal, u = function() {
          iw(a, s.reason), s.removeEventListener("abort", u);
        };
        s.addEventListener("abort", u);
      }
      Lw(a);
    });
  };
  _p.version = "18.2.0";
});
var Mw = Ot((vo) => {
  "use strict";
  var dl, Fw;
  dl = M0(), Fw = Dw();
  vo.version = dl.version;
  vo.renderToString = dl.renderToString;
  vo.renderToStaticMarkup = dl.renderToStaticMarkup;
  vo.renderToNodeStream = dl.renderToNodeStream;
  vo.renderToStaticNodeStream = dl.renderToStaticNodeStream;
  vo.renderToReadableStream = Fw.renderToReadableStream;
});
var zw = Ot((Lu) => {
  "use strict";
  var e_ = je(), t_ = Symbol.for("react.element"), r_ = Symbol.for("react.fragment"), n_ = Object.prototype.hasOwnProperty, o_ = e_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l_ = { key: true, ref: true, __self: true, __source: true };
  function Ow(e, t, r) {
    var n, o = {}, l = null, i = null;
    r !== void 0 && (l = "" + r), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (i = t.ref);
    for (n in t)
      n_.call(t, n) && !l_.hasOwnProperty(n) && (o[n] = t[n]);
    if (e && e.defaultProps)
      for (n in t = e.defaultProps, t)
        o[n] === void 0 && (o[n] = t[n]);
    return { $$typeof: t_, type: e, key: l, ref: i, props: o, _owner: o_.current };
  }
  Lu.Fragment = r_;
  Lu.jsx = Ow;
  Lu.jsxs = Ow;
});
var Vr = Ot((ZN, Iw) => {
  "use strict";
  Iw.exports = zw();
});
var Np = {};
xo(Np, { default: () => Uw });
Pn();
function Ne() {
  return Ne = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ne.apply(this, arguments);
}
var D = Ee(je());
Pn();
function bn(e, t) {
  if (e === false || e === null || typeof e > "u")
    throw new Error(t);
}
Pn();
async function wy(e, t) {
  if (e.id in t)
    return t[e.id];
  try {
    let r = await import(e.module);
    return t[e.id] = r, r;
  } catch (r) {
    if (window.__remixContext.isSpaMode && typeof import.meta.hot < "u")
      throw console.error(`Error loading route module \`${e.module}\`:`, r), r;
    return window.location.reload(), new Promise(() => {
    });
  }
}
function Sy(e, t, r) {
  let n = e.map((l) => {
    var i;
    let a = t[l.route.id], s = r.routes[l.route.id];
    return [s.css ? s.css.map((u) => ({ rel: "stylesheet", href: u })) : [], (a == null || (i = a.links) === null || i === void 0 ? void 0 : i.call(a)) || []];
  }).flat(2), o = xR(e, r);
  return ky(n, o);
}
function Tf(e) {
  return e != null && typeof e.page == "string";
}
function SR(e) {
  return e == null ? false : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function xy(e, t, r) {
  let n = await Promise.all(e.map(async (o) => {
    let l = await wy(t.routes[o.route.id], r);
    return l.links ? l.links() : [];
  }));
  return ky(n.flat(1).filter(SR).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map((o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }));
}
function Df(e, t, r, n, o, l) {
  let i = Cy(e), a = (c, d) => r[d] ? c.route.id !== r[d].route.id : true, s = (c, d) => {
    var p;
    return r[d].pathname !== c.pathname || ((p = r[d].route.path) === null || p === void 0 ? void 0 : p.endsWith("*")) && r[d].params["*"] !== c.params["*"];
  };
  return l === "data" && o.search !== i.search ? t.filter((c, d) => {
    if (!n.routes[c.route.id].hasLoader)
      return false;
    if (a(c, d) || s(c, d))
      return true;
    if (c.route.shouldRevalidate) {
      var v;
      let g = c.route.shouldRevalidate({ currentUrl: new URL(o.pathname + o.search + o.hash, window.origin), currentParams: ((v = r[0]) === null || v === void 0 ? void 0 : v.params) || {}, nextUrl: new URL(e, window.origin), nextParams: c.params, defaultShouldRevalidate: true });
      if (typeof g == "boolean")
        return g;
    }
    return true;
  }) : t.filter((c, d) => {
    let p = n.routes[c.route.id];
    return (l === "assets" || p.hasLoader) && (a(c, d) || s(c, d));
  });
}
function Ey(e, t, r) {
  let n = Cy(e);
  return Ff(t.filter((o) => r.routes[o.route.id].hasLoader).map((o) => {
    let { pathname: l, search: i } = n, a = new URLSearchParams(i);
    return a.set("_data", o.route.id), `${l}?${a}`;
  }));
}
function Ry(e, t) {
  return Ff(e.map((r) => {
    let n = t.routes[r.route.id], o = [n.module];
    return n.imports && (o = o.concat(n.imports)), o;
  }).flat(1));
}
function xR(e, t) {
  return Ff(e.map((r) => {
    let n = t.routes[r.route.id], o = [n.module];
    return n.imports && (o = o.concat(n.imports)), o;
  }).flat(1));
}
function Ff(e) {
  return [...new Set(e)];
}
function ER(e) {
  let t = {}, r = Object.keys(e).sort();
  for (let n of r)
    t[n] = e[n];
  return t;
}
function ky(e, t) {
  let r = /* @__PURE__ */ new Set(), n = new Set(t);
  return e.reduce((o, l) => {
    if (t && !Tf(l) && l.as === "script" && l.href && n.has(l.href))
      return o;
    let a = JSON.stringify(ER(l));
    return r.has(a) || (r.add(a), o.push({ key: a, link: l })), o;
  }, []);
}
function Cy(e) {
  let t = _e(e);
  return t.search === void 0 && (t.search = ""), t;
}
var RR = { "&": "\\u0026", ">": "\\u003e", "<": "\\u003c", "\u2028": "\\u2028", "\u2029": "\\u2029" };
var kR = /[&><\u2028\u2029]/g;
function Ni(e) {
  return e.replace(kR, (t) => RR[t]);
}
function Mf(e) {
  return { __html: e };
}
function Ny() {
  let e = D.useContext(Qt);
  return bn(e, "You must render this element inside a <DataRouterContext.Provider> element"), e;
}
function Qs() {
  let e = D.useContext(ar);
  return bn(e, "You must render this element inside a <DataRouterStateContext.Provider> element"), e;
}
var bi = D.createContext(void 0);
bi.displayName = "Remix";
function uo() {
  let e = D.useContext(bi);
  return bn(e, "You must render this element inside a <Remix> element"), e;
}
function Py(e, t) {
  let [r, n] = D.useState(false), [o, l] = D.useState(false), { onFocus: i, onBlur: a, onMouseEnter: s, onMouseLeave: u, onTouchStart: c } = t, d = D.useRef(null);
  D.useEffect(() => {
    if (e === "render" && l(true), e === "viewport") {
      let g = (x) => {
        x.forEach((f) => {
          l(f.isIntersecting);
        });
      }, y = new IntersectionObserver(g, { threshold: 0.5 });
      return d.current && y.observe(d.current), () => {
        y.disconnect();
      };
    }
  }, [e]);
  let p = () => {
    e === "intent" && n(true);
  }, v = () => {
    e === "intent" && (n(false), l(false));
  };
  return D.useEffect(() => {
    if (r) {
      let g = setTimeout(() => {
        l(true);
      }, 100);
      return () => {
        clearTimeout(g);
      };
    }
  }, [r]), [o, d, { onFocus: Pi(i, p), onBlur: Pi(a, v), onMouseEnter: Pi(s, p), onMouseLeave: Pi(u, v), onTouchStart: Pi(c, p) }];
}
var by = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Ly = D.forwardRef(({ to: e, prefetch: t = "none", ...r }, n) => {
  let o = typeof e == "string" && by.test(e), l = zr(e), [i, a, s] = Py(t, r);
  return D.createElement(D.Fragment, null, D.createElement(_f, Ne({}, r, s, { ref: Fy(n, a), to: e })), i && !o ? D.createElement(Ys, { page: l }) : null);
});
Ly.displayName = "NavLink";
var Ty = D.forwardRef(({ to: e, prefetch: t = "none", ...r }, n) => {
  let o = typeof e == "string" && by.test(e), l = zr(e), [i, a, s] = Py(t, r);
  return D.createElement(D.Fragment, null, D.createElement(Hs, Ne({}, r, s, { ref: Fy(n, a), to: e })), i && !o ? D.createElement(Ys, { page: l }) : null);
});
Ty.displayName = "Link";
function Pi(e, t) {
  return (r) => {
    e && e(r), r.defaultPrevented || t(r);
  };
}
function zf() {
  let { manifest: e, routeModules: t, criticalCss: r } = uo(), { errors: n, matches: o } = Qs(), l = n ? o.slice(0, o.findIndex((a) => n[a.route.id]) + 1) : o, i = D.useMemo(() => Sy(l, t, e), [l, t, e]);
  return D.createElement(D.Fragment, null, r ? D.createElement("style", { dangerouslySetInnerHTML: { __html: r } }) : null, i.map(({ key: a, link: s }) => Tf(s) ? D.createElement(Ys, Ne({ key: a }, s)) : D.createElement("link", Ne({ key: a }, s))));
}
function Ys({ page: e, ...t }) {
  let { router: r } = Ny(), n = D.useMemo(() => Ae(r.routes, e), [r.routes, e]);
  return n ? D.createElement(_R, Ne({ page: e, matches: n }, t)) : (console.warn(`Tried to prefetch ${e} but no routes matched.`), null);
}
function CR(e) {
  let { manifest: t, routeModules: r } = uo(), [n, o] = D.useState([]);
  return D.useEffect(() => {
    let l = false;
    return xy(e, t, r).then((i) => {
      l || o(i);
    }), () => {
      l = true;
    };
  }, [e, t, r]), n;
}
function _R({ page: e, matches: t, ...r }) {
  let n = be(), { manifest: o } = uo(), { matches: l } = Qs(), i = D.useMemo(() => Df(e, t, l, o, n, "data"), [e, t, l, o, n]), a = D.useMemo(() => Df(e, t, l, o, n, "assets"), [e, t, l, o, n]), s = D.useMemo(() => Ey(e, i, o), [i, e, o]), u = D.useMemo(() => Ry(a, o), [a, o]), c = CR(a);
  return D.createElement(D.Fragment, null, s.map((d) => D.createElement("link", Ne({ key: d, rel: "prefetch", as: "fetch", href: d }, r))), u.map((d) => D.createElement("link", Ne({ key: d, rel: "modulepreload", href: d }, r))), c.map(({ key: d, link: p }) => D.createElement("link", Ne({ key: d }, p))));
}
function If() {
  let { routeModules: e } = uo(), { errors: t, matches: r, loaderData: n } = Qs(), o = be(), l = r, i = null;
  if (t) {
    let c = r.findIndex((d) => t[d.route.id]);
    l = r.slice(0, c + 1), i = t[r[c].route.id];
  }
  let a = [], s = null, u = [];
  for (let c = 0; c < l.length; c++) {
    let d = l[c], p = d.route.id, v = n[p], g = d.params, y = e[p], x = [], f = { id: p, data: v, meta: [], params: d.params, pathname: d.pathname, handle: d.route.handle, error: i };
    if (u[c] = f, y != null && y.meta ? x = typeof y.meta == "function" ? y.meta({ data: v, params: g, location: o, matches: u, error: i }) : Array.isArray(y.meta) ? [...y.meta] : y.meta : s && (x = [...s]), x = x || [], !Array.isArray(x))
      throw new Error("The route at " + d.route.path + ` returns an invalid value. All route meta functions must return an array of meta objects.

To reference the meta function API, see https://remix.run/route/meta`);
    f.meta = x, u[c] = f, a = [...x], s = a;
  }
  return D.createElement(D.Fragment, null, a.flat().map((c) => {
    if (!c)
      return null;
    if ("tagName" in c) {
      let { tagName: d, ...p } = c;
      return NR(d) ? D.createElement(d, Ne({ key: JSON.stringify(p) }, p)) : (console.warn(`A meta object uses an invalid tagName: ${d}. Expected either 'link' or 'meta'`), null);
    }
    if ("title" in c)
      return D.createElement("title", { key: "title" }, String(c.title));
    if ("charset" in c && (c.charSet ??= c.charset, delete c.charset), "charSet" in c && c.charSet != null)
      return typeof c.charSet == "string" ? D.createElement("meta", { key: "charSet", charSet: c.charSet }) : null;
    if ("script:ld+json" in c)
      try {
        let d = JSON.stringify(c["script:ld+json"]);
        return D.createElement("script", { key: `script:ld+json:${d}`, type: "application/ld+json", dangerouslySetInnerHTML: { __html: d } });
      } catch {
        return null;
      }
    return D.createElement("meta", Ne({ key: JSON.stringify(c) }, c));
  }));
}
function NR(e) {
  return typeof e == "string" && /^(meta|link)$/.test(e);
}
function Dy(e) {
  return D.createElement(Ri, e);
}
var Of = false;
function Li(e) {
  let { manifest: t, serverHandoffString: r, abortDelay: n, serializeError: o, isSpaMode: l } = uo(), { router: i, static: a, staticContext: s } = Ny(), { matches: u } = Qs(), c = Cn(), d = l ? [u[0]] : u;
  D.useEffect(() => {
    Of = true;
  }, []);
  let p = (k, w) => {
    let C;
    return o && w instanceof Error ? C = o(w) : C = w, `${JSON.stringify(k)}:__remixContext.p(!1, ${Ni(JSON.stringify(C))})`;
  }, v = (k, w, C) => {
    let P;
    try {
      P = JSON.stringify(C);
    } catch (T) {
      return p(w, T);
    }
    return `${JSON.stringify(w)}:__remixContext.p(${Ni(P)})`;
  }, g = (k, w, C) => {
    let P;
    return o && C instanceof Error ? P = o(C) : P = C, `__remixContext.r(${JSON.stringify(k)}, ${JSON.stringify(w)}, !1, ${Ni(JSON.stringify(P))})`;
  }, y = (k, w, C) => {
    let P;
    try {
      P = JSON.stringify(C);
    } catch (T) {
      return g(k, w, T);
    }
    return `__remixContext.r(${JSON.stringify(k)}, ${JSON.stringify(w)}, ${Ni(P)})`;
  }, x = [], f = D.useMemo(() => {
    var k;
    let w = s ? `window.__remixContext = ${r};` : " ", C = s?.activeDeferreds;
    w += C ? ["__remixContext.p = function(v,e,p,x) {", "  if (typeof e !== 'undefined') {", `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`, "    p=Promise.reject(x);", "  } else {", "    p=Promise.resolve(v);", "  }", "  return p;", "};", "__remixContext.n = function(i,k) {", "  __remixContext.t = __remixContext.t || {};", "  __remixContext.t[i] = __remixContext.t[i] || {};", "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});", typeof n == "number" ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${n});` : "", "  return p;", "};", "__remixContext.r = function(i,k,v,e,p,x) {", "  p = __remixContext.t[i][k];", "  if (typeof e !== 'undefined') {", `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`, "    p.e(x);", "  } else {", "    p.r(v);", "  }", "};"].join(`
`) + Object.entries(C).map(([T, z]) => {
      let X = new Set(z.pendingKeys), H = z.deferredKeys.map((le) => {
        if (X.has(le))
          return x.push(D.createElement(_y, { key: `${T} | ${le}`, deferredData: z, routeId: T, dataKey: le, scriptProps: e, serializeData: y, serializeError: g })), `${JSON.stringify(le)}:__remixContext.n(${JSON.stringify(T)}, ${JSON.stringify(le)})`;
        {
          let Fe = z.data[le];
          return typeof Fe._error < "u" ? p(le, Fe._error) : v(T, le, Fe._data);
        }
      }).join(`,
`);
      return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(T)}], {${H}});`;
    }).join(`
`) + (x.length > 0 ? `__remixContext.a=${x.length};` : "") : "";
    let P = a ? `${(k = t.hmr) !== null && k !== void 0 && k.runtime ? `import ${JSON.stringify(t.hmr.runtime)};` : ""}import ${JSON.stringify(t.url)};
${d.map((T, z) => `import * as route${z} from ${JSON.stringify(t.routes[T.route.id].module)};`).join(`
`)}
window.__remixRouteModules = {${d.map((T, z) => `${JSON.stringify(T.route.id)}:route${z}`).join(",")}};

import(${JSON.stringify(t.entry.module)});` : " ";
    return D.createElement(D.Fragment, null, D.createElement("script", Ne({}, e, { suppressHydrationWarning: true, dangerouslySetInnerHTML: Mf(w), type: void 0 })), D.createElement("script", Ne({}, e, { suppressHydrationWarning: true, dangerouslySetInnerHTML: Mf(P), type: "module", async: true })));
  }, []);
  if (!a && typeof __remixContext == "object" && __remixContext.a)
    for (let k = 0; k < __remixContext.a; k++)
      x.push(D.createElement(_y, { key: k, scriptProps: e, serializeData: y, serializeError: g }));
  let h = D.useMemo(() => {
    if (c.location) {
      let k = Ae(i.routes, c.location);
      return bn(k, `No routes match path "${c.location.pathname}"`), k;
    }
    return [];
  }, [c.location, i.routes]), m = d.concat(h).map((k) => {
    let w = t.routes[k.route.id];
    return (w.imports || []).concat([w.module]);
  }).flat(1), E = Of ? [] : t.entry.imports.concat(m);
  return Of ? null : D.createElement(D.Fragment, null, D.createElement("link", { rel: "modulepreload", href: t.url, crossOrigin: e.crossOrigin }), D.createElement("link", { rel: "modulepreload", href: t.entry.module, crossOrigin: e.crossOrigin }), bR(E).map((k) => D.createElement("link", { key: k, rel: "modulepreload", href: k, crossOrigin: e.crossOrigin })), f, x);
}
function _y({ dataKey: e, deferredData: t, routeId: r, scriptProps: n, serializeData: o, serializeError: l }) {
  return typeof document > "u" && t && e && r && bn(t.pendingKeys.includes(e), `Deferred data for route ${r} with key ${e} was not pending but tried to render a script for it.`), D.createElement(D.Suspense, { fallback: typeof document > "u" && t && e && r ? null : D.createElement("script", Ne({}, n, { async: true, suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: " " } })) }, typeof document > "u" && t && e && r ? D.createElement(Dy, { resolve: t.data[e], errorElement: D.createElement(PR, { dataKey: e, routeId: r, scriptProps: n, serializeError: l }), children: (i) => D.createElement("script", Ne({}, n, { async: true, suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: o(r, e, i) } })) }) : D.createElement("script", Ne({}, n, { async: true, suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: " " } })));
}
function PR({ dataKey: e, routeId: t, scriptProps: r, serializeError: n }) {
  let o = ol();
  return D.createElement("script", Ne({}, r, { suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: n(t, e, o) } }));
}
function bR(e) {
  return [...new Set(e)];
}
var Af = () => null;
function Fy(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var $e = Ee(je());
Pn();
var Gs = class extends $e.Component {
  constructor(t) {
    super(t), this.state = { error: t.error || null, location: t.location };
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, r) {
    return r.location !== t.location ? { error: t.error || null, location: t.location } : { error: t.error || r.error, location: r.location };
  }
  render() {
    return this.state.error ? $e.createElement(Uf, { error: this.state.error }) : this.props.children;
  }
};
function Uf({ error: e }) {
  if (console.error(e), Wt(e))
    return $e.createElement(My, { title: "Unhandled Thrown Response!" }, $e.createElement("h1", { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } }, e.status, " ", e.statusText));
  let t;
  if (e instanceof Error)
    t = e;
  else {
    let r = e == null ? "Unknown Error" : typeof e == "object" && "toString" in e ? e.toString() : JSON.stringify(e);
    t = new Error(r);
  }
  return $e.createElement(My, { title: "Application Error!" }, $e.createElement("main", { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } }, $e.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"), $e.createElement("pre", { style: { padding: "2rem", background: "hsla(10, 50%, 50%, 0.1)", color: "red", overflow: "auto" } }, t.stack)));
}
function My({ title: e, children: t }) {
  return $e.createElement("html", { lang: "en" }, $e.createElement("head", null, $e.createElement("meta", { charSet: "utf-8" }), $e.createElement("meta", { name: "viewport", content: "width=device-width,initial-scale=1,viewport-fit=cover" }), $e.createElement("title", null, e)), $e.createElement("body", null, t, $e.createElement("script", { dangerouslySetInnerHTML: { __html: `
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
              );
            ` } })));
}
var zy = Ee(je());
Pn();
var Ln = Ee(je());
function Oy() {
  return Ln.createElement("html", { lang: "en" }, Ln.createElement("head", null, Ln.createElement("meta", { charSet: "utf-8" }), Ln.createElement("meta", { name: "viewport", content: "width=device-width,initial-scale=1,viewport-fit=cover" })), Ln.createElement("body", null, Ln.createElement(Li, null), Ln.createElement("script", { dangerouslySetInnerHTML: { __html: `
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this " +
                "when your app is running \`clientLoader\` functions on hydration. " +
                "Check out https://remix.run/route/hydrate-fallback for more information."
              );
            ` } }), " "));
}
function LR(e) {
  let t = {};
  return Object.values(e).forEach((r) => {
    let n = r.parentId || "";
    t[n] || (t[n] = []), t[n].push(r);
  }), t;
}
function jf(e, t, r, n, o = "", l = LR(e), i = Promise.resolve({ Component: () => null })) {
  return (l[o] || []).map((a) => {
    let s = t[a.id];
    bn(s, "No `routeModule` available to create server routes");
    let u = { caseSensitive: a.caseSensitive, Component: TR(s), HydrateFallback: s.HydrateFallback && (!n || a.id === "root") ? s.HydrateFallback : a.id === "root" ? Oy : void 0, ErrorBoundary: s.ErrorBoundary ? s.ErrorBoundary : a.id === "root" ? () => zy.createElement(Uf, { error: so() }) : void 0, id: a.id, index: a.index, path: a.path, handle: s.handle, lazy: n && a.id !== "root" ? () => i : void 0, loader: a.hasLoader || a.hasClientLoader ? () => null : void 0 }, c = jf(e, t, r, n, a.id, l, i);
    return c.length > 0 && (u.children = c), u;
  });
}
function TR(e) {
  if (e.default == null)
    return;
  if (!(typeof e.default == "object" && Object.keys(e.default).length === 0))
    return e.default;
}
function Iy(e, t, r) {
  return r && e.id !== "root" || t.clientLoader != null && (t.clientLoader.hydrate === true || e.hasLoader !== true);
}
var Js = Ee(je());
Pn();
var Ay = "positions";
function Bf({ getKey: e, ...t }) {
  let { isSpaMode: r } = uo(), n = be(), o = _n();
  Ks({ getKey: e, storageKey: Ay });
  let l = Js.useMemo(() => {
    if (!e)
      return null;
    let a = e(n, o);
    return a !== n.key ? a : null;
  }, []);
  if (r)
    return null;
  let i = ((a, s) => {
    if (!window.history.state || !window.history.state.key) {
      let u = Math.random().toString(32).slice(2);
      window.history.replaceState({ key: u }, "");
    }
    try {
      let c = JSON.parse(sessionStorage.getItem(a) || "{}")[s || window.history.state.key];
      typeof c == "number" && window.scrollTo(0, c);
    } catch (u) {
      console.error(u), sessionStorage.removeItem(a);
    }
  }).toString();
  return Js.createElement("script", Ne({}, t, { suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: `(${i})(${JSON.stringify(Ay)}, ${JSON.stringify(l)})` } }));
}
var Xs = Ee(je());
var Zs = Ee(Vy());
function Hf({ context: e, url: t, abortDelay: r }) {
  typeof t == "string" && (t = new URL(t));
  let { manifest: n, routeModules: o, criticalCss: l, serverHandoffString: i } = e, a = jf(n.routes, o, e.future, e.isSpaMode);
  e.staticHandlerContext.loaderData = { ...e.staticHandlerContext.loaderData };
  for (let u of e.staticHandlerContext.matches) {
    let c = u.route.id, d = o[c], p = e.manifest.routes[c];
    d && Iy(p, d, e.isSpaMode) && (d.HydrateFallback || !p.hasLoader) && (e.staticHandlerContext.loaderData[c] = void 0);
  }
  let s = (0, Zs.createStaticRouter)(a, e.staticHandlerContext, { future: { v7_partialHydration: true, v7_relativeSplatPath: e.future.v3_relativeSplatPath } });
  return Xs.createElement(bi.Provider, { value: { manifest: n, routeModules: o, criticalCss: l, serverHandoffString: i, future: e.future, isSpaMode: e.isSpaMode, serializeError: e.serializeError, abortDelay: r } }, Xs.createElement(Gs, { location: s.state.location }, Xs.createElement(Zs.StaticRouterProvider, { router: s, context: e.staticHandlerContext, hydrate: false })));
}
var $R = " daum[ /]| deusu/| yadirectfetcher|(?:^| )site|(?:^|[^g])news|(?<! (?:channel/|google/))google(?!(app|/google| pixel))|(?<! cu)bot(?:[^\\w]|_|$)|(?<! ya(?:yandex)?)search|(?<!(?:lib))http|(?<![hg]m)score|@[a-z]|\\(at\\)[a-z]|\\[at\\][a-z]|^12345|^<|^[\\w \\.\\-\\(?:\\):]+(?:/v?\\d+(\\.\\d+)?(?:\\.\\d{1,10})?)?(?:,|$)|^[^ ]{50,}$|^active|^ad muncher|^amaya|^anglesharp/|^avsdevicesdk/|^bidtellect/|^biglotron|^bot|^btwebclient/|^clamav[ /]|^client/|^cobweb/|^coccoc|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^facebook|^fdm[ /]\\d|^getright/|^gozilla/|^hatena|^hobbit|^hotzonu|^hwcdn/|^jeode/|^jetty/|^jigsaw|^linkdex|^metauri|^microsoft bits|^movabletype|^mozilla/\\d\\.\\d \\(compatible;?\\)$|^mozilla/\\d\\.\\d \\w*$|^navermailapp|^netsurf|^nuclei|^offline explorer|^php|^postman|^postrank|^python|^rank|^read|^reed|^rest|^serf|^snapchat|^space bison|^svn|^swcd |^taringa|^thumbor/|^tumblr/|^user-agent:|^valid|^venus/fedoraplanet|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|^{{.*}}$|adbeat\\.com|appinsights|archive|ask jeeves/teoma|bit\\.ly/|bluecoat drtr|browsex|burpcollaborator|capture|catch|check|chrome-lighthouse|chromeframe|classifier|cloud|crawl|cryptoapi|dareboost|datanyze|dataprovider|dejaclick|dmbrowser|download|evc-batch/|feed|firephp|freesafeip|gomezagent|headless|httrack|hubspot marketing grader|hydra|ibisbrowser|images|inspect|iplabel|ips-agent|java(?!;)|library|mail\\.ru/|manager|monitor|neustar wpm|nutch|offbyone|optimize|pageburst|parser|perl|phantom|pingdom|powermarks|preview|proxy|ptst[ /]\\d|reader|reputation|resolver|retriever|rexx;|rigor|robot|rss|scan|scrape|server|sogou|sparkler/|speedcurve|spider|splash|statuscake|stumbleupon\\.com|supercleaner|synapse|synthetic|torrent|trace|transcoder|twingly recon|url|virtuoso|wappalyzer|webglance|webkit2png|whatcms/|wordpress|zgrab";
var WR = /bot|spider|crawl|http|lighthouse/i;
var qs;
function Hy(e) {
  if (typeof qs > "u")
    try {
      qs = new RegExp($R, "i");
    } catch {
      qs = WR;
    }
  return Boolean(e) && qs.test(e);
}
var Aw = Ee(Mw(), 1);
var jw = Ee(Vr(), 1);
async function Uw(e, t, r, n) {
  let o = await (0, Aw.renderToReadableStream)((0, jw.jsx)(Hf, { context: n, url: e.url }), { signal: e.signal, onError(l) {
    console.error(l), t = 500;
  } });
  return Hy(e.headers.get("user-agent")) && await o.allReady, r.set("Content-Type", "text/html"), new Response(o, { headers: r, status: t });
}
var Pp = {};
xo(Pp, { default: () => Hw, links: () => a_ });
var Bw = "/build/_assets/globals-SLZHOVJ3.css";
var Ft = Ee(Vr(), 1);
var a_ = () => [...void 0 ? [{ rel: "stylesheet", href: void 0 }] : [], { rel: "stylesheet", href: Bw }];
function Hw() {
  return (0, Ft.jsxs)("html", { lang: "en", children: [(0, Ft.jsxs)("head", { children: [(0, Ft.jsx)("meta", { charSet: "utf-8" }), (0, Ft.jsx)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), (0, Ft.jsx)(If, {}), (0, Ft.jsx)(zf, {})] }), (0, Ft.jsxs)("body", { children: [(0, Ft.jsx)(il, {}), (0, Ft.jsx)(Bf, {}), (0, Ft.jsx)(Li, {}), (0, Ft.jsx)(Af, {})] })] });
}
var Mp = {};
xo(Mp, { default: () => u1, meta: () => $_ });
var a1 = Ee(je(), 1);
function fl() {
  return fl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, fl.apply(this, arguments);
}
var xe = Ee(je(), 1);
var s_ = Ee(je(), 1);
function u_(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function $w(...e) {
  return (t) => e.forEach((r) => u_(r, t));
}
var Lp = (0, xe.forwardRef)((e, t) => {
  let { children: r, ...n } = e, o = xe.Children.toArray(r), l = o.find(d_);
  if (l) {
    let i = l.props.children, a = o.map((s) => s === l ? xe.Children.count(i) > 1 ? xe.Children.only(null) : (0, xe.isValidElement)(i) ? i.props.children : null : s);
    return (0, xe.createElement)(bp, fl({}, n, { ref: t }), (0, xe.isValidElement)(i) ? (0, xe.cloneElement)(i, void 0, a) : null);
  }
  return (0, xe.createElement)(bp, fl({}, n, { ref: t }), r);
});
Lp.displayName = "Slot";
var bp = (0, xe.forwardRef)((e, t) => {
  let { children: r, ...n } = e;
  return (0, xe.isValidElement)(r) ? (0, xe.cloneElement)(r, { ...f_(n, r.props), ref: t ? $w(t, r.ref) : r.ref }) : xe.Children.count(r) > 1 ? xe.Children.only(null) : null;
});
bp.displayName = "SlotClone";
var c_ = ({ children: e }) => (0, xe.createElement)(xe.Fragment, null, e);
function d_(e) {
  return (0, xe.isValidElement)(e) && e.type === c_;
}
function f_(e, t) {
  let r = { ...t };
  for (let n in t) {
    let o = e[n], l = t[n];
    /^on[A-Z]/.test(n) ? o && l ? r[n] = (...a) => {
      l(...a), o(...a);
    } : o && (r[n] = o) : n === "style" ? r[n] = { ...o, ...l } : n === "className" && (r[n] = [o, l].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function Ww(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number")
    n += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (r = Ww(e[t])) && (n && (n += " "), n += r);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function Kw() {
  for (var e, t, r = 0, n = ""; r < arguments.length; )
    (e = arguments[r++]) && (t = Ww(e)) && (n && (n += " "), n += t);
  return n;
}
var Qw = (e) => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e;
var Yw = Kw;
var Gw = (e, t) => (r) => {
  var n;
  if (t?.variants == null)
    return Yw(e, r?.class, r?.className);
  let { variants: o, defaultVariants: l } = t, i = Object.keys(o).map((u) => {
    let c = r?.[u], d = l?.[u];
    if (c === null)
      return null;
    let p = Qw(c) || Qw(d);
    return o[u][p];
  }), a = r && Object.entries(r).reduce((u, c) => {
    let [d, p] = c;
    return p === void 0 || (u[d] = p), u;
  }, {}), s = t == null || (n = t.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((u, c) => {
    let { class: d, className: p, ...v } = c;
    return Object.entries(v).every((g) => {
      let [y, x] = g;
      return Array.isArray(x) ? x.includes({ ...l, ...a }[y]) : { ...l, ...a }[y] === x;
    }) ? [...u, d, p] : u;
  }, []);
  return Yw(e, i, s, r?.class, r?.className);
};
function Jw(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number")
    n += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (r = Jw(e[t])) && (n && (n += " "), n += r);
    } else
      for (r in e)
        e[r] && (n && (n += " "), n += r);
  return n;
}
function Xw() {
  for (var e, t, r = 0, n = "", o = arguments.length; r < o; r++)
    (e = arguments[r]) && (t = Jw(e)) && (n && (n += " "), n += t);
  return n;
}
var Dp = "-";
function p_(e) {
  let t = m_(e), { conflictingClassGroups: r, conflictingClassGroupModifiers: n } = e;
  function o(i) {
    let a = i.split(Dp);
    return a[0] === "" && a.length !== 1 && a.shift(), e1(a, t) || h_(i);
  }
  function l(i, a) {
    let s = r[i] || [];
    return a && n[i] ? [...s, ...n[i]] : s;
  }
  return { getClassGroupId: o, getConflictingClassGroupIds: l };
}
function e1(e, t) {
  if (e.length === 0)
    return t.classGroupId;
  let r = e[0], n = t.nextPart.get(r), o = n ? e1(e.slice(1), n) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  let l = e.join(Dp);
  return t.validators.find(({ validator: i }) => i(l))?.classGroupId;
}
var Zw = /^\[(.+)\]$/;
function h_(e) {
  if (Zw.test(e)) {
    let t = Zw.exec(e)[1], r = t?.substring(0, t.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}
function m_(e) {
  let { theme: t, prefix: r } = e, n = { nextPart: /* @__PURE__ */ new Map(), validators: [] };
  return g_(Object.entries(e.classGroups), r).forEach(([l, i]) => {
    Tp(i, n, l, t);
  }), n;
}
function Tp(e, t, r, n) {
  e.forEach((o) => {
    if (typeof o == "string") {
      let l = o === "" ? t : qw(t, o);
      l.classGroupId = r;
      return;
    }
    if (typeof o == "function") {
      if (v_(o)) {
        Tp(o(n), t, r, n);
        return;
      }
      t.validators.push({ validator: o, classGroupId: r });
      return;
    }
    Object.entries(o).forEach(([l, i]) => {
      Tp(i, qw(t, l), r, n);
    });
  });
}
function qw(e, t) {
  let r = e;
  return t.split(Dp).forEach((n) => {
    r.nextPart.has(n) || r.nextPart.set(n, { nextPart: /* @__PURE__ */ new Map(), validators: [] }), r = r.nextPart.get(n);
  }), r;
}
function v_(e) {
  return e.isThemeGetter;
}
function g_(e, t) {
  return t ? e.map(([r, n]) => {
    let o = n.map((l) => typeof l == "string" ? t + l : typeof l == "object" ? Object.fromEntries(Object.entries(l).map(([i, a]) => [t + i, a])) : l);
    return [r, o];
  }) : e;
}
function y_(e) {
  if (e < 1)
    return { get: () => {
    }, set: () => {
    } };
  let t = 0, r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  function o(l, i) {
    r.set(l, i), t++, t > e && (t = 0, n = r, r = /* @__PURE__ */ new Map());
  }
  return { get(l) {
    let i = r.get(l);
    if (i !== void 0)
      return i;
    if ((i = n.get(l)) !== void 0)
      return o(l, i), i;
  }, set(l, i) {
    r.has(l) ? r.set(l, i) : o(l, i);
  } };
}
var t1 = "!";
function w_(e) {
  let t = e.separator, r = t.length === 1, n = t[0], o = t.length;
  return function(i) {
    let a = [], s = 0, u = 0, c;
    for (let y = 0; y < i.length; y++) {
      let x = i[y];
      if (s === 0) {
        if (x === n && (r || i.slice(y, y + o) === t)) {
          a.push(i.slice(u, y)), u = y + o;
          continue;
        }
        if (x === "/") {
          c = y;
          continue;
        }
      }
      x === "[" ? s++ : x === "]" && s--;
    }
    let d = a.length === 0 ? i : i.substring(u), p = d.startsWith(t1), v = p ? d.substring(1) : d, g = c && c > u ? c - u : void 0;
    return { modifiers: a, hasImportantModifier: p, baseClassName: v, maybePostfixModifierPosition: g };
  };
}
function S_(e) {
  if (e.length <= 1)
    return e;
  let t = [], r = [];
  return e.forEach((n) => {
    n[0] === "[" ? (t.push(...r.sort(), n), r = []) : r.push(n);
  }), t.push(...r.sort()), t;
}
function x_(e) {
  return { cache: y_(e.cacheSize), splitModifiers: w_(e), ...p_(e) };
}
var E_ = /\s+/;
function R_(e, t) {
  let { splitModifiers: r, getClassGroupId: n, getConflictingClassGroupIds: o } = t, l = /* @__PURE__ */ new Set();
  return e.trim().split(E_).map((i) => {
    let { modifiers: a, hasImportantModifier: s, baseClassName: u, maybePostfixModifierPosition: c } = r(i), d = n(c ? u.substring(0, c) : u), p = Boolean(c);
    if (!d) {
      if (!c)
        return { isTailwindClass: false, originalClassName: i };
      if (d = n(u), !d)
        return { isTailwindClass: false, originalClassName: i };
      p = false;
    }
    let v = S_(a).join(":");
    return { isTailwindClass: true, modifierId: s ? v + t1 : v, classGroupId: d, originalClassName: i, hasPostfixModifier: p };
  }).reverse().filter((i) => {
    if (!i.isTailwindClass)
      return true;
    let { modifierId: a, classGroupId: s, hasPostfixModifier: u } = i, c = a + s;
    return l.has(c) ? false : (l.add(c), o(s, u).forEach((d) => l.add(a + d)), true);
  }).reverse().map((i) => i.originalClassName).join(" ");
}
function k_() {
  let e = 0, t, r, n = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (r = r1(t)) && (n && (n += " "), n += r);
  return n;
}
function r1(e) {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = r1(e[n])) && (r && (r += " "), r += t);
  return r;
}
function C_(e, ...t) {
  let r, n, o, l = i;
  function i(s) {
    let u = t.reduce((c, d) => d(c), e());
    return r = x_(u), n = r.cache.get, o = r.cache.set, l = a, a(s);
  }
  function a(s) {
    let u = n(s);
    if (u)
      return u;
    let c = R_(s, r);
    return o(s, c), c;
  }
  return function() {
    return l(k_.apply(null, arguments));
  };
}
function he(e) {
  let t = (r) => r[e] || [];
  return t.isThemeGetter = true, t;
}
var n1 = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var __ = /^\d+\/\d+$/;
var N_ = /* @__PURE__ */ new Set(["px", "full", "screen"]);
var P_ = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var b_ = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var L_ = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var T_ = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function Hr(e) {
  return go(e) || N_.has(e) || __.test(e);
}
function On(e) {
  return pl(e, "length", U_);
}
function go(e) {
  return Boolean(e) && !Number.isNaN(Number(e));
}
function Tu(e) {
  return pl(e, "number", go);
}
function Bi(e) {
  return Boolean(e) && Number.isInteger(Number(e));
}
function D_(e) {
  return e.endsWith("%") && go(e.slice(0, -1));
}
function W(e) {
  return n1.test(e);
}
function zn(e) {
  return P_.test(e);
}
var F_ = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
function M_(e) {
  return pl(e, F_, o1);
}
function O_(e) {
  return pl(e, "position", o1);
}
var z_ = /* @__PURE__ */ new Set(["image", "url"]);
function I_(e) {
  return pl(e, z_, B_);
}
function A_(e) {
  return pl(e, "", j_);
}
function Vi() {
  return true;
}
function pl(e, t, r) {
  let n = n1.exec(e);
  return n ? n[1] ? typeof t == "string" ? n[1] === t : t.has(n[1]) : r(n[2]) : false;
}
function U_(e) {
  return b_.test(e);
}
function o1() {
  return false;
}
function j_(e) {
  return L_.test(e);
}
function B_(e) {
  return T_.test(e);
}
function V_() {
  let e = he("colors"), t = he("spacing"), r = he("blur"), n = he("brightness"), o = he("borderColor"), l = he("borderRadius"), i = he("borderSpacing"), a = he("borderWidth"), s = he("contrast"), u = he("grayscale"), c = he("hueRotate"), d = he("invert"), p = he("gap"), v = he("gradientColorStops"), g = he("gradientColorStopPositions"), y = he("inset"), x = he("margin"), f = he("opacity"), h = he("padding"), m = he("saturate"), E = he("scale"), k = he("sepia"), w = he("skew"), C = he("space"), P = he("translate"), T = () => ["auto", "contain", "none"], z = () => ["auto", "hidden", "clip", "visible", "scroll"], X = () => ["auto", W, t], H = () => [W, t], le = () => ["", Hr, On], Fe = () => ["auto", go, W], In = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], Er = () => ["solid", "dashed", "dotted", "double", "none"], ge = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"], $r = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], Gt = () => ["", "0", W], Rr = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], rt = () => [go, Tu], Jt = () => [go, W];
  return { cacheSize: 500, separator: ":", theme: { colors: [Vi], spacing: [Hr, On], blur: ["none", "", zn, W], brightness: rt(), borderColor: [e], borderRadius: ["none", "", "full", zn, W], borderSpacing: H(), borderWidth: le(), contrast: rt(), grayscale: Gt(), hueRotate: Jt(), invert: Gt(), gap: H(), gradientColorStops: [e], gradientColorStopPositions: [D_, On], inset: X(), margin: X(), opacity: rt(), padding: H(), saturate: rt(), scale: rt(), sepia: Gt(), skew: Jt(), space: H(), translate: H() }, classGroups: { aspect: [{ aspect: ["auto", "square", "video", W] }], container: ["container"], columns: [{ columns: [zn] }], "break-after": [{ "break-after": Rr() }], "break-before": [{ "break-before": Rr() }], "break-inside": [{ "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] }], "box-decoration": [{ "box-decoration": ["slice", "clone"] }], box: [{ box: ["border", "content"] }], display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"], float: [{ float: ["right", "left", "none", "start", "end"] }], clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }], isolation: ["isolate", "isolation-auto"], "object-fit": [{ object: ["contain", "cover", "fill", "none", "scale-down"] }], "object-position": [{ object: [...In(), W] }], overflow: [{ overflow: z() }], "overflow-x": [{ "overflow-x": z() }], "overflow-y": [{ "overflow-y": z() }], overscroll: [{ overscroll: T() }], "overscroll-x": [{ "overscroll-x": T() }], "overscroll-y": [{ "overscroll-y": T() }], position: ["static", "fixed", "absolute", "relative", "sticky"], inset: [{ inset: [y] }], "inset-x": [{ "inset-x": [y] }], "inset-y": [{ "inset-y": [y] }], start: [{ start: [y] }], end: [{ end: [y] }], top: [{ top: [y] }], right: [{ right: [y] }], bottom: [{ bottom: [y] }], left: [{ left: [y] }], visibility: ["visible", "invisible", "collapse"], z: [{ z: ["auto", Bi, W] }], basis: [{ basis: X() }], "flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }], "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }], flex: [{ flex: ["1", "auto", "initial", "none", W] }], grow: [{ grow: Gt() }], shrink: [{ shrink: Gt() }], order: [{ order: ["first", "last", "none", Bi, W] }], "grid-cols": [{ "grid-cols": [Vi] }], "col-start-end": [{ col: ["auto", { span: ["full", Bi, W] }, W] }], "col-start": [{ "col-start": Fe() }], "col-end": [{ "col-end": Fe() }], "grid-rows": [{ "grid-rows": [Vi] }], "row-start-end": [{ row: ["auto", { span: [Bi, W] }, W] }], "row-start": [{ "row-start": Fe() }], "row-end": [{ "row-end": Fe() }], "grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }], "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", W] }], "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", W] }], gap: [{ gap: [p] }], "gap-x": [{ "gap-x": [p] }], "gap-y": [{ "gap-y": [p] }], "justify-content": [{ justify: ["normal", ...$r()] }], "justify-items": [{ "justify-items": ["start", "end", "center", "stretch"] }], "justify-self": [{ "justify-self": ["auto", "start", "end", "center", "stretch"] }], "align-content": [{ content: ["normal", ...$r(), "baseline"] }], "align-items": [{ items: ["start", "end", "center", "baseline", "stretch"] }], "align-self": [{ self: ["auto", "start", "end", "center", "stretch", "baseline"] }], "place-content": [{ "place-content": [...$r(), "baseline"] }], "place-items": [{ "place-items": ["start", "end", "center", "baseline", "stretch"] }], "place-self": [{ "place-self": ["auto", "start", "end", "center", "stretch"] }], p: [{ p: [h] }], px: [{ px: [h] }], py: [{ py: [h] }], ps: [{ ps: [h] }], pe: [{ pe: [h] }], pt: [{ pt: [h] }], pr: [{ pr: [h] }], pb: [{ pb: [h] }], pl: [{ pl: [h] }], m: [{ m: [x] }], mx: [{ mx: [x] }], my: [{ my: [x] }], ms: [{ ms: [x] }], me: [{ me: [x] }], mt: [{ mt: [x] }], mr: [{ mr: [x] }], mb: [{ mb: [x] }], ml: [{ ml: [x] }], "space-x": [{ "space-x": [C] }], "space-x-reverse": ["space-x-reverse"], "space-y": [{ "space-y": [C] }], "space-y-reverse": ["space-y-reverse"], w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", W, t] }], "min-w": [{ "min-w": [W, t, "min", "max", "fit"] }], "max-w": [{ "max-w": [W, t, "none", "full", "min", "max", "fit", "prose", { screen: [zn] }, zn] }], h: [{ h: [W, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }], "min-h": [{ "min-h": [W, t, "min", "max", "fit", "svh", "lvh", "dvh"] }], "max-h": [{ "max-h": [W, t, "min", "max", "fit", "svh", "lvh", "dvh"] }], size: [{ size: [W, t, "auto", "min", "max", "fit"] }], "font-size": [{ text: ["base", zn, On] }], "font-smoothing": ["antialiased", "subpixel-antialiased"], "font-style": ["italic", "not-italic"], "font-weight": [{ font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Tu] }], "font-family": [{ font: [Vi] }], "fvn-normal": ["normal-nums"], "fvn-ordinal": ["ordinal"], "fvn-slashed-zero": ["slashed-zero"], "fvn-figure": ["lining-nums", "oldstyle-nums"], "fvn-spacing": ["proportional-nums", "tabular-nums"], "fvn-fraction": ["diagonal-fractions", "stacked-fractons"], tracking: [{ tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", W] }], "line-clamp": [{ "line-clamp": ["none", go, Tu] }], leading: [{ leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Hr, W] }], "list-image": [{ "list-image": ["none", W] }], "list-style-type": [{ list: ["none", "disc", "decimal", W] }], "list-style-position": [{ list: ["inside", "outside"] }], "placeholder-color": [{ placeholder: [e] }], "placeholder-opacity": [{ "placeholder-opacity": [f] }], "text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }], "text-color": [{ text: [e] }], "text-opacity": [{ "text-opacity": [f] }], "text-decoration": ["underline", "overline", "line-through", "no-underline"], "text-decoration-style": [{ decoration: [...Er(), "wavy"] }], "text-decoration-thickness": [{ decoration: ["auto", "from-font", Hr, On] }], "underline-offset": [{ "underline-offset": ["auto", Hr, W] }], "text-decoration-color": [{ decoration: [e] }], "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"], "text-overflow": ["truncate", "text-ellipsis", "text-clip"], "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }], indent: [{ indent: H() }], "vertical-align": [{ align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", W] }], whitespace: [{ whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] }], break: [{ break: ["normal", "words", "all", "keep"] }], hyphens: [{ hyphens: ["none", "manual", "auto"] }], content: [{ content: ["none", W] }], "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }], "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }], "bg-opacity": [{ "bg-opacity": [f] }], "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }], "bg-position": [{ bg: [...In(), O_] }], "bg-repeat": [{ bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] }], "bg-size": [{ bg: ["auto", "cover", "contain", M_] }], "bg-image": [{ bg: ["none", { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] }, I_] }], "bg-color": [{ bg: [e] }], "gradient-from-pos": [{ from: [g] }], "gradient-via-pos": [{ via: [g] }], "gradient-to-pos": [{ to: [g] }], "gradient-from": [{ from: [v] }], "gradient-via": [{ via: [v] }], "gradient-to": [{ to: [v] }], rounded: [{ rounded: [l] }], "rounded-s": [{ "rounded-s": [l] }], "rounded-e": [{ "rounded-e": [l] }], "rounded-t": [{ "rounded-t": [l] }], "rounded-r": [{ "rounded-r": [l] }], "rounded-b": [{ "rounded-b": [l] }], "rounded-l": [{ "rounded-l": [l] }], "rounded-ss": [{ "rounded-ss": [l] }], "rounded-se": [{ "rounded-se": [l] }], "rounded-ee": [{ "rounded-ee": [l] }], "rounded-es": [{ "rounded-es": [l] }], "rounded-tl": [{ "rounded-tl": [l] }], "rounded-tr": [{ "rounded-tr": [l] }], "rounded-br": [{ "rounded-br": [l] }], "rounded-bl": [{ "rounded-bl": [l] }], "border-w": [{ border: [a] }], "border-w-x": [{ "border-x": [a] }], "border-w-y": [{ "border-y": [a] }], "border-w-s": [{ "border-s": [a] }], "border-w-e": [{ "border-e": [a] }], "border-w-t": [{ "border-t": [a] }], "border-w-r": [{ "border-r": [a] }], "border-w-b": [{ "border-b": [a] }], "border-w-l": [{ "border-l": [a] }], "border-opacity": [{ "border-opacity": [f] }], "border-style": [{ border: [...Er(), "hidden"] }], "divide-x": [{ "divide-x": [a] }], "divide-x-reverse": ["divide-x-reverse"], "divide-y": [{ "divide-y": [a] }], "divide-y-reverse": ["divide-y-reverse"], "divide-opacity": [{ "divide-opacity": [f] }], "divide-style": [{ divide: Er() }], "border-color": [{ border: [o] }], "border-color-x": [{ "border-x": [o] }], "border-color-y": [{ "border-y": [o] }], "border-color-t": [{ "border-t": [o] }], "border-color-r": [{ "border-r": [o] }], "border-color-b": [{ "border-b": [o] }], "border-color-l": [{ "border-l": [o] }], "divide-color": [{ divide: [o] }], "outline-style": [{ outline: ["", ...Er()] }], "outline-offset": [{ "outline-offset": [Hr, W] }], "outline-w": [{ outline: [Hr, On] }], "outline-color": [{ outline: [e] }], "ring-w": [{ ring: le() }], "ring-w-inset": ["ring-inset"], "ring-color": [{ ring: [e] }], "ring-opacity": [{ "ring-opacity": [f] }], "ring-offset-w": [{ "ring-offset": [Hr, On] }], "ring-offset-color": [{ "ring-offset": [e] }], shadow: [{ shadow: ["", "inner", "none", zn, A_] }], "shadow-color": [{ shadow: [Vi] }], opacity: [{ opacity: [f] }], "mix-blend": [{ "mix-blend": ge() }], "bg-blend": [{ "bg-blend": ge() }], filter: [{ filter: ["", "none"] }], blur: [{ blur: [r] }], brightness: [{ brightness: [n] }], contrast: [{ contrast: [s] }], "drop-shadow": [{ "drop-shadow": ["", "none", zn, W] }], grayscale: [{ grayscale: [u] }], "hue-rotate": [{ "hue-rotate": [c] }], invert: [{ invert: [d] }], saturate: [{ saturate: [m] }], sepia: [{ sepia: [k] }], "backdrop-filter": [{ "backdrop-filter": ["", "none"] }], "backdrop-blur": [{ "backdrop-blur": [r] }], "backdrop-brightness": [{ "backdrop-brightness": [n] }], "backdrop-contrast": [{ "backdrop-contrast": [s] }], "backdrop-grayscale": [{ "backdrop-grayscale": [u] }], "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [c] }], "backdrop-invert": [{ "backdrop-invert": [d] }], "backdrop-opacity": [{ "backdrop-opacity": [f] }], "backdrop-saturate": [{ "backdrop-saturate": [m] }], "backdrop-sepia": [{ "backdrop-sepia": [k] }], "border-collapse": [{ border: ["collapse", "separate"] }], "border-spacing": [{ "border-spacing": [i] }], "border-spacing-x": [{ "border-spacing-x": [i] }], "border-spacing-y": [{ "border-spacing-y": [i] }], "table-layout": [{ table: ["auto", "fixed"] }], caption: [{ caption: ["top", "bottom"] }], transition: [{ transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", W] }], duration: [{ duration: Jt() }], ease: [{ ease: ["linear", "in", "out", "in-out", W] }], delay: [{ delay: Jt() }], animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", W] }], transform: [{ transform: ["", "gpu", "none"] }], scale: [{ scale: [E] }], "scale-x": [{ "scale-x": [E] }], "scale-y": [{ "scale-y": [E] }], rotate: [{ rotate: [Bi, W] }], "translate-x": [{ "translate-x": [P] }], "translate-y": [{ "translate-y": [P] }], "skew-x": [{ "skew-x": [w] }], "skew-y": [{ "skew-y": [w] }], "transform-origin": [{ origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", W] }], accent: [{ accent: ["auto", e] }], appearance: [{ appearance: ["none", "auto"] }], cursor: [{ cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", W] }], "caret-color": [{ caret: [e] }], "pointer-events": [{ "pointer-events": ["none", "auto"] }], resize: [{ resize: ["none", "y", "x", ""] }], "scroll-behavior": [{ scroll: ["auto", "smooth"] }], "scroll-m": [{ "scroll-m": H() }], "scroll-mx": [{ "scroll-mx": H() }], "scroll-my": [{ "scroll-my": H() }], "scroll-ms": [{ "scroll-ms": H() }], "scroll-me": [{ "scroll-me": H() }], "scroll-mt": [{ "scroll-mt": H() }], "scroll-mr": [{ "scroll-mr": H() }], "scroll-mb": [{ "scroll-mb": H() }], "scroll-ml": [{ "scroll-ml": H() }], "scroll-p": [{ "scroll-p": H() }], "scroll-px": [{ "scroll-px": H() }], "scroll-py": [{ "scroll-py": H() }], "scroll-ps": [{ "scroll-ps": H() }], "scroll-pe": [{ "scroll-pe": H() }], "scroll-pt": [{ "scroll-pt": H() }], "scroll-pr": [{ "scroll-pr": H() }], "scroll-pb": [{ "scroll-pb": H() }], "scroll-pl": [{ "scroll-pl": H() }], "snap-align": [{ snap: ["start", "end", "center", "align-none"] }], "snap-stop": [{ snap: ["normal", "always"] }], "snap-type": [{ snap: ["none", "x", "y", "both"] }], "snap-strictness": [{ snap: ["mandatory", "proximity"] }], touch: [{ touch: ["auto", "none", "manipulation"] }], "touch-x": [{ "touch-pan": ["x", "left", "right"] }], "touch-y": [{ "touch-pan": ["y", "up", "down"] }], "touch-pz": ["touch-pinch-zoom"], select: [{ select: ["none", "text", "all", "auto"] }], "will-change": [{ "will-change": ["auto", "scroll", "contents", "transform", W] }], fill: [{ fill: [e, "none"] }], "stroke-w": [{ stroke: [Hr, On, Tu] }], stroke: [{ stroke: [e, "none"] }], sr: ["sr-only", "not-sr-only"], "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }] }, conflictingClassGroups: { overflow: ["overflow-x", "overflow-y"], overscroll: ["overscroll-x", "overscroll-y"], inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"], "inset-x": ["right", "left"], "inset-y": ["top", "bottom"], flex: ["basis", "grow", "shrink"], gap: ["gap-x", "gap-y"], p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"], px: ["pr", "pl"], py: ["pt", "pb"], m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"], mx: ["mr", "ml"], my: ["mt", "mb"], size: ["w", "h"], "font-size": ["leading"], "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"], "fvn-ordinal": ["fvn-normal"], "fvn-slashed-zero": ["fvn-normal"], "fvn-figure": ["fvn-normal"], "fvn-spacing": ["fvn-normal"], "fvn-fraction": ["fvn-normal"], "line-clamp": ["display", "overflow"], rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"], "rounded-s": ["rounded-ss", "rounded-es"], "rounded-e": ["rounded-se", "rounded-ee"], "rounded-t": ["rounded-tl", "rounded-tr"], "rounded-r": ["rounded-tr", "rounded-br"], "rounded-b": ["rounded-br", "rounded-bl"], "rounded-l": ["rounded-tl", "rounded-bl"], "border-spacing": ["border-spacing-x", "border-spacing-y"], "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"], "border-w-x": ["border-w-r", "border-w-l"], "border-w-y": ["border-w-t", "border-w-b"], "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"], "border-color-x": ["border-color-r", "border-color-l"], "border-color-y": ["border-color-t", "border-color-b"], "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"], "scroll-mx": ["scroll-mr", "scroll-ml"], "scroll-my": ["scroll-mt", "scroll-mb"], "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"], "scroll-px": ["scroll-pr", "scroll-pl"], "scroll-py": ["scroll-pt", "scroll-pb"], touch: ["touch-x", "touch-y", "touch-pz"], "touch-x": ["touch"], "touch-y": ["touch"], "touch-pz": ["touch"] }, conflictingClassGroupModifiers: { "font-size": ["leading"] } };
}
var l1 = C_(V_);
function i1(...e) {
  return l1(Xw(e));
}
var s1 = Ee(Vr(), 1);
var H_ = Gw("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", { variants: { variant: { default: "bg-primary text-primary-foreground hover:bg-primary/90", destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground", secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", ghost: "hover:bg-accent hover:text-accent-foreground", link: "text-primary underline-offset-4 hover:underline" }, size: { default: "h-10 px-4 py-2", sm: "h-9 rounded-md px-3", lg: "h-11 rounded-md px-8", icon: "h-10 w-10" } }, defaultVariants: { variant: "default", size: "default" } });
var Fp = a1.forwardRef(({ className: e, variant: t, size: r, asChild: n = false, ...o }, l) => (0, s1.jsx)(n ? Lp : "button", { className: i1(H_({ variant: t, size: r, className: e })), ref: l, ...o }));
Fp.displayName = "Button";
var Yt = Ee(Vr(), 1);
var $_ = () => [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
function u1() {
  return (0, Yt.jsxs)("div", { style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }, children: [(0, Yt.jsx)("h1", { children: "Welcome to Remix" }), (0, Yt.jsxs)("ul", { children: [(0, Yt.jsx)("li", { children: (0, Yt.jsx)("a", { target: "_blank", href: "https://remix.run/tutorials/blog", rel: "noreferrer", children: "15m Quickstart Blog Tutorial" }) }), (0, Yt.jsx)("li", { children: (0, Yt.jsx)("a", { target: "_blank", href: "https://remix.run/tutorials/jokes", rel: "noreferrer", children: "Deep Dive Jokes App Tutorial" }) }), (0, Yt.jsx)("li", { children: (0, Yt.jsx)("a", { target: "_blank", href: "https://remix.run/docs", rel: "noreferrer", children: "Remix Docs" }) })] }), (0, Yt.jsx)(Fp, { children: "\u3042\u3042\u3042" })] });
}
var W_ = { entry: { module: "/build/entry.client-SVH4ECBK.js", imports: ["/build/_shared/chunk-FINATPRS.js", "/build/_shared/chunk-6OZYWZFQ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-5UWJUWHC.js", imports: void 0, hasAction: false, hasLoader: false, hasClientAction: false, hasClientLoader: false, hasErrorBoundary: false }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: true, caseSensitive: void 0, module: "/build/routes/_index-Y7F25PDB.js", imports: void 0, hasAction: false, hasLoader: false, hasClientAction: false, hasClientLoader: false, hasErrorBoundary: false } }, version: "6f8fa521", hmr: void 0, url: "/build/manifest-6F8FA521.js" };
var CP = "production";
var _P = "public/build";
var NP = { v3_fetcherPersist: false, v3_relativeSplatPath: false };
var PP = "/build/";
var bP = { module: Np };
var LP = { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: Pp }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: true, caseSensitive: void 0, module: Mp } };

// server.ts
var handleRemixRequest = (0, import_cloudflare.createRequestHandler)(build_exports, "undefined");
var app = new Hono2();
app.get("*", async (c) => {
  const loadContext = { env: env(c) };
  return await handleRemixRequest(c.req.raw, loadContext);
});
var server_default = app;

// server.workers.ts
var workersApp = new Hono2();
workersApp.get(
  "/build/*",
  module({
    root: "./"
  })
);
workersApp.route("/", server_default);
workersApp.showRoutes();
var server_workers_default = workersApp;

// node_modules/.pnpm/wrangler@3.22.4/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
var jsonError = async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap = void 0;

// .wrangler/tmp/bundle-PhepEA/middleware-insertion-facade.js
var envWrappers = [wrap].filter(Boolean);
var facade = {
  ...server_workers_default,
  envWrappers,
  middleware: [
    middleware_miniflare3_json_error_default,
    ...server_workers_default.middleware ? server_workers_default.middleware : []
  ].filter(Boolean)
};
var middleware_insertion_facade_default = facade;

// .wrangler/tmp/bundle-PhepEA/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
var __facade_modules_fetch__ = function(request, env2, ctx) {
  if (middleware_insertion_facade_default.fetch === void 0)
    throw new Error("Handler does not export a fetch() function.");
  return middleware_insertion_facade_default.fetch(request, env2, ctx);
};
function getMaskedEnv(rawEnv) {
  let env2 = rawEnv;
  if (middleware_insertion_facade_default.envWrappers && middleware_insertion_facade_default.envWrappers.length > 0) {
    for (const wrapFn of middleware_insertion_facade_default.envWrappers) {
      env2 = wrapFn(env2);
    }
  }
  return env2;
}
var registeredMiddleware = false;
var facade2 = {
  ...middleware_insertion_facade_default.tail && {
    tail: maskHandlerEnv(middleware_insertion_facade_default.tail)
  },
  ...middleware_insertion_facade_default.trace && {
    trace: maskHandlerEnv(middleware_insertion_facade_default.trace)
  },
  ...middleware_insertion_facade_default.scheduled && {
    scheduled: maskHandlerEnv(middleware_insertion_facade_default.scheduled)
  },
  ...middleware_insertion_facade_default.queue && {
    queue: maskHandlerEnv(middleware_insertion_facade_default.queue)
  },
  ...middleware_insertion_facade_default.test && {
    test: maskHandlerEnv(middleware_insertion_facade_default.test)
  },
  ...middleware_insertion_facade_default.email && {
    email: maskHandlerEnv(middleware_insertion_facade_default.email)
  },
  fetch(request, rawEnv, ctx) {
    const env2 = getMaskedEnv(rawEnv);
    if (middleware_insertion_facade_default.middleware && middleware_insertion_facade_default.middleware.length > 0) {
      if (!registeredMiddleware) {
        registeredMiddleware = true;
        for (const middleware of middleware_insertion_facade_default.middleware) {
          __facade_register__(middleware);
        }
      }
      const __facade_modules_dispatch__ = function(type, init) {
        if (type === "scheduled" && middleware_insertion_facade_default.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return middleware_insertion_facade_default.scheduled(controller, env2, ctx);
        }
      };
      return __facade_invoke__(
        request,
        env2,
        ctx,
        __facade_modules_dispatch__,
        __facade_modules_fetch__
      );
    } else {
      return __facade_modules_fetch__(request, env2, ctx);
    }
  }
};
function maskHandlerEnv(handler) {
  return (data, env2, ctx) => handler(data, getMaskedEnv(env2), ctx);
}
var middleware_loader_entry_default = facade2;
export {
  middleware_loader_entry_default as default
};
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.14.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/index.js:
  (**
   * React Router v6.21.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.21.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-dom/cjs/react-dom-server-legacy.browser.production.min.js:
  (**
   * @license React
   * react-dom-server-legacy.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.browser.production.min.js:
  (**
   * @license React
   * react-dom-server.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js:
  (**
   * @remix-run/react v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/invariant.js:
  (**
   * @remix-run/react v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routeModules.js:
  (**
   * @remix-run/react v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/links.js:
  (**
   * @remix-run/react v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/markup.js:
  (**
   * @remix-run/react v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/components.js:
  (**
   * @remix-run/react v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/errorBoundaries.js:
  (**
   * @remix-run/react v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/fallback.js:
  (**
   * @remix-run/react v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routes.js:
  (**
   * @remix-run/react v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/scroll-restoration.js:
  (**
   * @remix-run/react v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/server.js:
  (**
   * @remix-run/react v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/index.js:
  (**
   * @remix-run/react v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

@remix-run/server-runtime/dist/warnings.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/cookies.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/formData.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/router/dist/router.cjs.js:
  (**
   * @remix-run/router v1.14.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/mode.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/errors.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/responses.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/entry.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/headers.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/invariant.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/routeMatching.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/data.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/routes.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/markup.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/serverHandoff.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/dev.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/server.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/sessions.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/sessions/cookieStorage.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/sessions/memoryStorage.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/upload/errors.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/upload/memoryUploadHandler.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/index.js:
  (**
   * @remix-run/server-runtime v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/crypto.js:
  (**
   * @remix-run/cloudflare v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/implementations.js:
  (**
   * @remix-run/cloudflare v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/sessions/workersKVStorage.js:
  (**
   * @remix-run/cloudflare v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/index.js:
  (**
   * @remix-run/cloudflare v2.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=server.workers.js.map
