export default function Dashboard() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Dashboard</h2>
      <p className="text-forge-400">Welcome to ClawForge AI Desktop.</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="glass rounded-xl p-4"><h3>Active Tasks</h3><p className="text-2xl font-bold text-forge-400">0</p></div>
        <div className="glass rounded-xl p-4"><h3>Connected Devices</h3><p className="text-2xl font-bold text-green-400">1</p></div>
        <div className="glass rounded-xl p-4"><h3>Agents Ready</h3><p className="text-2xl font-bold text-forge-400">4</p></div>
        <div className="glass rounded-xl p-4"><h3>Tools Loaded</h3><p className="text-2xl font-bold text-forge-400">24</p></div>
      </div>
    </div>
  );
}
