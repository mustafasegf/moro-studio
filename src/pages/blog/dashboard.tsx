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
      <div className="flex min-h-screen flex-col items-center">
        <h1 className="mt-8 text-center text-3xl font-bold">Blog Dashboard</h1>
        <CenterContainer>
          <div className="relative z-0 m-5 overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                    Tipe
                  </th>
                  <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                    Jumlah
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, i) => (
                  <tr>
                    <td
                      className={
                        i % 2 === 0
                          ? "bg-white-grey bg-opacity-50"
                          : "bg-light-grey bg-opacity-40"
                      }
                    >
                      {item.name}
                    </td>
                    <td
                      className={
                        i % 2 === 0
                          ? "bg-white-grey bg-opacity-50"
                          : "bg-light-grey bg-opacity-40"
                      }
                    >
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CenterContainer>
      </div>
    </>
  );
}
