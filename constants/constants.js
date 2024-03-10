const VERTEX_MODEL = process.env.VERTEX_MODEL;
const VERTEX_REGION = process.env.VERTEX_REGION;
const VERTEX_PROJECT_ID = process.env.VERTEX_PROJECT_ID;

const BARCODE_PROMPT_TYPE = {
    BARCODE_TO_CSV: 'barcode-to-csv'
}

const RECEIPT_PROMPT_TYPE = {
    DETAILS_IN_JSON: 'details-in-json'
}

module.exports = {
    BARCODE_PROMPT_TYPE,
    RECEIPT_PROMPT_TYPE,
    VERTEX_MODEL,
    VERTEX_REGION,
    VERTEX_PROJECT_ID
}