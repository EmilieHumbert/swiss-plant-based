import Spinner from "./icons/spinner";

export default function Button({ isLoading, title, children, ...buttonProps }) {
  return (
    <button {...buttonProps}>
      {isLoading ? <Spinner width="20" fill="black" /> : title}
      {children}
    </button>
  );
}
