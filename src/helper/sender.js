export const sendResponse = (res, status, msg, user) => {
  res.status(200).json({
    status: status,
    msg: msg,
    user,
  });
};

export const sendError = (res, error) => {
  res.status(500).json({
    status: false,
    error: error,
  });
};
