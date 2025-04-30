export type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col border-2 border-white">
      <h1 className="font-extrabold font-serif text-xl">Built for Kindle</h1>
      {/* <Navbar /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
