import { api } from "~/utils/api";

export default function ListUser() {
  const { data, error, isLoading } = api.contoh.getAllContoh.useQuery();

  return <>
<div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Id</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {data?.map((item, no) => (
        <tr key={item.id}>
          <td>{no + 1}</td>
          <td>{item.id}</td>
          <td>{item.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  </>
}