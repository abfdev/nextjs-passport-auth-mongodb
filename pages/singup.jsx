import {Input} from "@components/inputs";
import {withProtectedRouteNoLogin} from "@lib/protectedRoute";
import {useRef} from "react";
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
	const singUpRef = useRef(null);
	const formSubmit = async data => {
		if (data["password"] !== data["confirm password"]) {
			return setError(
				"confirm password",
				{
					type: "notMatch",
					message: "Passwords do not match",
				},
				{
					shouldFocus: false,
				}
			);
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
					setError("email", {type: "serverError", message: "Email already exists"});
				}
				// return toast.error("Something went wrong");
			} finally {
			}
		}
	};
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="relative flex h-full flex-1 items-center justify-center overflow-auto bg-gradient-to-b from-[#e0ecf8d4] via-[#eff7ff] to-[#fafbfd] px-6">
				<div className="relative h-auto w-full flex-none space-y-4 rounded-md border bg-white py-10 px-8 shadow-sm sm:w-[480px]">
					<h1 className="text-center align-middle text-2xl font-semibold">Create your account</h1>
					<form method="POST" onSubmit={handleSubmit(formSubmit)} className="flex flex-col" ref={singUpRef}>
						<Input label="name" register={register} errors={errors} />
						<Input
							label="email"
							register={register}
							errors={errors}
							required={{
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: "Invalid email",
								},
							}}
						/>
						<Input
							label="password"
							register={register}
							errors={errors}
							required={{
								minLength: {
									value: 4,
									message: "Password must be at least 4 characters",
								},
							}}
						/>
						<Input label="confirm password" register={register} errors={errors} />
						<div className="mt-6 flex w-full items-center gap-3">
							<button
								type="submit"
								className="font-base w-1/3 rounded-md bg-sky-500  py-2 font-semibold text-white shadow-sm hover:bg-sky-600">
								Sing up
							</button>
							<p className="flex-1">
								i all ready have an account?
								<Link href="/">
									<span className="cursor-pointer text-sky-500"> Sign in</span>
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps = withProtectedRouteNoLogin("/dashboard");

export default SingUp;
