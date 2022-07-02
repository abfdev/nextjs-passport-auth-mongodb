import {useRef, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {Input} from "@components/inputs";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";
const LoginFrom = () => {
	const [isLoading, setIsLoading] = useState(false);
	const toastId = useRef(null);
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm();
	const router = useRouter();
	const loginForm = useRef(null);

	const formSubmit = async data => {
		setIsLoading(true);
		if (data) {
			const {email, password} = data;
			try {
				const response = await axios.post("/api/auth", {email, password});
				if (response.status === 200) {
					return router.push("/dashboard");
				}
			} catch (err) {
				setIsLoading(false);
				if (err.response.status === 401) {
					return toast.error("Invalid email or password");
				}
				return toast.error("Something went wrong");
			} finally {
				setIsLoading(false);
			}
		}
	};
	return (
		<div>
			{isLoading && (
				<div className="absolute inset-0 flex overflow-hidden rounded-t-md">
					<div className="h-[.27rem] flex-1 animate-waving-hand rounded-t-full bg-sky-600"></div>
				</div>
			)}
			<ToastContainer position="top-center" autoClose={900} ref={toastId} />
			<form method="POST" onSubmit={handleSubmit(formSubmit)} className="flex flex-col" ref={loginForm}>
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
				<div className="mt-6 flex w-full items-center gap-3">
					<button
						type="submit"
						className="font-base w-1/3 rounded-md bg-sky-500  py-2 font-semibold text-white shadow-sm hover:bg-sky-600">
						Next
					</button>
					<p className="flex-1">
						Dont have an account?{" "}
						<Link href="/singup">
							<span className="cursor-pointer text-sky-500"> Sign Up</span>
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default LoginFrom;
