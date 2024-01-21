export default class Student {
  #id = 0;
  #firstname = '';
  #lastname = '';
  #username = '';
  #adress = '';
  #email = '';
  #phone = 0;
  #courses = [];

  constructor(
    id,
    firstname,
    lastname,
    username,
    adress,
    email,
    phone,
    courses
  ) {
    this.#id = id;
    this.#firstname = firstname;
    this.#lastname = lastname;
    this.#username = username;
    this.#adress = adress;
    this.#email = email;
    this.#phone = phone;
    this.#courses = courses;
  }

  get id() {
    return this.#id;
  }

  get firstname() {
    return this.#firstname;
  }

  get lastname() {
    return this.#lastname;
  }

  get username() {
    username = `${obj.firstname}_${obj.id}`.toLocaleLowerCase();
    return this.#username;
  }

  get adress() {
    return this.#adress;
  }

  get email() {
    return this.#email;
  }

  get phone() {
    return this.#phone;
  }

  get courses() {
    return this.#courses;
  }
}
