export default class Course {
  #id = 0;
  #title = '';
  #description = '';
  #review = '';
  #length = '';
  #startDate = '';
  #price;
  #number = '';
  #remote = false;
  #image = '';
  #students = [];

  constructor(
    id,
    title,
    description,
    review,
    length,
    startDate,
    price,
    number,
    remote,
    image,
    students
  ) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#review = review;
    this.#length = length;
    this.#startDate = startDate;
    this.#price = price;
    this.#number = number;
    this.#remote = remote;
    this.#image = image;
    this.#students = students;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get review() {
    return this.#review;
  }

  get length() {
    return this.#length;
  }

  get startDate() {
    return this.#startDate;
  }

  get price() {
    return this.#price;
  }

  get number() {
    return this.#number;
  }

  get remote() {
    return this.#remote;
  }

  get image() {
    return this.#image;
  }

  get students() {
    return this.#students;
  }
}
