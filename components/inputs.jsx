export const Input = ({label, register, errors, required}) => {
	return (
		<div className="relative mt-6">
			<input
				{...register(label, {
					...required,
					required: {
						value: true,
						message: label + " is required",
					},
				})}
				type={label == "password" || label == "confirm password" ? "password" : "text"}
				className={`border-1 peer w-full rounded-md py-3 placeholder:font-semibold placeholder:capitalize ${
					errors?.[label] ? "border-red-600" : "border-slate-300"
				}`}
				placeholder={label}
			/>
			<label className=" visible absolute left-0 -top-3.5 w-auto  pl-2 font-semibold capitalize text-slate-500 transition-all duration-75 peer-placeholder-shown:invisible peer-placeholder-shown:top-0">
				<div className="absolute top-2 h-2 w-full bg-white"></div>
				<p className="relative pl-1">{label}</p>
			</label>
			<div className="h-6 text-base font-light text-red-600 transition-all duration-75">
				{errors?.[label]?.message}
			</div>
		</div>
	);
};
