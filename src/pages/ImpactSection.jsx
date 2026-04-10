import MainNavbar from "../components/MainNavbar";

export default function ImpactSection() {
  const data = [
    {
      title: "Medical Care",
      amount: "₹18,500",
      desc: "Surgeries, medicines, vet visits",
    },
    {
      title: "Food & Feeding",
      amount: "₹9,200",
      desc: "Daily meals for rescued dogs",
    },
    {
      title: "Rescue & Transport",
      amount: "₹6,800",
      desc: "Emergency pickups and travel",
    },
    {
      title: "Shelter & Care",
      amount: "₹11,300",
      desc: "Temporary shelter and recovery",
    },
  ];

  return (
  <div>
      <MainNavbar />
        <div className="px-4 py-10 min-h-[calc(100vh-70px)] bg-[#f6f5f4]">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Where Your Help Goes 
        </h2>
        <p className="text-gray-600 text-sm mt-2 max-w-xl">
          Every contribution is tracked and used directly for the welfare of
          animals. Here's how your support is making a real difference.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <p className="text-sm text-gray-500">{item.title}</p>

            <h3 className="text-xl font-semibold mt-1">
              {item.amount}
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}