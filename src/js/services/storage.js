const STORAGE_PREFIX = 'multiply-quiz';

export class Storage {
  constructor(storageType = 'session') {
    this.storage = storageType === 'local' ? localStorage : sessionStorage;
  }

  getItem(key) {
    try {
      return JSON.parse(this.storage.getItem(`${STORAGE_PREFIX}/${key}`));
    } catch {
      return null;
    }
  }

  setItem(key, value) {
    try {
      this.storage.setItem(`${STORAGE_PREFIX}/${key}`, JSON.stringify(value));
    } catch {
      // Fail silently
    }
  }
}

export const storage = new Storage();
