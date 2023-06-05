import { GetBookMetadata } from "@/lib/database";
import { Response } from "@/typings";

type Props = {
   params: {
      id: number
   }
}

export default async function Page({ params }: Props) {
   const bookResponse: Response = await GetBookMetadata(+params.id);
   return (
      <pre className="overflow-auto">{JSON.stringify(bookResponse.result, null, 3)}</pre>
   )
}