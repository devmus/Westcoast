import { Courses } from '../models/CourseModel.js';
import { Students } from '../models/StudentModel.js';
import { settings } from '../utilities/config.js';

export class HttpClient {
  #url = '';
  constructor(url?: string) {
    this.#url = url || "";
  }

  async get(resource: string): Promise<[Courses] | [Students] | Courses | Students> {
    try {
      this.#url = `${settings.BASE_URL}/${resource}/`;
      const response = await fetch(this.#url);

      if (response.ok) {
        const result = await response.json();     
        return result;
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Ett fel inträffade i get metoden: ${error}`);
    }
  }

  async add(data: Courses | Students): Promise<Courses | Students> {
    try {
      const response = await fetch(this.#url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Ett fel inträffade i add metoden: ${error}`);
    }
  }

  async delete() {
    try {
      await fetch(this.#url, {
        method: 'DELETE',
      });
    } catch (error) {
      throw new Error(`Ett fel inträffade i delete metoden: ${error}`);
    }
  }

  async update(data: Courses | Students): Promise<Courses | Students>{
    try {
      const response = await fetch(this.#url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Ett fel inträffade i update metoden: ${error}`);
    }
  }
}