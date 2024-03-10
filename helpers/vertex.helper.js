const { VertexAI } = require('@google-cloud/vertexai');
const { BARCODE_PROMPT_TYPE, RECEIPT_PROMPT_TYPE, VERTEX_MODEL, VERTEX_PROJECT_ID, VERTEX_REGION } = require('../constants/constants');

function getFilePart(base64Content) {
    return ({
        "inline_data": {
            "mime_type": "image/png",
            "data": base64Content
        }
    });
}

function getTextPart(promptType) {
    let prompt = '';

    switch (promptType) {
        case BARCODE_PROMPT_TYPE.BARCODE_TO_CSV:
            prompt = "Extract the barcodes from a list of barcodes in the photo and output those values in CSV. The CSV should have two columns: 'header' (containing the index) and 'value' (containing the barcode value). The response should be a plain CSV string without any markdown formats. This CSV string will be used to fetch values from an API and process them accordingly.";
            break;
        case RECEIPT_PROMPT_TYPE.DETAILS_IN_JSON:
            prompt = `Given the image of a receipt, identify the following information:

            - Business name: The name of the business that issued the receipt. It is typically located at the top of the receipt, in a larger font size or bolded. It may also include the logo, address, or phone number of the business.
            - Items: The list of items purchased, along with their quantities, descriptions, and prices. They are usually arranged in separate columns or aligned with spaces or tabs. Some receipts may use abbreviations or codes for the items. The items may be grouped by categories or subtotals.
            - Total amount: The total amount paid for the purchase, including taxes and discounts. It is usually located at the bottom of the receipt, preceded by a keyword such as "Total", "Amount Due", or "Grand Total". It may also show the payment method, change, or tip.
            
            The response should be a plain JSON stringified format without any markdown formats. This JSON stringified format will be used to fetch values from an API and process them accordingly.
            Output the information in a JSON format, with the keys "business_name", "items", and "total_amount". For example the parsed JSON value would be:
            {
                "business_name": "Starbucks",
                "items": [
                    {
                        "quantity": 1,
                        "description": "Caramel Macchiato",
                        "price": 4.25
                    },
                    {
                        "quantity": 2,
                        "description": "Blueberry Muffin",
                        "price": 2.95
                    }
                ],
                "total_amount": 10.15
            }`;
            break;
        default:
            // prompt = "Please provide the following information: Business name, Items, Total amount, and output the information in a JSON format, with the keys 'business_name', 'items', and 'total_amount'.";
            prompt = '';    // TODO: handle this case
    }

    return ({
        "text": prompt
    })
}

function getContentReqBody(promptType, base64Content) {
    const textPart = getTextPart(promptType);
    const filePart = getFilePart(base64Content);

    return ({
        "contents": [
            {
                "role": "user",
                "parts": [textPart, filePart]
            }
        ]
    });
}

function getGenerativeModel() {
    // Initialize Vertex with your Cloud project and location
    const vertex_ai = new VertexAI({
        project: VERTEX_PROJECT_ID,
        location: VERTEX_REGION
    });

    // Instantiate the models
    const generativeModel = vertex_ai.preview.getGenerativeModel({
        model: VERTEX_MODEL,
        generation_config: {
            "max_output_tokens": 2048,
            "temperature": 0.4,
            "top_p": 1,
            "top_k": 32
        },
        safety_settings: [
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            }
        ],
    });

    return generativeModel;
}

const generativeModel = getGenerativeModel();


module.exports = {
    getContentReqBody,
    generativeModel
};