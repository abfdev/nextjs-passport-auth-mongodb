import {withSessionApi, withSessionSsr} from "@lib/session";

export const withProtectedRoute = (
	path,
	fn = ctx => {
		return {props: {}};
	}
) =>
	withSessionSsr(ctx => {
		if (ctx.req.session.isAuth) {
			return fn(ctx);
		}
		return {
			redirect: {
				destination: path,
				permanent: false,
			},
		};
	});

export const withProtectedRouteNoLogin = (
	path,
	fn = () => {
		return {props: {}};
	}
) =>
	withSessionSsr(ctx => {
		if (!ctx.req.session.isAuth) {
			return fn(ctx);
		}
		return {
			redirect: {
				destination: path,
				permanent: false,
			},
		};
	});

export const withProtectedApiRoute = (path, fn) =>
	withSessionApi((req, res) => {
		if (req.session.isAuth) {
			return fn(req, res);
		}
		res.writeHead(302, {Location: path});
		res.end();
	});
