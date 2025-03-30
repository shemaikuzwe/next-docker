import UserForm from "./form";
import UsersTable from "./table";

export default function Home() {
  return (
    <div className="flex  flex-col gap-3 justify-center items-center h-screen bg-gray-100">
      <UserForm />
      <UsersTable />
      
    </div>
  );
}
