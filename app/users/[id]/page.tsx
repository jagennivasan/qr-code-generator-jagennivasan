import UserData from "@/components/layout/UserData";



type Params = Promise<{ id: string }>;

async function getUserData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-vcard/${id}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export async function generateMetadata(props: {
  params: Params;
  // searchParams: SearchParams
}) {
  const params = await props.params
  const user = await getUserData(params.id);

  return {
    title: user.name ? `${user.name}'s Profile` : "User Profile",
  };
}

export default async function UserPage(props: {
  params: Params;
  // searchParams: SearchParams
}) {
  const params = await props.params

  const user = await getUserData(params.id);

  return <UserData user={user} />;
}
