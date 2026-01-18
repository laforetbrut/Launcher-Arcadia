const { ipcRenderer } = require('electron');

export default class database {
    async createData(tableName, data) {
        let tableData = await ipcRenderer.invoke('store:get', tableName) || [];
        const maxId = tableData.length > 0
            ? Math.max(...tableData.map(item => item.ID || 0))
            : 0;
        data.ID = maxId + 1;
        tableData.push(data);
        await ipcRenderer.invoke('store:set', tableName, tableData);
        return data;
    }

    async readData(tableName, key = 1) {
        let tableData = await ipcRenderer.invoke('store:get', tableName) || [];
        return tableData.find(item => item.ID === key);
    }

    async readAllData(tableName) {
        return await ipcRenderer.invoke('store:get', tableName) || [];
    }

    async updateData(tableName, data, key = 1) {
        let tableData = await ipcRenderer.invoke('store:get', tableName) || [];
        const index = tableData.findIndex(item => item.ID === key);
        data.ID = key;
        if (index !== -1) {
            tableData[index] = data;
        } else {
            tableData.push(data);
        }
        await ipcRenderer.invoke('store:set', tableName, tableData);
    }

    async deleteData(tableName, key = 1) {
        let tableData = await ipcRenderer.invoke('store:get', tableName) || [];
        tableData = tableData.filter(item => item.ID !== key);
        await ipcRenderer.invoke('store:set', tableName, tableData);
    }
}