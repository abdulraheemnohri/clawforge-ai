export default function DevicesPage() {
  return (
    <div>
      <h2>Devices</h2>
      <div className="glass rounded-xl p-4 mb-3">
        <h3>Windows Desktop</h3>
        <p>П Cnline</p>
      </div>
      <div className="glass rounded-xl p-4">
        <h3>Pair New Device</h3>
        <p>Scan QR code from your Android device to pair.</p>
        <button className="mt-2 ph-4 pg-= bg-forge-500 rounded-lg text-white text-sm">Generate Pairing Code</button>
      </div>
    </div>
  );
}