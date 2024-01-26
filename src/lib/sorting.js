export const rankCourses = (courses) => {
  courses.sort((a, b) => parseFloat(b.review) - parseFloat(a.review));
  let limitCourses = courses.slice(0, 5);
  return limitCourses;
};

export const popCourses = (courses) => {
  courses.sort(
    (a, b) => parseFloat(b.students.length) - parseFloat(a.students.length)
  );
  let limitCourses = courses.slice(0, 5);
  return limitCourses;
};

export const startCourses = (courses) => {
  courses.forEach((course) => {
    daysDate(course);
  });
  courses.sort((a, b) => a.daysDifference - b.daysDifference);
  const filteredCourses = courses.filter((course) => course.daysDifference > 0);
  const limitCourses = filteredCourses.slice(0, 5);
  return limitCourses;
};

const daysDate = (course) => {
  const courseStartDate = new Date(course.start);
  const todayDate = new Date();

  const timeDifference = courseStartDate.getTime() - todayDate.getTime();

  const daysDifference = (timeDifference / (1000 * 3600 * 24)).toFixed(0);

  course.daysDifference = daysDifference;

  return course;
};
