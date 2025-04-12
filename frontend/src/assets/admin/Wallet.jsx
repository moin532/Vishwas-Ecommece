import { FaWallet } from "react-icons/fa";

const transactions = [
  { id: 1, type: "Deposit", amount: 500, date: "2024-02-20" },
  { id: 2, type: "Withdrawal", amount: -200, date: "2024-02-18" },
  { id: 3, type: "Deposit", amount: 1000, date: "2024-02-15" },
  { id: 4, type: "Withdrawal", amount: -300, date: "2024-02-12" },
];

export default function MyWallet() {
  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      {/* Wallet Balance Section */}
      <div className="p-6 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Wallet Balance</h2>
            <p className="text-2xl font-bold mt-1">$1,200</p>
          </div>
          <FaWallet className="w-12 h-12" />
        </div>
        <button className="mt-4 w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-200 transition">
          Withdraw Money
        </button>
      </div>

      {/* Transaction History */}
      <div className="p-4 shadow-lg bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Transaction History</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between border-b pb-2 last:border-none"
            >
              <span className="font-medium">{tx.type}</span>
              <span
                className={`font-semibold ${
                  tx.amount > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount)}
              </span>
              <span className="text-sm text-gray-500">{tx.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
