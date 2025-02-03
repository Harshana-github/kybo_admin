export const getToken = () => {
  const kybo = localStorage.getItem("Kybo");
  if (kybo) {
    const kyboObject = JSON.parse(kybo);
    return kyboObject.token;
  }
  return null;
};
