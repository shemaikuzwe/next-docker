import { User } from "@prisma/client";

export default async function UsersTable() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const users = (await res.json()) as User[];

  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-4xl bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Users Table</h1>
          <p className="text-center">No users found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Users Table</h1>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length &&
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {user.email}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
