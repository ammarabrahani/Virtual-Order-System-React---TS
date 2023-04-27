export const formatAmount = (amount: any) => {
  return `Rs ${amount.toLocaleString(undefined, {
    maximumFractionDigits: 1,
  })}`;
};

export const formatDate = (datefromApi: any) => {
  const data: any = new Date(datefromApi);
  let dateTimeString: any =
    data.getDate() +
    "/" +
    (data.getMonth() + 1) +
    "/" +
    data.getFullYear() +
    "/";

  var hours = data.getUTCHours();
  var minutes: any = data.getMinutes();
  var seconds: any = data.getSeconds();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  dateTimeString =
    dateTimeString + " " + hours + ":" + minutes + ":" + seconds + " " + ampm;

  return dateTimeString;
};
