export function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-black text-white hover:bg-zinc-800 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
