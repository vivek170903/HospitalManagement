export default function Header() {
  const name = localStorage.getItem("name");
  
  return (
    <header className="fixed top-0 w-full bg-gray-300 text-white p-4 flex justify-between items-center">
      <div>
        <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white">
          Welcome {name} 👋
        </h3>
      </div>
    </header>
  );
}
