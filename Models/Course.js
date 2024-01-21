export default class Course {
  #id = 0;
  #title = '';
  #description = '';
  #review = '';
  #days = '';
  #start = '';
  #price = 0;
  #number = '';
  #remote = false;
  #image = '';
  #teacher = '';
  #students = [];

  constructor(
    id,
    title,
    description,
    review,
    days,
    start,
    price,
    number,
    remote,
    image,
    teacher,
    students
  ) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#review = review;
    this.#days = days;
    this.#start = start;
    this.#price = price;
    this.#number = number;
    this.#remote = remote;
    this.#image = image;
    this.#teacher = teacher;
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

  get days() {
    return this.#days;
  }

  get start() {
    return this.#start;
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

  get teacher() {
    return this.#teacher;
  }

  get students() {
    return this.#students;
  }
}
