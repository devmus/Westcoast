import Course from '../Models/Course.js';
import { HttpClient } from '../lib/https.js';

export default class AppManager {
  async listCourses() {
    try {
      const http = new HttpClient();
      const result = await http.get('courses');
      // console.log(result);

      const course = result.map((course) => {
        return new Course(
          course.id,
          course.title,
          course.description,
          course.review,
          course.days,
          course.start,
          course.price,
          course.number,
          course.remote,
          course.image,
          course.teacher,
          course.students
        );
      });

      return course;
    } catch (error) {
      throw error;
    }
  }

  async rankCourses() {
    const courses = await this.listCourses();
    courses.sort((a, b) => parseFloat(b.review) - parseFloat(a.review));
    let limitCourses = courses.slice(0, 5);
    return limitCourses;
  }

  async popCourses() {
    const courses = await this.listCourses();
    courses.sort(
      (a, b) =>
        parseFloat(b.students.student_count) -
        parseFloat(a.students.student_count)
    );
    let limitCourses = courses.slice(0, 5);
    return limitCourses;
  }

  async editCourse(id) {
    try {
      const http = new HttpClient();
      const result = await http.get(`courses/${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
