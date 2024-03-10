
function csvToJSON(csvData) {
    if (!csvData) {
        return null;
    }

    const lines = csvData.split('\n');
    const keys = lines[0].split(',').map(item => item.trim());

    const jsonData = lines.slice(1).map((line) => {
        const values = line.split(',');
        const obj = {};
        keys.forEach((key, index) => {
            obj[key] = values[index].trim();
        });

        return obj;
    });

    return jsonData;
}

module.exports = { csvToJSON };