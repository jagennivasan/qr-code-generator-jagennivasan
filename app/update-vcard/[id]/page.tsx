import UpdateQR from "@/components/layout/UpdateQRForm";


type Params = Promise<{ id: string }>
// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
 
export default async function UpdateVcard(props: {
  params: Params
  // searchParams: SearchParams
}) {
  const params = await props.params
  // const searchParams = await props.searchParams
  const id = params.id
  // const query = searchParams.query

  return <UpdateQR id={id} />;
}
