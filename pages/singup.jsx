import {Input} from "@components/inputs";
import {withProtectedRouteNoLogin} from "@lib/protectedRoute";
import Google from "@assets/google.svg";
import Github from "@assets/github.svg";
import Image from "next/image";
import {useForm} from "react-hook-form";
import axios from "axios";
import {router} from "next/router";
import Link from "next/link";
/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function SingUp(props) {
	const {
		register,
		handleSubmit,
		formState: {errors},
		setError,
	} = useForm();
	const formSubmit = async data => {
		if (data["password"] !== data["confirm password"]) {
			return setError("confirm password", {
				type: "notMatch",
				message: "passwords do not match",
			});
		}
		if (data) {
			const {name, email, password} = data;
			try {
				const response = await axios.post("/api/auth/create", {name, email, password});
				if (response.status === 200) {
					return router.push("/dashboard");
				}
			} catch (err) {
				if (err.response.data.code === "P2002") {
					return setError("email", {
						type: "uniqueEmail",
						message: "an account with that email address already exists. Please use a unique email.",
					});
				}
				return toast.error("Something went wrong please try again");
			} finally {
			}
		}
	};
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="relative flex h-full flex-1 items-center justify-center overflow-auto bg-gradient-to-b from-[#e0ecf8d4] via-[#eff7ff] to-[#fafbfd] px-6">
				<div className="relative h-auto w-full flex-none space-y-4 rounded-md border bg-white py-10 px-8 shadow-sm sm:w-[480px]">
					<h1 className="text-center align-middle text-2xl font-semibold">Create your account</h1>
					<form method="POST" onSubmit={handleSubmit(formSubmit)} className="flex flex-col">
						<Input
							label="email"
							register={register}
							errors={errors}
							required={{
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: "invalid email",
								},
							}}
						/>
						<Input label="name" register={register} errors={errors} />
						<Input
							label="password"
							register={register}
							errors={errors}
							type="password"
							required={{
								minLength: {
									value: 4,
									message: "password must be at least 4 characters",
								},
							}}
						/>
						<Input label="confirm password" register={register} errors={errors} type="password" />
						<div className="mt-6 flex items-center gap-3">
							<button
								type="submit"
								className="rounded-md bg-sky-500 px-14 py-2 font-bold text-white shadow-sm hover:bg-sky-600">
								Sing up
							</button>
							<p className="flex-1 space-x-2">
								<span>Have an account?</span>
								<Link href="/">
									<span className="cursor-pointer font-semibold text-sky-500">Log in now</span>
								</Link>
							</p>
						</div>
					</form>
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

export default SingUp;
