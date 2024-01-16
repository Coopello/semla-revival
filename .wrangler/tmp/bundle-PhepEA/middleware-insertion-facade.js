				import worker, * as OTHER_EXPORTS from "/Users/fukuda.akito/vsProject/semla-revival/server.workers.ts";
				import * as __MIDDLEWARE_0__ from "/Users/fukuda.akito/vsProject/semla-revival/node_modules/.pnpm/wrangler@3.22.4/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "/Users/fukuda.akito/vsProject/semla-revival/server.workers.ts";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;