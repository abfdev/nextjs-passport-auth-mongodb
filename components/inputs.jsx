import classNames from "classnames";

export const Input = ({label, register, errors, required, type}) => {
	return (
		<div className="relative my-2">
			<input
				{...register(label, {
					...required,
					required: {
						value: true,
						message: label + " is required",
					},
				})}
				type={type || "text"}
				className={classNames(
					"border-1 peer w-full rounded-md py-3 placeholder:font-semibold placeholder:capitalize",
					{
						"border-red-500": errors[label],
						"border-slate-600": !errors[label],
					}
				)}
				placeholder={label}
			/>
			<label className="visible absolute left-0 -top-3.5 w-auto  pl-2 font-semibold capitalize text-slate-500 transition-all duration-75 peer-placeholder-shown:invisible peer-placeholder-shown:top-0">
				<div className="absolute top-2 h-2 w-full bg-white"></div>
				<p className="relative pl-1">{label}</p>
			</label>
			<div
				className={classNames("relative text-red-600 transition-all duration-75", {
					visible: errors?.[label],
					invisible: !errors?.[label],
				})}>
				{errors?.[label]?.message}
			</div>
		</div>
	);
};
