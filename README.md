
Prerequisites:
- latest `node`version.
- `.env` with correct credentails(look `.env.example` for reference) 

---

- [rokbenko/ai-playground: Code from AI tutorials presented on the "Code with Rok" YouTube channel (github.com)](https://github.com/rokbenko/ai-playground)
	- Build a customer support chatbot: Node.js examples on how to build a customer support chatbot with the OpenAI Assistants API using the Knowledge Retrieval tool


TODO:
- how to make a speech to speech languange to action model (LAM) like script in python utilizing this or local llm's

---

Pre-requisites:
- have a project created in `Google Cloud`
- use latest `node` version
	- otherwise, you'll be getting: `ReferenceError: fetch is not defined` while making api-requests
- have `gcloud` installed:
	- Install the Google Cloud SDK using Homebrew:
		- `brew install --cask google-cloud-sdk`
	- Visit the [official installation page](https://cloud.google.com/sdk/docs/install) to download the installer.
	- after installation, check `gcloud version` to confirm installation


SDK: [googleapis/nodejs-vertexai (github.com)](https://github.com/googleapis/nodejs-vertexai)
Documentation: [Node.js client library  |  Google Cloud](https://cloud.google.com/nodejs/docs/reference/vertexai/latest)
Video: [Getting Started with Vertex AI Gemini Pro API: Python & Node.js Code — Gemini API Tutorial #2 (youtube.com)](https://www.youtube.com/watch?v=I8W-4oq1onY&t=98s)
API Usage: [Gemini API  |  Generative AI on Vertex AI  |  Google Cloud](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/gemini#gemini-pro-vision)


Steps:
1. Enable Vertex AI API:
	- ![](./assets/Pasted%20image%2020240309010018.png)
	- ![](./assets/Pasted%20image%2020240309010059.png)

	- Enable that API inside the above search result
2. Create Service Account:
	- ![](./assets/Pasted%20image%2020240309010302.png)
	- provide service name, and then create service
3. Create service account key:
	- after creating the service, click on that service
	- ![](./assets/Pasted%20image%2020240309010707.png)
	- and select key-type: **JSON** and click **CREATE**, which will download a JSON while
	- and using this is how you authenticate yourself to be permitted to use the vertex AI Gemini API, no API key, but Json file which serves as a key

4. set application default credentials (ADC):
	- More at: [How Application Default Credentials works  |  Authentication  |  Google Cloud](https://cloud.google.com/docs/authentication/application-default-credentials#GAC)
	- set PATH of an environment for the `key`: `GOOGLE_APPLICATION_CREDENTIALS` and `value` being the `path-to-json-file`
	- This is how we setup application default credentials (ADC)
	- Note: After updating environment-variables, prefer restarting the computer.
	- You can also run: `gcloud auth application-default login`


5. Grant `aiplatform.endpoints.predict` IAM role:
	- As per the documentation, to use `streamGenerateContent` or the `HTTP request`, you need to provide the permission `aiplatform.endpoints.predict`(a.k.a `Vertex AI User` `principal` for the `Role`(*service-account* you've created earlier)(More info at [Method: projects.locations.publishers.models.streamGenerateContent  |  Vertex AI  |  Google Cloud](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent#iam-permissions))
		- ![](./assets/Pasted%20image%2020240309031511.png)
	- Note: You can check the `Role`s for given `permission`, here at [Vertex AI access control with IAM  |  Google Cloud](https://cloud.google.com/vertex-ai/docs/general/access-control)
		- ![](./assets/Pasted%20image%2020240309031354.png)
	- You can check permissions for a given project at [Manage access to projects, folders, and organizations  |  IAM Documentation  |  Google Cloud](https://cloud.google.com/iam/docs/manage-access-service-accounts)
		- https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role

6. run `node index.js`