export const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    next();
}