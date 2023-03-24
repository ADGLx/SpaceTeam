const validateUser = require('../Server/validateUser')


test("returns false for empty password", () => {
    expect(validateUser("Dimitri", "dk@gmail.com", "")).toBe(false)
})

test("returns false for paswword under 5 character", () => {
    expect(validateUser("Dimitri", "dk@gmail.com", "a123")).toBe(false);
})

test("returns false for password not containing a number", () => {
    expect(validateUser("Dimitri", "dk@gmail.com", "abcdef")).toBe(false);
})

test("returns false for password not containing letter", () => {
    expect(validateUser("Dimitri", "dk@gmail.com", "123456")).toBe(false);
})

test("returns true for correct entries", () => {
    expect(validateUser("Dimitri", "dk@gmail.com", "12345a")).toBe(true);
})

test("returns true for correct entries with caps", () => {
    expect(validateUser("Dimitri", "dk@gmail.com", "1A2F343")).toBe(true);
})

test("returns false for no username", () => {
    expect(validateUser("", "dk@gmail.com", "hasjdjhsajk3")).toBe(false);
})

test("returns false for no email", () => {
    expect(validateUser("Dimitri", "", "hasjdjhsajk3")).toBe(false);
})