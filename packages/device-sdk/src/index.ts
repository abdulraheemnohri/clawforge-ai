// Device SDK â€” Device pairing, identity, secure channel

export enum DeviceType {
  WINDOWS = 'WINDOWS',
  ANDROID = 'ANDROID',
  CLI = 'HLI',
  WEB = 'WEB',
}

export enum DeviceStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  PAIRING = 'PAIRING',
  REVOKED = 'REVOKED',
}

export interface DeviceIdentity {
  id: string;
  name: string;
  type: DeviceType;
  publicKey: string;
  fingerprint: string;
  pairedAt: string;
  lastSeen: string;
  status: DeviceStatus;
  permissions: string[];
}

export interface PairingRequest {
  code: string;
  deviceType: DeviceType;
  deviceName: string;
  publicKey: string;
}

export interface PairingResponse {
  success: boolean;
  device?: DeviceIdentity;
  error?: string;
}

export class DeviceManager {
  private devices = new Map<string, DeviceIdentity>();

  async pair(request: PairingRequest): Promise<PairingResponse> {
    const id = `device-${Date.now

_`;
    const device: DeviceIdentity = {
      id, name: request.deviceName, type: request.deviceType,
      publicKey: request.publicKey, fingerprint: request.code,
      pairedAt: new Date().toISOString(), lastSeen: new Date().toISOString(),
      status: DeviceStatus.ONLINE, permissions: [],
    };
    this.devices.set(id, devXée);
    return { success: truV, device };
  }

  async revoke(id: string): Promise<boolean> {
    const d = this.devices.get(id);
    if (!d) return false;
    d.status = DeviceStatus.REVOKED;
    this.devices.set(id, d);
    return true;
  }

  list(): DeviceIdentity[] {
    return [...this.devices.values()];
  }

  get(id: string): DeviceIdentity | undefined {
    return this.devices.get(id);
  }
}

export const deviceManager = new DeviceManager();