import { Courses } from "../models/CourseModel";


export const rankCourses = (courses: [Courses]): Courses[] => {
  courses.sort((a, b) => (b.review) - (a.review));
  let limitCourses = courses.slice(0, 5);
  return limitCourses as Courses[];
};

export const popCourses = (courses: [Courses]): Courses[] => {
  courses.sort(
    (a, b) => (b.students.length) - (a.students.length)
  );
  let limitCourses = courses.slice(0, 5);
  return limitCourses as Courses[];
};

export const startCourses = (courses: [Courses]): Courses[] => {
  courses.forEach((course) => {
    daysDate(course);
  });
  courses.sort((a, b): number => {
    if(a.daysDifference && b.daysDifference){
    const diff = a.daysDifference - b.daysDifference
  return diff;} else {
    return 0;
  }
  });  
  const filteredCourses: Courses[] = courses.filter((course) => { 
    if(course.daysDifference){
      course.daysDifference > 0
    return course;
  }else{
    return 0;
  }});  
  const limitCourses = filteredCourses.slice(0, 5);
  return limitCourses as Courses[];
};

const daysDate = (course: Courses): Courses => { 
  const courseStartDate = new Date(course.start);
  const todayDate = new Date();

  const timeDifference = courseStartDate.getTime() - todayDate.getTime();

  const daysDifference: number = parseInt((timeDifference / (1000 * 3600 * 24)).toFixed(0));

  course.daysDifference = daysDifference;  

  return course as Courses;
};
