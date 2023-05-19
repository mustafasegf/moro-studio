import { GetServerSidePropsContext } from "next/types";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

interface Query extends ParsedUrlQuery {
  data?: string;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  let { data } = ctx.query;

  if (typeof data !== "string") {
    data = "ada masalah pada server";
  }

  return {
    props: {
      data,
    },
  };
}
export default function ErrorPage({ data }: { data: string }) {
  return (
    <div className="m-4 flex flex-col justify-center">
      <div className="flex justify-center">
        <h3 className="my-8 justify-center text-2xl">Error: {data}</h3>
      </div>
      <Link className="btn max-w-xs" href="/">
        Pergi ke Halaman Utama
      </Link>
    </div>
  );
}
