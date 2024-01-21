export const daysDate = (course) => {
  const courseStartDate = new Date(course.start);
  const todayDate = new Date();

  const timeDifference = courseStartDate.getTime() - todayDate.getTime();

  const daysDifference = (timeDifference / (1000 * 3600 * 24)).toFixed(0);

  course.daysDifference = daysDifference;

  return course;
};
