import { getServerAuthSession, useAuth } from "~/utils/session";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next/types";
import { createSSG } from "~/server/SSGHelper";
import { api } from "~/utils/api";
import { CenterContainer } from "~/component/centercontainer";
import { useForm } from "react-hook-form";
import { tryToCatch } from "~/utils/trycatch";
import { useRouter } from "next/router";
import Link from "next/link";
import { ModalAction } from "~/component/modal";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const ssg = createSSG();
  const session = getServerAuthSession(ctx);

  if (!session) {
    return { redirect: { destination: "/login" } };
  }

  if (session.role !== "blogManager" && session.role !== "admin") {
    return { redirect: { destination: "/" } };
  }

  await ssg.blog.getDashboardData.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function Dashboard() {
  const { data } = api.blog.getDashboardData.useQuery();

  return (
    <>
      <CenterContainer>
        <div className="overflow-x-auto">
          <table className="table-zebra table">
            {/* head */}
            <thead>
              <tr>
                <th>Tipe</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr>
                  <th>{item.name}</th>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CenterContainer>
    </>
  );
}
