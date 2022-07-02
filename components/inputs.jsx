export const Input = ({ label, register, errors, required }) => {
	return (
		<div className="group relative flex h-20 flex-col transition-all duration-75">
			<label className="invisible relative top-9  px-2 font-semibold capitalize text-slate-500 transition-all duration-75 group-focus-within:visible group-focus-within:top-3">
				{label}
			</label>
			<input
				{...register(label, {
					...required,
					required: {
						value: true,
						message: label + " is required",
					},
				})}
				type={label == "password" ? label : "text"}
				className={`border-1  rounded-md py-3 placeholder:font-semibold placeholder:capitalize focus:placeholder:invisible ${
					errors?.[label] ? "border-red-600" : "border-slate-300"
				}`}
				placeholder={label}
			/>
			<div className="h-6 text-base font-light text-red-600 transition-all duration-75">
				{errors?.[label]?.message}
			</div>
		</div>
	);
};
