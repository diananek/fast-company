export function displayDate(time) {
  const createdDate = new Date(parseInt(time));
  const currentDate = new Date();
  const yearDif = currentDate.getFullYear() - createdDate.getFullYear();
  if (yearDif === 0) {
    const dayDif = currentDate.getDate() - createdDate.getDate();
    if (dayDif === 0) {
      const hourDif = currentDate.getHours() - createdDate.getHours();
      if (hourDif === 0) {
        const minutesDif = currentDate.getMinutes() - createdDate.getMinutes();
        if (minutesDif >= 0 && minutesDif < 5) return "1 минуту назад";
        if (minutesDif >= 5 && minutesDif < 10) return "5 минут назад";
        if (minutesDif >= 10 && minutesDif < 30) {
          return "10 минут назад";
        }
        return "30 минут назад";
      }
      return `${
        createdDate.getHours() < 10
          ? "0" + createdDate.getHours()
          : createdDate.getHours()
      }:${
        createdDate.getMinutes() < 10
          ? "0" + createdDate.getMinutes()
          : createdDate.getMinutes()
      }`;
    }
    return `${createdDate.getDate()} ${createdDate.toLocaleString("default", {
      month: "long"
    })}`;
  }
  return (
    createdDate.getFullYear() +
    "." +
    (createdDate.getMonth() + 1) +
    "_" +
    createdDate.getDate()
  );
  // const pastMinutes = (currentDate - createdDate) / (1000 * 60);
  // if (pastMinutes <= 1) {
  //   return "1 минуту назад";
  // } else if (pastMinutes <= 5) {
  //   return "5 минут назад";
  // } else if (pastMinutes <= 10) {
  //   return "10 минут назад";
  // } else if (pastMinutes <= 30) {
  //   return "30 минут назад";
  // }
  // const pastDays = pastMinutes / (60 * 24);

  // if (pastDays < 1) {
  //   return `${
  //     createdDate.getHours() < 10
  //       ? "0" + createdDate.getHours()
  //       : createdDate.getHours()
  //   }:${
  //     createdDate.getMinutes() < 10
  //       ? "0" + createdDate.getMinutes()
  //       : createdDate.getMinutes()
  //   }`;
  // } else if (pastDays < 365) {
  //   return `${createdDate.getDate()} ${createdDate.getMonth()}`;
  // } else {
  //   return `${createdDate.getDate()} ${createdDate.getMonth()} ${createdDate.getFullYear()}`;
  // }
}
