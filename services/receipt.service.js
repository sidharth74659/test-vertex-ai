const { RECEIPT_PROMPT_TYPE } = require("../constants/constants");
const { getContentReqBody, generativeModel } = require("../helpers/vertex.helper");
const { csvToJSON } = require("../helpers/util");



async function extractReceiptDetails(req, res) {
    // https://qrbatch.com/barcode (without labels)
    try {
        const base64ImageContent = req.body?.base64Image;
        if (!base64ImageContent) {
            return res.status(400).send('Request body is missing base64Image content');
        }

        const contentReqBody = getContentReqBody(RECEIPT_PROMPT_TYPE.DETAILS_IN_JSON, base64ImageContent)
        const streamingResp = await generativeModel.generateContentStream(contentReqBody);
        const contentResponse = await streamingResp.response;

        const result = contentResponse.candidates[0]?.content?.parts[0]?.text || null;
        console.log({ result: JSON.parse(result) });

        const response = JSON.parse(result);

        if (!response) {
            return res.status(400).send('Invalid File Content');
        }

        return res.status(200).send(response);
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        return res.status(500).send('An error occurred while processing your request');
    }
};


module.exports = {
    extractReceiptDetails
};