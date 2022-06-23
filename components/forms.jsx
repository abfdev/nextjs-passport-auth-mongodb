const Input = ({ label, register, errors, errMessage, required }) => {
  const errType = errors?.[label]?.type;
  const errsMessage = errMessage[errType] || false;
  return (
    <>
      <label className="block pt-4 font-semibold capitalize">{label}</label>
      <input
        {...register(label, { ...required })}
        type={label == "password" ? label : "text"}
        className={`rounded-md border-2  py-3 ${
          errsMessage ? "border-red-600" : "border-slate-300"
        }`}
      />

      {errsMessage && (
        <span className="text-xs font-light text-red-600 transition-all duration-75">
          {errsMessage}
        </span>
      )}
    </>
  );
};
export { Input };
