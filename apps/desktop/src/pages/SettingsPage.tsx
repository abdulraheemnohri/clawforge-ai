export default function SettingsPage() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Settings</h2>
      <div className="space-y-3">
        <div className="glass rounded-xl p-4">
          <h3 className="font-semibold text-white">General</h3>
          <label className="flex items-center gap-2 mt-2 text-forge-300 text-sm">
            <input type="checkbox" defaultChecked /> Start with Windows
          </label>
          <label className="flex items-center gap-2 mt-1 text-forge-300 text-sm">
            <input type="checkbox" defaultChecked /> Minimize to system tray
          </label>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="font-semibold text-white">Connection</h3>
          <p className="text-green-400 text-sm">● Connected to local server</p>
          <p className="text-forge-500 text-xs mt-1">http://127.0.0.1:3777</p>
        </div>
      </div>
    </div>
  );
}
