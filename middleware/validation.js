export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        field: err.path[0],
        message: err.message,
      }));
      throw new ApiError(400, 'Validation failed', errors);
    }
    req.body = result.data;
    next();
  };
};
