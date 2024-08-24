import Header from "@/components/Header";
export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="mx-auto flex max-w-7xl flex-col space-y-14">
			<Header />
			<main className="admin-main">{children}</main>
		</div>
	);
}
