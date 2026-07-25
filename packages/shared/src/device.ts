// V2 Device types

export enum DeviceType {
  WINDOWS = 'WINDOWS',
  ANDROID = 'ANDROID',
  CLI = 'CLI',
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
