 
let __storeCache = loadFromStorage();

function loadFromStorage() {
  return JSON.parse(localStorage.getItem('tabs')) || {
    settings: {},
    content: {},
    new_tr: {},
    delete_tr: {},
    summary: {}
  };
}

async function initStorage(currentTabId){
    let allSettings = pathTabStore.get("settings");  
    if (Object.keys(allSettings).length === 0) {
        // загружаем весь файл, так как при сохранении файл перезаписывается полностью 
        const loadedSettings = await getSettingsFile();
        pathTabStore.set("settings", loadedSettings);
        allSettings = loadedSettings;
    }

    if (!(currentTabId in allSettings)) {
      allSettings[currentTabId] = {};
      pathTabStore.set("settings", allSettings); 
    }
    if (!pathTabStore.has(`content.${currentTabId}`)) {
        pathTabStore.set(`content.${currentTabId}`, {});
    }
    if (!pathTabStore.has(`new_tr.${currentTabId}`)) {
        pathTabStore.set(`new_tr.${currentTabId}`, {});
    }
    if (!pathTabStore.has(`delete_tr.${currentTabId}`)) {
      pathTabStore.set(`delete_tr.${currentTabId}`, {});
    }
    if (!pathTabStore.has(`summary`)) {
        pathTabStore.set(`summary`, {});
    }
}

async function getSettingsFile() {
    const response = await fetch(`${basePath}/config/table-settings.json`);
    if (!response.ok) throw new Error("Файл настроек не найден");
    const settingsText = await response.text();
    return JSON.parse(settingsText);
}

async function storageLoadSettingsFromFile(basePath, tab_id) {
    try {
        if (pathTabStore.has('settings')) {
            return;
        }

        const loadedSettings = await getSettingsFile();

        pathTabStore.set('settings', loadedSettings);
        console.log('Настройки загружены из файла');
        
    } catch (error) {
        console.warn("Используются настройки по умолчанию:", error);
        storageInitDefaultSettingsInIndexStore(tab_id);
    }
}

function storageInitDefaultSettingsInIndexStore(tab_id) {
    const defaultSettings = {
        [`${tab_id}_header_topic`]: {
            fontSize: "16px",
            backgroundColor: "#767676",
            width: 75
        },
        [`${tab_id}_header_content`]: {
            fontSize: "16px",
            backgroundColor: "#767676",
            width: 200
        },
        [`${tab_id}_header_other`]: {
            fontSize: "16px",
            backgroundColor: "#767676",
            width: 25
        }
    };
    pathTabStore.set(`settings.${tab_id}`, defaultSettings);
}

function saveToStorage() {
  localStorage.setItem('tabs', JSON.stringify(__storeCache));
}

const pathTabStore = {
  get(path) {
    // const fontSize = pathTabStore.get('settings.tab_1.tab_1_header_topic.fontSize');
    return path.split('.').reduce((acc, key) => acc?.[key], __storeCache);
  },

  set(path, value) {
    // pathTabStore.set('settings.tab_1.tab_1_header_topic.fontSize', '16px');
    const keys = path.split('.');
    const lastKey = keys.pop();

    let target = __storeCache;
    for (const key of keys) {
      if (!(key in target)) target[key] = {};
      target = target[key];
    }

    target[lastKey] = value;
    saveToStorage();
    return __storeCache;
  },

  update(path, fn) {
    // pathTabStore.update('settings.tab_1.tab_1_header_topic.width', w => w + 20);
    // pathTabStore.update(`settings.${currentTabId}.${cell.id}.fontSize`, () => value);
    const newValue = fn(this.get(path));
    return this.set(path, newValue);
  },

  delete(path) {
    // pathTabStore.delete('settings.tab_1.tab_1_header_other');
    const keys = path.split('.');
    const lastKey = keys.pop();

    let target = __storeCache;
    for (const key of keys) {
      if (!(key in target)) return __storeCache;
      target = target[key];
    }

    delete target[lastKey];
    saveToStorage();
    return __storeCache;
  },

  drop(){
    // pathTabStore.drop()
    localStorage.removeItem('tabs');
    __storeCache = loadFromStorage();
    saveToStorage();
  },

  dropTab(tab_id){
    // pathTabStore.dropTab('tab_1')
    if (this.has(`settings.${tab_id}`)) { 
      this.set(`settings.${tab_id}`, {}); 
    }
    if (this.has(`content.${tab_id}`)) { 
      this.set(`content.${tab_id}`, {});
    }
    if (this.has(`new_tr.${tab_id}`)) { 
      this.set(`new_tr.${tab_id}`, {});
    }
    if (this.has(`delete_tr.${tab_id}`)) { 
      this.set(`delete_tr.${tab_id}`, {});
    }
  },

  has(path) {
    // if (!pathTabStore.has('settings.tab_1.tab_1_header_topic')) {...}    
    let target = __storeCache;
    for (const key of path.split('.')) {
      if (!(key in target)) return false;
      target = target[key];
    }
    return true;
  },

  reset() {
    __storeCache = loadFromStorage();
  },

  all() {
    // pathTabStore.all()
    return __storeCache;
  }
};
