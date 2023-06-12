export const signinErrors = (err, req, res, next) => {
  next(new Error(err))
}