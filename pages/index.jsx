import Google from "@assets/google.svg";
import Github from "@assets/github.svg";
import Link from "next/link";
import Image from "next/image";
import {withProtectedRouteNoLogin} from "@lib/protectedRoute";
import LoginForm from "@components/loginForm";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function Home(props) {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="relative flex h-full flex-1 items-center justify-center overflow-auto bg-gradient-to-b from-[#e0ecf8d4] via-[#eff7ff] to-[#fafbfd] px-6">
				<div className="relative h-auto w-full flex-none space-y-4 rounded-md border bg-white py-10 px-8 shadow-sm sm:w-[410px]">
					<h1 className="text-center align-middle text-2xl font-semibold">Log in</h1>
					<LoginForm />
					<div className="flex items-center justify-center gap-3">
						<div className="flex-grow border-t-2  border-gray-200" />
						<span className="text-md flex-shrink px-2 font-semibold text-slate-400/80">OR</span>
						<div className="flex-grow border-t-2   border-gray-200" />
					</div>
					<Link href="/api/auth/github">
						<div className="my-10 flex w-full cursor-pointer items-center gap-4 rounded-md border border-slate-300 bg-slate-100 p-3 text-slate-900 shadow-sm hover:bg-slate-200">
							<Image width={24} height={24} alt="" src={Github} />
							Continue With GitHub
						</div>
					</Link>
					<Link href="/api/auth/google">
						<div className="my-10 flex w-full cursor-pointer items-center gap-4 rounded-md border border-slate-300 bg-slate-100 p-3 text-slate-900 shadow-sm hover:bg-slate-200">
							<Image src={Google} width={24} height={24} alt="" />
							Continue With Google
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps = withProtectedRouteNoLogin("/dashboard");

export default Home;
