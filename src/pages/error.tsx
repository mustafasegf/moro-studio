import Link from 'next/link';
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring';
interface Query extends ParsedUrlQuery {
  error: string;
}

export default function ErrorPage(){
  const router = useRouter()
  const { data } = router.query as Query

  return (
    <div className="m-4 flex flex-col justify-center">
      <div className="flex justify-center">
        <h3 className="text-2xl my-8 justify-center">Error: {data}</h3>

      </div>
      <Link className="btn max-w-xs" href="/">Pergi ke Halaman Utama</Link>
    </div>
  )
}