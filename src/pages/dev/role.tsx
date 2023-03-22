export default function DevChangeRole() {

  return (
    <div className="m-8">
      <h1 className="mb-8">Dev Change Role</h1>
      <div className="flex flex-col max-w-xs gap-2">
        <button className="btn">Change to admin</button>
        <button className="btn">Change to studio manager</button>
        <button className="btn">Change to blog manager</button>
        <button className="btn">Change to user</button>
      </div>
    </div>
  );
}