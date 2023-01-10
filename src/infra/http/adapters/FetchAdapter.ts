import HttpClient from "../HttpClient";

export default class FetchAdapter implements HttpClient {

	async get(url: string): Promise<any> {
		const response = await fetch(url)
		return response.json();
	}

	async post(url: string, body: any): Promise<any> {
		const response = await fetch(url, {
      method: 'POST',
      body
    })
		return response.json();
	}

	async put(url: string, body: any): Promise<any> {
		const response = await fetch(url, {
      method: 'PUT',
      body
    })
		return response.json();
	}

	async delete(url: string): Promise<any> {
		const response = await await fetch(url, {
      method: 'DELETE'
    })
		return response.json();
	}

}