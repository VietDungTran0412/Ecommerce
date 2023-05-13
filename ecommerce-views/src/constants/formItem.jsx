export const BASE_RULE = {
    required: true,
    message: "This field is required!"
}

export const EMAIL_RULE = {
    pattern: "^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$",
    message: 'Invalid email format!'
}

export const DEFAULT_PAGE_SIZE = 12;