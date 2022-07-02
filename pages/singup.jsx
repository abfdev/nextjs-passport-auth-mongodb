import {Input} from "@components/inputs";
import {withProtectedRouteNoLogin} from "@lib/protectedRoute";
import {useRef} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {router} from "next/router";
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
			setError(
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
		<div>
			<h1>SingUp</h1>
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
				<div className="mt-6 flex w-full">
					<button
						type="submit"
						className="font-base w-full rounded-md bg-sky-500  py-3 font-semibold text-white shadow-sm hover:bg-sky-600">
						Login
					</button>
				</div>
			</form>
		</div>
	);
}

export const getServerSideProps = withProtectedRouteNoLogin("/dashboard");

export default SingUp;
