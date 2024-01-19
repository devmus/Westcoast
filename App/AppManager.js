import Course from '../Models/Course.js';
import { HttpClient } from '../lib/https.js';

export default class AppManager {
  async rankCourses() {
    try {
      const http = new HttpClient();
      const result = await http.get('courses');
      console.log(result);

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
          course.students
        );
      });

      course.sort((a, b) => parseFloat(b.review) - parseFloat(a.review));

      let bestCourses = course.slice(0, 5);
      console.log(bestCourses);

      return bestCourses;
    } catch (error) {
      throw error;
    }
  }
}
