const Input = ({
    label,
    type,
    name,
    value,
    placeholder,
    handleChange,
    error
}) => (
    <>
        <div className="form-group">
            <label htmlFor={name}> {label}: </label>
            <input
                type={type}
                className={error ? 'is-invalid form-control' : 'form-control'}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    </>
);

export default Input;
