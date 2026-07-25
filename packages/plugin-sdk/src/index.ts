// Plugin SDK — Extensible plugin system for ClawForge

export enum PluginStatus {
  INSTALLED = 'INSTALLED',
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
  ERROR = 'ERROR',
}

export interface PluginManifest {
  name: string;
  version: string;
  description: string;
  author: string;
  permissions: string[];
  entryPoint: string;
}

export interface Plugin {
  id: string;
  manifest: PluginManifest;
  status: PluginStatus;
  permissions: string[];
  installedAt: string;
}

export interface PluginHook {
  onInstall?: () => Promise<void>;
  onEnable?: () => Promise<void>;
  onDisable?: () => Promise<void>;
  onUninstall?: () => Promise<void>;
}

export class PluginRegistry {
  private plugins = new Map<string, Plugin>();

  register(plugin: Plugin) { this.plugins.set(plugin.id, plugin); }

  list(): Plugin[] { return [...this.plugins.values()]; }

  get(id: string): Plugin | undefined { return this.plugins.get(id); }

  async enable(id: string) {
    const p = this.plugins.get(id);
    if (!p) return false;
    p.status = PluginStatus.ENABLED;
    return true;
  }

  async disable(id: string) {
    const p = this.plugins.get(id);
    if (!p) return false;
    p.status = PluginStatus.DISABLED;
    return true;
  }

  remove(id: string) { this.plugins.delete(id); }
}

export const pluginRegistry = new PluginRegistry();
