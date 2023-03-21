import { type NextPage } from "next";
import Link from "next/link";

import { api } from "~/utils/api";
import { Section } from "@prisma/client";
import { useEffect, useState } from "react";

const Edit: NextPage = () => {
  const [section, setSection] = useState([{} as Section]);

  const { data, isLoading, error } = api.homepage.getSortedSections.useQuery();

  useEffect(() => {
    if (data) {
      setSection(data);
      console.log(section);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <main className="">
        <h1>Pilih Section</h1>
        <Link href={"/homepage/create/hero"}>
          <button className="btn">Hero</button>
        </Link>
        <Link href={"/homepage/create/carousel"}>
          <button className="btn">Carousel</button>
        </Link>
        <Link href={"/homepage/create/CTA"}>
          <button className="btn">CTA</button>
        </Link>
        <table className="border-collapse	border-spacing-0.5">
          <div className="text-center align-middle">
            <tr className=" place-content-center">
              <th>no</th>
              <th>preview</th>
              <th>type</th>
              <th>order</th>
              <th>action</th>
            </tr>
            {section.map((s, indexOf) => (
              <>
                <tr>
                  <td>{indexOf + 1}</td>
                  <td>
                    <div className="h-16">
                      {s.image && (
                        <img
                          className="h-full w-full object-contain"
                          src={s.image[0]}
                          alt=""
                        />
                      )}
                    </div>
                  </td>
                  <td>
                    {s.type && s.type.charAt(0).toUpperCase() + s.type.slice(1)}
                  </td>
                  <td>{s.order}</td>
                  <td>
                    <Link href={"/homepage/edit/" + s.id}>
                      <button className="btn">Edit</button>
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </div>
        </table>
      </main>
    </>
  );
};

export default Edit;
