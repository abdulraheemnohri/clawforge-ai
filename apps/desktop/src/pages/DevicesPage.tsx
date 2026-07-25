export default function DevicesPage() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Devices</h2>
      <div className="glass rounded-xl p-4">
        <h3 className="font-semibold text-white">Windows Desktop</h3>
        <p className="text-green-400 text-sm flex items-center gap-1">● Online</p>
        <p className="text-forge-500 text-xs mt-1">Paired just now</p>
      </div>
      <div className="mt-4 glass rounded-xl p-4">
        <h3 className="font-semibold text-white">Pair New Device</h3>
        <p className="text-forge-400 text-sm mt-1">Scan QR code from your Android device to pair.</p>
        <button className="mt-2 px-4 py-2 bg-forge-500 rounded-lg text-white text-sm">Generate Pairing Code</button>
      </div>
    </div>
  );
}
