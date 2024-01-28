var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HttpClient_url;
import { settings } from '../utilities/config.js';
export class HttpClient {
    constructor(url) {
        _HttpClient_url.set(this, '');
        __classPrivateFieldSet(this, _HttpClient_url, url || "", "f");
    }
    async get(resource) {
        try {
            __classPrivateFieldSet(this, _HttpClient_url, `${settings.BASE_URL}/${resource}/`, "f");
            const response = await fetch(__classPrivateFieldGet(this, _HttpClient_url, "f"));
            if (response.ok) {
                const result = await response.json();
                return result;
            }
            else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        }
        catch (error) {
            throw new Error(`Ett fel inträffade i get metoden: ${error}`);
        }
    }
    async add(data) {
        try {
            const response = await fetch(__classPrivateFieldGet(this, _HttpClient_url, "f"), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const result = await response.json();
                return result;
            }
            else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        }
        catch (error) {
            throw new Error(`Ett fel inträffade i add metoden: ${error}`);
        }
    }
    async delete() {
        try {
            await fetch(__classPrivateFieldGet(this, _HttpClient_url, "f"), {
                method: 'DELETE',
            });
        }
        catch (error) {
            throw new Error(`Ett fel inträffade i delete metoden: ${error}`);
        }
    }
    async update(data) {
        try {
            const response = await fetch(__classPrivateFieldGet(this, _HttpClient_url, "f"), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const result = await response.json();
                return result;
            }
            else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        }
        catch (error) {
            throw new Error(`Ett fel inträffade i update metoden: ${error}`);
        }
    }
}
_HttpClient_url = new WeakMap();
