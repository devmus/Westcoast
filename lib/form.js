const convertFormDataToJson = (formData) => {
  console.log(...formData);

  const data = Object.fromEntries(formData.entries());
  return data;
};

export { convertFormDataToJson };
