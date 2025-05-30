const {
  convertTimestampToDate, createLookUpObj
} = require("../db/seeds/utils");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("createLookUpObj", () => {
  test("returns an empty object when passed an empty array", () => {
    expect(createLookUpObj([])).toEqual({})
  })
  test("returns an object with the correct key and value referenced when passed an array of one object", () => {
    const input = [{category_id: 1, category_name: "crisps"}]
    const actual = createLookUpObj(input, "category_name", "category_id")
    expect(actual).toEqual({crisps: 1})
  })
  test("returns an object with the correct key and value referenced when passed an array with multiple objects", () => {
    const input = [
      {category_id: 1, category_name: "crisps"},
      {category_id: 2, category_name: "nuts"},
      {category_id: 3, category_name: "crackers"},
      {category_id: 4, category_name: "sweets"},
      {category_id: 5, category_name: "chocolates"}
    ]
    const actual = createLookUpObj(input, "category_name", "category_id")
    expect(actual).toEqual({
      crisps: 1,
      nuts: 2,
      crackers: 3,
      sweets: 4,
      chocolates: 5
    })
  })
  test("does not mutate original array", () => {
    const input = [{category_id: 1, category_name: "crisps"}]
    const copyInput = [{category_id: 1, category_name: "crisps"}]
    createLookUpObj(input)
    expect(input).toEqual(copyInput)
  })
})
