export const Button = ({
  text,
  variant = "contained", // "contained" | "outlined"
  disabled = false,
  inProgress = false,
  className = "",
  onClick,
  type = "button",
}) => {
  const baseStyles =
    "px-5 py-2.5 rounded-md font-normal text-sm flex items-center justify-center gap-2 transition-all duration-200";

  const containedStyles =
    "bg-[var(--theme-color)] hover:bg-amber-400/90 text-white disabled:bg-orange-300 border:white";

  const outlinedStyles =
    "border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-orange-50 disabled:border-orange-300 disabled:text-orange-300";

  const spinner = (
    <span
      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
      style={{
        borderTopColor: "transparent",
      }}
    ></span>
  );

  return (
    <button
      disabled={disabled || inProgress}
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${
        variant === "contained" ? containedStyles : outlinedStyles
      } ${className}`}
    >
      {inProgress ? (
        <>
          {spinner}
          <span>Processing...</span>
        </>
      ) : (
        text
      )}
    </button>
  );
};
