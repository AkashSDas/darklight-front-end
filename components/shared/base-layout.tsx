import BaseNavbar from "./base-navbar";

interface Props {
  children: JSX.Element | JSX.Element[] | string | string[] | null;
}

export default function BaseLayout({ children }: Props): JSX.Element {
  return (
    <div>
      <BaseNavbar />
      {children}
    </div>
  );
}
